import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Youtube, BookOpen } from "lucide-react";

const TopicInput = ({
  setTopic,
  setDifficultyLevel,
  setYoutubeUrl,
}: {
  setTopic: (value: string) => void;
  setDifficultyLevel: (value: string) => void;
  setYoutubeUrl?: (value: string) => void;
}) => {
  const [inputMode, setInputMode] = useState<"topic" | "youtube">("topic");

  return (
    <div className="flex flex-col items-center w-full animate-in fade-in duration-500">
      <div className="w-full space-y-8">
        {/* Toggle between Topic and YouTube */}
        <div className="flex items-center justify-center gap-2 p-1 bg-muted/50 rounded-lg w-fit mx-auto">
          <button
            onClick={() => {
              setInputMode("topic");
              setYoutubeUrl?.("");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              inputMode === "topic"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Enter Topic
          </button>
          <button
            onClick={() => {
              setInputMode("youtube");
              setTopic("");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              inputMode === "youtube"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Youtube className="h-4 w-4 text-red-500" />
            YouTube Video
          </button>
        </div>

        {inputMode === "topic" ? (
          <div className="space-y-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
              Focus Topic or Material
            </label>
            <Textarea
              placeholder="What would you like to learn today? Enter a topic or paste a syllabus..."
              className="w-full min-h-[150px] text-base bg-muted/30 border-border rounded-lg p-5 focus:ring-primary focus:border-primary transition-all font-medium placeholder:text-muted-foreground/40 resize-none"
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
        ) : (
          <div className="space-y-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
              YouTube Video URL
            </label>
            <div className="relative">
              <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
              <Input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full h-14 text-base bg-muted/30 border-border rounded-lg pl-12 pr-5 focus:ring-primary focus:border-primary transition-all font-medium placeholder:text-muted-foreground/40"
                onChange={(e) => setYoutubeUrl?.(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground ml-1">
              We&apos;ll extract the video transcript and generate a complete course from it.
            </p>
          </div>
        )}

        <div className="space-y-3">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">
            Difficulty Level
          </label>
          <Select onValueChange={(value) => setDifficultyLevel(value)}>
            <SelectTrigger className="w-full h-12 bg-muted/30 border-border rounded-lg px-5 font-medium">
              <SelectValue placeholder="How much of a challenge?" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-border shadow-md">
              <SelectItem value="Easy" className="py-2.5">Fundamental (Easy)</SelectItem>
              <SelectItem value="Moderate" className="py-2.5">Intermediate (Medium)</SelectItem>
              <SelectItem value="Hard" className="py-2.5">Professional (Hard)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TopicInput;
