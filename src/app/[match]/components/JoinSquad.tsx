import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Center,
  Divider,
  Flex,
  List,
  ListItem,
} from "../../chakraExports";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../database.types";
import useTeamStore from "../../../utils/store/teamStore";

type Squad = {
  player_name: string;
  player_rating: string;
  player_position: string;
  player_id: string;
  team_id: string;
};

const JoinSquad = ({ matchId, userId, profile, match }) => {
  const supabase = createClientComponentClient<Database>();
  const activeTeam = useTeamStore((state) => state.activeTeam);
  const minSquadSizes = {
    "5v5": 8,
    "6v6": 1,
    "7v7": 10,
    "8v8": 11,
    "9v9": 12,
    "10v10": 13,
    "11v11": 15,
  };

  const [mySquad, setMySquad] = useState<Squad[]>([]);
  const [oppSquad, setOppSquad] = useState<Squad[]>([]);

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

  const updateMatchStatus = async () => {
    const { data, error } = await supabase
      .from("matches")
      .update({ match_status: "fixed" })
      .eq("match_id", `${matchId}`)
      .select();

    console.log(data, "match_status");
    console.log(error, "match_statusErr");
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
    if (match) {
      fetchMyTeamLineup();
      fetchOppTeamLineup();
    }
  }, [match]);

  // useEffect(() => {
  //   const requiredSize = minSquadSizes[match?.format];
  //   if (
  //     requiredSize !== undefined &&
  //     mySquad.length >= requiredSize &&
  //     oppSquad.length >= requiredSize
  //   ) {
  //     updateMatchStatus();
  //   }
  // }, [mySquad, oppSquad, match?.format]);

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
    <>
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
        <Box width="40%" backgroundColor="#161616" borderRadius={7}>
          <Flex flexDir="column" alignItems="flex-start" pl={4}>
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

        <Box width="40%"  backgroundColor="#161616" borderRadius={7}>
          <Flex flexDir="column" alignItems="flex-end" pr={4}>
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
            <Button colorScheme="messenger" onClick={handleJoinMySquadBtn}>
              Join squad
            </Button>
          )}
        {match?.opponent_id === activeTeam?.team_id &&
          !oppSquad?.some((player) => player?.player_id === userId) && (
            <Button colorScheme="messenger" onClick={handleJoinOppSquadBtn}>
              Join squad
            </Button>
          )}
      </Flex>
    </>
  );
};

export default JoinSquad;
