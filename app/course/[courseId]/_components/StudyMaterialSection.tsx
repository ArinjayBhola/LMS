import React, { useEffect, useState } from "react";
import MaterialCardItem from "./MaterialCardItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseContent } from "@/redux/slice/courseContentSlice";
import { AppDispatch } from "@/redux/appStore";

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

  const courseContent = useSelector(
    (state: { courseContent: { data: { [key: string]: StudyTypeContent } } }) =>
      state.courseContent.data[courseId] || {},
  );

  useEffect(() => {
    if (!courseContent || Object.keys(courseContent).length === 0) {
      dispatch(fetchCourseContent(courseId));
    } else {
      setStudyTypeContent(courseContent);
    }
  }, [dispatch, courseId, courseContent]);

  const list = [
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
    <div className="mt-5">
      <h2 className="font-medium text-xl">Study Material</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 mt-5 gap-5 m-3">
        {list.map((item, index) => (
          <MaterialCardItem
            key={index}
            item={item}
            studyTypeContent={studyTypeContent}
            course={course}
          />
        ))}
      </div>
    </div>
  );
};

export default StudyMaterialSection;
