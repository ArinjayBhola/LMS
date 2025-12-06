"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StepProgress from "../_components/StepProgress";
import { Button } from "@/components/ui/button";

export interface Note {
  notes: string;
}

const ViewNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [stepCount, setStepCount] = useState(0);
  const { courseId } = useParams();

  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = async () => {
    const result = await axios.post("/api/study-type", { courseId, studyType: "notes" });
    setNotes(result.data);
  };
  return (
    notes && (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <StepProgress
            data={notes}
            stepCount={stepCount}
            setStepCount={(value: number) => setStepCount(value)}
            courseId={courseId}
            studyType="Notes"
          />
        </div>

        <div className="mt-10 bg-card border border-border/50 shadow-sm rounded-2xl p-8 md:p-12">
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 transition-colors"
            dangerouslySetInnerHTML={{ __html: notes[stepCount]?.notes }}
          />
          
          <div className="mt-12 flex justify-between items-center border-t pt-6">
             <Button 
               variant="outline" 
               disabled={stepCount === 0}
               onClick={() => setStepCount(stepCount - 1)}
             >
               Previous Chapter
             </Button>
             <Button 
               disabled={stepCount === notes.length - 1}
               onClick={() => setStepCount(stepCount + 1)}
             >
               Next Chapter
             </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewNotes;
