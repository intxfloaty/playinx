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
} from "../app/chakraExports";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FaUser, FaUserFriends, FaTrophy } from "react-icons/fa";
import { IoIosFootball, IoIosStats, IoMdLogOut } from "react-icons/io";

const Drawer = () => {
  const supabase = createClientComponentClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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

  useEffect(() => {
    getNameAndPhone();
  }, []);

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Open
      </Button>
      <SideMenu
        colorScheme="blue"
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        variant="primary"
      >
        <DrawerOverlay />
        <DrawerContent padding={4}>
          <DrawerHeader borderBottomWidth="1px" borderBottomColor="gray">
            <Text color="#ffffff" fontSize="lg">
              {name}
            </Text>
            <Text color="#ffffff" fontSize="sm">
              {phone}
            </Text>
          </DrawerHeader>
          <DrawerBody mt={5}>
            <Stack spacing={8}>
              <Box>
                <Flex align="center" flexDir="row" gap={5}>
                  <FaUser color="#ffffff" size={20} />
                  <Text color="#ffffff" fontSize="lg">
                    Profile
                  </Text>
                </Flex>
              </Box>

              <Box>
                <Flex align="center" flexDir="row" gap={5}>
                  <FaUserFriends color="#ffffff" size={20} />
                  <Text color="#ffffff" fontSize="lg">
                    My Teams
                  </Text>
                </Flex>
              </Box>

              <Box>
                <Flex align="center" flexDir="row" gap={5}>
                  <IoIosFootball color="#ffffff" size={24} />
                  <Text color="#ffffff" fontSize="lg">
                    Matches
                  </Text>
                </Flex>
              </Box>

              <Box>
                <Flex align="center" flexDir="row" gap={5}>
                  <FaTrophy color="#ffffff" size={20} />
                  <Text color="#ffffff" fontSize="lg">
                    Tournaments
                  </Text>
                </Flex>
              </Box>

              <Box>
                <Flex align="center" flexDir="row" gap={5}>
                  <IoIosStats color="#ffffff" size={24} />
                  <Text color="#ffffff" fontSize="lg">
                    Leaderboard
                  </Text>
                </Flex>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Box>
              <Flex align="center" flexDir="row" gap={3}>
                <IoMdLogOut color="#ffffff" size={24} />
                <Text color="#ffffff" fontSize="lg">
                  Logout
                </Text>
              </Flex>
            </Box>

          </DrawerFooter>
        </DrawerContent>
      </SideMenu>
    </>
  );
};

export default Drawer;
