import { Button } from "@/components/ui/button";
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
  [key: string]: { length: number; finished?: boolean }[];
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
  const dispatch = useDispatch();
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
    <div className={`border shadow-md rounded-lg p-5 flex flex-col items-center ${!isContentReady && "grayscale"}`}>
      <h2
        className={`p-1 px-2 text-white rounded-full text-[15px] mb-3 ${
          isContentReady ? "bg-green-500" : "bg-gray-300 text-black"
        }`}>
        {isContentReady ? "Ready" : "Not Ready"}
      </h2>

      <Image
        src={item.icon}
        alt={item.name}
        width={50}
        height={50}
      />
      <h2 className="font-medium mt-3">{item.name}</h2>
      <p className="text-gray-500 text-sm text-center">{item.description}</p>
      {!isContentReady ? (
        <Button
          className="mt-3 w-full"
          variant={"outline"}
          onClick={generateContent}
          disabled={check}>
          {loading ? <Loader2 className="animate-spin" /> : "Generate"}
        </Button>
      ) : (
        <Link href={`/course/${course?.courseId}/${item.path}`}>
          <Button
            className="mt-3 w-full"
            variant={"outline"}
            onClick={() => {}}>
            View
          </Button>
        </Link>
      )}
    </div>
  );
};

export default MaterialCardItem;
