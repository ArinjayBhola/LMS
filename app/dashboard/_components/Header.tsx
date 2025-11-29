"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const path = usePathname();
  const isDashboard = path === "/dashboard";
  return (
    <div className="p-4 md:p-5 shadow-sm border-b bg-background flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center gap-2">
        {isDashboard && (
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        {!isDashboard && (
          <Link href={"/dashboard"}>
            <div className="flex gap-2 items-center">
              <Image
                src={"/logo.svg"}
                alt="logo"
                width={32}
                height={32}
                className="w-8 h-8 md:w-10 md:h-10"
              />
              <h2 className="font-bold text-xl md:text-2xl text-foreground">Easy Study</h2>
            </div>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
