import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

interface Course {
  courseLayout: {
    courseTitle: string;
    courseSummary: string;
    chapters: string[];
  };
}

const CourseIntroCard = ({ course, studyTypeContent }: { course: any; studyTypeContent: any }) => {
  const notesCount = studyTypeContent?.notes?.length || 0;
  const finishedCount = studyTypeContent?.notes?.filter((n: any) => n.finished).length || 0;
  const percentage = notesCount > 0 ? (finishedCount / notesCount) * 100 : 0;

  return (
    <div className="bg-card border border-border/60 p-6 rounded-lg shadow-sm animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="bg-primary/10 p-2.5 rounded-md text-primary shrink-0">
          <BookOpen className="w-6 h-6" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="space-y-1.5">
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight leading-tight">
              {course?.courseLayout?.courseTitle}
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {course?.courseLayout?.courseSummary}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 pt-1">
            <div className="w-full md:w-48 space-y-1.5">
               <div className="flex justify-between text-[10px] font-bold text-muted-foreground tracking-tight">
                  <span className="uppercase">Progress</span>
                  <span>{Math.round(percentage)}%</span>
               </div>
               <Progress
                  value={percentage}
                  className="h-1 bg-secondary overflow-hidden"
               />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-md border border-border/50">
                 {course?.courseLayout?.chapters?.length} Chapters
              </span>
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-md border border-primary/10">
                 {finishedCount} / {notesCount} Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIntroCard;
