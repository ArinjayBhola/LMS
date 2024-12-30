import { db } from "@/config/db";
import { inngest } from "./client";
import { eq } from "drizzle-orm";
import { USER_TABLE } from "@/config/schema";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const createNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;
    const WAIT_TIME = 3000;
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));

    // GET EVENT DATA
    await step.run("Check User and create new if not in DB", async () => {
      const data = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress || ""));

      const fullName = user?.fullName?.trim() || "Anonymous";

      if (data.length == 0) {
        const newUser = await db
          .insert(USER_TABLE)
          .values({
            name: fullName,
            email: user?.primaryEmailAddress?.emailAddress || "Anonymous",
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
