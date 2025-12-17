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

    await new Promise((resolve) => setTimeout(resolve, 7000));
    if (item.name === "Notes/ Chapters") {
      window.location.reload();
      dispatch(fetchCourseContent(course?.courseId));
    }
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
    <div className={`glass-card rounded-2xl p-6 flex flex-col items-center transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:border-primary/20 group ${!isContentReady && "opacity-80 grayscale-[0.5]"}`}>
      <div className="w-full flex justify-end mb-2">
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${
            isContentReady 
                ? "bg-green-500/10 text-green-600 border-green-500/20" 
                : "bg-muted text-muted-foreground border-border"
            }`}>
            {isContentReady ? "Ready" : "Not Ready"}
        </span>
      </div>

      <div className="p-4 bg-primary/5 rounded-full mb-4 group-hover:bg-primary/10 transition-colors">
        <Image
            src={item.icon}
            alt={item.name}
            width={60}
            height={60}
            className="drop-shadow-sm transition-transform group-hover:scale-110 duration-300"
        />
      </div>
      
      <h2 className="font-bold text-lg mt-2 text-center group-hover:text-primary transition-colors">{item.name}</h2>
      <p className="text-muted-foreground text-sm text-center mt-2 line-clamp-2 min-h-[2.5rem]">{item.description}</p>
      
      {!isContentReady ? (
        <Button
          className="mt-6 w-full shadow-lg"
          variant={"default"}
          onClick={generateContent}
          disabled={check || loading}>
          {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
          {loading ? "Generating..." : "Generate Content"}
        </Button>
      ) : (
        <Link href={`/course/${course?.courseId}/${item.path}`} className="w-full mt-6">
          <Button
            className="w-full shadow-primary/20 hover:shadow-primary/40"
            variant={"default"}>
            View Material
          </Button>
        </Link>
      )}
    </div>
  );
};

export default MaterialCardItem;
