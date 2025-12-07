"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const WelcomeBanner = () => {
  const { user } = useUser();
  return (
    <div className="p-8 bg-primary w-full text-primary-foreground rounded-2xl flex items-center gap-8 shadow-lg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />
      
      <div className="relative z-10 hidden md:block shrink-0">
        <Image
          src={"/laptop.png"}
          alt="laptop"
          width={120}
          height={120}
          className="drop-shadow-md hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="relative z-10 space-y-2">
        <h2 className="font-bold text-3xl md:text-4xl tracking-tight">Hello, {user?.fullName} 👋</h2>
        <p className="text-primary-foreground/90 text-lg max-w-xl">
          Welcome back! It&apos;s time to continue your learning journey. Create a new course or review your existing materials.
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
