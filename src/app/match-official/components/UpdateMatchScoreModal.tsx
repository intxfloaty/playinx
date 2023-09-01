import React, { useEffect, useRef, useState } from "react";
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
} from "react-icons/io5";

const UpdateMatchScoreModal = ({ isOpen, onClose, match }) => {
  const [teamScore, setTeamScore] = useState("");
  const [oppScore, setOppScore] = useState("");
  const [teamGoalCount, setTeamGoalCount] = useState([]);
  const [oppGoalCount, setOppGoalCount] = useState([]);

  console.log(match, "match");

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
                    console.log(e.target.value, "targer");
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
                <Input type="number" color="#E7E9EA" />
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
                            ></Select>
                          </Box>
                        </Flex>
                        {/* end of goals */}

                        {/* assists */}
                        <Flex
                          flexDir="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <IoFootstepsOutline color="#E7E9EA" size={20} />
                          <Box w="60%">
                            <Select
                              placeholder="Select player"
                              color="#E7E9EA"
                              onChange={(e) => {}}
                            ></Select>
                          </Box>
                        </Flex>
                        {/* end of assists */}
                      </Box>
                    );
                  })}
                </TabPanel>
                <TabPanel></TabPanel>
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
