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
      <div>
        <Button onClick={() => router.back()}><MoveLeft/> Back</Button>
        <div>
          <StepProgress
            data={notes}
            stepCount={stepCount}
            setStepCount={(value: number) => setStepCount(value)}
            courseId={courseId}
            studyType="Notes"
          />
        </div>

        <div className="mt-10">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: notes[stepCount]?.notes }}
          />
        </div>
      </div>
    )
  );
};

export default ViewNotes;
