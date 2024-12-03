import { JWT } from "next-auth/jwt";

export interface CredentialsProps {
  email: string;
  password: string;
  lastName?: string;
  firstName: string;
  role?: string;
}

export interface UserProps {
  firstName: string;
  email: string;
  role: string;
  isNewUser: boolean;
}

export interface CustomJWTProps extends JWT {
  firstName?: string | null;
  email?: string | null;
  role?: string | null;
  isNewUser?: boolean | null;
}

export interface SessionProps {
  isNewUser: boolean;
  user: {
    name: string;
    email: string;
    image: string | undefined;
    id: string;
    role: string;
    isNewUser: boolean;
  };
}
