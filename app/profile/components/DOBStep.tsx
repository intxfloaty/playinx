import React, { useState } from "react";
import {
  Stack,
  Center,
  Heading,
  Input,
  Button,
  Select,
  Text,
} from "../../chakraExports";
import Link from "next/link";

function DOBStep({ onNext, goBack, onDOBgenderChange }) {
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");

  const handleDOBgenderUpdate = () => {
    onDOBgenderChange(DOB, gender);
  };

  return (
    <>
      <Center>
        <Heading size="sm" color="antiquewhite">
          What is your Date of Birth?
        </Heading>
      </Center>
      <Input
        type="date"
        textColor="antiquewhite"
        size="md"
        value={DOB}
        onChange={(e) => {
          setDOB(e.target.value);
        }}
      />
      <Select
        placeholder=" select gender"
        size="md"
        bg="antiquewhite"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </Select>
      <Button
        mt={5}
        colorScheme="messenger"
        size="md"
        onClick={() => {
          handleDOBgenderUpdate();
          onNext();
        }}
      >
        Continue
      </Button>
      <Center mt={1}>
        <button onClick={goBack}>
          <Text fontSize="md" color="messenger.300">
            Go Back
          </Text>
        </button>
      </Center>
    </>
  );
}

export default DOBStep;
