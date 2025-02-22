import { db } from "@/config/db";
import { inngest } from "./client";
import { eq } from "drizzle-orm";
import { STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/config/schema";
import { courseOutlineModel, generateQuizModel, generateStudyTypeContentModel } from "@/config/AiModel";

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

export const generateStudyTypeContent = inngest.createFunction(
  { id: "generateStudyContent" },
  { event: "studyType.Content" },

  async ({ event, step }) => {
    const { prompt, recordId, studyType } = event.data;

    const aiResult = await step.run("Generate Flash Card Content using AI", async () => {
      const result =
        studyType === "FlashCard"
          ? await generateStudyTypeContentModel.sendMessage(prompt)
          : await generateQuizModel.sendMessage(prompt);
      const aiResponse = JSON.parse(result.response.text());
      return aiResponse;
    });
    // save result

    await step.run("Save result to DB", async () => {
      try {
        await db
          .update(STUDY_TYPE_CONTENT_TABLE)
          .set({
            content: aiResult,
            status: "Ready",
          })
          .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));
        return "Data Inserted";
      } catch (error) {
        console.error("DB Error:", error);
        throw error;
      }
    });
  },
);

export const generateCourseOutline = inngest.createFunction(
  { id: "generateCourse" },
  { event: "course.generate" },
  async ({ event, step }) => {
    const { topic, courseId, courseType, createdBy, difficultyLevel, studyType } = event.data;

    await step.sleep("Delay to prevent timeout issues", "5s");

    await step.run("Progress Checkpoint", async () => {
      console.log("Still working on AI generation...");
    });

    const aiResult = await step.run("Generate Course using AI", async () => {
      const prompt = `Create a JSON study material for ${topic} (${courseType}, ${difficultyLevel}). Include:
        - Course summary
        - Chapters (title, summary, emoji)
        - Topics per chapter.`;
      const result = await courseOutlineModel.sendMessage(prompt);
      return JSON.parse(result.response.text());
    });

    await step.run("Checkpoint: AI Done", async () => {
      console.log("AI response received, saving to DB...");
    });

    await step.run("Save result to DB", async () => {
      await db.insert(STUDY_MATERIAL_TABLE).values({
        courseLayout: aiResult,
        title: topic,
        courseId,
        courseType: studyType,
        createdBy,
        difficultyLevel,
      });
    });
  },
);
