"use client";
import React from "react";
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
} from "../../chakraExports";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Team = () => {
  const router = useRouter();

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" padding={4}>
        <IoArrowBack
          onClick={() => router.push("/")}
          color="#E7E9EA"
          size={30}
        />
        <Button size="sm">Edit</Button>
      </Flex>
      <Tabs align="center" isFitted variant="unstyled">
        <TabList>
          <Tab color="#E7E9EA">Matches</Tab>
          <Tab color="#E7E9EA">Players</Tab>
          <Tab color="#E7E9EA">Stats</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel>
            <p style={{ color: "#E7E9EA" }}>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
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
