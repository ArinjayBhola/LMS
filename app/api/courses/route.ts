import { db } from "@/config/db";
import { STUDY_MATERIAL_TABLE } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { createdBy } = await req.json();
  const result = await db.select().from(STUDY_MATERIAL_TABLE).where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy));

  return NextResponse.json({ result: result });
}
