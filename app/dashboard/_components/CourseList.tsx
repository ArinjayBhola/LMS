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
    getCourseData();
  }, [dispatch, userEmail, data]);

  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Your Study Material
        <Button
          variant={"outline"}
          className="border-primary text-primary"
          onClick={() => dispatch(fetchCourse(userEmail))}>
          <RefreshCw /> Refresh
        </Button>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
        {isLoading
          ? [1, 2, 3].map((_, index) => (
              <div
                className="h-56 w-full bg-slate-200 rounded-lg animate-pulse"
                key={index}></div>
            ))
          : courseList?.map((course, index) => (
              <CourseCard
                course={course}
                key={index}
                createdBy={userEmail}
              />
            ))}
      </div>
    </div>
  );
};

export default CourseList;
