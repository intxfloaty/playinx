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
  useDisclosure as AddPlayersDisclosure,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "../../chakraExports";
import { IoArrowBack, IoEllipsisVertical, IoSettingsOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import Settings from "./SettingsModal";
import useTeamStore from "../../../utils/store/teamStore";
import MatchList from "./MatchList";
import PlayersList from "./PlayersList";
import Season from "./Season";
import AddPlayers from "./AddPlayersModal";

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
  events: []
}

const Team = ({ user }) => {
  const searchParams = useSearchParams();
  const userId = user?.id;
  const supabase = createClientComponentClient();
  const team_id = searchParams.get("team_id");
  const [team, setTeam] = useState<Team>()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addPlayersDisclosure = AddPlayersDisclosure();
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState([]);
  const [eventsList, setEventsList] = useState([])
  const router = useRouter();

  const getMatches = async () => {
    let { data: matches, error } = await supabase
      .from("matches")
      .select("*")
      .order('created_at', { ascending: false })
      .or(
        `team_id.eq.${team_id},opponent_id.eq.${team_id}`
      );
    if (matches && matches.length > 0 && error === null) {
      setMatches(matches);
    }
    console.log(error, "matchError");
  };

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

  const getPlayers = async () => {
    let { data: players, error } = await supabase
      .from("players")
      .select("*")
      .eq("team_id", `${team_id}`);

    console.log(error, "PlayersListErr")

    if (!error) {
      setPlayers(players);
    }
  };


  const fetchEventstList = async () => {
    let { data: events, error } = await supabase
      .from("events")
      .select("*")
      .in("id", team?.events)

    if (!error) {
      setEventsList(events);
    }
    console.log(error, "eventsErr");
  }

  useEffect(() => {
    fetchTeamInfo();
    getMatches()
    getPlayers()
  }, [])

  // useEffect(() => {
  //   if (team && team?.events?.length > 0) {
  //     fetchEventstList()
  //   }
  // }, [team])


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
        <Flex alignItems="center" justifyContent="center" flex="1">
          <Text fontSize="xl" color="#E7E9EA">
            {team?.team_name}
          </Text>
        </Flex>
        {/* <Button variant="unstyled"> */}
        {team?.team_admin === userId &&
          <Menu>
            <MenuButton>
              <IoEllipsisVertical
                color="#E7E9EA"
                size={26}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={addPlayersDisclosure.onOpen}>Add Players</MenuItem>
            </MenuList>
            <AddPlayers isAddPlayerOpen={addPlayersDisclosure.isOpen} onAddPlayerClose={addPlayersDisclosure.onClose} activeTeam={team} />
          </Menu>

        }
        {/* </Button> */}
      </Flex>
      {/* <Settings isSettingsOpen={isOpen} onSettingsClose={onClose} userId={userId} activeTeam={team} /> */}
      <Tabs align="center" isFitted variant="unstyled">
        <TabList>
          <Tab fontSize="lg" color="#E7E9EA">
            Matches
          </Tab>
          {/* <Tab fontSize="lg" color="#E7E9EA">
            Season
          </Tab> */}
          <Tab fontSize="lg" color="#E7E9EA">
            Squad
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="#E7E9EA"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel>
            <MatchList team={team} userId={userId} matches={matches} setMatches={setMatches} getMatches={getMatches} />
          </TabPanel>

          {/* <TabPanel>
            <Season eventsList={eventsList} />
          </TabPanel> */}

          <TabPanel>
            <PlayersList players={players} getPlayers={getPlayers} team_id={team_id} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Team;
