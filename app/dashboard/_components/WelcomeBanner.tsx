"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const WelcomeBanner = () => {
  const { user } = useUser();
  return (
    <div className="p-6 bg-primary rounded-xl text-primary-foreground flex items-center justify-between shadow-sm relative overflow-hidden group">
      <div className="relative z-10 space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.fullName || "Student"}
        </h2>
        <p className="text-sm text-primary-foreground/80 font-medium max-w-lg">
          Track your progress and continue your learning journey.
        </p>
      </div>
      
      <div className="relative z-10 hidden sm:flex items-center justify-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
        <Image
          src={"/laptop.png"}
          alt="laptop"
          width={40}
          height={40}
          className="object-contain"
          priority
        />
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500" />
    </div>
  );
};

export default WelcomeBanner;
