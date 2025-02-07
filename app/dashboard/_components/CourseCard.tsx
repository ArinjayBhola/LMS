import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Loader, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

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

const CourseCard = ({ course, getCourseList }: { course: Course; getCourseList: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        getCourseList();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-4 relative">
      <div className="flex justify-between items-center">
        <Image
          src={"/knowledge.png"}
          alt="other"
          width={50}
          height={50}
        />
        <h2 className="text-[12px] rounded-full p-1 px-2 bg-primary text-white">{date(course.createdAt)}</h2>
      </div>
      <h2 className="mt-3 font-medium text-lg">{course?.courseLayout?.courseTitle}</h2>
      <p className="text-xs line-clamp-2 text-gray-500 mt-2">{course?.courseLayout?.courseSummary}</p>

      <div className="mt-3 flex justify-end">
        <Link href={`/course/${course.courseId}`}>
          <Button>View</Button>
        </Link>
      </div>
      <div
        className="absolute bottom-2 left-2 cursor-pointer"
        onClick={() => setIsModalOpen(true)}>
        <Trash2 />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-xl font-semibold">Are you sure you want to delete this course?</h3>
            <h3 className="text-lg font-semibold flex-wrap text-gray-700">{course?.courseLayout?.courseTitle}</h3>
            <div className="mt-4 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteCourse(course.courseId)}>
                {isLoading ? <Loader className="animate-spin" /> : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
