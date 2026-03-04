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
import { Loader2, MoveLeft } from "lucide-react";
import { fetchCourseContent } from "@/redux/slice/courseContentSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/appStore";
import { FlashcardSkeleton } from "@/components/SkeletonLoaders";

const Flashcard = () => {
  const { courseId } = useParams();
  const [flashcard, setFlashcard] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [stepCount, setStepCount] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  // Try to get from cache first
  const cachedContent = useSelector((store: RootState) => store.courseContent.cache[courseId as string]);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setIsFlipped(false);
    });
  }, [api]);

  useEffect(() => {
    getFlashCard();
  }, [cachedContent]);

  const getFlashCard = async () => {
    setIsFetching(true);
    try {
      // Try cache first
      if (cachedContent?.data && 'flashcards' in cachedContent.data) {
        setFlashcard((cachedContent.data as any).flashcards);
        setIsFinished((cachedContent as any).finished);
        setIsFetching(false);
        return;
      }
      
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "Flashcard",
      });
      const data = result?.data?.content;
      setFlashcard(data?.flashcards || data || []);
      setIsFinished(result.data?.finished);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
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
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Study Mode: <span className="text-primary">Flashcards</span></h2>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 md:p-10 shadow-sm relative overflow-hidden space-y-10">
          <StepProgress
            data={flashcard}
            stepCount={stepCount}
            setStepCount={(value: number) => setStepCount(value)}
            courseId={courseId as string}
            studyType="Flashcard"
            isFinished={isFinished}
          />

          <div className="flex justify-center items-center py-4">
            {isFetching ? (
              <FlashcardSkeleton />
            ) : flashcard.length > 0 ? (
              <Carousel setApi={setApi} className="w-full max-w-xl">
                <CarouselContent>
                  {flashcard.map((item, index) => (
                    <CarouselItem key={index}>
                      <FlashCardItem item={item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="rounded-lg border-border hover:bg-muted" />
                  <CarouselNext className="rounded-lg border-border hover:bg-muted" />
                </div>
              </Carousel>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No flashcards available for this course.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
