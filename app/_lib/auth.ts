import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log({ credentials });
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      console.log(auth, request);

      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      console.log(user, account, profile);

      try {
        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      console.log(session, user);

      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
