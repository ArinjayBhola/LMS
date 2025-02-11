"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseIntroCard from "./_components/CourseIntroCard";
import StudyMaterialSection from "./_components/StudyMaterialSection";
import ChaptersList from "./_components/ChaptersList";
import { useSelector } from "react-redux";

interface CourseDataType {
  courseData: {
    isLoading: boolean;
    isError: boolean;
    data: [];
  };
}

const Course = () => {
  const { courseId } = useParams() as { courseId: string };
  const { data } = useSelector((store: CourseDataType) => store.courseData);
  const id = useSelector((store: { course: { courseId: string } }) => store.course.courseId);
  const router = useRouter();
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
  }, [id]);
  const getCourse = async () => {
    if (id) {
      const filterCourse = data.filter((course: { courseId: string }) => course?.courseId === courseId);
      setCourse(filterCourse[0]);
    } else {
      router.push("/dashboard");
    }
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
