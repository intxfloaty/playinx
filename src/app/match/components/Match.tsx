"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../database.types";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  TabIndicator,
  useDisclosure,
} from "../../chakraExports";
import { useRouter, useSearchParams } from "next/navigation";
import JoinSquad from "./JoinSquad";
import MatchHeader from "./MatchHeader";
import Overview from "./Overview";
import MatchStats from "./MatchStats";

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
  team_score?: string;
  opponent_score?: string;
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

type Team = {
  team_name: string
}


const Match = ({ user }) => {
  const searchParams = useSearchParams();
  const match_Id = searchParams.get("matchId");
  const userId = user?.id;
  const supabase = createClientComponentClient<Database>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>();
  const [match, setMatch] = useState<Match>();
  const [team, setTeam] = useState<Team>()
  const [mySquad, setMySquad] = useState<Squad[]>([]);
  const [oppSquad, setOppSquad] = useState<Squad[]>([]);
  const [players, setPlayers] = useState([]);


  // Function to retrieve team_id from localStorage
  const getActiveTeamFromLocalStorage = () => {
    const storedTeam = localStorage.getItem("activeTeam");
    if (storedTeam) {
      return JSON.parse(storedTeam);
    }
    return null; // Return null if no activeTeam is stored in localStorage
  };




  const fetchMyTeamLineup = async () => {
    let { data: lineup, error } = await supabase
      .from("lineup")
      .select("*")
      .eq("match_id", match_Id)
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
      .eq("match_id", match_Id)
      .eq("team_id", match?.opponent_id);

    // console.log(lineup, "lineup");
    console.log(error, "Opperr");
    if (!error) {
      setOppSquad(lineup);
    }
  };


  const fetchPlayerDetails = async () => {
    let { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", `${userId}`);

    console.log(error, "profileErr");
    if (!error) {
      setProfile(profile[0]);
    }
  };

  const fetchMatchDetails = async () => {
    let { data: matches, error } = await supabase
      .from("matches")
      .select("*")
      .eq("match_id", `${match_Id}`);

    // console.log(matches, "matches");
    console.log(error, "err");
    if (!error) {
      setMatch(matches[0]);
    }
  };

  const getPlayers = async () => {
    const team_id = getActiveTeamFromLocalStorage()
    let { data: players, error } = await supabase
      .from("players")
      .select("*")
      .eq("team_id", `${team_id}`);

    console.log(error, "PlayersListErr")

    if (!error) {
      setPlayers(players);
    }
  };



  const fetchTeamInfo = async () => {
    const team_id = getActiveTeamFromLocalStorage()
    let { data: teams, error } = await supabase
      .from('teams')
      .select('*')
      .eq("team_id", `${team_id}`)

    console.log(error, "TeamErr")

    if (!error) {
      setTeam(teams[0])
    }
  }


  useEffect(() => {
    fetchMatchDetails();
    fetchPlayerDetails();
  }, []);


  useEffect(() => {
    if (match) {
      fetchTeamInfo();
      fetchMyTeamLineup();
      getPlayers()
      if (match?.opponent_id) {
        fetchOppTeamLineup();
      }
    }
  }, [match]);

  useEffect(() => {
    const channel = supabase
      .channel("match updated")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "matches",
        },
        (payload) => {
          console.log(payload, "payload");
          const updatedMatch = payload.new as Match
          setMatch(updatedMatch)
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <Box>
      <MatchHeader activeTeam={team} match={match} userId={userId} />
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
          {/* overview panel */}
          <TabPanel>
            <Overview match={match} />
          </TabPanel>

          {/* lineup/squad panel */}
          <TabPanel>
            <JoinSquad
              activeTeam={team}
              userId={userId}
              profile={profile}
              match={match}
              mySquad={mySquad}
              setMySquad={setMySquad}
              oppSquad={oppSquad}
              setOppSquad={setOppSquad}
              players={players}
            />
          </TabPanel>

          {/* Matcgstats panel */}
          <TabPanel>
            <MatchStats matchId={match_Id} match={match} />
          </TabPanel>

        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Match;
