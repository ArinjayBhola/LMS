import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Loader, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchCourse } from "@/redux/slice/getCourseList";
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

  const date = (date: string) => {
    const dateString = new Date(date).toDateString().split(" ").slice(1).join(" ");
    return dateString;
  };

  const deleteCourse = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await axios.delete(`/api/delete-course?id=${id}`);
      if (result.data === "success") {
        toast("Course deleted successfully");
      }
      dispatch(fetchCourse(createdBy));
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="group border border-border/50 rounded-2xl p-5 relative bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
          <Image
            src={"/knowledge.png"}
            alt="course icon"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {date(course.createdAt)}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1">
        <h2 className="font-bold text-xl text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {course?.courseLayout?.courseTitle}
        </h2>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
          {course?.courseLayout?.courseSummary}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
           <span className="w-2 h-2 rounded-full bg-emerald-500" />
           {course.status || "Active"}
        </div>
        <Link href={`/course/${course.courseId}`} className="w-full max-w-[100px]">
          <Button 
            className="w-full shadow-sm hover:shadow-md transition-all" 
            size="sm"
            onClick={() => dispatch(setCourseId(course.courseId))}
          >
            View Course
          </Button>
        </Link>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 flex justify-center items-center z-50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4 text-destructive">
                <Trash2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground">Delete Course?</h3>
              <p className="text-muted-foreground mt-2">
                Are you sure you want to delete <span className="font-semibold text-foreground">"{course?.courseLayout?.courseTitle}"</span>? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1 shadow-md hover:shadow-lg hover:bg-destructive/90"
                onClick={() => deleteCourse(course.courseId)}
                disabled={isLoading}>
                {isLoading ? <Loader className="animate-spin h-4 w-4 mr-2" /> : null}
                {isLoading ? "Deleting..." : "Delete Course"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
