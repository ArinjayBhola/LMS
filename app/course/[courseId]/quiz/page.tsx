"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StepProgress from "../_components/StepProgress";
import QuizCardItem from "../_components/QuizCardItem";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

interface Question {
  correctAnswer: string;
}

const Quiz = () => {
  const [quiz, setQuiz] = useState();
  const [stepCount, setStepCount] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [correctAns, setCorrectAns] = useState<string | null>(null);
  const { courseId } = useParams();
  const router = useRouter();

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
    <div>
      <Button onClick={() => router.back()}><MoveLeft/> Back</Button>
      <h2 className="font-bold text-2xl text-center mb-4"></h2>
      <StepProgress
        data={quiz}
        stepCount={stepCount}
        setStepCount={(value: number) => setStepCount(value)}
        courseId={courseId}
        studyType="Quiz"
      />

      <div>
        {quiz && (
          <QuizCardItem
            quiz={quiz[stepCount]}
            userSelectedOption={(value) => checkAnswer(value, quiz[stepCount])}
          />
        )}
      </div>

      {isCorrectAnswer === true && (
        <div className="border p-3 border-green-700 bg-green-200 rounded-lg">
          <h2 className="font-bold text-lg text-green-600">Correct</h2>
          <p className="text-green-600">Your answer is correct</p>
        </div>
      )}

      {isCorrectAnswer === false && (
        <div className="border p-3 border-red-700 bg-red-200 rounded-lg">
          <h2 className="font-bold text-lg text-red-600">Incorrect</h2>
          <p className="text-red-600">Correct anser is: {correctAns}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
