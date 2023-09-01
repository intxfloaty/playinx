"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  useDisclosure,
  Flex,
  FormLabel,
  Select,
  FormControl,
  Stack,
} from "../../chakraExports";
import {
  IoAddOutline,
  IoFootballOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useTeamStore from "../../../utils/store/teamStore";
import { useRouter } from "next/navigation";
import UpdateMatchScoreModal from "./UpdateMatchScoreModal";

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
  match_official: string;
};

const Matches = () => {
  const supabase = createClientComponentClient();
  const activeTeam = useTeamStore((state) => state.activeTeam);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [location, setLocation] = useState("");
  const [fixedMatches, setFixedMatches] = useState<Match[]>([]);

  const getFixedMatches = async () => {
    let { data: matches, error } = await supabase
      .from("matches")
      .select("*")
      .eq("match_status", "fixed")
      .eq("location", `${location}`);

    if (!error) {
      setFixedMatches(matches);
    }
    console.log(error, "matchError");
  };

  const handleAcceptBtn = async (match) => {
    const { data, error } = await supabase
      .from("matches")
      .update({ match_official: "Basil" })
      .eq("match_id", `${match?.match_id}`)
      .select();

    console.log(data, error, "acceptErr");
    if (!error) {
      setFixedMatches((prevMatches) => {
        const updatedMatches = prevMatches.map((prevMatch) =>
          prevMatch.match_id === match.match_id
            ? { ...prevMatch, match_official: "Basil" }
            : prevMatch
        );
        return updatedMatches;
      });
    }
  };

  console.log(fixedMatches, "fix");

  useEffect(() => {
    const fetchFixedMatches = async () => {
      getFixedMatches();
    };
    fetchFixedMatches();
  }, [location]);

  // useEffect(() => {
  //   const channel = supabase
  //     .channel("new match")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "*",
  //         schema: "public",
  //         table: "matches",
  //       },
  //       (payload) => {
  //         console.log(payload, "payload");
  //         getFixedMatches();
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, [supabase, router]);

  return (
    <Stack p={6}>
      <Box my={5}>
        <FormControl>
          <FormLabel color="#E7E9EA">Location</FormLabel>
          <Select
            placeholder="Select ground/turf"
            onChange={(e) => setLocation(e.target.value)}
            color="#E7E9EA"
          >
            <option value="MRIS, Charmwood">MRIS, Charmwood</option>
            <option value="Base Camp, Vasant Kunj">
              Base Camp, Vasant Kunj
            </option>
            <option value="AB Plaza, Vasant Kunj">AB Plaza, Vasant Kunj</option>
            <option value="Kicksal">Kicksal</option>
          </Select>
        </FormControl>
      </Box>

      {fixedMatches?.map((match, idx) => {
        return (
          <Box backgroundColor="#161616" borderRadius={7} my={6} key={idx}>
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
                  {match?.format}
                </Text>
                <Text fontSize="sm" color="gray">
                  {match?.date}
                </Text>
              </Flex>
              {!(
                match?.match_official === null || match?.match_official === ""
              ) && (
                <Button variant="unstyled" onClick={onOpen} pr={6}>
                  <IoArrowForwardOutline color="#E7E9EA" size={25} />
                </Button>
              )}
            </Flex>
            <UpdateMatchScoreModal isOpen={isOpen} onClose={onClose} match={match} />

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
                    <Text fontSize="md" color="#E7E9EA">
                      1
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
                    <Text fontSize="md" color="#E7E9EA">
                      3
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
            {(match?.match_official === null ||
              match?.match_official === "") && (
              <Flex flexDir="row" justifyContent="space-evenly" py={6}>
                <Button
                  colorScheme="messenger"
                  onClick={() => handleAcceptBtn(match)}
                >
                  Accept
                </Button>
              </Flex>
            )}
          </Box>
        );
      })}
    </Stack>
  );
};

export default Matches;
