"use client"
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Box, Flex, IconButton, Slide, Text } from './chakraExports';
import { IoArrowBackOutline, IoArrowForwardOutline, IoFootballOutline, IoLocationOutline, IoPeopleOutline, IoTimeOutline } from 'react-icons/io5';
import router from 'next/router';
import { useRouter } from 'next/navigation';

// const images = [
//   'tournaBanner.jpeg',
//   'tournaBanner.jpeg',
//   'tournaBanner.jpeg',
//   'tournaBanner.jpeg',
//   'tournaBanner.jpeg',
// ];

const Home = ({ user }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [currentIndex, setCurrentIndex] = useState(0);
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

  // const prevImage = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  // };

  // const nextImage = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  // };

  return (
    <Box p={4}>
      <Text fontSize="md" fontWeight="medium" color="#E7E9EA">
        UPCOMING EVENTS
      </Text>
      <Slide direction="right" in={true} style={{ position: "static" }}>
        <Box
          mt={2}
          display="flex"
          overflowX="auto"
          width="100vw"
          maxWidth="100%"
          whiteSpace="nowrap"
        >
          {eventsList.map((tourna, idx) => (
            <Box
              key={idx}
              mx={2}
              backgroundColor="#161616"
              borderRadius={7}
              mb={6}
              p={2}
              width="75vw" flexShrink={0}
              onClick={() => router.push(`/events/${tourna?.name}?id=${tourna?.id}`)}
              _active={{
                transform: "scale(0.95)", // Add a slight scale-down effect when clicked
                backgroundColor: "#333" // Change the background color when clicked
              }}>
              <Box>
                <img style={{ maxWidth: "100%", objectFit: "contain" }} src={`/images/tournaBanner.jpeg`} alt={`Image ${idx}`} />
              </Box>
              <Flex mt={2} flexDir="column">
                <Flex flexDir="row" justifyContent="flex-start" alignItems="center" my={1}>
                  <IoTimeOutline size={12} color="#E7E9EA" />
                  <Text fontSize="xs" color="#E7E9EA" pl={2}>
                    {tourna?.start_date}
                  </Text>
                </Flex>

                <Flex flexDir="row" justifyContent="flex-start" alignItems="center" my={1}>
                  <IoLocationOutline size={12} color="#E7E9EA" />
                  <Text fontSize="xs" color="#E7E9EA" pl={2}>
                    {tourna?.location}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Box>
      </Slide>
    </Box>
  );
};

export default Home