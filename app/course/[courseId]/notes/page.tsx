"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StepProgress from "../_components/StepProgress";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

export interface Note {
  notes: string;
}

const ViewNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [stepCount, setStepCount] = useState(0);
  const { courseId } = useParams();
  const router = useRouter();

  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = async () => {
    const result = await axios.post("/api/study-type", { courseId, studyType: "notes" });
    setNotes(result.data);
  };
  return (
    notes && (
      <div className="min-h-screen bg-background p-6 md:p-12 animate-in fade-in duration-500">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Button 
                variant="outline"
                size="sm"
                onClick={() => router.back()} 
                className="rounded-lg font-semibold"
            >
              <MoveLeft className="mr-2 h-4 w-4"/> Back
            </Button>
            <div className="hidden md:block">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Study Mode: <span className="text-primary">Notes</span></h2>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 md:p-10 shadow-sm relative overflow-hidden">
            <div className="mb-10">
              <StepProgress
                data={notes}
                stepCount={stepCount}
                setStepCount={(value: number) => setStepCount(value)}
                courseId={courseId as string}
                studyType="Notes"
                isFinished={notes?.[0] as any ? (notes[0] as any).finished : false}
              />
            </div>

            <div className="mt-8">
              <div
                className="prose prose-slate dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight 
                prose-p:text-base prose-p:leading-relaxed prose-p:text-foreground/90
                prose-strong:text-primary prose-strong:font-bold
                prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                animate-in fade-in duration-500"
                dangerouslySetInnerHTML={{ __html: notes[stepCount]?.notes }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewNotes;
