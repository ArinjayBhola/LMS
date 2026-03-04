"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import CourseIntroCard from "./_components/CourseIntroCard";
import StudyMaterialSection from "./_components/StudyMaterialSection";
import ChaptersList from "./_components/ChaptersList";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/appStore";
import { fetchCourseContent } from "@/redux/slice/courseContentSlice";
import { fetchCourse } from "@/redux/slice/getCourseList";
import { useUser } from "@clerk/nextjs";
import { CourseIntroSkeleton, StudyMaterialSkeleton, ChapterListSkeleton } from "@/components/SkeletonLoaders";

interface CourseDataType {
  courseData: {
    isLoading: boolean;
    isError: boolean;
    data: [];
  };
}

interface CourseType {
  courseId: string;
  courseLayout: {
    courseTitle: string;
    courseSummary: string;
    chapters: [];
  };
}

const Course = () => {
  const { courseId } = useParams() as { courseId: string };
  const { data } = useSelector((store: CourseDataType) => store.courseData);
  const id = useSelector((store: { course: { courseId: string } }) => store.course.courseId);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [course, setCourse] = useState<CourseType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const getCourse = useCallback(async () => {
    if (data && data.length > 0) {
      const filterCourse = data.filter((c: { courseId: string }) => c?.courseId === courseId);
      if (filterCourse.length > 0) {
        setCourse(filterCourse[0]);
        setIsLoading(false);
      } else {
        // Only redirect if we have data but it's not the one we want
        router.push("/dashboard");
      }
    }
  }, [data, courseId, router]);

  useEffect(() => {
    if (userEmail && data.length === 0) {
      dispatch(fetchCourse(userEmail));
    }
  }, [userEmail, data.length, dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      getCourse();
    }
  }, [data, getCourse]);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseContent(courseId));
    }
  }, [courseId, dispatch]);

  const cachedContent = useSelector((state: RootState) => state.courseContent.cache[courseId]);
  const studyTypeContent = cachedContent?.data || {};

  if (isLoading || !course) {
    return (
      <div>
        <CourseIntroSkeleton />
        <StudyMaterialSkeleton />
        <ChapterListSkeleton />
      </div>
    );
  }

  return (
    <div>
      <div>
        <CourseIntroCard course={course} studyTypeContent={studyTypeContent} />
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

