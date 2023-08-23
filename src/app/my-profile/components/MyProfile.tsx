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
  Wrap,
  WrapItem,
} from "../../chakraExports";
import { IoArrowBack } from "react-icons/io5";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import MyTeam from "../../../components/MyTeam";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const supabase = createClientComponentClient();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

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

  useEffect(() => {
    getNameAndPhone();
  }, []);
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
        <Button size="sm">Edit Profile</Button>
      </Flex>
      <Flex mt={2} alignItems="center" justifyContent="center" flexDir="column">
        <Wrap>
          <WrapItem>
            <Avatar
              size="2xl"
              name="Pravesh Jha"
              src="https://bit.ly/dan-abramov"
            />
          </WrapItem>
        </Wrap>
        <Text fontSize="3xl" color="#E7E9EA">
          {name}
        </Text>
        <Text fontSize="md" color="#E7E9EA">
          {phone}
        </Text>
      </Flex>
      <MyTeam />
    </>
  );
};

export default MyProfile;
