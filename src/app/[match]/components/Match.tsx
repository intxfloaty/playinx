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
import useTeamStore from "../../../utils/store/teamStore";
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

const Match = ({ user }) => {
  const supabase = createClientComponentClient<Database>();
  const activeTeam = useTeamStore((state) => state.activeTeam);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<Profile>();
  const [match, setMatch] = useState<Match>();
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
    const channel = supabase
      .channel("match updated")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "matches",
        },
        (payload) => {
          console.log(payload.new, "payload");
          const updatedMatch = payload.new as Match
          setMatch(updatedMatch)
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return (
    <Box>
      <MatchHeader activeTeam={activeTeam} match={match} userId={userId} />
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
              matchId={matchId}
              userId={userId}
              profile={profile}
              match={match}
            />
          </TabPanel>

          {/* Matcgstats panel */}
          <TabPanel>
            <MatchStats matchId={matchId} match={match} />
          </TabPanel>

        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Match;
