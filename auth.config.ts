import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        console.log({ credentials });

        const user: User = {
          id: "1",
          name: "Paiwast",
          email: "test@gmail.com",
        };

        return user;
      },
    }),
  ],
} satisfies NextAuthOptions;
