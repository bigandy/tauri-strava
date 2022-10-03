import { PrismaClient } from "@prisma/client";

interface Global {
  prisma: PrismaClient;
}

declare const global: Global;

let prisma: PrismaClient;

const connect = (prisma: any) => {
  const now = Date.now();
  console.log("> Connecting Prisma");
  prisma
    .$connect()
    .then(() => {
      console.log(
        `> Prisma Connected in ${Date.now() - now}ms`
      );
    })
    .catch((error: any) => console.error(error));
};

if (typeof window === "undefined") {
  // if (process.env.NODE_ENV === "production") {
  //   prisma = new PrismaClient({
  //     log: ["info", "warn", "error"],
  //   });
  //   connect(prisma);
  // } else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      // log: ["info", "warn", "error", "query"],
    });
    connect(global.prisma);
  }
  prisma = global.prisma;
  // }
}

export default prisma;
export { PrismaClient };
