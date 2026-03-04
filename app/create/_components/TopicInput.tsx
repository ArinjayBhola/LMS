import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import React from "react";

const TopicInput = ({
  setTopic,
  setDifficultyLevel,
}: {
  setTopic: (value: string) => void;
  setDifficultyLevel: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col items-center w-full animate-in fade-in duration-500">
      <div className="w-full space-y-8">
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
