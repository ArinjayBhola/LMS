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
    <div className="mt-6 flex flex-col items-center w-full animate-in slide-in-from-right duration-300">
      <h2 className="text-foreground text-xl font-medium mb-4">Enter topic or paste the content</h2>
      <Textarea
        placeholder="Start writing here..."
        className="w-full md:w-3/4 max-w-2xl min-h-[150px] text-lg bg-background/50"
        onChange={(e) => setTopic(e.target.value)}
      />
      <h2 className="mt-10 mb-4 text-foreground text-xl font-medium">Select difficulty level</h2>
      <Select onValueChange={(value) => setDifficultyLevel(value)}>
        <SelectTrigger className="w-full md:w-3/4 max-w-2xl">
          <SelectValue placeholder="Select Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Easy">Easy</SelectItem>
          <SelectItem value="Moderate">Moderate</SelectItem>
          <SelectItem value="Hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TopicInput;
