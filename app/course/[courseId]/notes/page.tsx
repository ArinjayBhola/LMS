"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Note {
  notes: string;
}

const ViewNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [stepCount, setStepCount] = useState(0);
  const router = useRouter();
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
      <div>
        <div className="flex gap-5 items-center">
          {/* {stepCount == 0 ? (
            ""
          ) : ( */}
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => setStepCount(stepCount - 1)}
            disabled={stepCount == 0}>
            Previous
          </Button>
          {/* )} */}

          {notes.map((_, index) => (
            <div
              key={index}
              className={`w-full h-2 rounded-full ${index < stepCount ? "bg-primary" : "bg-gray-200"}`}></div>
          ))}
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => setStepCount(stepCount + 1)}
            disabled={notes.length === stepCount}>
            Next
          </Button>
        </div>

        <div className="mt-10">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: notes[stepCount]?.notes }}
          />

          {notes.length == stepCount && (
            <div className="flex items-center gap-10 flex-col justify-center">
              <h2>End of Notes</h2>
              <Button onClick={() => router.push(`/course/${courseId}`)}>Go to course page</Button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ViewNotes;
