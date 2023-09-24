"use client";
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
  useToast,
} from "../app/chakraExports";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useTeamStore from "../utils/store/teamStore";
import { IoFootballOutline } from "react-icons/io5";


interface Errors {
  [key: string]: string;
}

const CreateTeam = ({ user }) => {
  const supabase = createClientComponentClient();
  const addTeam = useTeamStore((state) => state.addTeam);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teamName, setTeamName] = useState("");
  const [location, setLocation] = useState("");
  const [format, setFormat] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const user_id = user?.id

  const validate = () => {
    let errors: Errors = {};
    if (!teamName) {
      errors.teamName = "Please enter your email address";
    }
    if (!format) {
      errors.format = "Format is required";
    }
    if (!location) {
      errors.location = "Location is required";
    }
    return errors;
  };


  const onCreateClicked = async () => {
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoading(true)
      const { data, error } = await supabase
        .from("teams")
        .insert([
          {
            team_name: teamName,
            format: format,
            location: location,
            team_admin: user_id,
            rating: "2000",
          },
        ])
        .select();

      if (data && data.length > 0 && error === null) {
        const newTeam = data[0];
        addTeam(newTeam);
        onClose();
        toast({
          title: 'Team created.',
          position: 'top',
          description: `New team - ${teamName} is created!.`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setIsLoading(false)
      }

      // console.log(data, "data");
      console.log(error, "error");
      try {
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (Object.keys(fieldErrors).length !== 0) {
      setFieldErrors(validate());
    }
  }, [teamName, format, location]);

  return (
    <>
      <Button leftIcon={<IoFootballOutline size={18} />} w="100%" colorScheme="messenger" size="lg" onClick={onOpen}>
        Create Team
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <Box mb={5}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
                {!fieldErrors.teamName ? (
                  <FormHelperText>
                    Please enter the name of your team.
                  </FormHelperText>
                ) : (
                  <Text fontSize="md" color="#FFB400">
                    {fieldErrors.teamName}
                  </Text>
                )}
              </Box>

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

              <Box>
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
                  <FormHelperText>
                    Please select your home ground
                  </FormHelperText>
                ) : (
                  <Text fontSize="md" color="#FFB400">
                    {fieldErrors.location}
                  </Text>
                )}
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} colorScheme="messenger" onClick={onCreateClicked}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTeam;
