"use client";

import React, { useState } from "react";
import DOBStep from "./DOBStep";
import NameStep from "./NameStep";
import { Stack } from "../../chakraExports";
import Phone from "./Phone";
import PlayingPosition from "./PlayingPosition";
import ProgressIndicator from "./ProgressIndicator";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function ProfileWorkflow() {
  const supabase = createClientComponentClient();
  const [step, setStep] = useState(0);
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleNameChange = async (newName) => {
    setName(`${newName.firstName} ${newName.lastName}`);
    console.log(name, "name");
  };

  const handlePhoneChange = (phoneNumber: string) => {
    setPhone(phoneNumber);
  };

  const handleDOBgenderChange = (newDob: string, newGender: string) => {
    setDob(newDob);
    setGender(newGender);
  };

  const handlePositionChange = async (newPosition: string) => {
    const { data, error } = await supabase.from("profiles").insert([
      {
        name: name,
        phone: phone,
        dob: dob,
        gender: gender,
        position: newPosition,
        rating: "1200",
      },
    ]);

    console.log(data, "data");
    console.log(error, "error");
    if (error === null) router.push("/");
  };

  const stepProps = {
    onNext: handleNext,
    goBack: handleBack,
    onNameChange: handleNameChange,
    onPhoneChange: handlePhoneChange,
    onDOBgenderChange: handleDOBgenderChange,
    onPositionChange: handlePositionChange,
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
