"use client";

import { RootState } from "@/redux/appStore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RazorPayForm from "./RazorPayForm";
import { CheckCircle2 } from "lucide-react";

const PremiumContent = () => {
  const [isPremium, setIsPremium] = useState(false);
  const { data } = useSelector((store: RootState) => store.userData);
  useEffect(() => {
    if (data?.result?.isMember !== undefined) {
      setIsPremium(data.result.isMember);
    }
  }, [data]);
  return (
    <div className="w-full">
      {isPremium ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="bg-card shadow-lg rounded-2xl p-8 max-w-md text-center border animate-in zoom-in duration-300">
            <div className="flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-card-foreground mt-4">You’re a Premium Member! 🎉</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Thank you for subscribing to our premium plan. Enjoy all exclusive features without any limits!
            </p>
          </div>
        </div>
      ) : (
        <RazorPayForm />
      )}
    </div>
  );
};

export default PremiumContent;
