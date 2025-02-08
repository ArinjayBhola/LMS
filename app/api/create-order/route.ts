import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  const { amount } = await req.json();
  console.log(amount);

  const order = await razorpay.orders.create({
    amount: 100 * 100,
    currency: "INR",
    receipt: "receipt_" + Math.random().toString(36).substring(7),
  });

  return NextResponse.json({ order });
}
