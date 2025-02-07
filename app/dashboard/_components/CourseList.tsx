"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCourse } from "@/redux/slice/courseSlice";

const CourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getCourseList();
  }, [user]);

  const getCourseList = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/courses", {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setCourseList(res.data.result);
      dispatch(setCourse(res.data.result.length));
    } catch (error) {
      console.error("Error fetching course list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        {courseList.length === 0 ? "No course found. Create New Course" : "Your Study Material"}
        <Button
          variant={"outline"}
          className="border-primary text-primary"
          onClick={getCourseList}>
          <RefreshCw /> Refresh
        </Button>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
        {!loading
          ? courseList.map((course, index) => (
              <CourseCard
                course={course}
                key={index}
                getCourseList={getCourseList}
              />
            ))
          : [1, 2, 3].map((item, index) => (
              <div
                className="h-56 w-full bg-slate-200 rounded-lg animate-pulse"
                key={index}></div>
            ))}
      </div>
    </div>
  );
};

export default CourseList;
