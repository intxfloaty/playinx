"use client";
import React, { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Text,
  Flex,
  Button,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Grid, GridItem,
  useDisclosure,
  Wrap,
  WrapItem,
} from "../../chakraExports";
import { IoArrowBack, IoChevronForwardOutline, IoDocumentTextOutline, IoHeadsetOutline, IoLogOutOutline, IoNotificationsOutline, IoPodiumOutline, IoWalletOutline } from "react-icons/io5";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import MyTeam from "../../../components/MyTeam";
import { useRouter } from "next/navigation";
import CreateTeam from "../../../components/CreateTeam";
import EditProfileModal from "./EditProfileModal";
import { FaQuestion, FaRegEdit } from "react-icons/fa";
import { GoQuestion } from "react-icons/go";

type Profile = {
  [key: string]: string
}

const MyProfile = ({ user }) => {
  const supabase = createClientComponentClient();
  const myUserId = user?.id
  const [myProfile, setMyProfile] = useState<Profile>({})
  const router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure()



  const getNameAndPhone = async () => {
    try {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", `${myUserId}`);
      if (profiles && error === null) {
        setMyProfile(profiles[0])
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNameAndPhone();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("Profile updated")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
        },
        (payload) => {
          console.log(payload, "payload");
          const updatedProfile = payload.new as Profile
          setMyProfile(updatedProfile)
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <>
      <Flex alignItems="center" justifyContent="center" flexDir="column">
        <Wrap>
          <WrapItem>
            <Avatar
              size="xl"
              name="Pravesh Jha"
              src="https://bit.ly/dan-abramov"
            />
          </WrapItem>
        </Wrap>
        <Text fontSize="3xl" color="#E7E9EA">
          {myProfile?.name}
        </Text>
        <Text fontSize="md" color="#E7E9EA">
          {myProfile?.phone}
        </Text>
      </Flex>

      <Box p={5}>
        <Flex p={2} borderRadius={7} justifyContent="space-around">
          <Flex >
            <Flex flexDir="column">
              <Text fontSize="md" color="gray" textAlign="center">
                Position
              </Text>
              <Text fontSize="lg" color="#E7E9EA" textAlign="center">
                {myProfile?.position}
              </Text>
            </Flex>
          </Flex>
          <Flex >
            <Flex flexDir="column">
              <Text fontSize="md" color="gray" textAlign="center">
                Rating
              </Text>
              <Text fontSize="lg" color="#E7E9EA" textAlign="center">
                {myProfile?.rating}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {/* <Flex alignItems="center" justifyContent="center">
        <IoWalletOutline color="#E7E9EA" size={30} />
       
      </Flex> */}
        <Flex mt={4} gap={3} flexDir="column" alignItems="center" justifyContent="space-evenly">
          <Button leftIcon={<FaRegEdit size={18} />} w="100%" colorScheme="gray" size="lg" onClick={onOpen}>Edit Profile</Button>
          <CreateTeam />
        </Flex>
        <EditProfileModal isOpen={isOpen} onClose={onClose} myProfile={myProfile} myUserId={myUserId} />
      </Box>

      <Box mt={10} p={3}>
        <Button w="100%" variant="unstyled">
          <Flex p={4} backgroundColor="#161616" borderRadius={7} justifyContent="flex-start" align="center" flexDir="row">
            <Flex alignItems="center" flexDir="row" gap={5} flex={10}>
              <IoWalletOutline color="#E7E9EA" size={20} />
              <Text color="#E7E9EA" fontSize="md">
                Wallet
              </Text>
            </Flex>
            <Box flex={1}>
              <Text color="#E7E9EA" fontSize="2xl">₹ 3000</Text>

            </Box>
          </Flex>
        </Button>
      </Box>

      <Box mt={10} p={3}>
        <Button w="100%" variant="unstyled">
          <Flex p={4} backgroundColor="#161616" borderRadius={7} justifyContent="flex-start" align="center" flexDir="row">
            <Flex alignItems="center" flexDir="row" gap={5} flex={10}>
              <IoDocumentTextOutline color="#E7E9EA" size={20} />
              <Text color="#E7E9EA" fontSize="md">
                Terms and Conditions
              </Text>
            </Flex>
            <Box flex={1}>
              <IoChevronForwardOutline color="#E7E9EA" size={20} />
            </Box>
          </Flex>
        </Button>
      </Box>

      <Box p={3}>
        <Button w="100%" variant="unstyled">
          <Flex p={4} backgroundColor="#161616" borderRadius={7} justifyContent="flex-start" align="center" flexDir="row">
            <Flex alignItems="center" flexDir="row" gap={5} flex={10}>
              <GoQuestion color="#E7E9EA" size={20} />
              <Text color="#E7E9EA" fontSize="md">
                FAQs
              </Text>
            </Flex>
            <Box flex={1}>
              <IoChevronForwardOutline color="#E7E9EA" size={20} />
            </Box>
          </Flex>
        </Button>
      </Box>

      <Box p={3}>
        <Button w="100%" variant="unstyled">
          <Flex p={4} backgroundColor="#161616" borderRadius={7} justifyContent="flex-start" align="center" flexDir="row">
            <Flex alignItems="center" flexDir="row" gap={5} flex={10}>
              <IoHeadsetOutline color="#E7E9EA" size={20} />
              <Text color="#E7E9EA" fontSize="md">
                Support
              </Text>
            </Flex>
            <Box flex={1}>
              <IoChevronForwardOutline color="#E7E9EA" size={20} />
            </Box>
          </Flex>
        </Button>
      </Box>

      <Box p={3}>
        <Button w="100%" variant="unstyled">
          <Flex p={4} backgroundColor="#161616" borderRadius={7} justifyContent="flex-start" align="center" flexDir="row">
            <Flex alignItems="center" flexDir="row" gap={5} flex={10}>
              <IoLogOutOutline color="#E7E9EA" size={20} />
              <Text color="#E7E9EA" fontSize="md">
                Log out
              </Text>
            </Flex>
            <Box flex={1}>
              <IoChevronForwardOutline color="#E7E9EA" size={20} />
            </Box>
          </Flex>
        </Button>
      </Box>


    </>
  );
};

export default MyProfile;
