"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashCardItem from "../_components/FlashCardItem";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import StepProgress from "../_components/StepProgress";
import { Loader2 } from "lucide-react";
import { fetchCourseContent } from "@/redux/slice/courseContentSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/appStore";

const Flashcard = () => {
  const { courseId } = useParams();
  const [flashcard, setFlashcard] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setIsFlipped(false);
    });
  }, [api]);

  useEffect(() => {
    getFlashCard();
  }, []);

  const getFlashCard = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "Flashcard",
      });
      setFlashcard(result?.data?.content?.flashcards || result?.data?.content);
    } catch (error) {
      console.error(error);
    }
  };

  const updateFinishStatus = async () => {
    setLoading(true);
    try {
      await axios.patch("/api/course-finish-status", {
        courseId: courseId,
        studyType: "Flashcard",
      });
      if (courseId) {
        dispatch(fetchCourseContent(courseId as string));
      }
      router.push(`/course/${courseId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="font-bold text-3xl text-foreground tracking-tight">Flashcards</h2>
        <p className="text-muted-foreground mt-2 text-lg">Master concepts with interactive flashcards</p>
      </div>

      <StepProgress
        courseId={courseId}
        data={flashcard}
        setStepCount={(value: number) => setStepCount(value)}
        stepCount={stepCount}
        studyType="Flashcard"
      />

      <div className="mt-12 flex justify-center perspective-1000">
        <Carousel setApi={setApi} className="w-full max-w-xl">
          <CarouselContent>
            {flashcard.map((flashcard, index) => (
              <CarouselItem key={index} className="pl-4">
                <FlashCardItem
                  isFlipped={isFlipped}
                  handleClick={() => setIsFlipped(!isFlipped)}
                  flashcard={flashcard}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 h-12 w-12 border-2 border-primary/20 hover:bg-primary/10 hover:border-primary text-primary" />
          <CarouselNext className="hidden md:flex -right-12 h-12 w-12 border-2 border-primary/20 hover:bg-primary/10 hover:border-primary text-primary" />
        </Carousel>
      </div>

      {stepCount === flashcard.length - 1 && (
        <div className="flex justify-center mt-12">
          <Button
            variant={"default"}
            className="rounded-full px-8 py-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg font-semibold"
            size={"lg"}
            onClick={updateFinishStatus}>
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Complete Flashcards"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
