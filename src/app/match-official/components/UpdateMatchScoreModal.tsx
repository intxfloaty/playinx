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
import TeamStat from "./TeamStat";

interface Errors {
  [key: string]: string;
}

type TeamStat = {
  teamScore: string;
  teamCorner: string;
  teamYellowCard: string;
  teamRedCard: string;
  teamDiscipline: string;
};

type OppStat = {
  oppScore: string;
  oppCorner: string;
  oppYellowCard: string;
  oppRedCard: string;
  oppDiscipline: string;
};

const UpdateMatchScoreModal = ({ isOpen, onClose, match }) => {
  const supabase = createClientComponentClient();
  const [teamLineup, setTeamLineup] = useState([]);
  const [oppLineup, setOppLineup] = useState([]);

  const [teamStat, setTeamStat] = useState<TeamStat>({
    teamScore: "0",
    teamCorner: "0",
    teamYellowCard: "0",
    teamRedCard: "0",
    teamDiscipline: "",
  });
  const [oppStat, setOppStat] = useState<OppStat>({
    oppScore: "0",
    oppCorner: "0",
    oppYellowCard: "0",
    oppRedCard: "0",
    oppDiscipline: "",
  });

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
        team_score: teamStat?.teamScore,
        team_corner: teamStat?.teamCorner,
        team_yellow_card: teamStat?.teamYellowCard,
        team_red_card: teamStat?.teamRedCard,
        team_discipline: teamStat?.teamDiscipline,
        opponent_score: oppStat?.oppScore,
        opponent_corner: oppStat?.oppCorner,
        opponent_yellow_card: oppStat?.oppYellowCard,
        opponent_red_card: oppStat?.oppRedCard,
        opponent_discipline: oppStat?.oppDiscipline,
      })
      .eq("match_id", `${match?.match_id}`);

    console.log(error, "updateMatchErr");
  };

  const updateTeamLineUpStat = () => {
    teamPlayerStat?.map(async (teamPlayer) => {
      const { data, error } = await supabase
        .from("lineup")
        .update({
          goals: teamPlayer?.goals,
          assists: teamPlayer?.assists,
          card: teamPlayer?.card,
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
        teamGoalCount === Number(teamStat?.teamScore) &&
        oppGoalCount === Number(oppStat?.oppScore)
      )
    ) {
      errors.playerScoreError =
        "Team score and no of goals scored by players should be equal!";
    }

    if (!teamStat?.teamScore) {
      errors.teamScoreErr = "Please enter team score";
    }
    if (!teamStat?.teamCorner) {
      errors.teamCorner = "Please enter team corners";
    }
    if (!teamStat?.teamYellowCard) {
      errors.teamYellowCard = "Please enter team yellow cards";
    }
    if (!teamStat?.teamRedCard) {
      errors.teamRedCard = "Please enter team red cards ";
    }
    if (!teamStat?.teamDiscipline) {
      errors.teamDiscipline = "Please select team discipline";
    }
    if (!oppStat?.oppScore) {
      errors.oppScoreErr = "Please enter team score";
    }
    if (!oppStat?.oppCorner) {
      errors.oppCorner = "Please enter team corners";
    }
    if (!oppStat?.oppYellowCard) {
      errors.oppYellowCard = "Please enter team yellow cards";
    }
    if (!oppStat?.oppRedCard) {
      errors.oppRedCard = "Please enter team red cards ";
    }
    if (!oppStat?.oppDiscipline) {
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
  }, [teamPlayerStat, oppPlayerStat, teamStat?.teamScore, oppStat?.oppScore]);

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
          <TeamStat
            teamStat={teamStat}
            setTeamStat={setTeamStat}
            oppStat={oppStat}
            setOppStat={setOppStat}
            goalError={goalError}
          />
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

                  {/* Player stat header */}
                  <Flex
                    flexDir="row"
                    alignItems="center"
                    // justifyContent="space-between"
                    mt={6}
                  >
                    <Text color="gray" fontSize="sm" flex="1" textAlign="left">
                      Player
                    </Text>
                    <Flex
                      justifyContent="flex-end"
                      alignItems="center"
                      flex="2"
                    >
                      <Box flex="1">
                        <Text color="gray" fontSize="sm">
                          Goals
                        </Text>
                      </Box>
                      <Box flex="1" mx={4}>
                        <Text color="gray" fontSize="sm">
                          Assists
                        </Text>
                      </Box>
                      <Box flex="1">
                        <Text color="gray" fontSize="sm">
                          Card
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>

                  {/* Player stat rows */}
                  {teamPlayers?.map((player, idx) => {
                    return (
                      <Flex
                        key={idx}
                        my={6}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text
                          color="black"
                          fontSize="sm"
                          flex="1"
                          textAlign="left"
                        >
                          {player?.playerName}
                        </Text>
                        <Flex
                          justifyContent="flex-end"
                          alignItems="center"
                          flex="2"
                        >
                          <Box flex="1">
                            <Input
                              color="black"
                              borderColor="#161616"
                              type="number"
                              textAlign="center"
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
                          <Box flex="1" mx={4}>
                            <Input
                              color="black"
                              borderColor="#161616"
                              type="number"
                              textAlign="center"
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
                          <Box flex="1">
                            <Select
                              placeholder="Select"
                              color="black"
                              borderColor="#161616"
                              onChange={(e) => {
                                const card = e.target.value;
                                const playerName = player?.playerName;
                                const playerId = player?.playerId;
                                const updatedTeamPlayerStat = [
                                  ...teamPlayerStat,
                                ];
                                updatedTeamPlayerStat[idx] = {
                                  ...updatedTeamPlayerStat[idx],
                                  card,
                                  playerName,
                                  playerId,
                                };
                                setTeamPlayerStat(updatedTeamPlayerStat);
                              }}
                            >
                              <option value="Y">Y</option>
                              <option value="R">R</option>
                            </Select>
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

                  {/* Player stat header */}
                  <Flex
                    flexDir="row"
                    alignItems="center"
                    // justifyContent="space-between"
                    mt={6}
                  >
                    <Text color="gray" fontSize="sm" flex="1" textAlign="left">
                      Player
                    </Text>
                    <Flex
                      justifyContent="flex-end"
                      alignItems="center"
                      flex="2"
                    >
                      <Box flex="1">
                        <Text color="gray" fontSize="sm">
                          Goals
                        </Text>
                      </Box>
                      <Box flex="1" mx={4}>
                        <Text color="gray" fontSize="sm">
                          Assists
                        </Text>
                      </Box>
                      <Box flex="1">
                        <Text color="gray" fontSize="sm">
                          Card
                        </Text>
                      </Box>
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
                        <Text color="black" flex="1" textAlign="left">
                          {player?.playerName}
                        </Text>
                        <Flex
                          justifyContent="flex-end"
                          alignItems="center"
                          flex="2"
                        >
                          <Box flex="1">
                            <Input
                              color="black"
                              borderColor="#161616"
                              textAlign="center"
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
                          <Box flex="1" mx={4}>
                            <Input
                              color="black"
                              borderColor="#161616"
                              textAlign="center"
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
                          <Box flex="1">
                            <Select
                              placeholder="Select"
                              color="black"
                              borderColor="#161616"
                              onChange={(e) => {
                                const card = e.target.value;
                                const playerName = player?.playerName;
                                const playerId = player?.playerId;
                                const updatedTeamPlayerStat = [
                                  ...oppPlayerStat,
                                ];
                                updatedTeamPlayerStat[idx] = {
                                  ...updatedTeamPlayerStat[idx],
                                  card,
                                  playerName,
                                  playerId,
                                };
                                setOppPlayerStat(updatedTeamPlayerStat);
                              }}
                            >
                              <option value="Y">Y</option>
                              <option value="R">R</option>
                            </Select>
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
