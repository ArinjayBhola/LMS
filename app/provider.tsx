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
    // const result = await db
    //   .select()
    //   .from(USER_TABLE)
    //   .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress || ""));

    // console.log("result: ", result);

    // if (result.length == 0) {
    //   const newUser = await db
    //     .insert(USER_TABLE)
    //     .values({
    //       name: user?.fullName,
    //       email: user?.primaryEmailAddress?.emailAddress,
    //     })
    //     .returning({ id: USER_TABLE.id });
    //   console.log("newUser: ", newUser);
    // }
    await axios.post("/api/create-user", { user: user });
  };

  if (user) {
    checkIsNewUser();
  }
  return <div>{children}</div>;
}

export default Provider;
