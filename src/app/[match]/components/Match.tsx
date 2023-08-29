"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../database.types";
import {
  Stack,
  Text,
  Box,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  TabIndicator,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  useDisclosure,
  Divider,
  Center,
} from "../../chakraExports";
import {
  IoArrowBack,
  IoSettingsOutline,
  IoFootballOutline,
  IoFootball,
  IoFlashOutline,
} from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import useTeamStore from "../../../utils/store/teamStore";

type Match = {
  format: string;
  match_id: string;
  date: string;
  location: string;
  time: string;
  team_name: string;
  team_id: string;
  opponent_name: string;
  opponent_id: string;
  match_status: string;
  opponent_status: string;
};

type Profile = {
  name: string;
  position: string;
  rating: string;
};

type Squad = {
  player_name: string;
  player_rating: string;
  player_position: string;
  player_id: string;
  team_id: string;
};

const Match = ({ user }) => {
  const supabase = createClientComponentClient<Database>();
  const activeTeam = useTeamStore((state) => state.activeTeam);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<Profile>();
  const [match, setMatch] = useState<Match>();
  const [mySquad, setMySquad] = useState<Squad[]>([]);
  const [oppSquad, setOppSquad] = useState<Squad[]>([]);
  const [matchId, setMatchId] = useState("");

  const match_Id = searchParams.get("matchId");
  const userId = user?.id;

  const fetchPlayerDetails = async () => {
    let { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", `${userId}`);

    // console.log(profile, "profiles");
    console.log(error, "profileErr");
    if (!error) {
      setProfile(profile[0]);
    }
  };

  const fetchMatchDetails = async () => {
    let { data: matches, error } = await supabase
      .from("matches")
      .select("*")
      .eq("match_id", `${matchId}`);

    console.log(matches, "matches");
    console.log(error, "err");
    if (!error) {
      setMatch(matches[0]);
    }
  };

  const fetchMyTeamLineup = async () => {
    let { data: lineup, error } = await supabase
      .from("lineup")
      .select("*")
      .eq("match_id", matchId)
      .eq("team_id", match?.team_id);

    // console.log(lineup, "lineup");
    console.log(error, "Myerr");
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

    // console.log(lineup, "lineup");
    console.log(error, "Opperr");
    if (!error) {
      setOppSquad(lineup);
    }
  };

  const handleJoinMySquadBtn = async () => {
    const player = mySquad?.find((player) => player.player_id === userId);
    if (!player) {
      const { data, error } = await supabase.from("lineup").insert([
        {
          match_id: match?.match_id,
          player_name: profile?.name,
          player_position: profile?.position,
          player_rating: profile?.rating,
          team_id: match?.team_id,
        },
      ]);
      console.log(error, "MylineupERr");
    }
  };

  const handleJoinOppSquadBtn = async () => {
    const player = oppSquad?.find((player) => player.player_id === userId);
    if (!player) {
      const { data, error } = await supabase.from("lineup").insert([
        {
          match_id: match?.match_id,
          player_name: profile?.name,
          player_position: profile?.position,
          player_rating: profile?.rating,
          team_id: match?.opponent_id,
        },
      ]);
      console.log(error, "OpplineupERr");
    }
  };

  useEffect(() => {
    setMatchId(match_Id);
  }, [match_Id]);

  useEffect(() => {
    if (matchId) {
      fetchMatchDetails();
    }
    fetchPlayerDetails();
  }, [matchId]);

  useEffect(() => {
    if (match) {
      fetchMyTeamLineup();
      fetchOppTeamLineup();
    }
  }, [match]);

  useEffect(() => {
    const channel = supabase
      .channel("squad")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "lineup",
        },
        (payload) => {
          console.log(payload, "payload");
          const newSquad = payload.new as Squad;
          if (newSquad.team_id === match?.team_id) {
            setMySquad([...mySquad, newSquad]);
          }
          if (newSquad.team_id === match?.opponent_id) {
            setOppSquad([...oppSquad, newSquad]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, mySquad, oppSquad, setMySquad, setOppSquad]);

  console.log(mySquad, "mySquad");
  console.log(oppSquad, "oppSquad");

  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        paddingX={4}
        paddingY={2}
      >
        <Button variant="unstyled">
          <IoArrowBack
            onClick={() => router.push("/")}
            color="#E7E9EA"
            size={22}
          />
        </Button>
        <Button variant="unstyled">
          <IoSettingsOutline
            onClick={() => onOpen()}
            color="#E7E9EA"
            size={22}
          />
        </Button>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        paddingX={8}
        paddingY={4}
      >
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <IoFootball color="green" size={36} />
          <Text fontSize="md" color="#E7E9EA" mt={2}>
            {match?.team_name}
          </Text>
        </Flex>
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="xl" color="#E7E9EA" p={1}>
            {match?.date}
          </Text>
          <Text fontSize="md" color="gray">
            {match?.time}
          </Text>
        </Flex>
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <IoFootball color="green" size={36} />
          <Text fontSize="md" color="#E7E9EA" mt={2}>
            {match?.opponent_name}
          </Text>
        </Flex>
      </Flex>
      {/* <Settings isSettingsOpen={isOpen} onSettingsClose={onClose} /> */}
      <Tabs align="center" isFitted variant="unstyled">
        <TabList>
          <Tab fontSize="lg" color="#E7E9EA">
            Overview
          </Tab>
          <Tab fontSize="lg" color="#E7E9EA">
            Line-up
          </Tab>
          <Tab fontSize="lg" color="#E7E9EA">
            Stats
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="#E7E9EA"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel></TabPanel>
          <TabPanel>
            {/* <Box> */}
            {match?.format === "5v5" && (
              <Text fontSize="lg" color="gray">
               Min Squad Size: 8 ({match?.format})
              </Text>
            )}
            {match?.format === "6v6" && (
              <Text fontSize="lg" color="gray">
               Min Squad Size: 9 ({match?.format})
              </Text>
            )}
            {match?.format === "7v7" && (
              <Text fontSize="lg" color="gray">
                Min Squad Size: 10 ({match?.format})
              </Text>
            )}
            {match?.format === "8v8" && (
              <Text fontSize="lg" color="gray">
                Min Squad Size: 11 ({match?.format})
              </Text>
            )}
            {match?.format === "9v9" && (
              <Text fontSize="lg" color="gray">
                Min Squad Size: 12 ({match?.format})
              </Text>
            )}
            {match?.format === "10v10" && (
              <Text fontSize="lg" color="gray">
                Min Squad Size: 13 ({match?.format})
              </Text>
            )}
            {match?.format === "11v11" && (
              <Text fontSize="lg" color="gray">
                Min Squad Size: 15 ({match?.format})
              </Text>
            )}
            {/* </Box> */}
            <Flex justifyContent="space-evenly" mt={6}>
              <Box width="40%">
                <Flex flexDir="column">
                  {mySquad?.map((squad, idx) => (
                    <List key={idx} spacing={3}>
                      <ListItem color="#E7E9EA">{squad?.player_name}</ListItem>
                    </List>
                  ))}
                </Flex>
              </Box>

              <Box>
                <Center height="50px">
                  <Divider orientation="vertical" />
                </Center>
              </Box>

              <Box width="40%">
                <Flex flexDir="column">
                  {oppSquad?.map((squad, idx) => (
                    <List key={idx} spacing={3}>
                      <ListItem color="#E7E9EA">{squad?.player_name}</ListItem>
                    </List>
                  ))}
                </Flex>
              </Box>
            </Flex>

            <Flex alignItems="center" justifyContent="center" mt={10}>
              {match?.team_id === activeTeam?.team_id &&
                !mySquad?.some((player) => player?.player_id === userId) && (
                  <Button
                    colorScheme="messenger"
                    onClick={handleJoinMySquadBtn}
                  >
                    Join squad
                  </Button>
                )}
              {match?.opponent_id === activeTeam?.team_id &&
                !oppSquad?.some((player) => player?.player_id === userId) && (
                  <Button
                    colorScheme="messenger"
                    onClick={handleJoinOppSquadBtn}
                  >
                    Join squad
                  </Button>
                )}
            </Flex>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Match;
