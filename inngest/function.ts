import { db } from "@/config/db";
import { inngest } from "./client";
import { eq } from "drizzle-orm";
import { STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/config/schema";
import { courseOutlineModel, generateQuizModel, generateStudyTypeContentModel } from "@/config/AiModel";
import { YoutubeTranscript } from "youtube-transcript";

const cleanAIResponse = (text: string) => {
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
};


export const helloWorld = inngest.createFunction(
  { id: "hello-world", triggers: [{ event: "test/hello.world" }] },
  async ({ event, step }: { event: any; step: any }) => {




    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const createNewUser = inngest.createFunction(
  { id: "create-user", triggers: [{ event: "user.create" }] },
  async ({ event, step }: { event: any; step: any }) => {




    const { user } = event.data;

    // GET EVENT DATA
    await step.run("Check User and create new if not in DB", async () => {
      const data = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

      const fullName = user?.fullName?.trim() || user.username?.trim();

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
  { id: "generateStudyContent", triggers: [{ event: "studyType.Content" }] },
  async ({ event, step }: { event: any; step: any }) => {


    const { prompt, recordId, studyType } = event.data;

    const aiResult = await step.run("Generate Flash Card Content using AI", async () => {
      const result =
        studyType === "FlashCard"
          ? await generateStudyTypeContentModel.sendMessage(prompt)
          : await generateQuizModel.sendMessage(prompt);
      const aiResponse = JSON.parse(cleanAIResponse(result.response.text()));
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
  { id: "generateCourse", triggers: [{ event: "course.generate" }] },
  async ({ event, step }: { event: any; step: any }) => {




    const { topic, courseId, courseType, createdBy, difficultyLevel, studyType } = event.data;

    await step.run("Progress Checkpoint", async () => {
      console.log("Still working on AI generation...");
    });

    const aiResult = await step.run("Generate Course using AI", async () => {
      const prompt = `Create a JSON study material for ${topic} (${studyType}, ${difficultyLevel}). Include:
        - Course summary
        - Chapters (title, summary, emoji)
        - Topics per chapter.`;

      const result = await courseOutlineModel.sendMessage(prompt);
      return JSON.parse(cleanAIResponse(result.response.text()));
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
        status: "Ready",
      });

    });
  },
);

export const generateCourseFromYoutube = inngest.createFunction(
  { id: "generateCourseFromYoutube", triggers: [{ event: "course.generateFromYoutube" }] },
  async ({ event, step }: { event: any; step: any }) => {




    const { videoId, courseId, courseType, createdBy, difficultyLevel, studyType } = event.data;

    // Step 1: Fetch YouTube transcript
    const transcript = await step.run("Fetch YouTube Transcript", async () => {
      const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
      const fullText = transcriptItems.map((item: { text: string }) => item.text).join(" ");
      // Limit transcript to ~12000 chars to stay within token limits
      return fullText.slice(0, 12000);
    });

    // Step 2: Generate course outline from transcript
    const aiResult = await step.run("Generate Course from Transcript", async () => {
      const prompt = `Based on the following YouTube video transcript, create a comprehensive JSON study material.
The course type is "${studyType}" and difficulty level is "${difficultyLevel}".


Generate a well-structured course with:
- A clear courseTitle based on the video content
- A courseSummary
- Logical chapters (each with chapterNumber, chapterTitle, chapterSummary, emoji)
- Topics per chapter (each with topicTitle and details array)

YouTube Transcript:
"""
${transcript}
"""

Return ONLY valid JSON in the exact same format as a standard course outline.`;

      const result = await courseOutlineModel.sendMessage(prompt);
      return JSON.parse(cleanAIResponse(result.response.text()));
    });


    // Step 3: Save to DB
    await step.run("Save YouTube Course to DB", async () => {
      const title = aiResult.courseTitle || "YouTube Course";
      await db.insert(STUDY_MATERIAL_TABLE).values({
        courseLayout: aiResult,
        title,
        courseId,
        courseType: studyType,
        createdBy,
        difficultyLevel,
        status: "Ready",
      });

    });
  },
);
