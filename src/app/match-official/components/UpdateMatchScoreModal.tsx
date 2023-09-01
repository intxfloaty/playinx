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
          {/* header box */}
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

          {/* content box */}
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
                        setTeamPlayers(teamPlayers.concat(newPlayer));
                      }}
                    >
                      {teamLineup?.map((player, idx) => (
                        <option key={idx} value={player?.player_name}>
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
                          <Text color="#E7E9EA">{player}</Text>
                          <Flex
                            justifyContent="flex-end"
                            w="35%"
                            alignItems="center"
                          >
                            <Box>
                              <Input
                                color="#E7E9EA"
                                type="number"
                                value="5"
                                onChange={(e) => {}}
                              />
                            </Box>
                            <Box ml={4}>
                              <Input
                                color="#E7E9EA"
                                type="number"
                                value="5"
                                onChange={() => {}}
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
                        setOppPlayers(oppPlayers.concat(newPlayer));
                      }}
                    >
                      {oppLineup?.map((player, idx) => (
                        <option key={idx} value={player?.player_name}>
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
                          <Text color="#E7E9EA">{player}</Text>
                          <Flex
                            justifyContent="flex-end"
                            w="35%"
                            alignItems="center"
                          >
                            <Box>
                              <Input
                                color="#E7E9EA"
                                type="number"
                                value="5"
                                onChange={(e) => {}}
                              />
                            </Box>
                            <Box ml={4}>
                              <Input
                                color="#E7E9EA"
                                type="number"
                                value="5"
                                onChange={() => {}}
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
