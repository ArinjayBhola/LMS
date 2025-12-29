"use client";

import React from "react";

// Base skeleton with shimmer animation
const Skeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] rounded-lg ${className}`}
    style={{
      animation: "shimmer 1.5s ease-in-out infinite",
    }}
  />
);

// Course card skeleton for dashboard grid
export const CourseCardSkeleton = () => (
  <div className="glass-card p-5 rounded-2xl">
    <div className="flex justify-between items-center mb-4">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <Skeleton className="w-20 h-6 rounded-full" />
    </div>
    <Skeleton className="h-6 w-3/4 mb-2" />
    <Skeleton className="h-4 w-full mb-1" />
    <Skeleton className="h-4 w-2/3" />
    <div className="mt-4 flex justify-end">
      <Skeleton className="h-9 w-28 rounded-md" />
    </div>
  </div>
);

// Grid of course card skeletons
export const CourseListSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <CourseCardSkeleton key={i} />
    ))}
  </div>
);

// Notes content skeleton
export const NotesSkeleton = () => (
  <div className="space-y-4 mt-10">
    <Skeleton className="h-8 w-1/2 mb-6" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <div className="mt-6" />
    <Skeleton className="h-6 w-1/3 mb-4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
);

// Flashcard skeleton
export const FlashcardSkeleton = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <Skeleton className="w-full max-w-lg h-64 rounded-2xl" />
    <div className="flex gap-4 mt-6">
      <Skeleton className="w-10 h-10 rounded-full" />
      <Skeleton className="w-10 h-10 rounded-full" />
    </div>
  </div>
);

// Quiz skeleton
export const QuizSkeleton = () => (
  <div className="mt-10 p-6 glass-card rounded-2xl">
    <Skeleton className="h-6 w-3/4 mb-6" />
    <div className="space-y-3">
      <Skeleton className="h-12 w-full rounded-lg" />
      <Skeleton className="h-12 w-full rounded-lg" />
      <Skeleton className="h-12 w-full rounded-lg" />
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  </div>
);

// Course intro skeleton
export const CourseIntroSkeleton = () => (
  <div className="p-6 glass-card rounded-2xl">
    <div className="flex items-start gap-4">
      <Skeleton className="w-16 h-16 rounded-xl" />
      <div className="flex-1">
        <Skeleton className="h-8 w-2/3 mb-3" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </div>
);

// Chapter list skeleton
export const ChapterListSkeleton = () => (
  <div className="mt-8 space-y-3">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="p-4 glass-card rounded-xl flex items-center gap-4">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="h-5 w-1/2 mb-2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
    ))}
  </div>
);

// Study material section skeleton
export const StudyMaterialSkeleton = () => (
  <div className="mt-8 grid grid-cols-3 gap-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <Skeleton key={i} className="h-24 rounded-xl" />
    ))}
  </div>
);

export default Skeleton;
