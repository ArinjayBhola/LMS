"use client";

import { RootState } from "@/redux/appStore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RazorPayForm from "./RazorPayForm";

const PremiumContent = () => {
  const [isPremium, setIsPremium] = useState(false);
  const { data } = useSelector((store: RootState) => store.userData);
  useEffect(() => {
    if (data?.result?.isMember !== undefined) {
      setIsPremium(data.result.isMember);
    }
  }, [data]);
  return (
    <>
      {isPremium ? (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto">
              ✅
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">You’re a Premium Member! 🎉</h2>
            <p className="text-gray-600 mt-2">
              Thank you for subscribing to our premium plan. Enjoy all exclusive features without any limits!
            </p>
          </div>
        </div>
      ) : (
        <RazorPayForm />
      )}
    </>
  );
};

export default PremiumContent;
