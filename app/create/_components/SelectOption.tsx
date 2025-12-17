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
    <div className="animate-in slide-in-from-bottom duration-500">
      <h2 className="text-center mb-6 text-lg text-muted-foreground">For which you want to create your personal study material?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-5">
        {options.map((option, index) => {
          const isSelected = option.name === selectedOption;
          return (
            <div
              key={index}
              className={`p-6 flex flex-col items-center justify-center border rounded-2xl cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                isSelected 
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105" 
                  : "border-transparent bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-background/80 shadow-sm"
              }`}
              onClick={() => {
                setSelectedOption(option.name);
                selectedStudyType(option.name);
              }}>
              <div className={`p-2 rounded-full mb-3 transition-colors ${isSelected ? "bg-primary/20" : "bg-transparent"}`}>
                <Image
                  src={option.icon}
                  alt={option.name}
                  width={60}
                  height={60}
                  className="drop-shadow-sm"
                />
              </div>
              <h2 className={`text-sm font-semibold mt-2 ${isSelected ? "text-primary" : "text-input-foreground"}`}>{option.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectOption;
