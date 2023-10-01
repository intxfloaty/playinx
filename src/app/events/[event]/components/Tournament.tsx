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
  Center,
} from "../../../chakraExports";
import { IoArrowBack, IoChevronDownOutline, IoSettingsOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import Settings from "../../../my-teams/components/SettingsModal";
import EventTeamList from "./EventTeamList";

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
  team_score: string;
  opponent_score: string;
};

type Team = {
  team_name: string
  team_admin: string
}

const Tournament = ({ event }) => {
  const searchParams = useSearchParams();
  // const userId = user?.id;
  const supabase = createClientComponentClient();
  const team_id = searchParams.get("team_id");
  const [team, setTeam] = useState<Team>()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [matches, setMatches] = useState<Match[]>([]);
  const router = useRouter();

  const getMatches = async () => {
    let { data: matches, error } = await supabase
      .from("matches")
      .select("*")
      .or(
        `team_id.eq.${team_id},opponent_id.eq.${team_id}`
      );
    if (matches && matches.length > 0 && error === null) {
      setMatches(matches);
    }
    console.log(error, "matchError");
  };

  useEffect(() => {
    const fetchTeamInfo = async () => {
      let { data: teams, error } = await supabase
        .from('teams')
        .select('*')
        .eq("team_id", `${team_id}`)

      console.log(error, "TeamErr")

      if (!error) {
        setTeam(teams[0])
      }
    }
    // fetchTeamInfo();
    // getMatches()
  }, [])


  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" paddingTop={2} paddingX={4}>
        <Button variant="unstyled">
          <IoArrowBack
            onClick={() => router.push("/")}
            color="#E7E9EA"
            size={26}
          />
        </Button>
      </Flex>
      <Center mb={4}>
        <Text fontSize="lg" color="GrayText" fontWeight="medium" textTransform="uppercase">
          {event?.name}
        </Text>
      </Center>
      <Tabs align="center" isFitted variant="unstyled">
        <TabList>
          <Tab fontSize="lg" color="#E7E9EA">
            Matchday
          </Tab>
          {event?.type === "league" &&
            <Tab fontSize="lg" color="#E7E9EA">
              Table
            </Tab>}
          <Tab fontSize="lg" color="#E7E9EA">
            Stats
          </Tab>
          <Tab fontSize="lg" color="#E7E9EA">
            Teams
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />

        <TabPanels>
          {/* matchday */}
          <TabPanel m={0} p={0}>
            {/* <Box>
              <Menu>
                <MenuButton backgroundColor="#161616" borderRadius={7} w="100%" p={3} mt={3}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize="md" color="#E7E9EA">Matchday 1</Text>
                    <IoChevronDownOutline color="#E7E9EA" />
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem>MatchDay 2</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
            </Box> */}
          </TabPanel>

          {/*  table */}
          {event?.type === "league" &&
            <TabPanel>
              <Text fontSize="lg" color="#E7E9EA">Table!!!===</Text>
            </TabPanel>}

          {/* stats */}
          <TabPanel></TabPanel>

          {/* teams */}
          <TabPanel>
            <EventTeamList event={event} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Tournament;
