"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StepProgress from "../_components/StepProgress";

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
  console.log(notes);
  return (
    notes && (
      <div>
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
