"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Course, fetchCourse } from "@/redux/slice/getCourseList";
import { AppDispatch, RootState } from "@/redux/appStore";

const CourseList = () => {
  const { user } = useUser();
  const dispatch = useDispatch<AppDispatch>();

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const { data, isLoading } = useSelector((store: RootState) => store.courseData);

  const [courseList, setCourseList] = useState<Course[]>([]);

  useEffect(() => {
    if (data) {
      setCourseList(data);
    }
  }, [data]);

  const getCourseData = () => {
    if (userEmail && (!data || data.length === 0)) {
      dispatch(fetchCourse(userEmail));
    }
  };

  useEffect(() => {
    if (userEmail && (!data || data.length === 0)) {
      getCourseData();
    }
  }, [dispatch, userEmail, data]);

  return (
    <div className="mt-10 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-bold text-3xl text-foreground tracking-tight">Your Study Material</h2>
          <p className="text-muted-foreground mt-1">Manage and review your AI-generated courses.</p>
        </div>
        <Button
          variant={"outline"}
          className="border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all shadow-sm"
          onClick={() => dispatch(fetchCourse(userEmail))}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh List
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Skeleton Loading State
          [1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="h-[280px] w-full bg-muted/30 rounded-xl animate-pulse border border-border/50" />
          ))
        ) : courseList?.length === 0 ? (
           <div className="col-span-full flex flex-col items-center justify-center space-y-6 py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
            <div className="p-6 bg-background rounded-full shadow-sm">
              <RefreshCw className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-2xl font-bold text-foreground">No Courses Found</p>
              <p className="text-muted-foreground max-w-md mx-auto">
                You haven&apos;t created any courses yet. Start by creating a new course to generate study materials.
              </p>
            </div>
          </div>
        ) : (
          courseList?.map((course, index) => (
            <CourseCard
              course={course}
              key={index}
              createdBy={userEmail}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CourseList;
