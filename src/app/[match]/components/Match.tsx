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

const Team = () => {
  const supabase = createClientComponentClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [match, setMatch] = useState<Match[]>([]);

  const matchId = searchParams.get("matchId");

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

  useEffect(() => {
    fetchMatchDetails();
  }, []);

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
          <IoFootball color="green"  size={36}/>
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
          <TabPanel></TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Team;
