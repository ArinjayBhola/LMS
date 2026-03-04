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
    <div className="h-16 border-b border-border/60 bg-background/80 backdrop-blur-md px-6 flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {isDashboard && (
          <Button variant="ghost" size="icon" className="md:hidden h-9 w-9" onClick={onMenuClick}>
            <Menu className="h-4 w-4" />
          </Button>
        )}
        
        {!isDashboard && (
          <Link href={"/dashboard"} className="flex gap-2.5 items-center hover:opacity-80 transition-opacity">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <Image
                src={"/logo.svg"}
                alt="logo"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <h2 className="font-bold text-lg text-foreground tracking-tight">Easy Study</h2>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="h-6 w-px bg-border/40 hidden md:block" />
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-8 h-8 rounded-lg border border-border/50"
            }
          }}
        />
      </div>
    </div>
  );
};

export default Header;
