import React from "react";
import ReactCardFlip from "react-card-flip";

interface FlashCardItemProps {
  back: string;
  front: string;
}

const FlashCardItem = ({
  isFlipped,
  handleClick,
  flashcard,
}: {
  isFlipped: boolean;
  handleClick: () => void;
  flashcard: FlashCardItemProps;
}) => {
  return (
    <div className="flex items-center justify-center">
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="vertical">
        <div
          className="p-4 bg-primary text-white flex items-center justify-center rounded-lg cursor-pointer h-[250px] w-[200px] md:h-[350px] md:w-[300px] shadow-lg"
          onClick={handleClick}>
          <h2>{flashcard?.front}</h2>
        </div>

        <div
          className="p-4 bg-white shadow-lg text-primary flex items-center justify-center rounded-lg cursor-pointer h-[250px] w-[200px] md:h-[350px] md:w-[300px]"
          onClick={handleClick}>
          <h2>{flashcard?.back}</h2>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default FlashCardItem;
