import { Stack, Flex, Wrap, WrapItem, Avatar, Text } from "../../chakraExports";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useTeamStore from "../../../utils/store/teamStore";

const PlayersList = () => {
  const supabase = createClientComponentClient();
  const activeTeam = useTeamStore((state) => state.activeTeam);
  const [players, setPlayers] = useState([]);

  const getPlayers = async () => {
    let { data: players, error } = await supabase
      .from("players")
      .select("*")
      .eq("team_id", `${activeTeam?.team_id}`);

    if (players && error === null) {
      setPlayers(players);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  console.log(players, "players");

  return (
    <Stack spacing={5}>
      {players?.map((player, idx) => {
        return (
          <Flex
            key={idx}
            mt={2}
            alignItems="center"
            justifyContent="space-between"
            flexDir="row"
            borderBottomWidth="0.1px"
            borderBottomColor="gray"
            paddingBottom={2}
          >
            <Wrap>
              <WrapItem>
                <Avatar
                  size="sm"
                  name="Pravesh Jha"
                  src="https://bit.ly/dan-abramov"
                />
              </WrapItem>
              <Flex
                ml={2}
                flexDir="column"
                justifyContent="center"
                alignItems="flex-start"
              >
                <Text fontSize="md" color="#E7E9EA">
                  {player?.player_name}
                </Text>
                <Text fontSize="xs" color="gray">
                  {player?.player_position}
                </Text>
              </Flex>
            </Wrap>
            <Text fontSize="md" color="#E7E9EA">
              {player?.player_rating}
            </Text>
          </Flex>
        );
      })}
    </Stack>
  );
};

export default PlayersList;
