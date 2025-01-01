"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios";

function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  useEffect(() => {
    checkIsNewUser();
  }, [user]);

  const checkIsNewUser = async () => {
    await axios.post("/api/create-user", { user: user });
  };

  if (user) {
    checkIsNewUser();
  }
  return <div>{children}</div>;
}

export default Provider;
