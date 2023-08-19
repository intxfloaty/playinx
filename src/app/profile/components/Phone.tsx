import React, { useEffect, useState } from "react";
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
  const [phoneError, setPhoneError] = useState("");

  const validate = () => {
    let error = "";
    if (!phoneNumber) {
      error = "Phone number is required";
    } else if (Number(phoneNumber.length) !== 10) {
      error = "Phone number must have 10 digits";
    }
    return error;
  };

  const handlePhoneUpdate = () => {
    onPhoneChange(phoneNumber);
  };

  useEffect(() => {
    if (phoneError !== "") {
      setPhoneError(validate());
    }
  }, [phoneNumber]);

  return (
    <>
      <InputGroup size="md">
        <InputLeftAddon children="+91" bg="#161616" textColor="antiquewhite" />
        <Input
          type="number"
          isInvalid={!!phoneError}
          errorBorderColor={phoneError ? "#FFB400" : ""}
          placeholder="phone number"
          textColor="antiquewhite"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </InputGroup>
      {phoneError && (
        <Text fontSize="md" color="#FFB400">
          {phoneError}
        </Text>
      )}
      <Button
        mt={7}
        colorScheme="messenger"
        size="md"
        onClick={() => {
          const error = validate();
          setPhoneError(error);
          if (!error) {
            handlePhoneUpdate();
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

export default Phone;
