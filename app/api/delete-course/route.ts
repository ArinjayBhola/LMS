import { db } from "@/config/db";
import { STUDY_MATERIAL_TABLE } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const courseId = url.searchParams.get("id");

  if (courseId) {
    await db.delete(STUDY_MATERIAL_TABLE).where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));
  } else {
    return NextResponse.json({ error: "courseId is required" }, { status: 400 });
  }

  return NextResponse.json({ result: "success" });
}
