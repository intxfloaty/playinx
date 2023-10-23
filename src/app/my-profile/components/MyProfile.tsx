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
  useDisclosure as EditProfileDisclosure,
  useDisclosure as SupportDisclosure,
  Wrap,
  WrapItem,
} from "../../chakraExports";
import { IoArrowBack, IoChevronForwardOutline, IoDocumentTextOutline, IoHeadsetOutline, IoLogOutOutline, IoNotificationsOutline, IoPodiumOutline, IoWalletOutline } from "react-icons/io5";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import CreateTeam from "../../../components/CreateTeam";
import EditProfileModal from "./EditProfileModal";
import { FaQuestion, FaRegEdit } from "react-icons/fa";
import { GoQuestion } from "react-icons/go";
import SupportModal from "./SupportModal";

type Profile = {
  [key: string]: string
}

const MyProfile = ({ user }) => {
  const supabase = createClientComponentClient();
  const myUserId = user?.id
  const [myProfile, setMyProfile] = useState<Profile>({})

  const router = useRouter();
  const editProfileDisclosure = EditProfileDisclosure()
  const supportDisclosure = SupportDisclosure()

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

  const onRechargeWalletClicked = async () => {
    const data = await fetch('http://localhost:3000/my-profile/api/phonePe', { method: 'POST' }).then((t) => t.json())
    console.log(data, "data ==>>>")
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      // eslint-disable-next-line no-console
      console.error("ERROR:", error);
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
          filter: `user_id=eq.${myUserId}`
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
              name={myProfile?.name}
              src={myProfile?.avatar_URL}
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
        <Flex mt={4} gap={3} flexDir="column" alignItems="center" justifyContent="space-evenly">
          <Button leftIcon={<FaRegEdit size={18} />} w="100%" colorScheme="gray" size="lg" onClick={editProfileDisclosure.onOpen}>Edit Profile</Button>
          <CreateTeam user={user} />
        </Flex>
        <EditProfileModal isOpen={editProfileDisclosure.isOpen} onClose={editProfileDisclosure.onClose} myProfile={myProfile} myUserId={myUserId} />
      </Box>

      <Box mt={10} p={3}>
        <Button
          w="100%"
          variant="unstyled"
        // onClick={onRechargeWalletClicked}
        >
          <Flex p={4} backgroundColor="#161616" borderRadius={7} justifyContent="flex-start" align="center" flexDir="row">
            <Flex alignItems="center" flexDir="row" gap={5} flex={10}>
              <IoWalletOutline color="#E7E9EA" size={20} />
              <Text color="#E7E9EA" fontSize="md">
                Recharge Wallet
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
        <Button w="100%" variant="unstyled" onClick={supportDisclosure.onOpen}>
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
        <SupportModal isOpen={supportDisclosure.isOpen} onClose={supportDisclosure.onClose} />
      </Box>

      <Box p={3}>
        <Button w="100%" variant="unstyled" onClick={handleSignOut}>
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
