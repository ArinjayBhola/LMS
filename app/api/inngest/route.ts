import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { createNewUser, helloWorld } from "@/inngest/function";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld, createNewUser],
});
console.log("Inngest API route is running...");
