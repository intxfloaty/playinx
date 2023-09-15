import React, { useEffect, useState } from "react";
import { Box, Text, Button, useDisclosure, useDisclosure as CreateMatchDisclosure, useDisclosure as JoinTournamentDisclosure, Flex, Menu, IconButton, MenuButton, MenuItem, MenuList } from "../../chakraExports";
import {
  IoAddOutline,
  IoFootballOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import CreateMatchModal from "./CreateMatchModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import JoinTournamentModal from "./JoinTournamentModal";

type Team = {
  [key: string]: string;
}

const MatchList = ({ team, userId, matches, setMatches, getMatches }) => {
  const supabase = createClientComponentClient();
  const [activeTeam, setActiveTeam] = useState<Team>()
  const { onOpen, isOpen, onClose } = useDisclosure()

  const router = useRouter();
  const createMatch = CreateMatchDisclosure()
  const joinTournament = JoinTournamentDisclosure()

  const handleAcceptBtn = async (match) => {
    const { data, error } = await supabase
      .from("matches")
      .update({ opponent_status: "accepted" })
      .eq("match_id", `${match.match_id}`)
      .eq("opponent_id", `${match.opponent_id}`)
      .select();
    console.log(data, "currMatch");
    console.log(error, "currError");
  };

  const handleDeclineBtn = async (match) => {
    const { data, error } = await supabase
      .from("matches")
      .update({
        opponent_status: "declined",
        opponent_name: null,
        opponent_id: null,
      })
      .eq("match_id", `${match.match_id}`)
      .eq("opponent_id", `${match.opponent_id}`)
      .select();
    console.log(data, "currMatch");
    console.log(error, "currError");

    if (!error) {
      setMatches((prevMatches) => {
        const updatedMatches = prevMatches.map((prevMatch) =>
          prevMatch.match_id === match.match_id
            ? { ...prevMatch, opponent_name: null, opponent_id: null }
            : prevMatch
        );
        return updatedMatches;
      });
    }
  };

  useEffect(() => {
    if (team) {
      setActiveTeam(team)
    }
  }, [team]);


  useEffect(() => {
    const channel = supabase
      .channel("new match")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "matches",
        },
        (payload) => {
          console.log(payload, "payload");
          getMatches()
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  console.log(matches, "matches");

  return (
    <>
      {matches?.map((match, idx) => {
        const isAdmin = activeTeam?.team_admin === userId;
        const isPending = match.opponent_status === "pending";
        const isAccepted = match.opponent_status === "accepted";
        const isMyTeam = activeTeam?.team_id === match?.team_id;
        const isOpponent = activeTeam?.team_id === match?.opponent_id;
        if (isMyTeam) {
          return (
            <Box backgroundColor="#161616" borderRadius={7} mb={6} key={idx}>
              {/* upper container */}
              <Flex
                flexDir="row"
                justifyContent="space-between"
                alignItems="center"
                borderBottomColor="gray"
                borderBottomWidth="1px"
              >
                <Flex
                  flexDir="column"
                  alignItems="flex-start"
                  paddingX={4}
                  paddingY={2}
                >
                  <Text fontSize="xl" color="#E7E9EA">
                    Matchday
                  </Text>
                  <Text fontSize="sm" color="gray">
                    {match?.date}
                  </Text>
                </Flex>
                <Button
                  variant="unstyled"
                  onClick={() => {
                    router.push(
                      `/${match?.team_name}vs${match?.opponent_name}?matchId=${match?.match_id}`
                    );
                  }}
                  pr={6}
                >
                  <IoArrowForwardOutline color="#E7E9EA" size={25} />
                </Button>
              </Flex>

              {/* lower container */}
              <Flex paddingX={4} paddingY={4} justifyContent="space-between">
                {/* team box */}
                <Box
                  flex="2"
                  borderRightColor="gray"
                  borderRightWidth="1px"
                  pr={3}
                >
                  <Flex flexDir="column">
                    <Flex justifyContent="space-between" mb={2}>
                      <Text fontSize="lg" color="#E7E9EA">
                        {match?.team_name}
                      </Text>
                      {match?.team_score && (
                        <Text fontSize="md" color="#E7E9EA">
                          {match?.team_score}
                        </Text>
                      )}
                    </Flex>
                    <Flex justifyContent="space-between">
                      {match?.opponent_name === null && (
                        <Text fontSize="lg" color="#E7E9EA">
                          TBD
                        </Text>
                      )}
                      <Text fontSize="lg" color="#E7E9EA">
                        {match?.opponent_name}
                      </Text>
                      {match?.opponent_score && (
                        <Text fontSize="md" color="#E7E9EA">
                          {match?.opponent_score}
                        </Text>
                      )}
                    </Flex>
                  </Flex>
                </Box>

                {/*  score box */}
                <Box
                  flex="1"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize="md" color="gray">
                    {match?.time}
                  </Text>
                </Box>
              </Flex>
              {isOpponent && isAdmin && isPending && (
                <Flex flexDir="row" justifyContent="space-evenly" py={6}>
                  <Button
                    colorScheme="messenger"
                    onClick={() => handleAcceptBtn(match)}
                  >
                    Accept
                  </Button>
                  <Button
                    colorScheme="messenger"
                    onClick={() => handleDeclineBtn(match)}
                  >
                    Decline
                  </Button>
                </Flex>
              )}
            </Box>
          );
        }
        if (isOpponent && isAdmin && isPending) {
          return (
            <Box backgroundColor="#161616" borderRadius={7} mb={6} key={idx}>
              {/* upper container */}
              <Flex
                flexDir="column"
                alignItems="flex-start"
                paddingX={4}
                paddingY={2}
                borderBottomColor="gray"
                borderBottomWidth="1px"
              >
                <Text fontSize="xl" color="#E7E9EA">
                  Matchday
                </Text>
                <Text fontSize="sm" color="gray">
                  {match?.date}
                </Text>
              </Flex>

              {/* lower container */}
              <Flex paddingX={4} paddingY={4} justifyContent="space-between">
                {/* team box */}
                <Box
                  flex="2"
                  borderRightColor="gray"
                  borderRightWidth="1px"
                  pr={3}
                >
                  <Flex flexDir="column">
                    <Flex justifyContent="space-between" mb={2}>
                      <Text fontSize="lg" color="#E7E9EA">
                        {match?.team_name}
                      </Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      {match?.opponent_name === null && (
                        <Text fontSize="lg" color="#E7E9EA">
                          TBD
                        </Text>
                      )}
                      <Text fontSize="lg" color="#E7E9EA">
                        {match?.opponent_name}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>

                {/*  score box */}
                <Box
                  flex="1"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize="md" color="gray">
                    {match?.time}
                  </Text>
                </Box>
              </Flex>
              {isOpponent && isAdmin && isPending && (
                <Flex flexDir="row" justifyContent="space-evenly" py={6}>
                  <Button
                    colorScheme="messenger"
                    onClick={() => handleAcceptBtn(match)}
                  >
                    Accept
                  </Button>
                  <Button
                    colorScheme="messenger"
                    onClick={() => handleDeclineBtn(match)}
                  >
                    Decline
                  </Button>
                </Flex>
              )}
            </Box>
          );
        }
        if (isOpponent && isAccepted) {
          return (
            <Box backgroundColor="#161616" borderRadius={7} mb={6} key={idx}>
              {/* upper container */}
              <Flex
                flexDir="row"
                justifyContent="space-between"
                alignItems="center"
                borderBottomColor="gray"
                borderBottomWidth="1px"
              >
                <Flex
                  flexDir="column"
                  alignItems="flex-start"
                  paddingX={4}
                  paddingY={2}
                >
                  <Text fontSize="xl" color="#E7E9EA">
                    Matchday
                  </Text>
                  <Text fontSize="sm" color="gray">
                    {match?.date}
                  </Text>
                </Flex>
                <Button
                  variant="unstyled"
                  onClick={() => {
                    router.push(
                      `/${match?.team_name}vs${match?.opponent_name}?matchId=${match?.match_id}`
                    );
                  }}
                  pr={6}
                >
                  <IoArrowForwardOutline color="#E7E9EA" size={25} />
                </Button>
              </Flex>

              {/* lower container */}
              <Flex paddingX={4} paddingY={4} justifyContent="space-between">
                {/* team box */}
                <Box
                  flex="2"
                  borderRightColor="gray"
                  borderRightWidth="1px"
                  pr={3}
                >
                  <Flex flexDir="column">
                    <Flex justifyContent="space-between" mb={2}>
                      <Text fontSize="lg" color="#E7E9EA">
                        {match?.team_name}
                      </Text>
                      {match?.team_score && (
                        <Text fontSize="md" color="#E7E9EA">
                          {match?.team_score}
                        </Text>
                      )}
                    </Flex>
                    <Flex justifyContent="space-between">
                      {match?.opponent_name === null && (
                        <Text fontSize="lg" color="#E7E9EA">
                          TBD
                        </Text>
                      )}
                      <Text fontSize="lg" color="#E7E9EA">
                        {match?.opponent_name}
                      </Text>
                      {match?.opponent_score && (
                        <Text fontSize="md" color="#E7E9EA">
                          {match?.opponent_score}
                        </Text>
                      )}
                    </Flex>
                  </Flex>
                </Box>

                {/*  score box */}
                <Box
                  flex="1"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize="md" color="gray">
                    {match?.time}
                  </Text>
                </Box>
              </Flex>
              {isOpponent && isAdmin && !isAccepted && (
                <Flex flexDir="row" justifyContent="space-evenly" py={6}>
                  <Button
                    colorScheme="messenger"
                    onClick={() => handleAcceptBtn(match)}
                  >
                    Accept
                  </Button>
                  <Button
                    colorScheme="messenger"
                    onClick={() => handleDeclineBtn(match)}
                  >
                    Decline
                  </Button>
                </Flex>
              )}
            </Box>
          );
        }
      })}
      {/* {activeTeam?.team_admin === userId && (
        <Box position="fixed" bottom={0} right={0} padding={8}>
          <Menu>
            <MenuButton>
              <IoAddOutline color="#E7E9EA" size={40} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={createMatch.onOpen}>
                Create Match
              </MenuItem>
              <MenuItem onClick={joinTournament.onOpen}>
                Join Tournament
              </MenuItem>
            </MenuList>
          </Menu>
          <CreateMatchModal isOpen={createMatch.isOpen} onClose={createMatch.onClose} activeTeam={activeTeam} />
          <JoinTournamentModal isOpen={joinTournament.isOpen} onClose={joinTournament.onClose} activeTeam={activeTeam} />
        </Box>
      )} */}
      {activeTeam?.team_admin === userId && (
        <Box position="fixed" bottom={0} right={0} padding={8}>
          <Button variant="unstyled" onClick={onOpen}>
            <IoAddOutline color="#E7E9EA" size={40} />
          </Button>
          <CreateMatchModal isOpen={isOpen} onClose={onClose} activeTeam={activeTeam} />
        </Box>
      )}
    </>
  );
};

export default MatchList;
