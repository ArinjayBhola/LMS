import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { createNewUser, generateCourseOutline, generateStudyTypeContent, helloWorld } from "@/inngest/function";

export const maxDuration = 300;

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld, createNewUser, generateStudyTypeContent, generateCourseOutline],
});
