import React, { useEffect, useState } from "react";
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

interface Errors {
  [key: string]: string;
}

function DOBStep({ onNext, goBack, onDOBgenderChange }) {
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const validate = () => {
    let errors: Errors = {};
    if (!DOB) {
      errors.DOB = "Date of birth is required";
    }
    if (!gender) {
      errors.gender = "Gender is required";
    }
    return errors;
  };

  const handleDOBgenderUpdate = () => {
    onDOBgenderChange(DOB, gender);
  };

  useEffect(() => {
    if (Object.keys(fieldErrors).length !== 0) {
      setFieldErrors(validate());
    }
  }, [DOB, gender]);

  return (
    <>
      <Center>
        <Heading size="sm" color="antiquewhite">
          What is your Date of Birth?
        </Heading>
      </Center>
      <Input
        type="date"
        isInvalid={!!fieldErrors.DOB}
        errorBorderColor={fieldErrors.DOB ? "#FFB400" : ""}
        textColor="antiquewhite"
        size="md"
        value={DOB}
        onChange={(e) => {
          setDOB(e.target.value);
        }}
      />
      {fieldErrors.DOB && (
        <Text fontSize="md" color="#FFB400">
          {fieldErrors.DOB}
        </Text>
      )}
      <Select
        placeholder="Select gender"
        isInvalid={!!fieldErrors.gender}
        errorBorderColor={fieldErrors.gender ? "#FFB400" : ""}
        size="md"
        bg="antiquewhite"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </Select>
      {fieldErrors.gender && (
        <Text fontSize="md" color="#FFB400">
          {fieldErrors.gender}
        </Text>
      )}
      <Button
        mt={5}
        colorScheme="messenger"
        size="md"
        onClick={() => {
          const errors = validate();
          setFieldErrors(errors);
          if (Object.keys(errors).length === 0) {
            handleDOBgenderUpdate();
            onNext();
          }
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
