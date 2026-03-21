"use client";

import React, { useState } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { Loader, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/appStore";
import { fetchCourse, invalidateCache } from "@/redux/slice/getCourseList";

interface FormData {
  studyType: string;
  difficultyLevel: string;
  topic: string;
}

const Create = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleUserInput = (fieldName: keyof FormData, fieldValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const isYoutubeMode = youtubeUrl.length > 0;

  const generateCourseOutline = async () => {
    toast("Processing... This may take some time, please wait.", { closeButton: true, duration: 7000 });
    const courseId = uuidv4();
    setLoading(true);

    try {
      if (isYoutubeMode) {
        // YouTube flow
        await axios.post("/api/generate-from-youtube", {
          youtubeUrl,
          courseId,
          ...formData,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        });
      } else {
        // Normal topic flow
        await axios.post("/api/generateCourseOutline", {
          courseId,
          ...formData,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        });
      }

      setTimeout(() => {
        router.push("/dashboard");
        setLoading(false);
        dispatch(invalidateCache());
        dispatch(fetchCourse(user?.primaryEmailAddress?.emailAddress));
        toast("Your course content is generating, click on refresh button");
      }, 17000);
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        toast.error("Invalid YouTube URL. Please check and try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 md:p-12 animate-in fade-in duration-700">
      <div className="w-full max-w-4xl bg-card border border-border rounded-xl shadow-sm relative overflow-hidden p-8 md:p-12">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: step === 0 ? '50%' : '100%' }}
          />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="absolute top-6 left-6 z-50 rounded-lg font-medium text-muted-foreground hover:text-foreground"
        >
          <MoveLeft className="mr-2 h-4 w-4"/> Back
        </Button>

        <div className="text-center space-y-3 mb-12 mt-10">
          <h2 className="font-bold text-3xl md:text-4xl text-foreground tracking-tight">
            Create New <span className="text-primary">Course</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Specify your requirements and let our AI engineer the perfect study curriculum tailored to your goals.
          </p>
        </div>

        <div className="w-full relative z-10">
          {step === 0 ? (
            <SelectOption selectedStudyType={(value) => handleUserInput("studyType", value)} />
          ) : (
            <TopicInput
              setDifficultyLevel={(value) => handleUserInput("difficultyLevel", value)}
              setTopic={(value) => handleUserInput("topic", value)}
              setYoutubeUrl={setYoutubeUrl}
            />
          )}
        </div>

        <div className="flex justify-between items-center w-full mt-12 pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className="rounded-lg px-8 transition-all disabled:opacity-30">
            Previous
          </Button>

          {step === 0 ? (
            <Button
              onClick={() => setStep(step + 1)}
              className="bg-primary text-white font-semibold rounded-lg px-10 py-6 shadow-sm hover:shadow-md active:scale-95 transition-all text-base"
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={generateCourseOutline}
              disabled={loading}
              className="bg-primary text-white font-semibold rounded-lg px-10 py-6 shadow-sm hover:shadow-md active:scale-95 transition-all text-base">
              {loading ? <Loader className="animate-spin mr-2 h-5 w-5" /> : null}
              {loading ? "Generating..." : "Generate Course"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
