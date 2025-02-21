import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { topic, courseId, courseType, createdBy, difficultyLevel, studyType } = body;

  setTimeout(() => {
    inngest.send({
      name: "course.generate",
      data: {
        topic,
        courseId,
        courseType,
        createdBy,
        difficultyLevel,
        studyType,
      },
    });
  }, 1000);

  return NextResponse.json({ result: "processing" });
}
