import { pool } from "@/app/_lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email],
          );

          const existingUser = result.rows[0];

          if (!existingUser) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            existingUser.password,
          );

          if (!passwordsMatch) return null;

          return existingUser;
        } catch (error) {
          console.log("Could not log in: ", error);
          return null;
        }
      },
    }),
  ],

  // callbacks: {
  //   authorized({ auth, request }) {
  //     return !!auth?.user;
  //   },

  //   async signIn({ user, account, profile }) {
  //     return true;
  //   },

  //   async session({ session, user }) {
  //     const result = await pool.query("SELECT * FROM users WHERE email = $1", [
  //       user.email,
  //     ]);

  //     const curUser = result.rows[0];
  //     session.cus.user = curUser;

  //     return session;
  //   },
  // },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
