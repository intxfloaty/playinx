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
import Matches from "./Matches";
import PlayersList from "./PlayersList";

const Team = () => {
  const supabase = createClientComponentClient();
  const activeTeam = useTeamStore((state) => state.activeTeam);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [players, setPlayers] = useState([]);

  const team_name = searchParams.get("team_name");

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
            <Matches />
           
          </TabPanel>
          <TabPanel>
            <PlayersList />
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
