"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseIntroCard from "./_components/CourseIntroCard";
import StudyMaterialSection from "./_components/StudyMaterialSection";
import ChaptersList from "./_components/ChaptersList";

const Course = () => {
  const { courseId } = useParams() as { courseId: string };
  const [course, setCourse] = useState({
    courseId: "",
    courseLayout: {
      courseTitle: "",
      courseSummary: "",
      chapters: [],
    },
  });
  useEffect(() => {
    getCourse();
  }, []);
  const getCourse = async () => {
    const result = await axios.get(`/api/courses?courseId=${courseId}`);
    setCourse(result.data.result);
  };
  return (
    <div>
      <div>
        <CourseIntroCard course={course} />
        <StudyMaterialSection
          courseId={courseId}
          course={course}
        />
        <ChaptersList course={course} />
      </div>
    </div>
  );
};

export default Course;
