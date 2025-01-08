import { db } from "@/config/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { courseId, studyType } = await req.json();

  if (studyType === "Notes") {
    const result = await db
      .update(CHAPTER_NOTES_TABLE)
      .set({ finished: true })
      .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));
    return NextResponse.json(result);
  } else if (studyType === "Quiz") {
    const result = await db
      .update(STUDY_TYPE_CONTENT_TABLE)
      .set({ finished: true })
      .where(and(eq(STUDY_TYPE_CONTENT_TABLE.type, studyType), eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId)));
    return NextResponse.json(result);
  } else if (studyType === "Flashcard") {
    const result = await db
      .update(STUDY_TYPE_CONTENT_TABLE)
      .set({ finished: true })
      .where(and(eq(STUDY_TYPE_CONTENT_TABLE.type, studyType), eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId)));
    return NextResponse.json(result);
  }
}
