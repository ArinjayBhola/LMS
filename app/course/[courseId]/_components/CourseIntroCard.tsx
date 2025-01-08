import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

interface Course {
  courseLayout: {
    courseTitle: string;
    courseSummary: string;
    chapters: string[];
  };
}

const CourseIntroCard = ({ course }: { course: Course }) => {
  const selector = useSelector((app: { course: { course: { key: boolean } } }) => app.course.course);
  const value = Object.values(selector);
  const trueCount = value?.filter((item) => item === true).length;
  const percentage = (trueCount / value.length) * 100;
  return (
    <div className="flex gap-5 items-center p-10 border shadow-md rounded-lg">
      <Image
        src={"/knowledge.png"}
        alt="Other"
        width={70}
        height={70}
      />
      <div>
        <h2 className="font-bold text-2xl">{course.courseLayout.courseTitle}</h2>
        <p>{course.courseLayout.courseSummary}</p>
        <Progress
          className="mt-3"
          value={percentage}
        />
        <h2 className="mt-3 text-lg text-primary">Total Chapter: {course.courseLayout.chapters.length}</h2>
      </div>
    </div>
  );
};

export default CourseIntroCard;
