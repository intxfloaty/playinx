"use client"
import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Text, useDisclosure } from "../chakraExports";
import { IoFootballOutline, IoLocationOutline, IoPeopleOutline, IoTimeOutline } from 'react-icons/io5';
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const EventsList = ({ user }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [eventsList, setEventsList] = useState([])

  const fetchEventstList = async () => {
    let { data: events, error } = await supabase
      .from("events")
      .select("*")
      .order('created_at', { ascending: false })

    if (!error) {
      setEventsList(events);
    }
    console.log(error, "eventsErr");
  }

  useEffect(() => {
    fetchEventstList()
  }, [])


  return (
    <Box p={4}>
      {eventsList?.map((tourna, idx) => {
        return (
          <Box
            key={idx}
            backgroundColor="#161616"
            mt={4}
            borderRadius={7}
            mb={12}
            onClick={() => router.push(`/events/${tourna?.name}?id=${tourna?.id}`)}
            _active={{
              transform: "scale(0.95)", // Add a slight scale-down effect when clicked
              backgroundColor: "#333" // Change the background color when clicked
            }}>
            {/* tourna banner image container */}
            <Box w={{
              base: "100%", // 0-48em
              md: "50%", // 48em-80em,
              xl: "25%", // 80em+
            }}>
              <img
                style={{ maxWidth: "100%", objectFit: "contain" }}
                alt="Logo"
                src={tourna?.banner_image_URL} />
            </Box>

            {/* tourna details box */}
            <Flex flexDir='column' mt={2} p={2}>
              <Flex borderBottomWidth="1px" pb={2}>
                <Text fontFamily="monospace" fontSize="xl" textAlign="center" color="#E7E9EA">{tourna?.name}</Text>
              </Flex>

              <Flex flexDir="row" justifyContent="space-between">
                <Flex mt={2} flexDir="column" flex={1}>
                  <Flex flexDir="row" alignItems="center" mb={3}>
                    <IoFootballOutline size={18} color="#E7E9EA" />
                    <Flex flexDir="column" alignItems="flex-start" pl={3}>
                      <Text fontSize="md" color="gray">
                        Category
                      </Text>
                      <Text fontSize="md" color="#E7E9EA">
                        {tourna?.category}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex flexDir="row" alignItems="center" mb={3}>
                    <IoPeopleOutline size={18} color="#E7E9EA" />
                    <Flex flexDir="column" alignItems="flex-start" pl={3}>
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
                    <IoTimeOutline size={18} color="#E7E9EA" />
                    <Flex flexDir="column" alignItems="flex-start" pl={3}>
                      <Text fontSize="md" color="gray">
                        Kick-off
                      </Text>
                      <Text fontSize="md" color="#E7E9EA">
                        {tourna?.start_date}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex flexDir="row" alignItems="center" mb={3}>
                    <IoLocationOutline size={18} color="#E7E9EA" />
                    <Flex flexDir="column" alignItems="flex-start" pl={3}>
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
          </Box>
        )
      })}

    </Box>
  )
}

export default EventsList