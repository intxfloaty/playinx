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
  Radio,
  RadioGroup
} from "../../../chakraExports";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";

interface Errors {
  [key: string]: string;
}

const JoinTournamentModal = ({ isOpen, onClose, user, event }) => {
  const supabase = createClientComponentClient();
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({
    teamName: "",
    teamId: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("")

  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const validate = () => {
    let errors: Errors = {};
    if (!selectedTeam) {
      errors.selectedTeam = "Please select a team";
    }
    if (!paymentMethod) {
      errors.paymentMethod = "Select payment method";
    }
    return errors;
  };


  const getMyTeams = async () => {
    let { data: teams, error } = await supabase
      .from("teams")
      .select("*")
      .eq("team_admin", `${user?.id}`)

    if (!error) {
      setTeams(teams);
    }
  };

  // add event id in events column in teams table 
  const updateTeamWithEvent = async () => {
    const { data, error } = await supabase.rpc("add_event_to_team", {
      p_team_id: selectedTeam.teamId,
      p_event_id: `${event?.id}`,
    });

    console.log(data, "rpcData");
    console.log(error, "rpcErr");
  };

  // add teamid, teamAdmin and paymentStatus as a json obj in teams column in events table
  const updateEventWithTeam = async () => {
    const teamAdmin = user?.id
    const { data, error } = await supabase.rpc("add_team_to_event", {
      p_team_id: `${selectedTeam.teamId}`,
      p_team_admin: teamAdmin,
      p_team_name: selectedTeam.teamName,
      p_payment_status: "pending",
      p_event_id: `${event?.id}`,
    });

    console.log(data, "rpcData");
    console.log(error, "rpcErr");
  }

  const onJoinClicked = async () => {
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length === 0) {
      await updateTeamWithEvent()
      await updateEventWithTeam()
    }
  };

  useEffect(() => {
    if (Object.keys(fieldErrors).length !== 0) {
      setFieldErrors(validate());
    }
  }, [selectedTeam, paymentMethod]);

  useEffect(() => {
    const fetchTeams = async () => {
      await getMyTeams();
    };

    fetchTeams();
  }, []);

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
        <ModalHeader>Join Tournament</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <Box mb={5}>
              <FormLabel>Team</FormLabel>
              <Select
                placeholder="Select team"
                onChange={(e) => {
                  const teamName = e.target.selectedOptions[0].getAttribute("data-team-name");
                  setSelectedTeam({ teamName: teamName, teamId: e.target.value })
                }}
              >
                {teams?.map((team, idx) => (
                  <option key={idx} value={team.team_id} data-team-name={team?.team_name}>
                    {team.team_name}
                  </option>
                ))}
              </Select>
              {!fieldErrors.selectedTeam ? (
                <FormHelperText>Select your team</FormHelperText>
              ) : (
                <Text fontSize="md" color="#FFB400">
                  {fieldErrors.selectedTeam}
                </Text>
              )}
            </Box>

            <Box mb={5}>
              <FormLabel>Entry fees</FormLabel>
              <RadioGroup onChange={(e) => setPaymentMethod(e)} >
                <Stack direction='column'>
                  <Radio value='Pay online per team basis' isDisabled>Pay online per team basis</Radio>
                  <Radio value='Pay online per player basis' isDisabled>Pay online per player basis</Radio>
                  <Radio value='Pay offline'>Pay offline</Radio>
                </Stack>
              </RadioGroup>
              {fieldErrors.paymentMethod
                &&
                <Text fontSize="md" color="#FFB400">
                  {fieldErrors.paymentMethod}
                </Text>}
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="messenger" onClick={onJoinClicked}>
            Join
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinTournamentModal;
