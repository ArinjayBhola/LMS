"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface Item {
  icon: string;
  name: string;
  description: string;
  type: string;
  path: string;
}

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
  const [isContentReady, setIsContentReady] = useState<boolean>(studyTypeContent?.[item.type] != null);

  const generateContent = async () => {
    toast("Generating content");
    setLoading(true);

    let chapters = "";
    course?.courseLayout?.chapters.forEach((chapter) => {
      chapters = (chapter.course_title || chapter.chapterTitle) + "," + chapters;
    });

    await axios.post("/api/study-type-content", {
      courseId: course?.courseId,
      type: item.name,
      chapters: chapters,
    });

    const result = await axios.post("/api/study-type", { courseId: course?.courseId, studyType: "ALL" });
    console.log(result);

    setIsContentReady(true);

    setLoading(false);
    toast("Your content is ready to view");
  };

  useEffect(() => {
    setIsContentReady(studyTypeContent?.[item.type] != null);
  }, [studyTypeContent, item.type]);
  const questionAnswerButton = item.name;
  const check = questionAnswerButton === "Question/Answer";

  return (
    <div className={`border shadow-md rounded-lg p-5 flex flex-col items-center ${!isContentReady && "grayscale"} `}>
      <h2
        className={`p-1 px-2 text-white rounded-full text-[15px] mb-3 ${
          isContentReady ? "bg-green-500" : "grayscale"
        } `}>
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
          {loading && <RefreshCcw className="animate-spin" />}
          Generate
        </Button>
      ) : (
        <Link href={`/course/${course?.courseId}/${item.path}`}>
          <Button
            className="mt-3 w-full"
            variant={"outline"}>
            View
          </Button>
        </Link>
      )}
    </div>
  );
};

export default MaterialCardItem;
