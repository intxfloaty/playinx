"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "../../chakraExports";
import useTeamStore from "../../../utils/store/teamStore";

const AddPlayers = ({ isAddPlayerOpen, onAddPlayerClose }) => {
  const supabase = createClientComponentClient();
  const activeTeam = useTeamStore((state) => state.activeTeam);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

  console.log(activeTeam, "activeTeam");

  const validate = () => {
    let error = "";
    if (!phoneNumber) {
      error = "Phone number is required";
    } else if (Number(phoneNumber.length) !== 10) {
      error = "Phone number must have 10 digits";
    }
    return error;
  };

  const handleAddClicked = async () => {
    const error = validate();
    setPhoneError(error);
    if (!error) {
      const { data, error } = await supabase
        .from("teams")
        .update({ other_column: "otherValue" })
        .eq("", "someValue")
        .select();
    }
  };

  useEffect(() => {
    if (phoneError !== "") {
      setPhoneError(validate());
    }
  }, [phoneNumber]);

  return (
    <>
      <Modal isOpen={isAddPlayerOpen} onClose={onAddPlayerClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Players</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup size="md">
              <InputLeftAddon
                children="+91"
                bg="#161616"
                textColor="antiquewhite"
              />
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
              <Text fontSize="md" color="black">
                {phoneError}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddClicked}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPlayers;
