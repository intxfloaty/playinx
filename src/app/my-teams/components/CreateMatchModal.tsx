import React, { useEffect, useState } from "react";
import {
  Input,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Box,
} from "../../chakraExports";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useTeamStore from "../../../utils/store/teamStore";

interface Errors {
  [key: string]: string;
}

const CreateMatchModal = ({ isOpen, onClose }) => {
  const supabase = createClientComponentClient();
  const addTeam = useTeamStore((state) => state.addTeam);
  const [format, setFormat] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [opponent, setOpponent] = useState("");

  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const validate = () => {
    let errors: Errors = {};
    if (!format) {
      errors.format = "Please select a format";
    }
    if (!date) {
      errors.date = "Date is required";
    }
    if (!location) {
      errors.location = "Location is required";
    }
    if (!time) {
      errors.time = "Time is required";
    }
    return errors;
  };

  const onCreateClicked = async () => {
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log("match created");
    }
  };

  useEffect(() => {
    if (Object.keys(fieldErrors).length !== 0) {
      setFieldErrors(validate());
    }
  }, [format, date, time, location]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size="sm"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Match</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <Box mb={5}>
              <FormLabel>Format</FormLabel>
              <Select
                placeholder="Select format"
                onChange={(e) => setFormat(e.target.value)}
              >
                <option value="5v5">5v5</option>
                <option value="6v6">6v6</option>
                <option value="7v7">7v7</option>
                <option value="8v8">8v8</option>
                <option value="6v6">11v11</option>
              </Select>
              {!fieldErrors.format ? (
                <FormHelperText>Select most played format</FormHelperText>
              ) : (
                <Text fontSize="md" color="#FFB400">
                  {fieldErrors.format}
                </Text>
              )}
            </Box>

            <Box mb={5}>
              <FormLabel>Location</FormLabel>
              <Select
                placeholder="Select your home ground"
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="MRIS, Charmwood">MRIS, Charmwood</option>
                <option value="Base Camp, Vasant Kunj">
                  Base Camp, Vasant Kunj
                </option>
                <option value="AB Plaza, Vasant Kunj">
                  AB Plaza, Vasant Kunj
                </option>
                <option value="Kicksal">Kicksal</option>
              </Select>
              {!fieldErrors.location ? (
                <FormHelperText>Please select your home ground</FormHelperText>
              ) : (
                <Text fontSize="md" color="#FFB400">
                  {fieldErrors.location}
                </Text>
              )}
            </Box>

            <Box mb={5}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                isInvalid={!!fieldErrors.date}
                errorBorderColor={fieldErrors.date ? "#FFB400" : ""}
                textColor="black"
                size="md"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              {fieldErrors.date && (
                <Text fontSize="md" color="#FFB400">
                  {fieldErrors.date}
                </Text>
              )}
            </Box>

            <Box mb={5}>
              <FormLabel>Time</FormLabel>
              <Input
                type="time"
                isInvalid={!!fieldErrors.time}
                errorBorderColor={fieldErrors.time ? "#FFB400" : ""}
                textColor="black"
                size="md"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
              {fieldErrors.time && (
                <Text fontSize="md" color="#FFB400">
                  {fieldErrors.time}
                </Text>
              )}
            </Box>

            <Box mb={5}>
              <FormLabel>Opponent</FormLabel>
              <Input
                type="text"
                value={opponent}
                onChange={(e) => setOpponent(e.target.value)}
              />
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="messenger" onClick={onCreateClicked}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateMatchModal;
