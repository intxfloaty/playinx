import React from "react";
import { Box, Flex, Input, Select, Text } from "../../chakraExports";
import { IoCloseOutline } from "react-icons/io5";

const TeamPlayersStat = ({
  teamPlayers,
  setTeamPlayers,
  teamLineup,
  teamPlayerStat,
  setTeamPlayerStat,
}) => {
  return (
    <Flex flexDir="column">
      <Select
        placeholder="Select Player"
        color="black"
        borderColor="#161616"
        onChange={(e) => {
          const newPlayer = e.target.value;
          const playerId =
            e.target.selectedOptions[0].getAttribute("data-player-id");
          if (
            newPlayer !== "" &&
            !teamPlayers?.some((player) => player?.playerId === playerId)
          ) {
            const updatedTeamPlayers = [...teamPlayers];
            updatedTeamPlayers.push({
              playerId,
              playerName: newPlayer,
            });
            setTeamPlayers(updatedTeamPlayers);
          }
        }}
      >
        {teamLineup?.map((player, idx) => (
          <option
            key={idx}
            value={player?.player_name}
            data-player-id={player?.player_id}
          >
            {player?.player_name}
          </option>
        ))}
      </Select>

      {/* Player stat header */}
      <Flex
        flexDir="row"
        alignItems="center"
        // justifyContent="space-between"
        mt={6}
      >
        <Text color="gray" fontSize="sm" flex="1" textAlign="left">
          Player
        </Text>
        <Flex justifyContent="flex-end" alignItems="center" flex="2">
          <Box flex="1">
            <Text color="gray" fontSize="sm">
              Goals
            </Text>
          </Box>
          <Box flex="1" mx={4}>
            <Text color="gray" fontSize="sm">
              Assists
            </Text>
          </Box>
          <Box flex="1">
            <Text color="gray" fontSize="sm">
              Card
            </Text>
          </Box>
        </Flex>
      </Flex>

      {/* Player stat rows */}
      {teamPlayers?.map((player, idx) => {
        return (
          <Flex
            key={idx}
            my={6}
            alignItems="center"
            justifyContent="space-between"
          >
            <Text color="black" fontSize="sm" flex="1" textAlign="left">
              {player?.playerName}
            </Text>
            <Flex justifyContent="flex-end" alignItems="center" flex="2">
              <Box flex="1">
                <Input
                  color="black"
                  borderColor="#161616"
                  type="number"
                  textAlign="center"
                  value={teamPlayerStat[idx]?.goals || ""}
                  onChange={(e) => {
                    const goals = e.target.value;
                    const playerName = player?.playerName;
                    const playerId = player?.playerId;

                    const updatedTeamPlayerStat = [...teamPlayerStat];
                    updatedTeamPlayerStat[idx] = {
                      ...updatedTeamPlayerStat[idx],
                      goals,
                      playerName,
                      playerId,
                    };
                    setTeamPlayerStat(updatedTeamPlayerStat);
                  }}
                />
              </Box>
              <Box flex="1" mx={4}>
                <Input
                  color="black"
                  borderColor="#161616"
                  type="number"
                  textAlign="center"
                  value={teamPlayerStat[idx]?.assists || ""}
                  onChange={(e) => {
                    const assists = e.target.value;
                    const playerName = player?.playerName;
                    const playerId = player?.playerId;
                    const updatedTeamPlayerStat = [...teamPlayerStat];
                    updatedTeamPlayerStat[idx] = {
                      ...updatedTeamPlayerStat[idx],
                      assists,
                      playerName,
                      playerId,
                    };
                    setTeamPlayerStat(updatedTeamPlayerStat);
                  }}
                />
              </Box>
              <Box flex="1">
                <Select
                  placeholder="Select"
                  color="black"
                  borderColor="#161616"
                  onChange={(e) => {
                    const card = e.target.value;
                    const playerName = player?.playerName;
                    const playerId = player?.playerId;
                    const updatedTeamPlayerStat = [...teamPlayerStat];
                    updatedTeamPlayerStat[idx] = {
                      ...updatedTeamPlayerStat[idx],
                      card,
                      playerName,
                      playerId,
                    };
                    setTeamPlayerStat(updatedTeamPlayerStat);
                  }}
                >
                  <option value="Y">Y</option>
                  <option value="R">R</option>
                </Select>
              </Box>
              <Box position="absolute" right={2}>
                <IoCloseOutline
                  color="black"
                  size={24}
                  onClick={() => {
                    const updatedTeamPlayers = teamPlayers.filter(
                      (_, i) => i !== idx
                    );
                    const updatedTeamPlayerStat = teamPlayerStat.filter(
                      (_, i) => i !== idx
                    );
                    setTeamPlayerStat(updatedTeamPlayerStat);
                    setTeamPlayers(updatedTeamPlayers);
                  }}
                />
              </Box>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default TeamPlayersStat;
