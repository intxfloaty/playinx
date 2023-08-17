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

function PlayingPosition({ onNext, goBack, onPositionChange }) {
  const [position, setPosition] = useState("");
  const [positionError, setPositionError] = useState("");

  const validate = () => {
    let error = "";
    if (!position) {
      error = "Phone number is required";
    }
    return error;
  };

  const handlePositionUpdate = () => {
    onPositionChange(position);
  };
  console.log(position, "pos");

  useEffect(() => {
    if (positionError !== "") {
      setPositionError(validate());
    }
  }, [position]);
  return (
    <>
      <Center>
        <Heading size="sm" color="antiquewhite">
          What is your playing position?
        </Heading>
      </Center>
      <Select
        placeholder="Select position"
        isInvalid={!!positionError}
        errorBorderColor={positionError ? "#FFB400" : ""}
        size="md"
        bg="antiquewhite"
        value={position}
        onChange={(e) => {
          setPosition(e.target.value);
        }}
      >
        <option value="GK">GK</option>
        <option value="CB">CB</option>
        <option value="LB">LB</option>
        <option value="RB">RB</option>
        <option value="CDM">CDM</option>
        <option value="CM">CM</option>
        <option value="CAM">CAM</option>
        <option value="LW">LW</option>
        <option value="RW">RW</option>
        <option value="ST">ST</option>
      </Select>
      {positionError && (
        <Text fontSize="md" color="#FFB400">
          {positionError}
        </Text>
      )}
      <Button
        mt={7}
        colorScheme="messenger"
        size="md"
        onClick={() => {
          const error = validate();
          setPositionError(error);
          if (!error) {
            handlePositionUpdate();
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

export default PlayingPosition;
