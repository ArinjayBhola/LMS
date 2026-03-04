import Image from "next/image";
import React, { useState } from "react";

const SelectOption = ({ selectedStudyType }: { selectedStudyType: (value: string) => void }) => {
  const options = [
    {
      name: "Exam",
      icon: "/exam_1.png",
    },
    {
      name: "Job Interview",
      icon: "/job.png",
    },
    {
      name: "Practice",
      icon: "/practice.png",
    },
    {
      name: "Coding Prep",
      icon: "/code.png",
    },
    {
      name: "Other",
      icon: "/knowledge.png",
    },
  ];

  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="animate-in fade-in duration-500 py-4">
      <h3 className="text-center mb-10 text-xs font-bold text-muted-foreground uppercase tracking-wider">
        Select Study Goal
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {options.map((option, index) => {
          const isSelected = option.name === selectedOption;
          return (
            <div
              key={index}
              className={`p-6 flex flex-col items-center justify-center border rounded-xl cursor-pointer transition-all duration-300 group relative ${
                isSelected 
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                  : "border-border hover:border-primary/30 hover:bg-muted/50"
              }`}
              onClick={() => {
                setSelectedOption(option.name);
                selectedStudyType(option.name);
              }}>
              <div className={`p-3 rounded-lg mb-4 transition-all duration-300 ${isSelected ? "bg-primary/10" : "bg-muted/50 group-hover:bg-primary/5"}`}>
                <Image
                  src={option.icon}
                  alt={option.name}
                  width={40}
                  height={40}
                  className={`transition-all duration-300 ${isSelected ? "scale-110 filter brightness-110" : "grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0"}`}
                />
              </div>
              <h2 className={`text-xs font-semibold tracking-wide transition-colors ${isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                {option.name}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectOption;
