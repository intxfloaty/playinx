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
  useDisclosure,
  Wrap,
  WrapItem,
} from "../../chakraExports";
import { IoArrowBack } from "react-icons/io5";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import MyTeam from "../../../components/MyTeam";
import { useRouter } from "next/navigation";
import CreateTeam from "../../../components/CreateTeam";
import EditProfileModal from "./EditProfileModal";

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
      <Flex alignItems="center" justifyContent="space-between" padding={4}>
        <Button variant="unstyled">
          <IoArrowBack
            onClick={() => router.push("/")}
            color="#E7E9EA"
            size={30}
          />
        </Button>
        <Button size="sm" onClick={onOpen}>Edit Profile</Button>
        <EditProfileModal isOpen={isOpen} onClose={onClose} myProfile={myProfile} myUserId={myUserId} />
      </Flex>
      <Flex mt={2} alignItems="center" justifyContent="center" flexDir="column">
        <Wrap>
          <WrapItem>
            <Avatar
              size="xl"
              name="Pravesh Jha"
              src="https://bit.ly/dan-abramov"
            />
          </WrapItem>
        </Wrap>
        <Text fontSize="2xl" color="#E7E9EA">
          {myProfile?.name}
        </Text>
        <Text fontSize="md" color="#E7E9EA">
          {myProfile?.phone}
        </Text>
        <Text fontSize="md" color="#E7E9EA">
          {myProfile?.position}
        </Text>
        <Text fontSize="md" color="#E7E9EA">
          {myProfile?.rating}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mt={5}>
        <CreateTeam />
      </Flex>
    </>
  );
};

export default MyProfile;
