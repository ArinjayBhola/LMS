import { db } from "@/config/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/config/schema";
import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { chapters, courseId, type } = await req.json();
  const prompt = `generate the flashcard on topic: ${chapters} in JSON format with front back content. maximum 15`;

  const result = await db
    .insert(STUDY_TYPE_CONTENT_TABLE)
    .values({
      courseId: courseId,
      type: type,
    })
    .returning({
      id: STUDY_TYPE_CONTENT_TABLE.id,
    });

  inngest.send({
    name: "studyType.Content",
    data: {
      studyType: type,
      prompt: prompt,
      courseId: courseId,
      recordId: result[0].id,
    },
  });

  return NextResponse.json(result[0].id);
}
