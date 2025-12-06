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
    <div className="mt-8">
      <h2 className="font-bold text-2xl text-foreground mb-5">Course Chapters</h2>
      <div className="space-y-4">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="flex items-start gap-5 p-5 border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 rounded-xl bg-card cursor-pointer group">
            <div className="text-3xl p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
              {chapter?.emojiIcon || chapter?.emoji || getEmoji(chapter?.chapterTitle)}
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {chapter?.emojiIcon || chapter?.emoji ? chapter?.chapterTitle : removeEmoji(chapter?.chapterTitle)}
              </h2>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{chapter?.chapterSummary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChaptersList;
