"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/redux/appStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookOpen, Crown, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { email, name, isMember } = useSelector((state: RootState) => {
    const result = state?.userData?.data?.result;
    return result ? result : { email: "", name: "", isMember: false };
  });
  const totalCourses = useSelector((state: RootState) => state?.courseData?.data);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-8">My Profile</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* User Info Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {name ? getInitials(name) : "U"}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl text-center">{name || "User"}</CardTitle>
            <p className="text-sm text-muted-foreground text-center">{email}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{name}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>{email}</span>
            </div>
          </CardContent>
        </Card>

        {/* Stats & Actions */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCourses?.length || 0}</div>
                <p className="text-xs text-muted-foreground">Courses created</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Membership Status</CardTitle>
                <Crown className={`h-4 w-4 ${isMember ? "text-yellow-500" : "text-muted-foreground"}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isMember ? "Premium" : "Free"}</div>
                <p className="text-xs text-muted-foreground">
                  {isMember ? "Unlimited access" : "Basic plan"}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Link href="/create" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">
                  Create New Course
                </Button>
              </Link>
              {!isMember && (
                <Link href="/dashboard/upgrade" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10">
                    Upgrade to Premium
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
