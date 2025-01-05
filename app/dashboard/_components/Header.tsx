"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const path = usePathname();
  const isDashboard = path === "/dashboard";
  return (
    <div className={`p-5 shadow-md flex ${isDashboard ? "justify-end" : "justify-between"}`}>
      {!isDashboard && (
        <Link href={"/dashboard"}>
          <div className="flex gap-2 items-center">
            <Image
              src={"/logo.svg"}
              alt="logo"
              width={40}
              height={40}
            />
            <h2 className="font-bold text-2xl">Easy Study</h2>
          </div>
        </Link>
      )}
      <UserButton />
    </div>
  );
};

export default Header;
