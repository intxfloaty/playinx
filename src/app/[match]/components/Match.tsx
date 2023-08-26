"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
  useDisclosure,
} from "../../chakraExports";
import {
  IoArrowBack,
  IoSettingsOutline,
  IoFootballOutline,
  IoFootball,
} from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import useTeamStore from "../../../utils/store/teamStore";

type Match = {
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
};

const Match = ({ user }) => {
  const supabase = createClientComponentClient();
  const activeTeam = useTeamStore((state) => state.activeTeam);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<Profile>();
  const [match, setMatch] = useState<Match>();
  const [mySquad, setMySquad] = useState<Squad[]>([]);
  const [oppSquad, setOppSquad] = useState<Squad[]>([]);

  console.log(profile, "user");

  const matchId = searchParams.get("matchId");
  const userId = user?.id;

  const fetchPlayerDetails = async () => {
    let { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", `${userId}`);

    console.log(profile, "profiles");
    console.log(error, "err");
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
      .eq("match_id", `${matchId}`)
      .eq("team_id", `${match?.team_id}`);

    // console.log(lineup, "lineup");
    // console.log(error, "err");
    if (!error) {
      setMySquad(lineup);
    }
  };

  const fetchOppTeamLineup = async () => {
    let { data: lineup, error } = await supabase
      .from("lineup")
      .select("*")
      .eq("match_id", `${matchId}`)
      .eq("team_id", `${match?.opponent_id}`);

    // console.log(lineup, "lineup");
    // console.log(error, "err");
    if (!error) {
      setOppSquad(lineup);
    }
  };

  const handleJoinMySquadBtn = async () => {
    const { data, error } = await supabase.from("lineup").insert([
      {
        match_id: match?.match_id,
        player_name: profile?.name,
        player_position: profile?.position,
        player_rating: profile?.rating,
        team_id: match?.team_id,
      },
    ]);
    // console.log(data, "lineupdata");
    // console.log(error, "lineupERr");
    fetchMyTeamLineup();
  };

  const handleJoinOppSquadBtn = async () => {
    const { data, error } = await supabase.from("lineup").insert([
      {
        match_id: match?.match_id,
        player_name: profile?.name,
        player_position: profile?.position,
        player_rating: profile?.rating,
        team_id: match?.opponent_id,
      },
    ]);
    // console.log(data, "lineupdata");
    // console.log(error, "lineupERr");
    fetchOppTeamLineup();
  };

  useEffect(() => {
    fetchMatchDetails();
    fetchMyTeamLineup();
    fetchOppTeamLineup();
    fetchPlayerDetails();
  }, [userId, matchId]);

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
            <Flex alignItems="center" justifyContent="center">
              {match?.team_id === activeTeam?.team_id && (
                <Button colorScheme="messenger" onClick={handleJoinMySquadBtn}>
                  Join squad
                </Button>
              )}
              {match?.opponent_id === activeTeam?.team_id && (
                <Button colorScheme="messenger" onClick={handleJoinOppSquadBtn}>
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
