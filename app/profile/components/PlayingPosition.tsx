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

function PlayingPosition({ onNext, goBack, onPositionChange }) {
  const [position, setPosition] = useState("");

  const handlePositionUpdate = () => {
    onPositionChange(position);
  };
  console.log(position, "pos");
  return (
    <>
      <Center>
        <Heading size="sm" color="antiquewhite">
          What is your playing position?
        </Heading>
      </Center>
      <Select
        placeholder=" select position"
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
      <Button
        mt={7}
        colorScheme="messenger"
        size="md"
        onClick={() => {
          handlePositionUpdate();
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
