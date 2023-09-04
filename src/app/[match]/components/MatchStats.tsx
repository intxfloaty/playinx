import React from "react";
import {
  Flex,
  Text,
  Progress,
  Tabs,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Box,
} from "../../chakraExports";
import { IoFootballOutline } from "react-icons/io5";

const MatchStats = ({ match }) => {
  return (
    <>
      {/* Team stat */}
      <Box backgroundColor="#161616" borderRadius={7} mb={30}>
        <Flex bg="black" justifyContent="center" p={3}>
          <Text fontSize="lg" color="#E7E9EA">
            TEAM STAT
          </Text>
        </Flex>
        <Flex
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          p={6}
          borderY="1px solid gray"
        >
          <Flex justifyContent="flex-start">
            <Text fontSize="md" color="#E7E9EA">
              {match?.team_score}
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="md" color="#E7E9EA">
              GOALS SCORED
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="md" color="#E7E9EA">
              {match?.opponent_score}
            </Text>
          </Flex>
        </Flex>

        <Flex
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          p={6}
          borderY="1px solid gray"
        >
          <Flex>
            <Text fontSize="md" color="#E7E9EA">
              {match?.opponent_score}
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="md" color="#E7E9EA">
              GOALS CONCEDED
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="md" color="#E7E9EA">
              {match?.team_score}
            </Text>
          </Flex>
        </Flex>

        <Flex
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          p={6}
          borderY="1px solid gray"
        >
          <Flex>
            <Text fontSize="md" color="#E7E9EA">
              8
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="md" color="#E7E9EA">
              CORNERS
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="md" color="#E7E9EA">
              5
            </Text>
          </Flex>
        </Flex>

        <Flex
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          p={6}
          borderY="1px solid gray"
        >
          <Flex>
            <Text fontSize="md" color="#E7E9EA">
              2
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="md" color="#E7E9EA">
              YELLOW CARD
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="md" color="#E7E9EA">
              5
            </Text>
          </Flex>
        </Flex>

        <Flex
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          p={6}
          borderY="1px solid gray"
        >
          <Flex>
            <Text fontSize="md" color="#E7E9EA">
              0
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="md" color="#E7E9EA">
              RED CARD
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="md" color="#E7E9EA">
              0
            </Text>
          </Flex>
        </Flex>
      </Box>
      {/* <Text fontSize="xs" color="#E7E9EA" >*More stats will be included in the future</Text> */}

      {/* Player stat */}
      <Flex bg="black" flexDir="column" justifyContent="center">
        <Text fontSize="lg" color="#E7E9EA" mb={5}>
          PLAYER STAT
        </Text>
      </Flex>

      <Tabs align="center" isFitted variant="enclosed">
        <TabList bg="black">
          <Tab fontSize="lg" color="#E7E9EA">
            {match?.team_name}
          </Tab>
          <Tab fontSize="lg" color="#E7E9EA">
            {match?.opponent_name}
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            {/* GK */}
            <Box backgroundColor="#161616" borderRadius={7} mt={6}>
              <Flex
                justifyContent="flex-start"
                p={3}
                borderBottom="1px solid gray"
              >
                <Text fontSize="md" color="#E7E9EA">
                  GOAL KEEPER
                </Text>
              </Flex>
              <Flex
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                p={4}
                borderBottom="1px solid gray"
              >
                <Flex flexDir="column">
                  <Text fontSize="md" color="#E7E9EA" my={1}>
                    Iker Casiilas
                  </Text>
                  <IoFootballOutline color="#E7E9EA" size={16} />
                </Flex>
                <Flex>
                  <Text fontSize="md" color="#E7E9EA">
                    +30
                  </Text>
                </Flex>
              </Flex>
            </Box>

            {/* DEFENCE */}
            <Box backgroundColor="#161616" borderRadius={7} mt={6}>
              <Flex
                justifyContent="flex-start"
                p={3}
                borderBottom="1px solid gray"
              >
                <Text fontSize="md" color="#E7E9EA">
                  DEFENCE
                </Text>
              </Flex>
              <Flex
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                p={4}
                borderBottom="1px solid gray"
              >
                <Flex flexDir="column">
                  <Text fontSize="md" color="#E7E9EA" my={1}>
                    Iker Casiilas
                  </Text>
                  <IoFootballOutline color="#E7E9EA" size={16} />
                </Flex>
                <Flex>
                  <Text fontSize="md" color="#E7E9EA">
                    +30
                  </Text>
                </Flex>
              </Flex>
            </Box>

            {/* MID */}
            <Box backgroundColor="#161616" borderRadius={7} mt={6}>
              <Flex
                justifyContent="flex-start"
                p={3}
                borderBottom="1px solid gray"
              >
                <Text fontSize="md" color="#E7E9EA">
                  MID-FIELD
                </Text>
              </Flex>
              <Flex
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                p={4}
                borderBottom="1px solid gray"
              >
                <Flex flexDir="column">
                  <Text fontSize="md" color="#E7E9EA" my={1}>
                    Iker Casiilas
                  </Text>
                  <IoFootballOutline color="#E7E9EA" size={16} />
                </Flex>
                <Flex>
                  <Text fontSize="md" color="#E7E9EA">
                    +30
                  </Text>
                </Flex>
              </Flex>
            </Box>

            {/* ATTACK */}
            <Box backgroundColor="#161616" borderRadius={7} my={6}>
              <Flex
                justifyContent="flex-start"
                p={3}
                borderBottom="1px solid gray"
              >
                <Text fontSize="md" color="#E7E9EA">
                  ATTACK
                </Text>
              </Flex>
              <Flex
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                p={4}
                borderBottom="1px solid gray"
              >
                <Flex flexDir="column">
                  <Text fontSize="md" color="#E7E9EA" my={1}>
                    Iker Casiilas
                  </Text>
                  <IoFootballOutline color="#E7E9EA" size={16} />
                </Flex>
                <Flex>
                  <Text fontSize="md" color="#E7E9EA">
                    +30
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </TabPanel>

          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default MatchStats;
