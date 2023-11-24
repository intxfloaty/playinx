import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
  Center,
} from "../../chakraExports";
import { IoFootballOutline } from "react-icons/io5";
import { GiSoccerKick } from "react-icons/gi";

type Player = {
  player_name: string;
  player_rating: string;
  player_position: string;
  player_id: string;
  match_rating: string
  team_id: string;
  goals: string;
  assists: string;
};

const MatchStats = ({ matchId, match }) => {
  const supabase = createClientComponentClient();
  const [mySquad, setMySquad] = useState<Player[]>([]);
  const [oppSquad, setOppSquad] = useState<Player[]>([]);

  const fetchMyTeamLineup = async () => {
    let { data: lineup, error } = await supabase
      .from("lineup")
      .select("*")
      .eq("match_id", matchId)
      .eq("team_id", match?.team_id);

    if (!error) {
      setMySquad(lineup);
    }
  };

  const fetchOppTeamLineup = async () => {
    let { data: lineup, error } = await supabase
      .from("lineup")
      .select("*")
      .eq("match_id", matchId)
      .eq("team_id", match?.opponent_id);

    if (!error) {
      setOppSquad(lineup);
    }
  };

  useEffect(() => {
    if (match) {
      fetchMyTeamLineup();
      fetchOppTeamLineup();
    }
  }, [match]);

  if (match?.match_status === "completed") {
    return (
      <>
        {match?.match_status === "completed"}
        {/* Team stat */}
        <Box backgroundColor="#161616" mb={30}>
          <Flex bg="black" justifyContent="center" p={3}>
            <Text fontSize="lg" color="#E7E9EA">
              TEAM STAT
            </Text>
          </Flex>
          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            p={3}
            borderRadius={7}
            borderBottom="1px solid gray"
          >
            <Flex justifyContent="flex-start" flexDir="column">
              <Text fontSize="md" color="#E7E9EA">
                {match?.team_match_rating}
              </Text>
              <Text fontSize="sm" color="gray">
                {match?.team_rating}
              </Text>
            </Flex>
            <Flex>
              <Text fontSize="md" color="gray">
                RATING
              </Text>
            </Flex>
            <Flex flexDir="column">
              <Text fontSize="md" color="#E7E9EA">
                {match?.opponent_match_rating}
              </Text>
              <Text fontSize="sm" color="gray">
                {match?.opponent_rating}
              </Text>
            </Flex>
          </Flex>
          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            p={3}
            borderY="1px solid gray"
          >
            <Flex justifyContent="flex-start">
              <Text fontSize="md" color="#E7E9EA">
                {match?.team_score}
              </Text>
            </Flex>
            <Flex>
              <Text fontSize="md" color="gray">
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
            p={3}
            borderY="1px solid gray"
          >
            <Flex>
              <Text fontSize="md" color="#E7E9EA">
                {match?.opponent_score}
              </Text>
            </Flex>
            <Flex>
              <Text fontSize="md" color="gray">
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
            p={3}
            borderY="1px solid gray"
          >
            <Flex>
              <Text fontSize="md" color="#E7E9EA">
                {match?.team_corner}
              </Text>
            </Flex>
            <Flex>
              <Text fontSize="md" color="gray">
                CORNERS
              </Text>
            </Flex>
            <Flex>
              <Text fontSize="md" color="#E7E9EA">
                {match?.opponent_corner}
              </Text>
            </Flex>
          </Flex>

          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            p={3}
            borderY="1px solid gray"
          >
            <Flex>
              <Text fontSize="md" color="#E7E9EA">
                {match?.team_yellow_card}
              </Text>
            </Flex>
            <Flex>
              <Text fontSize="md" color="gray">
                YELLOW CARD
              </Text>
            </Flex>
            <Flex>
              <Text fontSize="md" color="#E7E9EA">
                {match?.opponent_yellow_card}
              </Text>
            </Flex>
          </Flex>

          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            p={3}
            borderY="1px solid gray"
          >
            <Flex>
              <Text fontSize="md" color="#E7E9EA">
                {match?.team_red_card}
              </Text>
            </Flex>
            <Flex>
              <Text fontSize="md" color="gray">
                RED CARD
              </Text>
            </Flex>
            <Flex>
              <Text fontSize="md" color="#E7E9EA">
                {match?.opponent_red_card}
              </Text>
            </Flex>
          </Flex>
        </Box >

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
              <Box backgroundColor="#161616" borderRadius={7} mt={6}>
                {mySquad?.map((squad: Player, idx) => {

                  const numberOfGoals = Number(squad?.goals)

                  const numberOfAssists = Number(squad?.assists)

                  // Create an array with the desired number of goal icons
                  const goalIcons = Array.from({ length: numberOfGoals }, (_, goalIdx) => (
                    <Box key={goalIdx}>
                      <IoFootballOutline color="#E7E9EA" size={16} />
                    </Box>
                  ));

                  const assistIcons = Array.from({ length: numberOfAssists }, (_, goalIdx) => (
                    <Box key={goalIdx}>
                      <GiSoccerKick color="#E7E9EA" size={16} />
                    </Box>
                  ));
                  return (
                    <Flex
                      key={idx}
                      flexDir="row"
                      alignItems="center"
                      justifyContent="space-between"
                      p={3}
                      borderBottom="1px solid gray"
                    >
                      <Flex flexDir="column">
                        <Text fontSize="md" color="#E7E9EA" my={1}>
                          {squad?.player_name}
                        </Text>
                        <Flex>
                          <Flex>
                            {goalIcons}
                          </Flex>
                          <Flex>
                            {assistIcons}
                          </Flex>
                        </Flex>
                      </Flex>
                      <Flex>
                        <Text fontSize="md" color="#E7E9EA">
                          {squad?.match_rating}
                        </Text>
                      </Flex>
                    </Flex>
                  );
                })}
              </Box>
            </TabPanel>

            <TabPanel p={0}>
              <Box backgroundColor="#161616" borderRadius={7} mt={6}>
                {oppSquad?.map((squad: Player, idx) => {
                  const numberOfGoals = Number(squad?.goals)

                  const numberOfAssists = Number(squad?.assists)


                  // Create an array with the desired number of goal icons
                  const goalIcons = Array.from({ length: numberOfGoals }, (_, goalIdx) => (
                    <Box key={goalIdx} mr={1}>
                      <IoFootballOutline color="#E7E9EA" size={16} />
                    </Box>
                  ));

                  const assistIcons = Array.from({ length: numberOfAssists }, (_, goalIdx) => (
                    <Box key={goalIdx} mr={1}>
                      <GiSoccerKick color="#E7E9EA" size={16} />
                    </Box>
                  ));
                  return (
                    <Flex
                      key={idx}
                      flexDir="row"
                      alignItems="center"
                      justifyContent="space-between"
                      p={3}
                      borderBottom="1px solid gray"
                    >
                      <Flex flexDir="column">
                        <Text fontSize="md" color="#E7E9EA" my={1}>
                          {squad?.player_name}
                        </Text>
                        <Flex>
                          <Flex>
                            {goalIcons}
                          </Flex>
                          <Flex>
                            {assistIcons}
                          </Flex>
                        </Flex>
                      </Flex>
                      <Flex>
                        <Text fontSize="md" color="#E7E9EA">
                          {squad?.match_rating}
                        </Text>
                      </Flex>
                    </Flex>
                  );
                })}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    );
  } else {
    return (
      <>
        <Center mt={50}><Text fontSize="xl" color="GrayText">Match Stats will be available after the match!</Text></Center>
      </>
    )
  }
};

export default MatchStats;
