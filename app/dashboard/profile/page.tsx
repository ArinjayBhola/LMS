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
        <Card className="md:col-span-1 glass-card border-none">
          <CardHeader className="flex flex-col items-center pb-2">
            <div className="p-1 rounded-full bg-gradient-to-tr from-primary to-purple-500 mb-4">
                <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src="" />
                <AvatarFallback className="text-3xl bg-background text-foreground font-bold">
                    {name ? getInitials(name) : "U"}
                </AvatarFallback>
                </Avatar>
            </div>
            <CardTitle className="text-xl text-center font-bold">{name || "User"}</CardTitle>
            <p className="text-sm text-muted-foreground text-center">{email}</p>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground bg-primary/5 p-3 rounded-lg">
              <User className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground/80">{name}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground bg-primary/5 p-3 rounded-lg">
              <Mail className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground/80">{email}</span>
            </div>
          </CardContent>
        </Card>

        {/* Stats & Actions */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="glass-card hover:border-primary/30 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <div className="p-2 bg-blue-500/10 rounded-full">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{totalCourses?.length || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Courses created to date</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover:border-yellow-500/30 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Membership Status</CardTitle>
                <div className={`p-2 rounded-full ${isMember ? "bg-yellow-500/10" : "bg-gray-500/10"}`}>
                    <Crown className={`h-4 w-4 ${isMember ? "text-yellow-500" : "text-muted-foreground"}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{isMember ? "Premium" : "Free"}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {isMember ? "Unlimited access active" : "Upgrade for more features"}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Link href="/create" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto shadow-lg shadow-primary/20">
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
