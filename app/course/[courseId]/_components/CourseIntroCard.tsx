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
    <div className="flex flex-col md:flex-row gap-8 items-center p-8 border border-border/50 shadow-lg rounded-2xl bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      
      <div className="relative z-10 shrink-0 p-4 bg-primary/10 rounded-2xl">
        <Image
          src={"/knowledge.png"}
          alt="Course Icon"
          width={80}
          height={80}
          className="object-contain drop-shadow-md"
        />
      </div>
      <div className="relative z-10 flex-1 space-y-4 w-full text-center md:text-left">
        <div>
          <h2 className="font-bold text-3xl text-foreground tracking-tight">{course.courseLayout.courseTitle}</h2>
          <p className="text-muted-foreground mt-2 text-lg leading-relaxed max-w-2xl">{course.courseLayout.courseSummary}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-muted-foreground">Course Progress</span>
            <span className="text-primary">{Math.round(percentage)}%</span>
          </div>
          <Progress
            className="h-3 rounded-full bg-muted"
            value={percentage}
          />
          <p className="text-sm text-muted-foreground mt-2">
            <span className="font-semibold text-foreground">{course.courseLayout.chapters.length}</span> Chapters • {trueCount} Completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseIntroCard;
