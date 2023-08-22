"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  SideMenu,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
  Stack,
  Box,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "../app/chakraExports";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  IoMenu,
  IoPersonOutline,
  IoPeopleOutline,
  IoTrophyOutline,
  IoPodiumOutline,
  IoLogOutOutline,
  IoFootballOutline,
} from "react-icons/io5";
import Link from "next/link";
import { after } from "node:test";

const Drawer = ({ children }) => {
  const supabase = createClientComponentClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [myTeams, setMyTeams] = useState([]);

  const getNameAndPhone = async () => {
    try {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("name,phone");
      if (profiles && error === null) {
        setName(profiles[0].name);
        setPhone(profiles[0].phone);
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(myTeams, "myteams");
  const getMyTeams = async () => {
    try {
      let { data: teams, error } = await supabase
        .from("teams")
        .select("team_name");

      if (teams && error === null) {
        setMyTeams(teams);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNameAndPhone();
    getMyTeams();
  }, []);

  return (
    <>
      <Box padding={2}>
        <IoMenu color="#E7E9EA" size={32} onClick={onOpen} />
      </Box>
      <SideMenu
        colorScheme="blue"
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        variant="primary"
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" borderBottomColor="gray">
            <Box padding={2}>
              <Text color="#E7E9EA" fontSize="md">
                {name}
              </Text>
              <Text color="#E7E9EA" fontSize="sm">
                {phone}
              </Text>
            </Box>
          </DrawerHeader>

          <DrawerBody mt={5}>
            <Stack spacing={8}>
              <Link href={"/my-profile"}>
                <Box
                  padding={2}
                  _hover={{ backgroundColor: "#161616" }}
                  borderRadius={5}
                >
                  <Flex align="center" flexDir="row" gap={5}>
                    <IoPersonOutline color="#E7E9EA" size={20} />
                    <Text color="#E7E9EA" fontSize="md">
                      Profile
                    </Text>
                  </Flex>
                </Box>
              </Link>

              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem border="none">
                  <Flex
                    flexDir="row"
                    justifyContent="space-between"
                    padding={2}
                    _hover={{ backgroundColor: "#161616" }}
                    borderRadius={5}
                  >
                    <Flex align="center" flexDir="row" gap={5}>
                      <IoPeopleOutline color="#E7E9EA" size={20} />
                      <Text color="#E7E9EA" fontSize="md">
                        My Teams
                      </Text>
                    </Flex>

                    <Box>
                      <AccordionButton>
                        <AccordionIcon color="#E7E9EA" />
                      </AccordionButton>
                    </Box>
                  </Flex>

                  <AccordionPanel color="#E7E9EA">
                    {myTeams?.map((myTeam, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <Flex
                            padding={3}
                            _hover={{ backgroundColor: "#161616" }}
                            borderRadius={5}
                            align="center"
                            flexDir="row"
                            gap={5}
                          >
                            <IoFootballOutline color="#E7E9EA" size={20} />
                            <Text color="#E7E9EA" fontSize="md">
                              {myTeam?.team_name}
                            </Text>
                          </Flex>
                        </React.Fragment>
                      );
                    })}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Link href={"/"}>
                <Box
                  padding={2}
                  _hover={{ backgroundColor: "#161616" }}
                  borderRadius={5}
                >
                  <Flex align="center" flexDir="row" gap={5}>
                    <IoTrophyOutline color="#E7E9EA" size={20} />
                    <Text color="#E7E9EA" fontSize="md">
                      Tournaments
                    </Text>
                  </Flex>
                </Box>
              </Link>

              <Link href={"/"}>
                <Box
                  padding={2}
                  _hover={{ backgroundColor: "#161616" }}
                  borderRadius={5}
                >
                  <Flex align="center" flexDir="row" gap={5}>
                    <IoPodiumOutline color="#E7E9EA" size={20} />
                    <Text color="#E7E9EA" fontSize="md">
                      Leaderboard
                    </Text>
                  </Flex>
                </Box>
              </Link>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" borderTopColor="gray">
            <Button variant="unstyled">
              <Flex align="center" flexDir="row" gap={3}>
                <IoLogOutOutline color="#E7E9EA" size={20} />
                <Text color="#E7E9EA" fontSize="md">
                  Logout
                </Text>
              </Flex>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </SideMenu>
      {children}
    </>
  );
};

export default Drawer;
