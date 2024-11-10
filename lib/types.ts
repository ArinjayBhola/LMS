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
  lastName: string;
  role: string;
  isNewUser: boolean;
}

export interface CustomJWTProps extends JWT {
  firstName?: string | null;
  lastName?: string | null;
  role?: string | null;
}

export interface SessionProps {
  user: {
    name: string;
    email: string;
    image: string | undefined;
    id: string;
    role: string;
    isNewUser: boolean;
  };
}
