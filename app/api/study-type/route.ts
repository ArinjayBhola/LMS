import { db } from "@/config/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { courseId, studyType } = await req.json();
  if (studyType === "ALL") {
    const notes = await db.select().from(CHAPTER_NOTES_TABLE).where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    const getContentList = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

    const result = {
      ...(notes.length > 0 && { notes }),
      flashcard: getContentList?.find((item) => item.type === "Flashcard"),
      quiz: getContentList?.find((item) => item.type === "Quiz"),
      qa: null,
    };
    return NextResponse.json(result);
  } else if (studyType === "notes") {
    const notes = await db.select().from(CHAPTER_NOTES_TABLE).where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    return NextResponse.json(notes);
  } else {
    const result = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(and(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId), eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)));

    return NextResponse.json(result[0]);
  }
}
