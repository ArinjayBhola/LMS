"use client";

import React, { useState } from "react";

const QuizCardItem = ({ quiz, userSelectedOption }) => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    quiz && (
      <div className="mt-10 p-5">
        <h2 className="font-medium text-3xl text-center">{quiz.question}</h2>
        <div className="grid grid-cols-2 gap-5 mt-10">
          {quiz?.options.map((option, index) => (
            <h2
              onClick={() => {
                setSelectedOption(option);
                userSelectedOption(option);
              }}
              key={index}
              className={`w-full border rounded-full p-3 text-center text-lg px-4 hover:bg-gray-200 cursor-pointer hover:shadow-lg shadow-lg ${
                selectedOption === option && "bg-primary text-white hover:bg-primary"
              }`}>
              {option}
            </h2>
          ))}
        </div>
      </div>
    )
  );
};

export default QuizCardItem;
