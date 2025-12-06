"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LayoutDashboard, Shield, UserCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/nextjs";
import { fetchUserData } from "@/redux/slice/userSlice";
import { AppDispatch, RootState } from "@/redux/appStore";

const SideBar = () => {
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
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
    {
      name: "Profile",
      icon: UserCircle,
      path: "/dashboard/profile",
    },
  ];
  return (
    <div className="h-full shadow-lg p-6 bg-card border-r flex flex-col transition-all duration-300">
      <div className="flex gap-3 items-center px-2">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={44}
          height={44}
          className="transition-transform hover:scale-110 duration-300"
        />
        <h2 className="font-bold text-2xl text-foreground tracking-tight">Easy Study</h2>
      </div>

      <div className="mt-10 flex-1 flex flex-col gap-6">
        <div className="px-2">
          {isPremium ? (
            <Link href={"/create"} className="w-full block">
              <Button className="w-full font-semibold shadow-md hover:shadow-lg transition-all" size="lg">+ Create New</Button>
            </Link>
          ) : totalCourse >= 5 ? (
            <div className="p-4 bg-muted/50 rounded-xl border border-muted">
              <h2 className="font-semibold text-lg text-foreground">Limit Reached</h2>
              <p className="text-sm text-muted-foreground mt-1">Upgrade to create more courses</p>
            </div>
          ) : (
            <Link href={"/create"} className="w-full block">
              <Button className="w-full font-semibold shadow-md hover:shadow-lg transition-all" size="lg">+ Create New</Button>
            </Link>
          )}
        </div>

        <div className="space-y-1">
          {menuList?.map((menu, index) => {
            const isActive = pathname === menu.path;
            return (
              <div
                key={index}
                className={`flex gap-4 items-center p-4 rounded-xl cursor-pointer transition-all duration-200 group ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md translate-x-1"
                    : "hover:bg-accent hover:text-accent-foreground text-muted-foreground hover:translate-x-1"
                }`}
                onClick={() => router.push(menu.path)}>
                <menu.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "text-primary-foreground" : ""}`} />
                <h2 className="font-medium text-base">{menu.name}</h2>
              </div>
            );
          })}
        </div>
      </div>
      
      {isPremium === false && (
        <div className="border border-border/50 p-5 bg-muted/30 rounded-xl w-full mt-auto backdrop-blur-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium text-foreground">Credits Used</h2>
            <span className="text-xs font-bold text-primary">{totalCourse} / 5</span>
          </div>
          <Progress value={(totalCourse / 5) * 100} className="h-2.5 rounded-full" />
          <p className="text-xs text-muted-foreground mt-3">
            Upgrade your plan for unlimited course creation.
          </p>
          <Link
            href={"/dashboard/upgrade"}
            className="text-primary text-sm font-semibold mt-3 block hover:underline">
            Upgrade Now →
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideBar;
