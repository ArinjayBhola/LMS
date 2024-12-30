import { courseOutlineModel } from "@/config/AiModel";
import { db } from "@/config/db";
import { STUDY_MATERIAL_TABLE } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const { topic, courseId, courseType, createdBy, difficultyLevel, studyType } = body;

  // Generate course layout
  const promt = `Generate a study material for ${topic} for ${courseType} and level of difficulty will be ${difficultyLevel} with summary of course, List of chapter along with summary for each chapter, topic list in each chapter, all result in JSON format`;

  const aiResponse = await courseOutlineModel.sendMessage(promt);
  const aiResult = JSON.parse(aiResponse.response.text());

  // Save the result along wth user input
  const dbResult = await db
    .insert(STUDY_MATERIAL_TABLE)
    .values({
      courseLayout: aiResult,
      title: topic,
      courseId,
      courseType: studyType,
      createdBy,
      difficultyLevel,
    })
    .returning();

  return NextResponse.json({ result: dbResult[0] });
}
