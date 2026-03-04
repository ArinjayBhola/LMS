"use client";

import React from "react";

interface FlashCardItemProps {
  front: string;
  back: string;
}

const FlashCardItem = ({ item }: { item: FlashCardItemProps }) => {
  return (
    <div className="flex items-center justify-center p-4 h-[350px] md:h-[450px] [perspective:1000px] group cursor-pointer">
      <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Side */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-card border border-border rounded-xl shadow-sm flex flex-col items-center justify-center p-8 text-center">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-4">Question</span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                {item?.front}
            </h2>
            <p className="absolute bottom-6 text-[10px] font-medium text-muted-foreground uppercase tracking-wide opacity-60">Click to reveal answer</p>
        </div>
        
        {/* Back Side */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-primary border border-primary rounded-xl shadow-md flex flex-col items-center justify-center p-8 text-center text-white">
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-4">Answer</span>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-relaxed">
                {item?.back}
            </h2>
            <p className="absolute bottom-6 text-[10px] font-medium text-white/50 uppercase tracking-wide">Learned!</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCardItem;
