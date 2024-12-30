"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    axios
      .post("/api/courses", { createdBy: user?.primaryEmailAddress?.emailAddress })
      .then((res) => setCourseList(res.data.result));
  }, [user]);

  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl">Your Study Material</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
        {courseList.map((course, index) => (
          <CourseCard
            course={course}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
