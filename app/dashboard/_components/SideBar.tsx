"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight, LayoutDashboard, Shield, UserCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/nextjs";
import { fetchUserData } from "@/redux/slice/userSlice";
import { AppDispatch, RootState } from "@/redux/appStore";

interface SideBarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const SideBar = ({ isCollapsed = false, onToggle }: SideBarProps) => {
  const [isPremium, setIsPremium] = useState(false);
  const pathname = usePathname();
  const totalCourse = useSelector((store: RootState) => store.courseData.data.length);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { user } = useUser();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data } = useSelector((store: RootState) => store.userData);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setUserEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchUserData(userEmail));
    }
  }, [userEmail, dispatch]);

  useEffect(() => {
    if (data?.result?.isMember !== undefined) {
      setIsPremium(data.result.isMember);
    }
  }, [data]);

  const menuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    ...(!isPremium ? [{
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    }] : []),
    {
      name: "Profile",
      icon: UserCircle,
      path: "/dashboard/profile",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-background transition-all duration-300">
      <div className={`p-4 ${isCollapsed ? "px-2" : "px-4"}`}>
        <div className={`flex items-center justify-between ${isCollapsed ? "flex-col gap-4" : ""}`}>
          <div className="flex gap-2 items-center px-1">
            <div className="bg-primary/10 p-1.5 rounded-md shrink-0">
              <Image
                src={"/logo.svg"}
                alt="logo"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            {!isCollapsed && <h2 className="font-bold text-lg text-foreground tracking-tight whitespace-nowrap">Easy Study</h2>}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            className="hidden md:flex h-8 w-8 rounded-lg hover:bg-muted"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <div className="mt-6">
          {totalCourse >= 5 && !isPremium ? (
            <Button className="w-full h-9 font-semibold text-xs" disabled>
              {isCollapsed ? "!" : "Limit Reached"}
            </Button>
          ) : (
            <Link href={"/create"} className="w-full">
              <Button className={`w-full h-9 font-semibold text-xs ${isCollapsed ? "px-0" : ""}`}>
                {isCollapsed ? "+" : "+ Create New"}
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className={`flex-1 py-2 ${isCollapsed ? "px-2" : "px-4"}`}>
        <div className="space-y-1">
          {menuList?.map((menu, index) => {
            const isActive = pathname === menu.path;
            return (
              <div
                key={index}
                className={`flex items-center rounded-md cursor-pointer transition-colors group ${
                  isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2"
                } ${
                  isActive 
                    ? "bg-secondary text-foreground" 
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
                onClick={() => router.push(menu.path)}>
                <menu.icon className={`shrink-0 ${isCollapsed ? "w-5 h-5" : "w-4 h-4"} ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                {!isCollapsed && <h2 className="text-sm font-medium whitespace-nowrap">{menu.name}</h2>}
              </div>
            );
          })}
        </div>
      </div>

      {!isCollapsed && !isPremium && (
        <div className="p-4 mt-auto animate-in fade-in duration-300">
          <div className="p-3 bg-secondary/30 rounded-md border border-border/50 space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              <span>Usage</span>
              <span className="text-foreground">{totalCourse} / 5</span>
            </div>
            <Progress value={(totalCourse / 5) * 100} className="h-1 rounded-full bg-secondary overflow-hidden" />
            <Link href={"/dashboard/upgrade"} className="block text-center text-[10px] font-bold text-primary hover:underline underline-offset-4 tracking-wide pt-1">
              UPGRADE PLAN
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
