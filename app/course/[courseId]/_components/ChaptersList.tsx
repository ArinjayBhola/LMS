import React from "react";

interface Course {
  courseLayout: {
    chapters: {
      chapterTitle: string;
      chapterSummary: string;
      emoji: string;
      emojiIcon: string;
    }[];
  };
}

const ChaptersList = ({ course }: { course: Course }) => {
  const getEmoji = (chapter: string) => {
    const emoji = chapter.split(" ").pop();
    return emoji;
  };
  const removeEmoji = (chapter: string) => {
    const title = chapter.split(" ").slice(0, -1).join(" ");
    return title;
  };
  const chapters = course.courseLayout.chapters;
  return (
    <div className="mt-5">
      <h2 className="font-medium text-xl">Chapters</h2>
      <div className="mt-3">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="flex items-center gap-5 p-4 border shadow-md mb-2 rounded-lg cursor-pointer">
            <h2 className="text-2xl">{chapter?.emojiIcon || chapter?.emoji || getEmoji(chapter?.chapterTitle)}</h2>
            <div className="">
              <h2 className="font-medium text-lg">
                {chapter?.emojiIcon || chapter?.emoji ? chapter?.chapterTitle : removeEmoji(chapter?.chapterTitle)}
              </h2>
              <p className="text-gray-500 text-sm">{chapter?.chapterSummary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChaptersList;
