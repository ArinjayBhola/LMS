import { Button } from "@/components/ui/button";
import React from "react";

const StepProgress = ({ stepCount, setStepCount, data }) => {
  return (
    <div className="flex gap-5 items-center">
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => setStepCount(stepCount - 1)}
        disabled={stepCount == 0}>
        Previous
      </Button>

      {data?.map((item, index: number) => (
        <div
          key={index}
          className={`w-full h-2 rounded-full ${index < stepCount ? "bg-primary" : "bg-gray-200"}`}></div>
      ))}

      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => setStepCount(stepCount + 1)}
        disabled={stepCount === data?.length}>
        Next
      </Button>
    </div>
  );
};

export default StepProgress;
