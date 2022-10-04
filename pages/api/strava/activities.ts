// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt";

import type { NextApiRequest, NextApiResponse } from "next";

import stravaApi from "strava-v3";

const fetchActivities = async (accessToken: string, page: number = 1) => {
  try {
    console.log("Getting Activities");

    const strava = new stravaApi.client(accessToken);

    const payload = await strava.athlete.listActivities({
      page: page,
      per_page: 10,
    });

    // console.log({ payload });

    const filtered = payload
      //   .filter((act) => act.average_speed < 2 && act.sport_type === "Run")
      .map(({ name, type, sport_type, average_speed, max_speed, id }) => {
        return {
          id,
          name,
          newName: name.replace(/run/gi, "walk"),
          type,
          sport_type,
          average_speed,
          max_speed,
        };
      });

    return filtered;
  } catch (error) {
    console.error("error in fetchActivities", error);
    throw new Error("no dice");
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If you don't have the NEXTAUTH_SECRET environment variable set,
  // you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req });

  const { accessToken } = token;

  const page = 1;

  try {
    const activities = await fetchActivities(accessToken, page);

    res.send({ activities });
  } catch (error) {
    console.log("error", error);
    res.send({ error });
  }
}
