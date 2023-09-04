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

const MatchStats = ({ match }) => {
  return (
    <>
      {/* Team stat */}
      <Box backgroundColor="#161616" borderRadius={7} my={6}>
        <Flex justifyContent="center" p={3}>
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

      {/* Player stat */}
      <Box backgroundColor="#161616" borderRadius={7} my={6}>
        <Flex flexDir="column" justifyContent="center" p={3}>
          <Text fontSize="lg" color="#E7E9EA" mb={3}>
            PLAYER STAT
          </Text>

          <Tabs align="center" isFitted variant="enclosed">
            <TabList>
              <Tab fontSize="lg" color="#E7E9EA">
                Mohan Bagan
              </Tab>
              <Tab fontSize="lg" color="#E7E9EA">
                Kerala Blasters
              </Tab>
            </TabList>
            {/* <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="#E7E9EA"
              borderRadius="1px"
            /> */}

            <TabPanels>
              <TabPanel></TabPanel>

              <TabPanel></TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </>
  );
};

export default MatchStats;
