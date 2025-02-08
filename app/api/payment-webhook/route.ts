import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

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
    const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = body;

    if (!orderCreationId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      return NextResponse.json({ message: "Invalid request", isOk: false }, { status: 400 });
    }

    const isVerified = verifySignature(orderCreationId, razorpayPaymentId, razorpaySignature);

    if (!isVerified) {
      return NextResponse.json({ message: "Payment verification failed", isOk: false }, { status: 400 });
    }

    return NextResponse.json({ message: "Payment verified successfully", isOk: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error", isOk: false, error: error }, { status: 500 });
  }
}
