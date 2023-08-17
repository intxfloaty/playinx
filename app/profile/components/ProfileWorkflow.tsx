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

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleNameChange = (name: string) => {
    console.log("Name received in parent:", name);
    // Do something with the received name in the parent component
  };

  const handlePhoneChange = (phone: string) => {
    console.log(phone, "phone")
  }

  const handleDOBgenderChange = (dob: string, gender: string) => {
    console.log(dob,gender, "dobGender")
  }

  
  const handlePositionChange = (position: string) => {
    console.log(position, "position")
  }

  const stepProps = {
    onNext: handleNext,
    goBack: handleBack,
    onNameChange: handleNameChange,
    onPhoneChange: handlePhoneChange,
    onDOBgenderChange: handleDOBgenderChange,
    onPositionChange: handlePositionChange
  };

  const steps = [
    (props) => <NameStep {...props} />,
    (props) => <Phone {...props} />,
    (props) => <DOBStep {...props} />,
    (props) => <PlayingPosition {...props} />,
    // Add other step components here
  ];

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
      <CurrentStep {...stepProps} />
      <ProgressIndicator totalSteps={steps.length} currentStep={step} />
    </Stack>
  );
}

export default ProfileWorkflow;
