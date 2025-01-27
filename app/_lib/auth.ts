import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn: authSignIn,
  signOut: authSignOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  callbacks: {
    async signIn({ user, account }) {
      console.log({ user });
      return true;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
