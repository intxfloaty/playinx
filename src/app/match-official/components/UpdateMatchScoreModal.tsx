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
import { IoCloseOutline } from "react-icons/io5";

interface Errors {
  [key: string]: string;
}

const UpdateMatchScoreModal = ({ isOpen, onClose, match }) => {
  const supabase = createClientComponentClient();
  const [teamLineup, setTeamLineup] = useState([]);
  const [oppLineup, setOppLineup] = useState([]);

  // team
  const [teamScore, setTeamScore] = useState("0");
  const [teamCorner, setTeamCorner] = useState("0");
  const [teamYellowCard, setTeamYellowCard] = useState("0");
  const [teamRedCard, setTeamRedCard] = useState("0");
  const [teamDiscipline, setTeamDiscipline] = useState("");

  // opp
  const [oppScore, setOppScore] = useState("0");
  const [oppCorner, setOppCorner] = useState("0");
  const [oppYellowCard, setOppYellowCard] = useState("0");
  const [oppRedCard, setOppRedCard] = useState("0");
  const [oppDiscipline, setOppDiscipline] = useState("");

  const [teamPlayers, setTeamPlayers] = useState([]);
  const [oppPlayers, setOppPlayers] = useState([]);
  const [goalError, setGoalError] = useState<Errors>({});

  const [teamPlayerStat, setTeamPlayerStat] = useState([]);
  const [oppPlayerStat, setOppPlayerStat] = useState([]);

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

  const updateTeamLineUpStat = () => {
    teamPlayerStat?.map(async (teamPlayer) => {
      const { data, error } = await supabase
        .from("lineup")
        .update({
          goals: teamPlayer?.goals,
          assists: teamPlayer?.assists,
        })
        .eq("match_id", `${match?.match_id}`)
        .eq("team_id", `${match?.team_id}`)
        .eq("player_id", `${teamPlayer?.playerId}`);

      console.log(error, "teamStatErr");
    });
  };

  const updateOppLineUpStat = () => {
    oppPlayerStat?.map(async (oppPlayer) => {
      const { data, error } = await supabase
        .from("lineup")
        .update({
          goals: oppPlayer?.goals,
          assists: oppPlayer?.assists,
        })
        .eq("match_id", `${match?.match_id}`)
        .eq("team_id", `${match?.opponent_id}`)
        .eq("player_id", `${oppPlayer?.playerId}`);

      console.log(error, "oppStatErr");
    });
  };

  const validateGoalCount = () => {
    let teamGoalCount = 0;
    let oppGoalCount = 0;
    let errors: Errors = {};

    if (teamPlayerStat) {
      teamGoalCount = teamPlayerStat.reduce((totalGoals, player) => {
        const goals = Number(player?.goals);
        return totalGoals + goals;
      }, 0);
    }

    if (oppPlayerStat) {
      oppGoalCount = oppPlayerStat.reduce((totalGoals, player) => {
        const goals = Number(player?.goals);
        return totalGoals + goals;
      }, 0);
    }

    if (
      !(
        teamGoalCount === Number(teamScore) && oppGoalCount === Number(oppScore)
      )
    ) {
      errors.playerScoreError =
        "Team score and no of goals scored by players should be equal!";
    }

    if (!teamScore) {
      errors.teamScoreErr = "Please enter team score";
    }
    if (!teamCorner) {
      errors.teamCorner = "Please enter team corners";
    }
    if (!teamYellowCard) {
      errors.teamYellowCard = "Please enter team yellow cards";
    }
    if (!teamRedCard) {
      errors.teamRedCard = "Please enter team red cards ";
    }
    if (!teamDiscipline) {
      errors.teamDiscipline = "Please select team discipline";
    }
    if (!oppScore) {
      errors.oppScoreErr = "Please enter team score";
    }
    if (!oppCorner) {
      errors.oppCorner = "Please enter team corners";
    }
    if (!oppYellowCard) {
      errors.oppYellowCard = "Please enter team yellow cards";
    }
    if (!oppRedCard) {
      errors.oppRedCard = "Please enter team red cards ";
    }
    if (!oppDiscipline) {
      errors.oppDiscipline = "Please select team discipline";
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateGoalCount();
    if (Object.keys(errors).length === 0) {
      await updateMatchScore();
      updateTeamLineUpStat();
      updateOppLineUpStat();
      onClose();
    } else setGoalError(errors);
  };

  useEffect(() => {
    if (Object.keys(goalError).length !== 0) {
      setGoalError(validateGoalCount());
    }
  }, [teamPlayerStat, oppPlayerStat, teamScore, oppScore]);

  useEffect(() => {
    fetchTeamLineUp();
    fetchOppLineUp();
  }, []);

  console.log(oppPlayers, "players");
  console.log(oppPlayerStat, "stat");
  console.log(goalError, "gERR");

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
        {/* <div style={{ maxHeight: "100vh", overflowY: "scroll" }}> */}
        <ModalHeader>
          <Flex justifyContent="flex-end">
            <IoCloseOutline color="black" size={30} onClick={onClose} />
          </Flex>
        </ModalHeader>
        <ModalBody>
          {/* Goals */}
          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            mt={4}
          >
            <Box w="20%">
              <Input
                type="number"
                color="black"
                borderColor="#161616"
                isInvalid={!!goalError.teamScoreErr}
                errorBorderColor={goalError.teamScoreErr ? "#FFB400" : ""}
                value={teamScore}
                onChange={(e) => {
                  setTeamScore(e.target.value);
                }}
              />
            </Box>
            <Box>Goals</Box>
            <Box w="20%">
              <Input
                type="number"
                color="black"
                borderColor="#161616"
                isInvalid={!!goalError.oppScoreErr}
                errorBorderColor={goalError.oppScoreErr ? "#FFB400" : ""}
                value={oppScore}
                onChange={(e) => {
                  setOppScore(e.target.value);
                }}
              />
            </Box>
          </Flex>

          {/* Corners */}
          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            mt={4}
          >
            <Box w="20%">
              <Input
                type="number"
                color="black"
                borderColor="#161616"
                isInvalid={!!goalError.teamCorner}
                errorBorderColor={goalError.teamCorner ? "#FFB400" : ""}
                value={teamCorner}
                onChange={(e) => {
                  setTeamCorner(e.target.value);
                }}
              />
            </Box>
            <Box>Corners</Box>
            <Box w="20%">
              <Input
                type="number"
                color="black"
                borderColor="#161616"
                isInvalid={!!goalError.oppCorner}
                errorBorderColor={goalError.oppCorner ? "#FFB400" : ""}
                value={oppCorner}
                onChange={(e) => {
                  setOppCorner(e.target.value);
                }}
              />
            </Box>
          </Flex>

          {/* Yellow card */}
          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            mt={4}
          >
            <Box w="20%">
              <Input
                type="number"
                color="black"
                borderColor="#161616"
                isInvalid={!!goalError.teamYellowCard}
                errorBorderColor={goalError.teamYellowCard ? "#FFB400" : ""}
                value={teamYellowCard}
                onChange={(e) => {
                  setTeamYellowCard(e.target.value);
                }}
              />
            </Box>
            <Box>Yellow card</Box>
            <Box w="20%">
              <Input
                type="number"
                color="black"
                borderColor="#161616"
                isInvalid={!!goalError.oppYellowCard}
                errorBorderColor={goalError.oppYellowCard ? "#FFB400" : ""}
                value={oppYellowCard}
                onChange={(e) => {
                  setOppYellowCard(e.target.value);
                }}
              />
            </Box>
          </Flex>

          {/* Red card */}
          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            mt={4}
          >
            <Box w="20%">
              <Input
                type="number"
                color="black"
                borderColor="#161616"
                isInvalid={!!goalError.teamRedCard}
                errorBorderColor={goalError.teamRedCard ? "#FFB400" : ""}
                value={teamRedCard}
                onChange={(e) => {
                  setTeamRedCard(e.target.value);
                }}
              />
            </Box>
            <Box>Red card</Box>
            <Box w="20%">
              <Input
                type="number"
                color="black"
                borderColor="#161616"
                isInvalid={!!goalError.oppRedCard}
                errorBorderColor={goalError.oppRedCard ? "#FFB400" : ""}
                value={oppRedCard}
                onChange={(e) => {
                  setOppRedCard(e.target.value);
                }}
              />
            </Box>
          </Flex>

          {/* Discipline */}
          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            mt={4}
          >
            <Box w="30%">
              <Select
                placeholder="Select"
                color="black"
                borderColor="#161616"
                isInvalid={!!goalError.teamDiscipline}
                errorBorderColor={goalError.teamDiscipline ? "#FFB400" : ""}
                value={teamDiscipline}
                onChange={(e) => {
                  setTeamDiscipline(e.target.value);
                }}
              >
                <option value="On Time">On Time</option>
                <option value="Late">Late</option>
                <option value="No Show">No Show</option>
              </Select>
            </Box>
            <Box>Discipline</Box>
            <Box w="30%">
              <Select
                placeholder="Select"
                color="black"
                borderColor="#161616"
                isInvalid={!!goalError.oppDiscipline}
                errorBorderColor={goalError.oppDiscipline ? "#FFB400" : ""}
                value={oppDiscipline}
                onChange={(e) => {
                  setOppDiscipline(e.target.value);
                }}
              >
                <option value="On Time">On Time</option>
                <option value="Late">Late</option>
                <option value="No Show">No Show</option>
              </Select>
            </Box>
          </Flex>

          <Tabs align="center" isFitted variant="unstyled" mt={10}>
            <TabList>
              <Tab fontSize="lg" color="black">
                {match?.team_name}
              </Tab>
              <Tab fontSize="lg" color="black">
                {match?.opponent_name}
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="#161616"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <Flex flexDir="column">
                  <Select
                    placeholder="Select Player"
                    color="black"
                    borderColor="#161616"
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
                    <Flex justifyContent="flex-end" w="38%" alignItems="center">
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
                        <Text color="black">{player?.playerName}</Text>
                        <Flex
                          justifyContent="flex-end"
                          w="38%"
                          alignItems="center"
                        >
                          <Box>
                            <Input
                              color="black"
                              borderColor="#161616"
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
                              color="black"
                              borderColor="#161616"
                              type="number"
                              value={teamPlayerStat[idx]?.assists || ""}
                              onChange={(e) => {
                                const assists = e.target.value;
                                const playerName = player?.playerName;
                                const playerId = player?.playerId;
                                const updatedTeamPlayerStat = [
                                  ...teamPlayerStat,
                                ];
                                updatedTeamPlayerStat[idx] = {
                                  ...updatedTeamPlayerStat[idx],
                                  assists,
                                  playerName,
                                  playerId,
                                };
                                setTeamPlayerStat(updatedTeamPlayerStat);
                              }}
                            />
                          </Box>
                          <Box position="absolute" right={2}>
                            <IoCloseOutline
                              color="black"
                              size={24}
                              onClick={() => {
                                const updatedTeamPlayers = teamPlayers.filter(
                                  (_, i) => i !== idx
                                );
                                const updatedTeamPlayerStat =
                                  teamPlayerStat.filter((_, i) => i !== idx);
                                setTeamPlayerStat(updatedTeamPlayerStat);
                                setTeamPlayers(updatedTeamPlayers);
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
                    color="black"
                    borderColor="#161616"
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
                    <Flex justifyContent="flex-end" w="38%" alignItems="center">
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
                        <Text color="black">{player?.playerName}</Text>
                        <Flex
                          justifyContent="flex-end"
                          w="38%"
                          alignItems="center"
                        >
                          <Box>
                            <Input
                              color="black"
                              borderColor="#161616"
                              type="number"
                              value={oppPlayerStat[idx]?.goals || ""}
                              onChange={(e) => {
                                const goals = e.target.value;
                                const playerName = player?.playerName;
                                const playerId = player?.playerId;

                                const updatedOppPlayerStat = [...oppPlayerStat];
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
                              color="black"
                              borderColor="#161616"
                              type="number"
                              value={oppPlayerStat[idx]?.assists || ""}
                              onChange={(e) => {
                                const assists = e.target.value;
                                const playerName = player?.playerName;
                                const playerId = player?.playerId;
                                const updatedOppPlayerStat = [...oppPlayerStat];
                                updatedOppPlayerStat[idx] = {
                                  ...updatedOppPlayerStat[idx],
                                  assists,
                                  playerName,
                                  playerId,
                                };
                                setOppPlayerStat(updatedOppPlayerStat);
                              }}
                            />
                          </Box>
                          <Box position="absolute" right={2}>
                            <IoCloseOutline
                              color="black"
                              size={24}
                              onClick={() => {
                                const updatedOppPlayers = oppPlayers.filter(
                                  (_, i) => i !== idx
                                );
                                const updatedOppPlayerStat =
                                  oppPlayerStat.filter((_, i) => i !== idx);
                                setOppPlayerStat(updatedOppPlayerStat);
                                setOppPlayers(updatedOppPlayers);
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
            {(goalError.teamScoreErr || goalError.oppScoreErr) && (
              <Text fontSize="md" color="red">
                {goalError.teamScoreErr || goalError.oppScoreErr}
              </Text>
            )}
            {!goalError.playerScoreError ? (
              <Button colorScheme="messenger" mt={6} onClick={handleSubmit}>
                Submit
              </Button>
            ) : (
              <Text fontSize="md" color="red">
                {goalError.playerScoreError}
              </Text>
            )}
          </Tabs>
        </ModalBody>
        {/* </div> */}
      </ModalContent>
    </Modal>
  );
};

export default UpdateMatchScoreModal;
