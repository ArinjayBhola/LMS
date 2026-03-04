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
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
          <div className="bg-card shadow-premium rounded-[2.5rem] p-12 max-w-lg text-center border border-border/10 animate-in zoom-in-95 duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-primary" />
            <div className="flex items-center justify-center w-24 h-24 bg-primary/10 text-primary rounded-3xl mx-auto mb-8 transition-transform hover:rotate-12 duration-500">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-foreground mt-4 tracking-tight leading-tight italic">You&apos;re Pro! 🎉</h2>
            <p className="text-muted-foreground mt-6 text-xl leading-relaxed font-medium">
              Welcome to the inner circle. All limits have been lifted. Go ahead and create something amazing!
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
