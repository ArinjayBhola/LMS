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
    <div>
      <h2 className="font-bold text-2xl">Flashcard</h2>
      <p>Flashcard: The ultimate learning tool</p>

      <StepProgress
        courseId={courseId}
        data={flashcard}
        setStepCount={(value: number) => setStepCount(value)}
        stepCount={stepCount}
        studyType="Flashcard"
      />

      <div className="mt-10">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {flashcard?.map((flashcard, index) => (
              <CarouselItem key={index}>
                <FlashCardItem
                  isFlipped={isFlipped}
                  handleClick={() => setIsFlipped(!isFlipped)}
                  flashcard={flashcard}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            onClick={() => {
              setStepCount((prev) => Math.max(prev - 1, 0));
              api?.scrollPrev();
            }}
          />
          <CarouselNext
            onClick={() => {
              setStepCount((prev) => Math.min(prev + 1, flashcard.length - 1));
              api?.scrollNext();
            }}
          />
        </Carousel>
      </div>

      {stepCount === flashcard.length - 1 && (
        <Button
          variant={"default"}
          className="absolute right-10 bottom-10 rounded-full px-4 p-5 shadow-2xl"
          size={"default"}
          onClick={updateFinishStatus}>
          {loading ? <Loader2 className="animate-spin" /> : "Finish"}
        </Button>
      )}
    </div>
  );
};

export default Flashcard;
