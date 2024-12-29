import { db } from "@/config/db";
import { inngest } from "./client";
import { eq } from "drizzle-orm";
import { USER_TABLE } from "@/config/schema";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    console.log("event: ", event);
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const createNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;
    console.log("Received event data: ", event);
    console.log("user: ", user);
    // GET EVENT DATA
    await step.run("Check User and create new if not in DB", async () => {
      const data = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress || ""));

      console.log("data: ", data);

      if (data.length == 0) {
        const newUser = await db
          .insert(USER_TABLE)
          .values({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
          })
          .returning({ id: USER_TABLE.id });
        return newUser;
      }
      return data;
    });
    return "Success";
  },
  // Send welcome email notification
);
