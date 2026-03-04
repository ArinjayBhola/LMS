"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeCourseFromCache, forceFetchCourse } from "@/redux/slice/getCourseList";
import { AppDispatch } from "@/redux/appStore";
import { setCourseId } from "@/redux/slice/courseSlice";

interface Course {
  title: string;
  status: string;
  courseLayout: {
    courseTitle: string;
    courseSummary: string;
  };
  courseId: string;
  createdAt: string;
}

const CourseCard = ({ course, createdBy }: { course: Course; createdBy: string | undefined }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const date = (date: string) => {
    const dateString = new Date(date).toDateString().split(" ").slice(1).join(" ");
    return dateString;
  };

  // Prefetch course page on hover for instant navigation
  const handleMouseEnter = useCallback(() => {
    router.prefetch(`/course/${course.courseId}`);
  }, [router, course.courseId]);

  const deleteCourse = async (id: string) => {
    setIsLoading(true);
    try {
      // Optimistic update: remove from cache immediately
      dispatch(removeCourseFromCache(id));
      
      const result = await axios.delete(`/api/delete-course?id=${id}`);
      if (result.data === "success") {
        toast("Course deleted successfully");
      } else {
        // If delete failed, refetch to restore correct state
        dispatch(forceFetchCourse(createdBy));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      // Refetch on error to restore correct state
      dispatch(forceFetchCourse(createdBy));
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleViewCourse = () => {
    dispatch(setCourseId(course.courseId));
  };

  return (
    <div 
      className="bg-card border border-border/60 p-4 rounded-lg relative group transition-all duration-200 hover:shadow-sm hover:border-primary/40"
      onMouseEnter={handleMouseEnter}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-secondary rounded-md">
            <Image
            src={"/knowledge.png"}
            alt="other"
            width={24}
            height={24}
            className="transition-transform duration-300 group-hover:scale-105"
            />
        </div>
        <span className="text-[10px] font-bold text-muted-foreground/80 px-2 py-0.5 bg-muted rounded-md border border-border/50">
            {date(course.createdAt)}
        </span>
      </div>
      
      <div className="space-y-1.5">
        <h2 className="font-bold text-base text-foreground line-clamp-1 tracking-tight">
          {course?.courseLayout?.courseTitle}
        </h2>
        <p className="text-xs line-clamp-2 text-muted-foreground leading-relaxed min-h-[2.5rem]">
          {course?.courseLayout?.courseSummary}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <Link href={`/course/${course.courseId}`} className="flex-1" prefetch={true}>
          <Button 
            onClick={handleViewCourse} 
            className="w-full h-9 bg-primary text-primary-foreground hover:opacity-90 rounded-lg font-bold text-xs shadow-sm transition-all active:scale-[0.98]"
          >
            View Study Plan
          </Button>
        </Link>
        <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors opacity-0 group-hover:opacity-100"
            onClick={() => setIsModalOpen(true)}>
            <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-sm flex justify-center items-center z-50 animate-in fade-in duration-200 p-4">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm shadow-lg animate-in zoom-in-95 duration-200">
            <div className="mb-6 space-y-2">
              <h3 className="text-xl font-bold text-foreground tracking-tight">Delete Course</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-foreground italic">&quot;{course?.courseLayout?.courseTitle}&quot;</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="flex-1 h-10 text-xs font-bold rounded-lg"
                onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1 h-10 text-xs font-bold rounded-lg shadow-sm"
                onClick={() => deleteCourse(course.courseId)}>
                {isLoading ? <Loader className="animate-spin h-4 w-4" /> : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;

