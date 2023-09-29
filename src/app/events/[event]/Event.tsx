"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Box, Button, Center, Flex, Text } from '../../chakraExports';
import { GiSoccerField, GiSoccerKick, GiWhistle } from 'react-icons/gi';
import { IoFootballOutline, IoPeopleOutline, IoTimeOutline, IoLocationOutline, IoArrowBack } from 'react-icons/io5';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { Database } from '../../../database.types';

type Event = {
  category: string
  created_at: string
  format: string
  id: string
  location: string
  name: string
  prize_money: string | null
  start_date: string
  type: string
  entry_fee: string
};

const Event = () => {
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();
  const id = searchParams.get("id")
  const router = useRouter()
  const [event, setEvent] = useState<Event>()

  const fetchEventDetails = async () => {
    let { data: event, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", `${id}`);

    console.log(event, "event");
    console.log(error, "err");
    if (!error) {
      setEvent(event[0]);
    }
  }

  useEffect(() => {
    fetchEventDetails()
  }, [])

  return (
    <Box p={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Button variant="unstyled" >
          <IoArrowBack
            onClick={() => router.back()}
            color="#E7E9EA"
            size={25}
          />
        </Button>
      </Flex>
      <Center mb={4}>
        <Text fontSize="lg" color="GrayText" fontWeight="extrabold" textTransform="uppercase">
          {event?.name}
        </Text>
      </Center>
      <Box w={{
        base: "100%", // 0-48em
        md: "50%", // 48em-80em,
        xl: "25%", // 80em+
      }}>
        <img
          style={{ maxWidth: "100%", objectFit: "contain" }}
          alt="Logo"
          src="/images/tournaBanner.jpeg" />
      </Box>
      <Box mt={4}>
        <Flex
          justifyContent="flex-start"
          p={4}
          borderBottomColor="gray"
          borderBottomWidth="1px"
        >
          <Text fontSize="md" color="#E7E9EA">
            TOURNAMENT DETAILS
          </Text>
        </Flex>

        <Flex flexDir="column" p={4}>

          <Flex flexDir="row" alignItems="center" mb={3}>
            <IoFootballOutline size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={3}>
              <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                {event?.category}
              </Text>
              <Text fontSize="md" color="gray">
                Category
              </Text>
            </Flex>
          </Flex>

          <Flex flexDir="row" alignItems="center" mb={3}>
            <GiSoccerKick size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={3}>
              <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                {event?.type}
              </Text>
              <Text fontSize="md" color="gray">
                Type
              </Text>
            </Flex>
          </Flex>


          <Flex flexDir="row" alignItems="center" mb={3}>
            <GiSoccerField size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={3}>
              <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                {event?.format}
              </Text>
              <Text fontSize="md" color="gray">
                Format
              </Text>
            </Flex>
          </Flex>

          <Flex flexDir="row" alignItems="center" mb={3}>
            <IoTimeOutline size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={3}>
              <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                {event?.start_date}
              </Text>
              <Text fontSize="md" color="gray">
                Kick-off
              </Text>
            </Flex>
          </Flex>

          <Flex flexDir="row" alignItems="center" mb={3}>
            <IoLocationOutline size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={3}>
              <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                {event?.location}
              </Text>
              <Text fontSize="md" color="gray">
                Location
              </Text>
            </Flex>
          </Flex>

          <Flex flexDir="row" alignItems="center" mb={3}>
            <FaRegMoneyBillAlt size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={3}>
              <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                {event?.entry_fee}
              </Text>
              <Text fontSize="md" color="gray">
                Entry fee
              </Text>
            </Flex>
          </Flex>

        </Flex>
      </Box>
      <Center mt={6}>
        <Button size="lg" >Join Tournament</Button>
      </Center>
    </Box>
  )
}

export default Event