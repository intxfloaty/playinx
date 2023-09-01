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
  const [teamGoalCount, setTeamGoalCount] = useState([]);
  const [oppGoalCount, setOppGoalCount] = useState([]);

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

  useEffect(() => {
    fetchTeamLineUp();
    fetchOppLineUp();
  }, []);

  // console.log(match, "match");
  console.log(teamLineup, "tLine");
  console.log(oppLineup, "oppLine");

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
                    const count = Number(e.target.value);
                    const arr = Array.from(
                      { length: count },
                      (_, index) => index
                    );
                    setTeamGoalCount(arr);
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
                    const count = Number(e.target.value);
                    const arr = Array.from(
                      { length: count },
                      (_, index) => index
                    );
                    setOppGoalCount(arr);
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
                  {teamGoalCount?.map((count, idx) => {
                    return (
                      <Box
                        key={idx}
                        mt={4}
                        borderBottomColor="gray"
                        borderBottomWidth="1px"
                        borderBottomStyle="dashed"
                        pb={2}
                      >
                        {/* goals */}
                        <Flex
                          flexDir="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <IoFootballOutline color="#E7E9EA" size={20} />
                          <Box w="60%">
                            <Select
                              placeholder="Select player"
                              color="#E7E9EA"
                              onChange={(e) => {}}
                            >
                              {teamLineup?.map((player, idx) => (
                                <option key={idx} value={player?.player_name}>
                                  {player?.player_name}
                                </option>
                              ))}
                            </Select>
                          </Box>
                        </Flex>
                        {/* end of goals */}

                        {/* assists */}
                        <Flex
                          flexDir="row"
                          justifyContent="space-between"
                          alignItems="center"
                          mt={2}
                        >
                          <IoFlash color="#E7E9EA" size={20} />
                          <Box w="60%">
                            <Select
                              placeholder="Select player"
                              color="#E7E9EA"
                              onChange={(e) => {}}
                            >
                              {teamLineup?.map((player, idx) => (
                                <option key={idx} value={player?.player_name}>
                                  {player?.player_name}
                                </option>
                              ))}
                            </Select>
                          </Box>
                        </Flex>
                        {/* end of assists */}
                      </Box>
                    );
                  })}
                </TabPanel>
                <TabPanel>
                  {oppGoalCount?.map((count, idx) => {
                    return (
                      <Box
                        key={idx}
                        mt={4}
                        borderBottomColor="gray"
                        borderBottomWidth="1px"
                        borderBottomStyle="dashed"
                        pb={2}
                      >
                        {/* goals */}
                        <Flex
                          flexDir="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <IoFootballOutline color="#E7E9EA" size={20} />
                          <Box w="60%">
                            <Select
                              placeholder="Select player"
                              color="#E7E9EA"
                              onChange={(e) => {}}
                            >
                              {oppLineup?.map((player, idx) => (
                                <option key={idx} value={player?.player_name}>
                                  {player?.player_name}
                                </option>
                              ))}
                            </Select>
                          </Box>
                        </Flex>
                        {/* end of goals */}

                        {/* assists */}
                        <Flex
                          flexDir="row"
                          justifyContent="space-between"
                          alignItems="center"
                          mt={2}
                        >
                          <IoFlash color="#E7E9EA" size={20} />
                          <Box w="60%">
                            <Select
                              placeholder="Select player"
                              color="#E7E9EA"
                              onChange={(e) => {}}
                            >
                              {oppLineup?.map((player, idx) => (
                                <option key={idx} value={player?.player_name}>
                                  {player?.player_name}
                                </option>
                              ))}
                            </Select>
                          </Box>
                        </Flex>
                        {/* end of assists */}
                      </Box>
                    );
                  })}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default UpdateMatchScoreModal;
