import { generateNotesModel } from "@/config/AiModel";
import { db } from "@/config/db";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { course } = await req.json();
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

  await db
    .update(STUDY_MATERIAL_TABLE)
    .set({
      status: "Ready",
    })
    .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));

  return NextResponse.json({ result: course });
}
