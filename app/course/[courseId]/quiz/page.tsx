"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StepProgress from "../_components/StepProgress";
import QuizCardItem from "../_components/QuizCardItem";

interface Question {
  correctAnswer: string;
}

const Quiz = () => {
  const [quiz, setQuiz] = useState();
  const [stepCount, setStepCount] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [correctAns, setCorrectAns] = useState<string | null>(null);
  const { courseId } = useParams();

  useEffect(() => {
    getQuiz();
  }, []);

  useEffect(() => {
    setCorrectAns(null);
    setIsCorrectAnswer(null);
  }, [stepCount]);

  const getQuiz = async () => {
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "Quiz",
    });
    setQuiz(result.data.content?.questions);
  };

  const checkAnswer = (userAnswer: string, currentQuestion: Question) => {
    if (userAnswer === currentQuestion.correctAnswer) {
      setIsCorrectAnswer(true);
      setCorrectAns(currentQuestion.correctAnswer);
    } else {
      setIsCorrectAnswer(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="font-bold text-3xl text-center mb-8 text-foreground">Quiz Time</h2>
      
      <div className="mb-8">
        <StepProgress
          data={quiz}
          stepCount={stepCount}
          setStepCount={(value: number) => setStepCount(value)}
          courseId={courseId}
          studyType="Quiz"
        />
      </div>

      <div className="min-h-[400px]">
        {quiz && (
          <QuizCardItem
            quiz={quiz[stepCount]}
            userSelectedOption={(value) => checkAnswer(value, quiz[stepCount])}
          />
        )}
      </div>

      <div className="mt-8 space-y-4">
        {isCorrectAnswer === true && (
          <div className="border border-green-500/20 bg-green-500/10 p-6 rounded-xl animate-in fade-in slide-in-from-bottom-4">
            <h2 className="font-bold text-xl text-green-600 mb-1">🎉 Correct Answer!</h2>
            <p className="text-green-700/80">Great job! Keep going.</p>
          </div>
        )}

        {isCorrectAnswer === false && (
          <div className="border border-red-500/20 bg-red-500/10 p-6 rounded-xl animate-in fade-in slide-in-from-bottom-4">
            <h2 className="font-bold text-xl text-red-600 mb-1">❌ Incorrect</h2>
            <p className="text-red-700/80">The correct answer is: <span className="font-bold">{correctAns}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
