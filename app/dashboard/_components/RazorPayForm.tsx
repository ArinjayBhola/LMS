"use client";

import axios from "axios";
import Script from "next/script";
import React from "react";
import PriceCard from "./PriceCard";
import { useSelector } from "react-redux";

declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): Razorpay;
    };
  }
}

interface Razorpay {
  open: () => void;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id?: string;
  handler?: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    [key: string]: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface ReduxStore {
  userData: {
    data: {
      result: {
        id: string;
      };
    };
  };
}

const RazorPayForm = () => {
  const userId = useSelector((store: ReduxStore) => store?.userData?.data?.result?.id);

  const Amount = 100;

  const handlePayment = async () => {
    try {
      const response = await axios.post("/api/create-order", {
        amount: Amount,
      });

      return response.data.order.id;
    } catch (error) {
      console.error("Payment Failed", error);
    }
  };

  const processPayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const orderId = await handlePayment();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: Amount * 100,
        currency: "INR",
        name: "Company",
        description: "description",
        order_id: orderId,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          const payload = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post("/api/payment-webhook", { payload, userId });
          if (result.data.isOk) alert("payment succeed");
          else {
            alert(result.data.message);
          }
        },
        prefill: {
          name: "Arinjay",
          email: "example.com",
          contact: "312312",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <PriceCard processPayment={processPayment} />
    </div>
  );
};

export default RazorPayForm;
