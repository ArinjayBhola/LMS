import React, { useEffect, useState } from "react";
import MaterialCardItem from "./MaterialCardItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseContent } from "@/redux/slice/courseContentSlice";
import { AppDispatch, RootState } from "@/redux/appStore";

interface StudyTypeContent {
  [key: string]: { length: number };
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

const StudyMaterialSection = ({ courseId, course }: { courseId: string; course: Course }) => {
  const [studyTypeContent, setStudyTypeContent] = useState<StudyTypeContent>({});
  const dispatch = useDispatch<AppDispatch>();

  // Access the cache structure correctly
  const cachedContent = useSelector((state: RootState) => state.courseContent.cache[courseId]);
  const courseContent = cachedContent?.data || {};

  useEffect(() => {
    if (!cachedContent) {
      dispatch(fetchCourseContent(courseId));
    } else if (cachedContent.data) {
      setStudyTypeContent(cachedContent.data as unknown as StudyTypeContent);
    }
  }, [dispatch, courseId, cachedContent]);

  const MaterialList = [
    {
      name: "Notes/ Chapters",
      description: "Read notes and chapters",
      icon: "/notes.png",
      path: "/notes",
      type: "notes",
    },
    {
      name: "Flashcard",
      description: "Flashcard help to remember the concepts",
      icon: "/flashcard.png",
      path: "/flashcard",
      type: "flashcard",
    },
    {
      name: "Quiz",
      description: "Great way to test your knowledge",
      icon: "/quiz.png",
      path: "/quiz",
      type: "quiz",
    },
    {
      name: "Question/Answer",
      description: "Help to practice your learning",
      icon: "/qa.png",
      path: "/qa",
      type: "qa",
    },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-base font-bold text-foreground mb-4">
        Study Toolkit
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MaterialList.map((item, index) => (
          <MaterialCardItem
            item={item}
            key={index}
            studyTypeContent={studyTypeContent}
            course={course}
          />
        ))}
      </div>
    </div>
  );
};

export default StudyMaterialSection;
