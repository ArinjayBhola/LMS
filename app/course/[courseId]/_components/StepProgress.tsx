import { Button } from "@/components/ui/button";
import React from "react";

const StepProgress = ({
  stepCount,
  setStepCount,
  data,
}: {
  stepCount: number;
  setStepCount: (value: number) => void;
  data: number[] | undefined;
}) => {
  return (
    <div className="flex gap-5 items-center">
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => setStepCount(stepCount - 1)}
        disabled={stepCount === 0}>
        Previous
      </Button>

      {data?.map((_, index: number) => (
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

      {stepCount === data?.length && (
        <div className="absolute top-52 left-1/2 flex items-center gap-10 flex-col justify-center">
          <h2>End of Quiz</h2>
          <Button
            variant={"default"}
            size={"default"}
            onClick={() => setStepCount(0)}>
            Finsh
          </Button>
        </div>
      )}
    </div>
  );
};

export default StepProgress;
