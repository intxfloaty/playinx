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
  useDisclosure as LineupDisclosure,
} from "../../chakraExports";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../database.types";
import useTeamStore from "../../../utils/store/teamStore";
import CreateLineupModal from "./CreateLineupModal";

type Squad = {
  player_name: string;
  player_rating: string;
  player_position: string;
  player_id: string;
  team_id: string;
};

const JoinSquad = ({ activeTeam, userId, profile, match, mySquad, setMySquad, oppSquad, setOppSquad, players }) => {
  const [isLoading, setIsLoading] = useState(false)
  const lineupDisc = LineupDisclosure()
  const supabase = createClientComponentClient<Database>();
  const minSquadSizes = {
    "5v5": 7,
    "6v6": 8,
    "7v7": 9,
    "8v8": 10,
    "9v9": 12,
    "10v10": 13,
    "11v11": 15,
  };

  console.log(mySquad, "mySquad")

  const handleJoinMySquadBtn = async () => {
    setIsLoading(true)
    const player = mySquad?.find((player) => player.player_id === userId);
    if (!player) {
      const { data, error } = await supabase.from("lineup").insert([
        {
          match_id: match?.match_id,
          player_name: profile?.name,
          player_id: profile?.user_id,
          player_position: profile?.position,
          player_rating: profile?.rating,
          team_id: match?.team_id,
        },
      ]);
      console.log(error, "MylineupERr");
    }
    setIsLoading(false)
  };

  const handleJoinOppSquadBtn = async () => {
    setIsLoading(true)
    const player = oppSquad?.find((player) => player.player_id === userId);
    if (!player) {
      const { data, error } = await supabase.from("lineup").insert([
        {
          match_id: match?.match_id,
          player_name: profile?.name,
          player_id: profile?.user_id,
          player_position: profile?.position,
          player_rating: profile?.rating,
          team_id: match?.opponent_id,
        },
      ]);
      console.log(error, "OpplineupERr");
    }
    setIsLoading(false)
  };

  useEffect(() => {
    const channel = supabase
      .channel("squad")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "lineup",
          filter: `match_id=eq.${match?.match_id}`
        },
        (payload) => {
          console.log(payload, "payload");
          const newSquad = payload.new as Squad;
          if (newSquad.team_id === match?.team_id) {
            setMySquad((prevSquad) => [...prevSquad, newSquad]);
          }
          if (newSquad.team_id === match?.opponent_id) {
            setOppSquad((prevSquad) => [...prevSquad, newSquad]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, mySquad, oppSquad, setMySquad, setOppSquad]);

  return (
    <>
      {/* <Box> */}
      {match?.format === "5v5" && (
        <Text fontSize="lg" color="gray">
          Min Squad Size: 7 ({match?.format})
        </Text>
      )}
      {match?.format === "6v6" && (
        <Text fontSize="lg" color="gray">
          Min Squad Size: 8 ({match?.format})
        </Text>
      )}
      {match?.format === "7v7" && (
        <Text fontSize="lg" color="gray">
          Min Squad Size: 9 ({match?.format})
        </Text>
      )}
      {match?.format === "8v8" && (
        <Text fontSize="lg" color="gray">
          Min Squad Size: 10 ({match?.format})
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
        <Box width="40%" borderRadius={7}>
          <Flex flexDir="column" alignItems="flex-start" pl={4}>
            {mySquad?.map((squad, idx) => (
              <Box key={idx} width="100%" mb={5}>
                <Text fontSize="lg" color="#E7E9EA">{squad?.player_name}</Text>
              </Box>
            ))}
          </Flex>
        </Box>

        <Box>
          <Center height="100%">
            <Divider orientation="vertical" />
          </Center>
        </Box>

        <Box width="40%" borderRadius={7}>
          <Flex flexDir="column" alignItems="flex-end" pr={4}>
            {oppSquad?.map((squad, idx) => (
              <Box key={idx} width="100%" mb={5}>
                <Text fontSize="lg" color="#E7E9EA">{squad?.player_name}</Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>

      {activeTeam?.team_admin === userId && match?.match_status !== "completed" &&
        <Button colorScheme="messenger" onClick={lineupDisc.onOpen} mt={8}>
          Create Lineup
        </Button>}

      <CreateLineupModal
        isOpen={lineupDisc.isOpen}
        onClose={lineupDisc.onClose}
        players={players}
        mySquad={mySquad}
        oppSquad={oppSquad}
        matchId={match?.match_id}
        team_id={activeTeam?.team_id} />

      {!(match?.match_type === "Tournament") && !(match?.match_status === "completed") &&
        <Flex alignItems="center" justifyContent="center" mt={10}>
          {match?.team_id === activeTeam?.team_id &&
            !mySquad?.some((player) => player?.player_id === userId) && (
              <Flex flexDir="column">
                <Button colorScheme="messenger" onClick={handleJoinMySquadBtn} isLoading={isLoading} isDisabled={isLoading}>
                  Join squad
                </Button>
                <Text fontSize="lg" color="GrayText" mt={2}>
                  Cost to join a game is ₹35/player to be collected by team admin/captain and paid at the venue before the start of the game.
                </Text>
              </Flex>
            )}
          {match?.opponent_id === activeTeam?.team_id &&
            !oppSquad?.some((player) => player?.player_id === userId) && (
              <Flex flexDir="column">
                <Button colorScheme="messenger" onClick={handleJoinOppSquadBtn} isLoading={isLoading} isDisabled={isLoading}>
                  Join squad
                </Button>
                <Text fontSize="lg" color="GrayText" mt={2}>
                  Cost to join a game is ₹35/player to be collected by team admin/captain and paid at the venue before the start of the game.
                </Text>
              </Flex>
            )}
        </Flex>}
    </>
  );
};

export default JoinSquad;
