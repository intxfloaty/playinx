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
import { useRouter } from "next/navigation";
import useTeamStore from "../utils/store/teamStore";

const Drawer = ({ children }) => {
  const supabase = createClientComponentClient();
  const setActiveTeam = useTeamStore((state) => state.setActiveTeam);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [myTeams, setMyTeams] = useState([]);

  const getUserId = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data && error === null) {
      return data.user.id;
    }
  };

  const getNameAndPhone = async () => {
    try {
      const myUserId = await getUserId();
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("name,phone")
        .eq("user_id", `${myUserId}`);
      if (profiles && error === null) {
        setName(profiles[0].name);
        setPhone(profiles[0].phone);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getMyTeams = async () => {
    try {
      const myUserId = await getUserId();
      let { data: teams, error } = await supabase
        .from("teams")
        .select("*")
        .or(`team_admin.eq.${myUserId},players.cs.{${myUserId}}`);

      if (teams && teams.length > 0 && error === null) {
        setMyTeams(teams);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Function to save activeTeam to localStorage
  const saveActiveTeamToLocalStorage = (team) => {
    localStorage.setItem("activeTeam", JSON.stringify(team));
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      // eslint-disable-next-line no-console
      console.error("ERROR:", error);
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
                            onClick={() => {
                              setActiveTeam(myTeam);
                              saveActiveTeamToLocalStorage(myTeam?.team_id);
                              const team_id = myTeam?.team_id;
                              router.push(
                                `/my-teams/${team_id}?team_id=${team_id}`
                              );
                            }}
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
            <Button variant="unstyled" onClick={handleSignOut}>
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
