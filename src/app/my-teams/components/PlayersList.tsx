import { Stack, Flex, Wrap, WrapItem, Avatar, Text } from "../../chakraExports";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Player = {
  [key: string]: string
}

const PlayersList = ({ players, getPlayers, team_id }) => {
  const supabase = createClientComponentClient();

  useEffect(() => {
    const channel = supabase
      .channel("players list")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "players",
          filter: `team_id=eq.${team_id}`
        },
        (payload) => {
          console.log(payload, "payload");
          const newPlayer = payload.new;

          if (newPlayer) {
            // Update the players array with the new player
            // setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
            getPlayers()
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

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
            _active={{
              transform: "scale(0.95)", // Add a slight scale-down effect when clicked
              backgroundColor: "#333" // Change the background color when clicked
            }}
            onClick={() => console.log("player clicked")}
          >
            <Wrap>
              <WrapItem>
                <Avatar
                  size="sm"
                  name={player?.player_name}
                  src={player?.avatar_URL}
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
