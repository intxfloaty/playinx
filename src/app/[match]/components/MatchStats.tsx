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

type Squad = {
  goalKeeper: [];
  midField: [];
  defence: [];
  attack: [];
};

type Player = {
  player_name: string;
  player_rating: string;
  player_position: string;
  player_id: string;
  match_rating: string
  team_id: string;
};

const MatchStats = ({ matchId, match }) => {
  const supabase = createClientComponentClient();
  const [mySquad, setMySquad] = useState<Squad>();
  const [oppSquad, setOppSquad] = useState<Squad>();

  const fetchMyTeamLineup = async () => {
    let { data: lineup, error } = await supabase
      .from("lineup")
      .select("*")
      .eq("match_id", matchId)
      .eq("team_id", match?.team_id);

    if (!error) {
      const initialSquad = {
        goalKeeper: [],
        defence: [],
        midField: [],
        attack: [],
      };

      const updatedSquad = lineup?.reduce((acc, player) => {
        switch (player.player_position) {
          case "Goal-Keeper":
            acc.goalKeeper.push(player);
            break;
          case "Defence":
            acc.defence.push(player);
            break;
          case "Mid-Field":
            acc.midField.push(player);
            break;
          case "Attack":
            acc.attack.push(player);
            break;
          default:
            // Handle any other positions as needed
            break;
        }
        return acc;
      }, initialSquad);

      setMySquad(updatedSquad);
    }
  };

  const fetchOppTeamLineup = async () => {
    let { data: lineup, error } = await supabase
      .from("lineup")
      .select("*")
      .eq("match_id", matchId)
      .eq("team_id", match?.opponent_id);

    if (!error) {
      const initialSquad = {
        goalKeeper: [],
        defence: [],
        midField: [],
        attack: [],
      };

      const updatedSquad = lineup?.reduce((acc, player) => {
        switch (player.player_position) {
          case "Goal-Keeper":
            acc.goalKeeper.push(player);
            break;
          case "Defence":
            acc.defence.push(player);
            break;
          case "Mid-Field":
            acc.midField.push(player);
            break;
          case "Attack":
            acc.attack.push(player);
            break;
          default:
            // Handle any other positions as needed
            break;
        }
        return acc;
      }, initialSquad);

      setOppSquad(updatedSquad);
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
                <Flex
                  justifyContent="flex-start"
                  p={3}
                  borderBottom="1px solid gray"
                >
                  <Text fontSize="md" color="gray">
                    GOAL KEEPER
                  </Text>
                </Flex>
                {mySquad?.goalKeeper?.map((squad: Player, idx) => {
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
                        <IoFootballOutline color="#E7E9EA" size={16} />
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

              <Box backgroundColor="#161616" borderRadius={7} mt={6}>
                <Flex
                  justifyContent="flex-start"
                  p={3}
                  borderBottom="1px solid gray"
                >
                  <Text fontSize="md" color="gray">
                    DEFENCE
                  </Text>
                </Flex>
                {mySquad?.defence?.map((squad: Player, idx) => {
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
                        <IoFootballOutline color="#E7E9EA" size={16} />
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

              <Box backgroundColor="#161616" borderRadius={7} mt={6}>
                <Flex
                  justifyContent="flex-start"
                  p={3}
                  borderBottom="1px solid gray"
                >
                  <Text fontSize="md" color="gray">
                    MID-FIELD
                  </Text>
                </Flex>
                {mySquad?.midField?.map((squad: Player, idx) => {
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
                        <IoFootballOutline color="#E7E9EA" size={16} />
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

              <Box backgroundColor="#161616" borderRadius={7} mt={6}>
                <Flex
                  justifyContent="flex-start"
                  p={3}
                  borderBottom="1px solid gray"
                >
                  <Text fontSize="md" color="gray">
                    ATTACK
                  </Text>
                </Flex>
                {mySquad?.attack?.map((squad: Player, idx) => {
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
                        <IoFootballOutline color="#E7E9EA" size={16} />
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
                <Flex
                  justifyContent="flex-start"
                  p={3}
                  borderBottom="1px solid gray"
                >
                  <Text fontSize="md" color="gray">
                    GOAL KEEPER
                  </Text>
                </Flex>
                {oppSquad?.goalKeeper?.map((squad: Player, idx) => {
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
                        <IoFootballOutline color="#E7E9EA" size={16} />
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

              <Box backgroundColor="#161616" borderRadius={7} mt={6}>
                <Flex
                  justifyContent="flex-start"
                  p={3}
                  borderBottom="1px solid gray"
                >
                  <Text fontSize="md" color="gray">
                    DEFENCE
                  </Text>
                </Flex>
                {oppSquad?.defence?.map((squad: Player, idx) => {
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
                        <IoFootballOutline color="#E7E9EA" size={16} />
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

              <Box backgroundColor="#161616" borderRadius={7} mt={6}>
                <Flex
                  justifyContent="flex-start"
                  p={3}
                  borderBottom="1px solid gray"
                >
                  <Text fontSize="md" color="gray">
                    MID-FIELD
                  </Text>
                </Flex>
                {oppSquad?.midField?.map((squad: Player, idx) => {
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
                        <IoFootballOutline color="#E7E9EA" size={16} />
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

              <Box backgroundColor="#161616" borderRadius={7} mt={6}>
                <Flex
                  justifyContent="flex-start"
                  p={3}
                  borderBottom="1px solid gray"
                >
                  <Text fontSize="md" color="gray">
                    ATTACK
                  </Text>
                </Flex>
                {oppSquad?.attack?.map((squad: Player, idx) => {
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
                        <IoFootballOutline color="#E7E9EA" size={16} />
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
        <Center mt={50}><Text fontSize="xl" color="#E7E9EA">Match Stats will be available after the match!</Text></Center>
      </>
    )
  }
};

export default MatchStats;
