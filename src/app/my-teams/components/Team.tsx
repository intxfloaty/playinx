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
} from "../../chakraExports";
import { IoArrowBack, IoSettingsOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import Settings from "./SettingsModal";
import useTeamStore from "../../../utils/store/teamStore";
import MatchList from "./MatchList";
import PlayersList from "./PlayersList";

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

const Team = ({ user }) => {
  const searchParams = useSearchParams();
  const userId = user?.id;
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
    fetchTeamInfo();
    getMatches()
  }, [])


  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" padding={4}>
        <Button variant="unstyled">
          <IoArrowBack
            onClick={() => router.push("/")}
            color="#E7E9EA"
            size={26}
          />
        </Button>
        <Text fontSize="xl" color="#E7E9EA">
          {team?.team_name}
        </Text>
        <Button variant="unstyled">
          {team?.team_admin === userId &&
            <IoSettingsOutline
              onClick={() => onOpen()}
              color="#E7E9EA"
              size={26}
            />
          }
        </Button>
      </Flex>
      <Settings isSettingsOpen={isOpen} onSettingsClose={onClose} userId={userId} activeTeam={team} />
      <Tabs align="center" isFitted variant="unstyled">
        <TabList>
          <Tab fontSize="lg" color="#E7E9EA">
            Matches
          </Tab>
          <Tab fontSize="lg" color="#E7E9EA">
            Squad
          </Tab>
          {/* <Tab fontSize="lg" color="#E7E9EA">
            Stats
          </Tab> */}
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel>
            <MatchList team={team} userId={userId} matches={matches} setMatches={setMatches} getMatches={getMatches} />

          </TabPanel>
          <TabPanel>
            <PlayersList activeTeam={team} />
          </TabPanel>
          {/* <TabPanel>
            <Flex alignItems="center" justifyContent="center"><Text fontSize="lg" color="#E7E9EA">COMING SOON</Text></Flex>
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Team;
