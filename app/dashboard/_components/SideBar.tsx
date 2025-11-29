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
    <div className="h-full shadow-md p-5 bg-card border-r flex flex-col">
      <div className="flex gap-2 items-center">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={40}
          height={40}
        />
        <h2 className="font-bold text-2xl text-foreground">Easy Study</h2>
      </div>

      <div className="mt-10 flex-1">
        {isPremium ? (
          <Link
            href={"/create"}
            className="w-full">
            <Button className="w-full">+ Create New</Button>
          </Link>
        ) : totalCourse >= 5 ? (
          <div className="p-3 bg-muted/50 rounded-lg">
            <h2 className="font-semibold text-xl text-foreground">Limit Reached</h2>
            <p className="text-sm text-muted-foreground">Upgrade to create more courses</p>
          </div>
        ) : (
          <Link
            href={"/create"}
            className="w-full">
            <Button className="w-full">+ Create New</Button>
          </Link>
        )}

        <div className="mt-5 space-y-2">
          {menuList?.map((menu, index) => {
            return (
              <div
                key={index}
                className={`flex gap-5 items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  pathname === menu.path 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground text-foreground"
                }`}
                onClick={() => router.push(menu.path)}>
                <menu.icon className={pathname === menu.path ? "text-primary-foreground" : ""} />
                <h2>{menu.name}</h2>
              </div>
            );
          })}
        </div>
      </div>
      {isPremium === false && (
        <div className="border p-3 bg-muted rounded-lg w-full mt-auto">
          <h2 className="text-lg mb-2 text-foreground">Available Credits: {5 - totalCourse}</h2>
          <Progress value={(totalCourse / 5) * 100} className="h-2" />
          <h2 className="text-sm text-muted-foreground mt-2">{Number(totalCourse)} out of 5 credits used</h2>
          <Link
            href={"/dashboard/upgrade"}
            className="text-primary text-xs mt-3 block hover:underline">
            Upgrade to create more
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideBar;
