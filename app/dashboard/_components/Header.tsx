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
    <div className="p-4 md:p-6 shadow-sm border-b bg-background/80 backdrop-blur-md flex justify-between items-center sticky top-0 z-20 transition-all duration-300">
      <div className="flex items-center gap-4">
        {isDashboard && (
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-accent/50" onClick={onMenuClick}>
            <Menu className="h-6 w-6" />
          </Button>
        )}
        
        {!isDashboard && (
          <Link href={"/dashboard"} className="group">
            <div className="flex gap-3 items-center">
              <Image
                src={"/logo.svg"}
                alt="logo"
                width={32}
                height={32}
                className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110 duration-300"
              />
              <h2 className="font-bold text-xl md:text-2xl text-foreground tracking-tight group-hover:text-primary transition-colors">Easy Study</h2>
            </div>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-6">
        <ThemeToggle />
        <div className="hover:scale-105 transition-transform duration-200">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Header;
