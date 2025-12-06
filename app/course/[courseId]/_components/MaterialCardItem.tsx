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
    <div className={`group border border-border/50 shadow-sm hover:shadow-xl rounded-2xl p-6 flex flex-col items-center bg-card transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${!isContentReady && "grayscale opacity-80"}`}>
      {/* Status Badge */}
      <div className="absolute top-3 right-3">
        {isContentReady ? (
          <span className="flex h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
        ) : (
          <span className="flex h-3 w-3 rounded-full bg-gray-300"></span>
        )}
      </div>

      <div className="p-4 bg-primary/5 rounded-full mb-4 group-hover:bg-primary/10 transition-colors">
        <Image
          src={item.icon}
          alt={item.name}
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      
      <h2 className="font-bold text-lg text-foreground mt-2">{item.name}</h2>
      <p className="text-muted-foreground text-sm text-center mt-2 line-clamp-2 leading-relaxed">{item.description}</p>
      
      <div className="mt-auto w-full pt-4">
        {!isContentReady ? (
          <Button
            className="w-full font-semibold shadow-sm"
            variant={"outline"}
            onClick={generateContent}
            disabled={check || loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" /> Generating...
              </>
            ) : (
              "Generate Content"
            )}
          </Button>
        ) : (
          <Link href={`/course/${course?.courseId}/${item.path}`} className="w-full block">
            <Button
              className="w-full font-semibold shadow-sm group-hover:shadow-md transition-all"
              variant={"default"}
              onClick={() => {}}>
              View Content
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MaterialCardItem;
