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
    <div className="mt-10 flex flex-col items-center w-screen">
      <h2>Enter topic or paste the content</h2>
      <Textarea
        placeholder="Start writing here"
        className="mt-2 w-1/2"
        onChange={(e) => setTopic(e.target.value)}
      />
      <h2 className="mt-7 mb-3">Select the difficulty level</h2>
      <Select onValueChange={(value) => setDifficultyLevel(value)}>
        <SelectTrigger className="w-1/2">
          <SelectValue placeholder="Difficulty level" />
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
