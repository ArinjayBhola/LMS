import { db } from "@/config/db";
import { inngest } from "./client";
import { eq } from "drizzle-orm";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, USER_TABLE } from "@/config/schema";
import { generateNotesModel } from "@/config/AiModel";

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
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

      const fullName = user?.fullName?.trim();

      if (data.length == 0) {
        const newUser = await db
          .insert(USER_TABLE)
          .values({
            name: fullName,
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

export const GenerateNotes = inngest.createFunction(
  { id: "generate-notes" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    await step.run("Generate Chapter Notes", async () => {
      const chapters = course?.courseLayout?.chapters;
      let index = 0;
      chapters.forEach(async (chapter: string) => {
        const prompt = `Generate detailed exam material content for each chapter, ensuring all topic points are included in the content. Provide the content only in pure HTML format (do not use JSON, and do not include '<html>', '<head>', '<body>', or '<title>' tags). Output should be HTML only. Chapter: ${JSON.stringify(
          chapter,
        )}`;
        const result = await generateNotesModel.sendMessage(prompt);
        const aiResponse = result.response.text();

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: aiResponse,
        });
        index = index + 1;
      });
      return "Completed";
    });

    await step.run("Update Course Status", async () => {
      await db
        .update(STUDY_MATERIAL_TABLE)
        .set({
          status: "Ready",
        })
        .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
      return "Success";
    });
  },
);
