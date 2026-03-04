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
  const [isFinished, setIsFinished] = useState(false);
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
    setIsFinished(result.data?.finished);
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
    <div className="min-h-screen bg-background p-6 md:p-12 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Button 
              variant="outline"
              size="sm"
              onClick={() => router.back()} 
              className="rounded-lg font-semibold"
          >
            <MoveLeft className="mr-2 h-4 w-4"/> Back
          </Button>
          <div className="hidden md:block">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Study Mode: <span className="text-primary">Quiz</span></h2>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 md:p-10 shadow-sm relative overflow-hidden space-y-8">
          <StepProgress
            data={quiz}
            stepCount={stepCount}
            setStepCount={(value: number) => setStepCount(value)}
            courseId={courseId as string}
            studyType="Quiz"
            isFinished={isFinished}
          />

          <div className="py-4">
            {quiz && (
              <QuizCardItem
                quiz={quiz[stepCount]}
                userSelectedOption={(value) => checkAnswer(value, quiz[stepCount])}
              />
            )}
          </div>

          <div className="min-h-[100px] flex items-center justify-center">
            {isCorrectAnswer === true && (
              <div className="w-full bg-primary/5 border border-primary/20 rounded-xl p-6 animate-in zoom-in-95 duration-500 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-lg">
                  Bravo!
                </div>
                <h2 className="font-bold text-xl text-primary mb-1">That's Correct!</h2>
                <p className="text-primary/60 text-xs font-medium uppercase tracking-wide">You're getting closer to mastery.</p>
              </div>
            )}

            {isCorrectAnswer === false && (
              <div className="w-full bg-destructive/5 border border-destructive/20 rounded-xl p-6 animate-in shake-in duration-500 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-destructive text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-lg">
                  Incorrect
                </div>
                <h2 className="font-bold text-xl text-destructive mb-1">Incorrect Answer</h2>
                <p className="text-destructive/60 text-xs font-medium uppercase tracking-wide">Try again, you've got this!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
