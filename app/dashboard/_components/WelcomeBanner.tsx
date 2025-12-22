"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const WelcomeBanner = () => {
  const { user } = useUser();
  return (
    <div className="p-8 bg-gradient-to-r from-primary to-purple-600 rounded-2xl glass flex items-center gap-6 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-700" />
      <div className="relative z-10 shrink-0">
        <Image
          src={"/laptop.png"}
          alt="laptop"
          width={100}
          height={100}
          className="drop-shadow-lg animate-float"
        />
      </div>
      <div className="relative z-10">
        <h2 className="font-bold text-3xl text-white mb-2">Hello, {user?.fullName}</h2>
        <p className="text-blue-100/90 text-lg">Welcome Back, It&apos;s time to get back and start learning new courses</p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
