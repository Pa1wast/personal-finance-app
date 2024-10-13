import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";

const authConfig = {
  providers: [Credentials()],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {},
    async session({ session, user }) {
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
