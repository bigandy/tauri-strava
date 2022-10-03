import NextAuth, { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
// import GithubProvider from "next-auth/providers/github"
// import TwitterProvider from "next-auth/providers/twitter"
// import Auth0Provider from "next-auth/providers/auth0"
import StravaProvider from "next-auth/providers/strava"


// TODO:
const refreshAccessToken = (token) => {
  return token;
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_ID,
      clientSecret: process.env.STRAVA_SECRET,
      // scope: ['read_all', 'profile:read_all', 'activity:read_all', 'activity:write'],
      authorization: { params: { scope: "profile:read_all,activity:read_all,activity:write" } },
    }),
  ],
  // theme: {
  //   colorScheme: "light",
  // },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
  async jwt({ token, user, account }) {
    if (account && user) {
        // Add access_token, refresh_token and expirations to the token right after signin
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpired = account.expires_at * 1000;
        token.refreshTokenExpired = Date.now() + account.refresh_expires_in * 1000;
        token.user = user;
        return token;
    }

    // Return previous token if the access token has not expired yet
    if (Date.now() < token.accessTokenExpired) {
        return token;
    }

    // Access token has expired, try to update it
    return refreshAccessToken(token);
},
async session({ session, token }) {
    session.user = token.user;
    session.accessToken = token.accessToken;
    session.error = token.error;
    return session;
}}
}

export default NextAuth(authOptions)
