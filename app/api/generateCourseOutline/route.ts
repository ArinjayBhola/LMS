import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { topic, courseId, courseType, createdBy, difficultyLevel, studyType } = body;

  inngest.send({
    name: "course.generate",
    data: {
      studyType: studyType,
      courseId: courseId,
      topic: topic,
      courseType: courseType,
      createdBy: createdBy,
      difficultyLevel: difficultyLevel,
    },
  });

  return NextResponse.json({ result: "success" });
}
