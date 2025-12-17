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
    <div className="glass-card p-5 rounded-2xl relative group">
      <div className="flex justify-between items-center mb-4">
        <div className="p-2 bg-white/10 rounded-xl">
            <Image
            src={"/knowledge.png"}
            alt="other"
            width={40}
            height={40}
            className="group-hover:scale-110 transition-transform duration-300"
            />
        </div>
        <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
            {date(course.createdAt)}
        </span>
      </div>
      <h2 className="font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">{course?.courseLayout?.courseTitle}</h2>
      <p className="text-sm line-clamp-2 text-muted-foreground mt-2 min-h-[2.5rem]">{course?.courseLayout?.courseSummary}</p>

      <div className="mt-4 flex justify-end items-center gap-2">
        <div
            className="p-2 rounded-lg cursor-pointer text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
            onClick={() => setIsModalOpen(true)}>
            <Trash2 className="h-4 w-4" />
        </div>
        <Link href={`/course/${course.courseId}`} className="flex-1 text-right">
          <Button onClick={() => dispatch(setCourseId(course.courseId))} size="sm" className="w-full shadow-primary/20">View Course</Button>
        </Link>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-md flex justify-center items-center z-50 animate-in fade-in duration-200 p-4">
          <div className="glass border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-foreground">Delete Course?</h3>
            <p className="text-muted-foreground mt-2 text-sm">Are you sure you want to delete <span className="font-semibold text-foreground">"{course?.courseLayout?.courseTitle}"</span>? This action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="shadow-destructive/20"
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
