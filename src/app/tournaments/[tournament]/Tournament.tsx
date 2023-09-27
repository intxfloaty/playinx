"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Box, Button, Center, Flex, Text } from '../../chakraExports';
import { GiSoccerField, GiSoccerKick, GiWhistle } from 'react-icons/gi';
import { IoFootballOutline, IoPeopleOutline, IoTimeOutline, IoLocationOutline } from 'react-icons/io5';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

const Tournament = () => {
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();
  const id = searchParams.get("id")
  const [tournament, setTournament] = useState()

  const fetchTournamentDetails = async () => {
    let { data: tourna, error } = await supabase
      .from("tournaments")
      .select("*")
      .eq("id", `${id}`);

    console.log(tourna, "matches");
    console.log(error, "err");
    if (!error) {
      setTournament(tourna[0]);
    }
  }

  useEffect(() => {
    fetchTournamentDetails()
  }, [])

  return (
    <Box p={4}>
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
            <Flex flexDir="column" alignItems="flex-start" pl={5}>
              <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                {tournament?.category}
              </Text>
              <Text fontSize="md" color="gray">
                Category
              </Text>
            </Flex>
          </Flex>

          <Flex flexDir="row" alignItems="center" mb={3}>
            <GiSoccerKick size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={5}>
              <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                {tournament?.type}
              </Text>
              <Text fontSize="md" color="gray">
                Type
              </Text>
            </Flex>
          </Flex>


          <Flex flexDir="row" alignItems="center" mb={3}>
            <GiSoccerField size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={5}>
              <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                {tournament?.format}
              </Text>
              <Text fontSize="md" color="gray">
                Format
              </Text>
            </Flex>
          </Flex>

          <Flex flexDir="row" alignItems="center" mb={3}>
            <IoTimeOutline size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={5}>
              <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                {tournament?.start_date}
              </Text>
              <Text fontSize="md" color="gray">
                Kick-off
              </Text>
            </Flex>
          </Flex>

          <Flex flexDir="row" alignItems="center" mb={3}>
            <IoLocationOutline size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={5}>
              <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                {tournament?.location}
              </Text>
              <Text fontSize="md" color="gray">
                Location
              </Text>
            </Flex>
          </Flex>

          <Flex flexDir="row" alignItems="center" mb={3}>
            <FaRegMoneyBillAlt size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={5}>
              <Text textTransform="capitalize" fontSize="md" color="#E7E9EA">
                {tournament?.prize_money}*
              </Text>
              <Text fontSize="md" color="gray">
                Prize
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

export default Tournament