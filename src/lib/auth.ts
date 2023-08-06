import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const { settings } = await fetch(
        "http://localhost:3000/api/settings",
        {}
      ).then(async (res) => {
        const data = await res.json();
        return data;
      });

      if (account.provider === "google") {
        if (!settings.validGmailDomains.includes(profile.email.split("@")[1])) {
          return false;
        }
      }
      return true;
    },

    async session({ session, user }) {
      if (user && user.name) {
        const regex = /\(([^)]+)\)/;
        const match = user.name.match(regex);
        Object.assign(session.user, {
          name: user.name.split(" ")[0],
          surname: user.name.split(" ")[1],
          registrationNumber: match ? match[1] : null,
        });
      }
      return session;
    },
  },
};
