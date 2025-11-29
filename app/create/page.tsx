"use client";

import React, { useState } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { Loader } from "lucide-react";
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
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-10 md:mt-20 max-w-6xl mx-auto">
      <h2 className="font-bold text-2xl md:text-4xl text-primary text-center">Start Building Your Personal Study Material</h2>
      <p className="text-muted-foreground text-lg mt-2 text-center">Fill all details in order to generate study material</p>
      <div className="mt-10 w-full">
        {step === 0 ? (
          <SelectOption selectedStudyType={(value) => handleUserInput("studyType", value)} />
        ) : (
          <TopicInput
            setDifficultyLevel={(value) => handleUserInput("difficultyLevel", value)}
            setTopic={(value) => handleUserInput("topic", value)}
          />
        )}
      </div>
      <div className="flex justify-between w-full mt-16 md:mt-32">
        <Button
          variant={"outline"}
          onClick={() => setStep(step - 1)}
          disabled={step === 0}>
          Previous
        </Button>
        {step === 0 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button
            onClick={generateCourseOutline}
            disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Generate"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Create;
