"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Course, fetchCourse, forceFetchCourse } from "@/redux/slice/getCourseList";
import { AppDispatch, RootState } from "@/redux/appStore";
import { CourseListSkeleton } from "@/components/SkeletonLoaders";

const CourseList = () => {
  const { user } = useUser();
  const dispatch = useDispatch<AppDispatch>();

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const { data, isLoading } = useSelector((store: RootState) => store.courseData);

  const [courseList, setCourseList] = useState<Course[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (data) {
      setCourseList(data);
    }
  }, [data]);

  const getCourseData = () => {
    if (userEmail) {
      // fetchCourse will automatically check cache freshness
      dispatch(fetchCourse(userEmail));
    }
  };

  const handleRefresh = async () => {
    if (userEmail) {
      setIsRefreshing(true);
      // Force fetch bypasses cache
      await dispatch(forceFetchCourse(userEmail));
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      getCourseData();
    }
  }, [userEmail]);

  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl flex justify-between items-center text-foreground">
        Your Study Material
        <Button
          variant={"outline"}
          className="border-primary text-primary hover:bg-primary/10"
          onClick={handleRefresh}
          disabled={isRefreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} /> 
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </h2>

      {isLoading ? (
        <CourseListSkeleton count={6} />
      ) : courseList?.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-5">
          <div className="col-span-full flex flex-col items-center justify-center space-y-4 mt-8">
            <p className="text-xl font-semibold text-foreground">No Courses Found</p>
            <p className="text-base text-muted-foreground">Create a new course to get started.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-5">
          {courseList?.map((course, index) => (
            <CourseCard
              course={course}
              key={index}
              createdBy={userEmail}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;

