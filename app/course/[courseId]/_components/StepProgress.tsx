import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Note } from "../notes/page";
import { useDispatch } from "react-redux";
import { fetchCourseContent } from "@/redux/slice/courseContentSlice";
import { AppDispatch } from "@/redux/appStore";

const StepProgress = ({
  stepCount,
  setStepCount,
  data,
  courseId,
  studyType,
}: {
  stepCount: number;
  setStepCount: (value: number) => void;
  data: Note[] | string[] | undefined;
  courseId: string | string[] | undefined;
  studyType: string;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [flashcardData, setFlashcardData] = useState<Note[] | string[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const updateFinishStatus = async () => {
    setLoading(true);
    try {
      await axios.patch("/api/course-finish-status", {
        courseId: courseId,
        studyType: studyType,
      });
      dispatch(fetchCourseContent(courseId as string));
      router.push(`/course/${courseId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studyType === "Flashcard" && data) {
      const newData = data.slice(0, -1);
      setFlashcardData(newData);
    }
  }, [studyType, data]);

  return (
    <div className="flex gap-5 items-center">
      {studyType === "Flashcard" ? (
        ""
      ) : (
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setStepCount(stepCount - 1)}
          disabled={stepCount === 0}>
          Previous
        </Button>
      )}

      {studyType === "Flashcard"
        ? flashcardData &&
          flashcardData?.map((_, index: number) => (
            <div
              key={index}
              className={`w-full h-2 rounded-full ${index < stepCount ? "bg-primary" : "bg-gray-200"}`}></div>
          ))
        : data &&
          data?.map((_, index: number) => (
            <div
              key={index}
              className={`w-full h-2 rounded-full ${index < stepCount ? "bg-primary" : "bg-gray-200"}`}></div>
          ))}

      {studyType === "Flashcard" ? (
        ""
      ) : (
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setStepCount(stepCount + 1)}
          disabled={stepCount === data?.length}>
          Next
        </Button>
      )}

      {stepCount === data?.length && (
        <div className="absolute top-52 left-1/2 flex items-center gap-10 flex-col justify-center">
          <h2>End of {studyType}</h2>
          <Button
            variant={"default"}
            size={"default"}
            onClick={updateFinishStatus}>
            {loading ? <Loader2 className="animate-spin" /> : "Finish"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default StepProgress;
