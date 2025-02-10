import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/config/db";
import { SUBSCRIPTIONS_TABLE, USER_TABLE } from "@/config/schema";
import { eq } from "drizzle-orm";

const verifySignature = (orderId: string, paymentId: string, providedSignature: string) => {
  const secret = process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET;

  if (!secret) {
    throw new Error("Razorpay secret key is not defined in environment variables.");
  }

  const generatedSignature = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");

  return generatedSignature === providedSignature;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = body.payload;

    if (!orderCreationId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      return NextResponse.json({ message: "Invalid request", isOk: false }, { status: 400 });
    }

    const isVerified = verifySignature(orderCreationId, razorpayPaymentId, razorpaySignature);

    if (!isVerified) {
      return NextResponse.json({ message: "Payment verification failed", isOk: false }, { status: 400 });
    }

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    await db.insert(SUBSCRIPTIONS_TABLE).values({
      razorpayPaymentId: razorpayPaymentId,
      startDate: new Date(),
      endDate: endDate,
      userId: body.userId,
    });

    await db
      .update(USER_TABLE)
      .set({
        isMember: true,
      })
      .where(eq(USER_TABLE.id, body.userId));

    return NextResponse.json({ message: "Payment verified successfully", isOk: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error", isOk: false, error: error }, { status: 500 });
  }
}
