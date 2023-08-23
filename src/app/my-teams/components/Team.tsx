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
import { IoArrowBack, IoAddOutline, IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Team = () => {
  const router = useRouter();

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
        <Text fontSize="xl" color="#E7E9EA">Real Madrid F.C.</Text>
        <Button variant="unstyled">
          <IoSettingsOutline
            onClick={() => console.log("settings")}
            color="#E7E9EA"
            size={26}
          />
        </Button>
      </Flex>
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
