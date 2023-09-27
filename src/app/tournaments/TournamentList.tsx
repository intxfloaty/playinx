"use client"
import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Text, useDisclosure } from "../chakraExports";
import { IoFootballOutline, IoLocationOutline, IoPeopleOutline, IoTimeOutline } from 'react-icons/io5';
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const TournamentList = ({ user }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [tournamentList, setTournamentList] = useState([])

  const fetchTournamentList = async () => {
    let { data: tournaments, error } = await supabase
      .from("tournaments")
      .select("*")

    if (!error) {
      setTournamentList(tournaments);
    }
    console.log(error, "tournaErr");
  }

  useEffect(() => {
    fetchTournamentList()
  }, [])


  return (
    <Box p={4}>
      {tournamentList?.map((tourna, idx) => {
        return (
          <Box key={idx} backgroundColor="#161616" mt={4} borderRadius={7} mb={12}>
            <button onClick={() => router.push(`/tournaments/${tourna?.name}?id=${tourna?.id}`)}>
              {/* tourna banner image container */}
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

              {/* tourna details box */}
              <Flex flexDir='column' mt={2} p={2}>
                <Flex borderBottomWidth="1px" pb={2}>
                  <Text fontFamily="monospace" fontSize="xl" textAlign="center" color="#E7E9EA">{tourna?.name}</Text>
                </Flex>

                <Flex flexDir="row" justifyContent="space-between">
                  <Flex mt={2} flexDir="column" flex={1}>
                    <Flex flexDir="row" alignItems="center" mb={3}>
                      <IoFootballOutline size={24} color="#E7E9EA" />
                      <Flex flexDir="column" alignItems="flex-start" pl={5}>
                        <Text fontSize="md" color="gray">
                          Category
                        </Text>
                        <Text fontSize="md" color="#E7E9EA">
                          {tourna?.category}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex flexDir="row" alignItems="center" mb={3}>
                      <IoPeopleOutline size={24} color="#E7E9EA" />
                      <Flex flexDir="column" alignItems="flex-start" pl={5}>
                        <Text fontSize="md" color="gray">
                          Format
                        </Text>
                        <Text fontSize="md" color="#E7E9EA">
                          {tourna?.format}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex mt={2} flexDir="column" flex={1}>
                    <Flex flexDir="row" alignItems="center" mb={3}>
                      <IoTimeOutline size={24} color="#E7E9EA" />
                      <Flex flexDir="column" alignItems="flex-start" pl={5}>
                        <Text fontSize="md" color="gray">
                          Kick-off
                        </Text>
                        <Text fontSize="md" color="#E7E9EA">
                          {tourna?.start_date}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex flexDir="row" alignItems="center" mb={3}>
                      <IoLocationOutline size={24} color="#E7E9EA" />
                      <Flex flexDir="column" alignItems="flex-start" pl={5}>
                        <Text fontSize="md" color="gray">
                          Location
                        </Text>
                        <Text fontSize="md" color="#E7E9EA">
                          {tourna?.location}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </button>
          </Box>
        )
      })}

    </Box>
  )
}

export default TournamentList