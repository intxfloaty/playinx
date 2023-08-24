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
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Wrap,
  WrapItem,
  useDisclosure,
} from "../../chakraExports";
import { IoArrowBack, IoAddOutline, IoSettingsOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import Settings from "./SettingsModal";
import useTeamStore from "../../../utils/store/teamStore";

const Team = () => {
  const supabase = createClientComponentClient();
  const activeTeam = useTeamStore((state) => state.activeTeam);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [players, setPlayers] = useState([]);

  const team_name = searchParams.get("team_name");

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
    <Box>
      <Flex alignItems="center" justifyContent="space-between" padding={4}>
        <Button variant="unstyled">
          <IoArrowBack
            onClick={() => router.push("/")}
            color="#E7E9EA"
            size={26}
          />
        </Button>
        <Text fontSize="xl" color="#E7E9EA">
          {team_name}
        </Text>
        <Button variant="unstyled">
          <IoSettingsOutline
            onClick={() => onOpen()}
            color="#E7E9EA"
            size={26}
          />
        </Button>
      </Flex>
      <Settings isSettingsOpen={isOpen} onSettingsClose={onClose} />
      <Tabs align="center" isFitted variant="unstyled">
        <TabList>
          <Tab fontSize="lg" color="#E7E9EA">
            Matches
          </Tab>
          <Tab fontSize="lg" color="#E7E9EA">
            Players
          </Tab>
          <Tab fontSize="lg" color="#E7E9EA">
            Stats
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel>
            <Box position="fixed" bottom={0} right={0} padding={8}>
              <Button variant="unstyled">
                <IoAddOutline color="#E7E9EA" size={40} />
              </Button>
            </Box>
          </TabPanel>
          <TabPanel>
            <Stack spacing={5}>
              {players?.map((player, idx) => {
                return (
                  <>
                    <Flex
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
                  </>
                );
              })}
            </Stack>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Team;
