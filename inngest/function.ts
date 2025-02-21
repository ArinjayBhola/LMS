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

    await step.run("Generate and Save Course", async () => {
      const promt = `Generate a study material for ${topic} for ${courseType} and level of difficulty will be ${difficultyLevel} with summary of course, List of chapter along with summary and emoji icon for each chapter, topic list in each chapter, all result in JSON format`;
      const aiPromise = courseOutlineModel.sendMessage(promt).then((res) => JSON.parse(res.response.text()));
      const aiResult = await aiPromise;

      return db
        .insert(STUDY_MATERIAL_TABLE)
        .values({ courseLayout: aiResult, title: topic, courseId, courseType: studyType, createdBy, difficultyLevel })
        .returning();
    });
  },
);
