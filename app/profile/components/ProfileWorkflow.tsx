"use client";

import React, { useState } from "react";
import DOBStep from "./DOBStep";
import NameStep from "./NameStep";
// import GenderStep from './GenderStep';
import { Stack } from "../../chakraExports";
import Phone from "./Phone";
import PlayingPosition from "./PlayingPosition";
import ProgressIndicator from "./ProgressIndicator";

function ProfileWorkflow() {
  const [step, setStep] = useState(0);

  const steps = [
    NameStep,
    Phone,
    DOBStep,
    PlayingPosition,
    // Add other step components here
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const CurrentStep = steps[step];

  return (
    <Stack
      spacing={3}
      w={{
        base: "100%", // 0-48em
        md: "75%", // 48em-80em,
        xl: "50%", // 80em+
      }}
      p={{
        base: null,
        md: "10%",
        xl: "8%",
      }}
    >
      <CurrentStep onNext={handleNext} goBack={handleBack} />
      <ProgressIndicator totalSteps={steps.length} currentStep={step} />
    </Stack>
  );
}

export default ProfileWorkflow;
