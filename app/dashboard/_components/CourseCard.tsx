import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Link from "next/link";

interface Course {
  title: string;
  status: string;
  courseLayout: {
    courseTitle: string;
    courseSummary: string;
  };
  courseId: string;
  createdAt: string;
}

const CourseCard = ({ course }: { course: Course }) => {
  const date = (date: string) => {
    const dateString = new Date(date).toDateString().split(" ").slice(1).join(" ");
    return dateString;
  };

  return (
    <div className="border rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center">
        <Image
          src={"/knowledge.png"}
          alt="other"
          width={50}
          height={50}
        />
        <h2 className="text-[12px] rounded-full p-1 px-2 bg-primary text-white">{date(course.createdAt)}</h2>
      </div>
      <h2 className="mt-3 font-medium text-lg">{course?.courseLayout?.courseTitle}</h2>
      <p className="text-xs line-clamp-2 text-gray-500 mt-2">{course?.courseLayout?.courseSummary}</p>

      <div className="mt-3 flex justify-end">
        <Link href={`/course/${course.courseId}`}>
          <Button>View</Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
