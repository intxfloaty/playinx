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
import { format } from "date-fns";

interface Errors {
  [key: string]: string;
}

const CreateMatchModal = ({ isOpen, onClose }) => {
  const supabase = createClientComponentClient();
  const activeTeam = useTeamStore((state) => state.activeTeam);
  const [opponentTeams, setOpponentTeams] = useState([]);
  const [matchFormat, setMatchFormat] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [opponentId, setOpponentId] = useState("");

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

  const formatSelectedDate = (selectedDate) => {
    if (!selectedDate) {
      return "Invalid Date"; // Handle the case where selectedDate is empty or undefined.
    }
    const parsedDate = new Date(selectedDate);
    return format(parsedDate, "EEE d MMM");
  };

  const getOpponentTeams = async () => {
    let { data: teams, error } = await supabase
      .from("teams")
      .select("*")
      .neq("team_admin", `${activeTeam?.team_admin}`)
      .eq("location", `${location}`);

    if (!error) {
      setOpponentTeams(teams);
    }
  };

  const onCreateClicked = async () => {
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length === 0) {
      const formattedDate = formatSelectedDate(date);
      const { data, error } = await supabase
        .from("matches")
        .insert([
          {
            format: matchFormat,
            location: location,
            date: formattedDate,
            time: time,
            team_id: activeTeam?.team_id,
            team_name: activeTeam?.team_name,
            opponent_id: opponentId,
            opponent_name: opponentName,
            match_status: "pending",
          },
        ])
        .select();
      onClose();
    }
  };

  useEffect(() => {
    if (Object.keys(fieldErrors).length !== 0) {
      setFieldErrors(validate());
    }
  }, [matchFormat, date, time, location]);

  useEffect(() => {
    const fetchOpponentTeams = async () => {
      await getOpponentTeams();
    };

    fetchOpponentTeams();
  }, [location]);

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
                onChange={(e) => setMatchFormat(e.target.value)}
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
              <Select
                placeholder="Select opponent"
                onChange={(e) => {
                  const selectedOpponentId = e.target.value;
                  const selectedOpponent = opponentTeams.find(
                    (team) => team.team_id === selectedOpponentId
                  );
                  if (selectedOpponent) {
                    setOpponentName(selectedOpponent.team_name);
                    setOpponentId(selectedOpponent.team_id); // Assuming there's an 'id' property in your opponent's data structure
                  }
                }}
              >
                {opponentTeams?.map((team, idx) => (
                  <option key={idx} value={team.team_id}>
                    {team.team_name} - {team.location}
                  </option>
                ))}
              </Select>
              <FormHelperText>
                Please select your opponent based on the location
              </FormHelperText>
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
