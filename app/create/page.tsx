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

  const handleUserInput = (fieldName: keyof FormData, fieldValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const generateCourseOutline = async () => {
    const courseId = uuidv4();
    setLoading(true);

    try {
      await axios.post("/api/generateCourseOutline", {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setLoading(false);
      router.push("/dashboard");
      toast("Your course content is generating, click on refresh button");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20">
      <h2 className="font-bold text-4xl text-primary">Start Building Your Personal Study Material</h2>
      <p className="text-gray-500 text-lg">Fill all details in order to generate study material</p>
      <div className="mt-10">
        {step === 0 ? (
          <SelectOption selectedStudyType={(value) => handleUserInput("studyType", value)} />
        ) : (
          <TopicInput
            setDifficultyLevel={(value) => handleUserInput("difficultyLevel", value)}
            setTopic={(value) => handleUserInput("topic", value)}
          />
        )}
      </div>
      <div className="flex justify-between w-full mt-32">
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
