"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

const ChaptersList = ({ course }: { course: any }) => {
  return (
    <div className="mt-10 bg-card border border-border/60 rounded-lg p-6 shadow-sm">
      <h2 className="text-base font-bold text-foreground mb-4">
        Course Curriculum
      </h2>
      
      <div className="space-y-2">
        {course?.courseLayout?.chapters.map((chapter: any, index: number) => (
          <div 
            key={index} 
            className="flex items-center gap-4 p-3 rounded-md border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-default"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center font-bold text-primary text-sm">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-foreground tracking-tight truncate">
                {chapter?.chapterTitle || chapter?.title}
              </h3>
              <p className="text-muted-foreground text-[11px] leading-tight truncate">
                {chapter?.chapterSummary || chapter?.summary}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-background rounded border border-border/60 text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
               <CheckCircle2 className="w-3 h-3 text-primary/60" /> Ready
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChaptersList;
