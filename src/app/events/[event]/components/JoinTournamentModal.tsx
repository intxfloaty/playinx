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
  RadioGroup,
  Flex
} from "../../../chakraExports";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";
import { IoCloseOutline } from "react-icons/io5";

interface Errors {
  [key: string]: string;
}

const JoinTournamentModal = ({ isOpen, onClose, user, event, teams }) => {
  const supabase = createClientComponentClient();
  const [selectedTeam, setSelectedTeam] = useState({
    teamName: "",
    teamId: ""
  });
  const [players, setPlayers] = useState([])
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("")


  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const validate = () => {
    let errors: Errors = {};
    if (!selectedTeam?.teamName) {
      errors.selectedTeam = "Please select a team";
    }

    return errors;
  };


  const fetchTeamPlayers = async () => {
    setTeamPlayers([])
    let { data: players, error } = await supabase
      .from("players")
      .select("*")
      .eq("team_id", `${selectedTeam?.teamId}`)

    if (!error) {
      setPlayers(players);
    }
  }

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

  const addTeamToEvent = async () => {
    const teamAdmin = user?.id
    const { data, error } = await supabase
      .from('event_teams')
      .insert([
        {
          event_id: `${event?.id}`,
          team_id: `${selectedTeam.teamId}`,
          team_admin: teamAdmin,
          team_name: selectedTeam.teamName,
          payment_status: "pending",
        },
      ])
      .select()

    console.log(error, "event_teamsErr")
  }

  const onContinueClicked = async () => {
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length === 0) {
      await updateTeamWithEvent()
      await addTeamToEvent()
    }
  };

  useEffect(() => {
    if (Object.keys(fieldErrors).length !== 0) {
      setFieldErrors(validate());
    }
  }, [selectedTeam?.teamName]);

  console.log(fieldErrors, "errs")

  useEffect(() => {
    const fetchPlayers = async () => {
      fetchTeamPlayers();
    };
    if (selectedTeam?.teamId) fetchPlayers();

  }, [selectedTeam?.teamId]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size="full"
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
              <FormLabel>Select Players</FormLabel>
              <Select
                placeholder="Select Players"
                color="black"
                borderColor="#161616"
                onChange={(e) => {
                  const newPlayer = e.target.value;
                  const playerId = e.target.selectedOptions[0].getAttribute("data-player-id");
                  const playerPosition = e.target.selectedOptions[0].getAttribute("data-player-position")
                  if (newPlayer !== "" && !teamPlayers?.some((player) => player?.playerId === playerId)) {
                    const updatedTeamPlayers = [...teamPlayers];
                    updatedTeamPlayers.push({
                      playerId,
                      playerPosition,
                      playerName: newPlayer,
                    });
                    setTeamPlayers(updatedTeamPlayers);
                  }
                }}
              >
                {players?.map((player, idx) => (
                  <option
                    key={idx}
                    value={player?.player_name}
                    data-player-id={player?.player_id}
                    data-player-position={player?.player_position}
                  >
                    {player?.player_name}
                  </option>
                ))}
              </Select>

              {teamPlayers?.map((player, idx) => {
                return (
                  <Flex
                    key={idx}
                    my={6}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Flex w="90%" flexDir="row" alignItems="center" justifyContent="space-between">
                      <Text color="black" fontSize="sm" flex="1" textAlign="left">
                        {player?.playerName}
                      </Text>
                      <Text color="black" fontSize="sm" flex="1" textAlign="left">
                        {player?.playerPosition}
                      </Text>
                    </Flex>


                    <Box position="relative" right={0}>
                      <IoCloseOutline
                        color="black"
                        size={24}
                        onClick={() => {
                          const updatedTeamPlayers = teamPlayers.filter(
                            (_, i) => i !== idx
                          );
                          setTeamPlayers(updatedTeamPlayers);
                        }}
                      />
                    </Box>
                  </Flex>
                );
              })}
              {/* {fieldErrors.paymentMethod
                &&
                <Text fontSize="md" color="#FFB400">
                  {fieldErrors.paymentMethod}
                </Text>} */}
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="messenger" onClick={onContinueClicked}>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinTournamentModal;
