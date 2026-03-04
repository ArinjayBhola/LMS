"use client";

import React, { useState } from "react";

interface QuizCardItemProps {
  question: string;
  options: string[];
}

const QuizCardItem = ({
  quiz,
  userSelectedOption,
}: {
  quiz: QuizCardItemProps;
  userSelectedOption: (value: string) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    quiz && (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Question</span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
            {quiz.question}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quiz?.options.map((option, index) => {
            const isSelected = selectedOption === option;
            return (
              <button
                key={index}
                onClick={() => {
                  setSelectedOption(option);
                  userSelectedOption(option);
                }}
                className={`w-full p-5 text-left text-base font-semibold rounded-lg border transition-all duration-200 group relative overflow-hidden ${
                  isSelected 
                    ? "border-primary bg-primary/5 text-primary shadow-sm" 
                    : "border-border bg-secondary/20 text-muted-foreground hover:border-primary/40 hover:bg-secondary/40 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs transition-colors ${isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/10"}`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    )
  );
};

export default QuizCardItem;
