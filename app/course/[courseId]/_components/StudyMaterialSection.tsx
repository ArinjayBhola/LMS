import React, { useEffect, useState } from "react";
import MaterialCardItem from "./MaterialCardItem";
import axios from "axios";

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
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const result = await axios.post("/api/study-type", { courseId, studyType: "ALL" });
    setStudyTypeContent(result.data);
  };

  const list = [
    {
      name: "Notes/ Chapters",
      description: "Read  notes and chapters",
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
      description: "Great way to test your knwoledge",
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
            refreshData={getNotes}
          />
        ))}
      </div>
    </div>
  );
};

export default StudyMaterialSection;
