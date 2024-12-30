import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";
import { RefreshCw } from "lucide-react";

interface Course {
  title: string;
  status: string;
  courseLayout: {
    title: string;
    courseSummary: string;
  };
}

const CourseCard = ({ course }: { course: Course }) => {
  console.log(course);
  return (
    <div className="border rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center">
        <Image
          src={"/knowledge.png"}
          alt="other"
          width={50}
          height={50}
        />
        <h2 className="text-[10px] rounded-full p-1 px-2 bg-primary text-white">Date</h2>
      </div>
      <h2 className="mt-3 font-medium text-lg">{course?.courseLayout?.title}</h2>
      <p className="text-xs line-clamp-2 text-gray-500 mt-2">{course?.courseLayout?.courseSummary}</p>

      <div className="mt-3">
        <Progress value={0} />
      </div>

      <div className="mt-3 flex justify-end">
        {course.status === "Generating" ? (
          <h2 className="text-sm p-1 px-2 rounded-full bg-gray-400 text-white flex gap-2 items-center">
            <RefreshCw className="h-5 w-5" /> Generating...
          </h2>
        ) : (
          <Button>View</Button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
