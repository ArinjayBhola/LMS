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
    <div className="flex gap-6 items-center p-8 glass-card rounded-2xl mb-8 relative overflow-hidden">
      <div className="relative shrink-0">
        <Image
          src={"/knowledge.png"}
          alt="Other"
          width={80}
          height={80}
          className="drop-shadow-lg"
        />
      </div>
      <div className="flex-1 z-10">
        <h2 className="font-bold text-3xl text-foreground mb-2">{course.courseLayout.courseTitle}</h2>
        <p className="text-muted-foreground text-lg mb-4 max-w-2xl">{course.courseLayout.courseSummary}</p>
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-sm">
             <Progress
                value={percentage}
                className="h-2"
             />
          </div>
          <span className="text-sm font-medium text-muted-foreground">{Math.round(percentage)}% Complete</span>
        </div>
        <h2 className="mt-4 text-sm font-semibold text-primary/80 bg-primary/10 inline-block px-3 py-1 rounded-full border border-primary/20">
            {course.courseLayout.chapters.length} Chapters
        </h2>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent -z-10" />
    </div>
  );
};

export default CourseIntroCard;
