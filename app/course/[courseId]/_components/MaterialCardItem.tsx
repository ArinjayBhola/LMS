import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/redux/appStore";
import { fetchCourseContent } from "@/redux/slice/courseContentSlice";
import { setCourse } from "@/redux/slice/courseSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface Item {
  icon: string;
  name: string;
  description: string;
  type: string;
  path: string;
}

interface StudyTypeContent {
  notes?: { length: number; finished?: boolean }[];
  flashcard?: { finished?: boolean };
  quiz?: { finished?: boolean };
  [key: string]: { length?: number; finished?: boolean } | undefined;
}

interface Course {
  courseId: string;
  courseLayout: {
    chapters: {
      course_title: string;
      chapterTitle: string;
    }[];
  };
}

const MaterialCardItem = ({
  item,
  studyTypeContent,
  course,
}: {
  item: Item;
  studyTypeContent: StudyTypeContent;
  course: Course;
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isContentReady, setIsContentReady] = useState<boolean>(studyTypeContent?.[item.type] != null);

  const generateContent = async () => {
    toast("Generating content...");
    setLoading(true);
    if (item.name === "Notes/ Chapters") {
      await axios.post("/api/generate-notes", {
        course: course,
      });
    } else {
      let chapters = "";
      course?.courseLayout?.chapters.forEach((chapter) => {
        chapters = (chapter.course_title || chapter.chapterTitle) + "," + chapters;
      });

      await axios.post("/api/study-type-content", {
        courseId: course?.courseId,
        type: item.name,
        chapters: chapters,
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
    dispatch(fetchCourseContent(course?.courseId));

    setIsContentReady(true);
    setLoading(false);
    toast.success("Your content is ready to view");
  };

  useEffect(() => {
    const notes = studyTypeContent?.notes && studyTypeContent?.notes[0]?.finished;
    const flashcard = studyTypeContent?.flashcard && studyTypeContent?.flashcard?.finished;
    const quiz = studyTypeContent?.quiz && studyTypeContent?.quiz?.finished;
    dispatch(setCourse({ notes, flashcard, quiz }));
  }, [studyTypeContent, dispatch]);

  useEffect(() => {
    setIsContentReady(studyTypeContent?.[item.type] != null);
  }, [studyTypeContent, item.type]);

  const questionAnswerButton = item.name;
  const check = questionAnswerButton === "Question/Answer";

  return (
    <div className={`bg-card border border-border/60 rounded-lg p-5 flex flex-col items-center transition-colors duration-200 hover:border-primary/40 group relative overflow-hidden ${!isContentReady && "opacity-80"}`}>
      <div className="w-full flex justify-between items-center mb-6">
        <div className={`w-2 h-2 rounded-full ${isContentReady ? "bg-primary" : "bg-muted"}`} />
        <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
            isContentReady 
                ? "bg-primary/10 text-primary border-primary/20" 
                : "bg-muted text-muted-foreground border-border"
            }`}>
            {isContentReady ? "Ready" : "Locked"}
        </span>
      </div>

      <div className="mb-4 text-primary">
        <Image
            src={item.icon}
            alt={item.name}
            width={32}
            height={32}
            className="opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </div>
      
      <div className="text-center space-y-1 mb-6">
        <h2 className="font-bold text-sm text-foreground">{item.name}</h2>
        <p className="text-muted-foreground text-[11px] leading-relaxed px-1 line-clamp-2">{item.description}</p>
      </div>
      
      <div className="w-full mt-auto">
        {!isContentReady ? (
          <Button
            className="w-full h-9 text-[11px] font-bold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all active:scale-[0.98]"
            onClick={generateContent}
            disabled={check || loading}>
            {loading ? <Loader2 className="animate-spin mr-2 h-3.5 w-3.5" /> : null}
            {loading ? "Generating..." : "Unlock"}
          </Button>
        ) : (
          <Link href={`/course/${course?.courseId}${item.path}`} className="w-full">
            <Button
              className="w-full h-9 text-[11px] font-bold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all active:scale-[0.98]">
              Study
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MaterialCardItem;
