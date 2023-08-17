import React, { useState } from "react";
import {
  Button,
  Text,
  Center,
  Input,
  InputGroup,
  InputLeftAddon,
} from "../../chakraExports";
import Link from "next/link";

function Phone({ onNext, goBack, onPhoneChange }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneUpdate = () => {
    onPhoneChange(phoneNumber);
  };

  return (
    <>
      <InputGroup size="md">
        <InputLeftAddon children="+91" bg="#161616" textColor="antiquewhite" />
        <Input
          type="number"
          placeholder="phone number"
          textColor="antiquewhite"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </InputGroup>
      <Button
        mt={7}
        colorScheme="messenger"
        size="md"
        onClick={() => {
          handlePhoneUpdate();
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

export default Phone;
