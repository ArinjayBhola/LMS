import { db } from "@/config/db";
import { USER_TABLE } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  if (email) {
    const data = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, email));
    return NextResponse.json({ result: data[0] });
  } else {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }
}
