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
  useDisclosure as RewardsDisclosure,
  useDisclosure as PickupDisclosure
} from "../app/chakraExports";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  IoMenu,
  IoPersonOutline,
  IoPeopleOutline,
  IoTrophyOutline,
  IoPodiumOutline,
  IoLogOutOutline,
  IoFootballOutline,
  IoHomeOutline,
} from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useTeamStore from "../utils/store/teamStore";
import { FaAward } from "react-icons/fa";
import { GiSoccerKick } from "react-icons/gi";
import CreateTeam from "./CreateTeam";
import ComingSoonModal from "./ComingSoonModal";

interface DrawerProps {
  children: React.ReactNode;
  TITLE?: string; // TITLE is now optional
  user?: User
  profiles?
  teams?
}

type Profile = {
  [key: string]: string
}

const Drawer: React.FC<DrawerProps> = ({ children, user, profiles, teams, TITLE }) => {
  const supabase = createClientComponentClient();
  const myUserId = user?.id
  const setActiveTeam = useTeamStore((state) => state.setActiveTeam);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const rewards = RewardsDisclosure()
  const pickup = PickupDisclosure()
  const [myProfile, setMyProfile] = useState<Profile>({})
  const [myTeams, setMyTeams] = useState([]);

  const getNameAndPhone = async () => {
    try {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("name,phone")
        .eq("user_id", `${myUserId}`);
      if (profiles && error === null) {
        setMyProfile(profiles[0])
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getMyTeams = async () => {
    try {
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
    const channel = supabase
      .channel("new team")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "teams",
        },
        (payload) => {
          console.log(payload.new, "payload");
          getMyTeams()
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  useEffect(() => {
    getNameAndPhone();
    getMyTeams();
  }, []);


  return (
    <>
      <Flex padding={2} justifyContent="space-between">
        <Box flex={1}>
          <IoMenu color="#E7E9EA" size={32} onClick={onOpen} />
        </Box>
        <Box flex={2}>
          <Text fontSize="xl" color="#E7E9EA">
            {TITLE}
          </Text>
        </Box>
      </Flex>
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
                {myProfile?.name}
              </Text>
              <Text color="#E7E9EA" fontSize="sm">
                {myProfile?.phone}
              </Text>
            </Box>
          </DrawerHeader>

          <DrawerBody mt={5}>
            <Stack spacing={8}>
              <Link href={"/"}>
                <Box
                  padding={2}
                  _hover={{ backgroundColor: "#161616" }}
                  borderRadius={5}
                >
                  <Flex align="center" flexDir="row" gap={5}>
                    <IoHomeOutline color="#E7E9EA" size={20} />
                    <Text color="#E7E9EA" fontSize="md">
                      Home
                    </Text>
                  </Flex>
                </Box>
              </Link>

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
                    {myTeams.length === 0
                      &&
                      <Box paddingX={10} paddingTop={8}>
                        <CreateTeam user={user} myProfile={myProfile} />
                      </Box>
                    }
                    {myTeams?.map((myTeam, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <Button w="100%" variant="unstyled"
                            onClick={() => {
                              setActiveTeam(myTeam);
                              saveActiveTeamToLocalStorage(myTeam?.team_id);
                              const team_id = myTeam?.team_id;
                              router.push(
                                `/my-teams/${myTeam?.team_name}?team_id=${team_id}`
                              );
                            }}>
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
                          </Button>
                        </React.Fragment>
                      );
                    })}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              {/* <Link href={"/events"}>
                <Box
                  padding={2}
                  _hover={{ backgroundColor: "#161616" }}
                  borderRadius={5}
                >
                  <Flex align="center" flexDir="row" gap={5}>
                    <IoTrophyOutline color="#E7E9EA" size={20} />
                    <Text color="#E7E9EA" fontSize="md">
                      Events
                    </Text>
                  </Flex>
                </Box>
              </Link> */}

              <Link href={"/leaderboard"}>
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

              {/* <Button w="100%" variant="unstyled" onClick={pickup.onOpen}>
                <Box
                  padding={2}
                  _hover={{ backgroundColor: "#161616" }}
                  borderRadius={5}
                >
                  <Flex align="center" flexDir="row" gap={5}>
                    <GiSoccerKick color="#E7E9EA" size={20} />
                    <Text color="#E7E9EA" fontSize="md">
                      Pick-up games
                    </Text>
                  </Flex>
                </Box>
              </Button>
              <ComingSoonModal isOpen={pickup.isOpen} onClose={pickup.onClose} /> */}


              <Button w="100%" variant="unstyled" onClick={rewards.onOpen}>
                <Box
                  padding={2}
                  _hover={{ backgroundColor: "#161616" }}
                  borderRadius={5}
                >
                  <Flex align="center" flexDir="row" gap={5}>
                    <FaAward color="#E7E9EA" size={20} />
                    <Text color="#E7E9EA" fontSize="md">
                      Rewards
                    </Text>
                  </Flex>
                </Box>
              </Button>
            </Stack>
          </DrawerBody>
          <ComingSoonModal isOpen={rewards.isOpen} onClose={rewards.onClose} />

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