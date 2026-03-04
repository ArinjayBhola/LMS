import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Note } from "../notes/page";
import { useDispatch } from "react-redux";
import { fetchCourseContent } from "@/redux/slice/courseContentSlice";
import { AppDispatch } from "@/redux/appStore";
import { toast } from "sonner";

const StepProgress = ({
  stepCount,
  setStepCount,
  data,
  courseId,
  studyType,
  isFinished = false,
}: {
  stepCount: number;
  setStepCount: (value: number) => void;
  data: any[] | undefined;
  courseId: string | string[] | undefined;
  studyType: string;
  isFinished?: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [flashcardData, setFlashcardData] = useState<Note[] | string[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const updateFinishStatus = async () => {
    setLoading(true);
    try {
      const id = Array.isArray(courseId) ? courseId[0] : courseId;
      await axios.patch("/api/course-finish-status", {
        courseId: id,
        studyType: studyType,
      });
      toast.success("Progress saved!");
      dispatch(fetchCourseContent(id as string));
      router.push(`/course/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
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
    <div className="flex flex-col md:flex-row gap-6 items-center w-full relative">
      <div className="flex gap-4 items-center w-full">
        {studyType !== "Flashcard" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStepCount(stepCount - 1)}
            disabled={stepCount === 0}
            className="rounded-lg font-medium transition-all active:scale-95 disabled:opacity-30 shrink-0"
          >
            Prev
          </Button>
        )}

        <div className="flex flex-1 gap-1.5">
          {(studyType === "Flashcard" ? flashcardData : data)?.map((_, index: number) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                index < stepCount 
                  ? "bg-primary" 
                  : index === stepCount 
                    ? "bg-primary/30" 
                    : "bg-muted"
              }`}
            />
          ))}
        </div>

        {studyType !== "Flashcard" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStepCount(stepCount + 1)}
            disabled={stepCount === (data?.length || 0) - 1}
            className="rounded-lg font-medium transition-all active:scale-95 disabled:opacity-30 shrink-0"
          >
            Next
          </Button>
        )}
      </div>

      {stepCount === (data?.length || 0) - 1 && !isFinished && (
        <div className="mt-8 md:mt-0 md:ml-4 flex items-center shrink-0">
          <Button
            className="bg-primary text-white font-bold px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all text-sm"
            onClick={updateFinishStatus}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
            Finish Course
          </Button>
        </div>
      )}
    </div>
  );
};

export default StepProgress;
