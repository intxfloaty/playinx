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
import {
  IoPersonOutline,
  IoPeopleOutline,
  IoTrophyOutline,
  IoPodiumOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import Link from "next/link";
import { after } from "node:test";

const Drawer = ({ children }) => {
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

        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" borderBottomColor="gray">
            <Box padding={2} _hover={{ backgroundColor: "#161616" }}>
              <Text color="#ffffff" fontSize="md">
                {name}
              </Text>
              <Text color="#ffffff" fontSize="sm">
                {phone}
              </Text>
            </Box>
          </DrawerHeader>

          <DrawerBody mt={5}>
            <Stack spacing={8}>
              <Link href={"/"}>
                <Box padding={2} _hover={{ backgroundColor: "#161616" }}>
                  <Flex align="center" flexDir="row" gap={5}>
                    <IoPersonOutline color="#ffffff" size={20} />
                    <Text color="#ffffff" fontSize="md">
                      Profile
                    </Text>
                  </Flex>
                </Box>
              </Link>

              <Link href={"/"}>
                <Box padding={2} _hover={{ backgroundColor: "#161616" }}>
                  <Flex align="center" flexDir="row" gap={5}>
                    <IoPeopleOutline color="#ffffff" size={20} />
                    <Text color="#ffffff" fontSize="md">
                      My Teams
                    </Text>
                  </Flex>
                </Box>
              </Link>

              <Link href={"/"}>
                <Box padding={2} _hover={{ backgroundColor: "#161616" }}>
                  <Flex align="center" flexDir="row" gap={5}>
                    <IoTrophyOutline color="#ffffff" size={20} />
                    <Text color="#ffffff" fontSize="md">
                      Tournaments
                    </Text>
                  </Flex>
                </Box>
              </Link>

              <Link href={"/"}>
                <Box padding={2} _hover={{ backgroundColor: "#161616" }}>
                  <Flex align="center" flexDir="row" gap={5}>
                    <IoPodiumOutline color="#ffffff" size={20} />
                    <Text color="#ffffff" fontSize="md">
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
                <IoLogOutOutline color="#ffffff" size={20} />
                <Text color="#ffffff" fontSize="md">
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
