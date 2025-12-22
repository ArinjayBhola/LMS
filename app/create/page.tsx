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
import { fetchCourse } from "@/redux/slice/getCourseList";

interface FormData {
  studyType: string;
  difficultyLevel: string;
  topic: string;
}

const Create = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState([]);
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

  const generateCourseOutline = async () => {
    toast("Processing... This may take some time, please wait.", { closeButton: true, duration: 7000 });
    const courseId = uuidv4();
    setLoading(true);

    try {
      await axios.post("/api/generateCourseOutline", {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setTimeout(() => {
        router.push("/dashboard");
        setLoading(false);
        dispatch(fetchCourse(user?.primaryEmailAddress?.emailAddress));
        toast("Your course content is generating, click on refresh button");
      }, 17000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 md:px-24 lg:px-36 mt-4 md:mt-8 max-w-5xl mx-auto glass rounded-3xl animate-in fade-in duration-500">
      <Button onClick={() => router.back()} className="fixed top-4 left-4 z-50"><MoveLeft/> Back</Button>
      <h2 className="font-extrabold text-3xl md:text-5xl text-gradient text-center mb-4">Start Building Your Personal Study Material</h2>
      <p className="text-muted-foreground text-xl text-center max-w-2xl">Fill all details in order to generate AI-powered study material tailored for you.</p>
      <div className="mt-12 w-full">
        {step === 0 ? (
          <SelectOption selectedStudyType={(value) => handleUserInput("studyType", value)} />
        ) : (
          <TopicInput
            setDifficultyLevel={(value) => handleUserInput("difficultyLevel", value)}
            setTopic={(value) => handleUserInput("topic", value)}
          />
        )}
      </div>

      <div className="flex justify-between w-full mt-16 pb-4">
        <Button
          variant={"ghost"}
          size="lg"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          className="text-muted-foreground hover:text-foreground">
          Previous
        </Button>
        
        {step === 0 ? (
          <Button size="lg" onClick={() => setStep(step + 1)} className="shadow-lg shadow-primary/20 px-8">Next</Button>
        ) : (
          <Button
            size="lg"
            onClick={generateCourseOutline}
            disabled={loading}
            className="shadow-lg shadow-primary/20 px-8">
            {loading ? <Loader className="animate-spin mr-2" /> : null}
            {loading ? "Generating..." : "Generate Course"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Create;
