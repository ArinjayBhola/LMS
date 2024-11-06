import prisma from "@/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { authCredentials } from "./authCredentials";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: authCredentials,
      async authorize(credentials: any) {
        try {
          const newUser = await prisma.student.create({
            data: {
              email: credentials?.email,
              firstName: credentials?.firstName,
              lastName: credentials?.lastName,
            },
          });
          return {
            id: newUser?.id,
            firstName: newUser?.firstName,
            lastName: newUser?.lastName,
            email: newUser?.email,
          };
        } catch (error) {
          console.error(error);
        }
        return null;
      },
    }),
  ],
  secret: "secret",
  pages: {
    signIn: "/signin",
    signUp: "/signup",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.sub;
      session.user.name = `${token.firstName} ${token.lastName}`;
      return session;
    },
  },
};
