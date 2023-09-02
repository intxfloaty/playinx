import React, { useEffect, useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Flex,
  Divider,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "../../chakraExports";
import {
  IoAddOutline,
  IoFootballOutline,
  IoFootstepsOutline,
  IoArrowForwardOutline,
  IoCloseOutline,
  IoFlash,
} from "react-icons/io5";

const UpdateMatchScoreModal = ({ isOpen, onClose, match }) => {
  const supabase = createClientComponentClient();
  const [teamLineup, setTeamLineup] = useState([]);
  const [oppLineup, setOppLineup] = useState([]);
  const [teamScore, setTeamScore] = useState("");
  const [oppScore, setOppScore] = useState("");
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [oppPlayers, setOppPlayers] = useState([]);

  const [teamPlayerStat, setTeamPlayerStat] = useState([
    {
      playerName: "",
      playerId: "",
      goals: "",
      assists: "",
    },
  ]);
  const [oppPlayerStat, setOppPlayerStat] = useState([
    {
      playerName: "",
      playerId: "",
      goals: "",
      assists: "",
    },
  ]);

  const fetchTeamLineUp = async () => {
    let { data: lineup, error } = await supabase
      .from("lineup")
      .select("*")
      .eq("match_id", `${match?.match_id}`)
      .eq("team_id", `${match?.team_id}`);

    if (!error) {
      setTeamLineup(lineup);
    }
  };

  const fetchOppLineUp = async () => {
    let { data: lineup, error } = await supabase
      .from("lineup")
      .select("*")
      .eq("match_id", `${match?.match_id}`)
      .eq("team_id", `${match?.opponent_id}`);

    if (!error) {
      setOppLineup(lineup);
    }
  };

  const updateMatchScore = async () => {
    const { data, error } = await supabase
      .from("matches")
      .update({
        match_status: "completed",
        team_score: teamScore,
        opponent_score: oppScore,
      })
      .eq("match_id", `${match?.match_id}`);
  };

  const updateTeamLineUp = async () => {
    const { data, error } = await supabase
      .from("lineup")
      .update({
        goals: "",
        assists: "",
      })
      .eq("match_id", `${match?.match_id}`)
      .eq("team_id", `${match?.team_id}`);
  };

  const updateOppLineUp = async () => {
    const { data, error } = await supabase
      .from("lineup")
      .update({
        goals: "",
        assists: "",
      })
      .eq("match_id", `${match?.match_id}`)
      .eq("team_id", `${match?.opponent_id}`);
  };

  const handleSubmit = async () => {
    await updateMatchScore();
    await updateTeamLineUp();
    await updateOppLineUp();
  };

  useEffect(() => {
    fetchTeamLineUp();
    fetchOppLineUp();
  }, []);

  console.log(oppPlayers, "players");
  console.log(oppPlayerStat, "stat");

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
        <div style={{ maxHeight: "100vh", overflowY: "scroll" }}>
          <ModalHeader className="modal-header">
            <Flex justifyContent="flex-end">
              <IoCloseOutline color="#E7E9EA" size={30} onClick={onClose} />
            </Flex>
            <Flex
              flexDir="row"
              alignItems="center"
              justifyContent="space-around"
              mt={4}
            >
              <Box w="20%">
                <Input
                  type="number"
                  color="#E7E9EA"
                  value={teamScore}
                  onChange={(e) => {
                    setTeamScore(e.target.value);
                  }}
                />
              </Box>
              <Box w="20%">
                <Input
                  type="number"
                  color="#E7E9EA"
                  value={oppScore}
                  onChange={(e) => {
                    setOppScore(e.target.value);
                  }}
                />
              </Box>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <Tabs
              align="center"
              isFitted
              variant="enclosed"
              colorScheme="#161616"
            >
              <TabList>
                <Tab fontSize="lg" color="#E7E9EA">
                  {match?.team_name}
                </Tab>
                <Tab fontSize="lg" color="#E7E9EA">
                  {match?.opponent_name}
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Flex flexDir="column">
                    <Select
                      placeholder="Select Player"
                      color="#E7E9EA"
                      onChange={(e) => {
                        const newPlayer = e.target.value;
                        const playerId =
                          e.target.selectedOptions[0].getAttribute(
                            "data-player-id"
                          );
                        if (
                          newPlayer !== "" &&
                          !teamPlayers?.some(
                            (player) => player?.playerId === playerId
                          )
                        ) {
                          const updatedTeamPlayers = [...teamPlayers];
                          updatedTeamPlayers.push({
                            playerId,
                            playerName: newPlayer,
                          });
                          setTeamPlayers(updatedTeamPlayers);
                        }
                      }}
                    >
                      {teamLineup?.map((player, idx) => (
                        <option
                          key={idx}
                          value={player?.player_name}
                          data-player-id={player?.player_id}
                        >
                          {player?.player_name}
                        </option>
                      ))}
                    </Select>

                    <Flex
                      flexDir="row"
                      alignItems="center"
                      justifyContent="space-between"
                      mt={6}
                    >
                      <Text color="gray">Player</Text>
                      <Flex
                        justifyContent="flex-end"
                        w="35%"
                        alignItems="center"
                      >
                        <Text color="gray">Goals</Text>
                        <Text color="gray" ml={4}>
                          Assists
                        </Text>
                      </Flex>
                    </Flex>

                    {teamPlayers?.map((player, idx) => {
                      return (
                        <Flex
                          key={idx}
                          my={6}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Text color="#E7E9EA">{player?.playerName}</Text>
                          <Flex
                            justifyContent="flex-end"
                            w="35%"
                            alignItems="center"
                          >
                            <Box>
                              <Input
                                color="#E7E9EA"
                                type="number"
                                value={teamPlayerStat[idx]?.goals || ""}
                                onChange={(e) => {
                                  const goals = e.target.value;
                                  const playerName = player?.playerName;
                                  const playerId = player?.playerId;

                                  const updatedTeamPlayerStat = [
                                    ...teamPlayerStat,
                                  ];
                                  updatedTeamPlayerStat[idx] = {
                                    ...updatedTeamPlayerStat[idx],
                                    goals,
                                    playerName,
                                    playerId,
                                  };
                                  setTeamPlayerStat(updatedTeamPlayerStat);
                                }}
                              />
                            </Box>
                            <Box ml={4}>
                              <Input
                                color="#E7E9EA"
                                type="number"
                                value={teamPlayerStat[idx]?.assists || ""}
                                onChange={(e) => {
                                  const assists = e.target.value;
                                  const updatedTeamPlayerStat = [
                                    ...teamPlayerStat,
                                  ];
                                  updatedTeamPlayerStat[idx] = {
                                    ...updatedTeamPlayerStat[idx],
                                    assists,
                                  };
                                  setTeamPlayerStat(updatedTeamPlayerStat);
                                }}
                              />
                            </Box>
                          </Flex>
                        </Flex>
                      );
                    })}
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex flexDir="column">
                    <Select
                      placeholder="Select Player"
                      color="#E7E9EA"
                      onChange={(e) => {
                        const newPlayer = e.target.value;
                        const playerId =
                          e.target.selectedOptions[0].getAttribute(
                            "data-player-id"
                          );
                        if (
                          newPlayer !== "" &&
                          !oppPlayers?.some(
                            (player) => player?.playerId === playerId
                          )
                        ) {
                          const updatedOppPlayers = [...oppPlayers];
                          updatedOppPlayers.push({
                            playerId,
                            playerName: newPlayer,
                          });
                          setOppPlayers(updatedOppPlayers);
                        }
                      }}
                    >
                      {oppLineup?.map((player, idx) => (
                        <option
                          key={idx}
                          value={player?.player_name}
                          data-player-id={player?.player_id}
                        >
                          {player?.player_name}
                        </option>
                      ))}
                    </Select>

                    <Flex
                      flexDir="row"
                      alignItems="center"
                      justifyContent="space-between"
                      mt={6}
                    >
                      <Text color="gray">Player</Text>
                      <Flex
                        justifyContent="flex-end"
                        w="35%"
                        alignItems="center"
                      >
                        <Text color="gray">Goals</Text>
                        <Text color="gray" ml={4}>
                          Assists
                        </Text>
                      </Flex>
                    </Flex>

                    {oppPlayers?.map((player, idx) => {
                      return (
                        <Flex
                          key={idx}
                          my={6}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Text color="#E7E9EA">{player?.playerName}</Text>
                          <Flex
                            justifyContent="flex-end"
                            w="35%"
                            alignItems="center"
                          >
                            <Box>
                              <Input
                                color="#E7E9EA"
                                type="number"
                                value={oppPlayerStat[idx]?.goals || ""}
                                onChange={(e) => {
                                  const goals = e.target.value;
                                  const playerName = player?.playerName;
                                  const playerId = player?.playerId;

                                  const updatedOppPlayerStat = [
                                    ...oppPlayerStat,
                                  ];
                                  updatedOppPlayerStat[idx] = {
                                    ...updatedOppPlayerStat[idx],
                                    goals,
                                    playerName,
                                    playerId,
                                  };
                                  setOppPlayerStat(updatedOppPlayerStat);
                                }}
                              />
                            </Box>
                            <Box ml={4}>
                              <Input
                                color="#E7E9EA"
                                type="number"
                                value={oppPlayerStat[idx]?.assists || ""}
                                onChange={(e) => {
                                  const assists = e.target.value;
                                  const updatedOppPlayerStat = [
                                    ...oppPlayerStat,
                                  ];
                                  updatedOppPlayerStat[idx] = {
                                    ...updatedOppPlayerStat[idx],
                                    assists,
                                  };
                                  setOppPlayerStat(updatedOppPlayerStat);
                                }}
                              />
                            </Box>
                          </Flex>
                        </Flex>
                      );
                    })}
                  </Flex>
                </TabPanel>
              </TabPanels>
              <Button mt={6} onClick={handleSubmit}>
                Submit
              </Button>
            </Tabs>
          </ModalBody>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default UpdateMatchScoreModal;
