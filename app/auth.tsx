"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios";

function Auth({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const emailAddress = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (emailAddress) {
      checkIsNewUser();
    }
  }, [user]);

  const checkIsNewUser = async () => {
    await axios.post("/api/create-user", { user: user });
  };

  return <div>{children}</div>;
}

export default Auth;
