"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/appStore";
import { useDispatch } from "react-redux";
import { setCourseId } from "@/redux/slice/courseSlice";

interface ChaptersListProps {
  course: any;
  notes?: any[];
}

const ChaptersList = ({ course, notes }: ChaptersListProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const isChapterReady = (index: number) => {
    return notes && notes.some(note => note.chapterId === index);
  };

  const handleChapterClick = (index: number) => {
    if (isChapterReady(index)) {
      dispatch(setCourseId(course.courseId));
      router.push(`/course/${course.courseId}/notes`);
    }
  };

  return (
    <div className="mt-10 bg-card border border-border/60 rounded-lg p-6 shadow-sm">
      <h2 className="text-base font-bold text-foreground mb-4">
        Course Curriculum
      </h2>
      
      <div className="space-y-2">
        {course?.courseLayout?.chapters.map((chapter: any, index: number) => {
          const ready = isChapterReady(index);
          return (
            <div 
              key={index} 
              onClick={() => handleChapterClick(index)}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                ready 
                  ? "border-primary/20 bg-primary/5 hover:bg-primary/10 cursor-pointer shadow-sm" 
                  : "border-border/50 bg-secondary/10 cursor-default"
              }`}
            >
              <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                ready ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {index + 1}
              </div>
              <div className="flex-1 min-w-0 py-1">
                <h3 className="font-bold text-sm text-foreground tracking-tight leading-snug mb-1">
                  {chapter?.chapterTitle || chapter?.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 md:line-clamp-none">
                  {chapter?.chapterSummary || chapter?.summary}
                </p>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                ready 
                  ? "bg-primary/10 text-primary border-primary/20" 
                  : "bg-muted text-muted-foreground border-border"
              }`}>
                {ready ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Ready</span>
                  </>
                ) : (
                  <span>Locked</span>
                )}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default ChaptersList;
