"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashCardItem from "../_components/FlashCardItem";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Flashcard = () => {
  const { courseId } = useParams();
  const [flashcard, setFlashcard] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [api, setApi] = useState();

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

  return (
    <div>
      <h2 className="font-bold text-2xl">Flashcard</h2>
      <p>Flashcard: The ultimate learning tool</p>
      <div className="mt-10">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {flashcard.map((flashcard, index) => (
              <CarouselItem key={index}>
                <FlashCardItem
                  isFlipped={isFlipped}
                  handleClick={() => setIsFlipped(!isFlipped)}
                  flashcard={flashcard}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
export default Flashcard;
