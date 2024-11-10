import prisma from "@/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { CredentialsProps, CustomJWTProps, UserProps } from "./types";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        firstName: { label: "First Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials: CredentialsProps | undefined) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const existingUser = await prisma.credentials.findFirst({
          where: {
            email: credentials.email,
          },
        });
        if (existingUser) {
          const passwordValidation =
            credentials.password === existingUser.password;
          if (passwordValidation) {
            return {
              id: existingUser.id,
              firstName: existingUser.firstName,
              email: existingUser.email,
              role: existingUser.role,
              isNewUser: false,
            };
          }
          return null;
        }
        try {
          const newUser = await prisma.credentials.create({
            data: {
              email: credentials.email,
              password: credentials.password,
              firstName: credentials.firstName,
              role: credentials.role,
            },
          });
          return {
            id: newUser.id,
            firstName: newUser.firstName,
            email: newUser.email,
            role: newUser.role,
            isNewUser: true,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: "secret",
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }: { token: CustomJWTProps; user: UserProps }) {
      if (user) {
        token.firstName = user.firstName;
        token.role = user.role;
        token.isNewUser = user.isNewUser;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: CustomJWTProps }) {
      session.user = session.user;
      session.user.id = token.sub;
      session.user.name = token.firstName;
      session.user.role = token.role;
      session.user.isNewUser = token.isNewUser;
      return session;
    },
  },
};
