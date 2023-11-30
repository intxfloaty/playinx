import React, { useRef, useEffect } from "react";
import { Box, Flex, Text } from "../../chakraExports";
import YouTube from 'react-youtube';
import {
  IoAddOutline,
  IoFootballOutline,
  IoArrowForwardOutline,
  IoTimeOutline,
  IoLocationOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { GiWhistle, GiSoccerKick } from "react-icons/gi";


const Overview = ({ match }) => {

  return (
    <>
      {/* Video highlights */}
      {match?.match_status === "completed" &&
        <Box>
          <YouTube
            videoId="fGCSJy3LOKc"
            opts={{
              height: '360',
              width: '100%',
              playerVars: {
                autoplay: 0,
              },
            }}
          />
        </Box>
      }


      {
        match?.match_status === "completed" &&
        <Box backgroundColor="#161616" borderRadius={7} >
          <Flex
            justifyContent="flex-start"
            p={4}
            borderBottomColor="gray"
            borderBottomWidth="1px"
          >
            <Text fontSize="sm" color="#E7E9EA">
              PLAYER OF THE MATCH
            </Text>
          </Flex>

          <Flex flexDir="column" p={4}>
            <Flex flexDir="row" alignItems="center" mb={3}>
              <GiSoccerKick size={24} color="#E7E9EA" />
              <Flex flexDir="column" alignItems="flex-start" pl={5}>
                <Text fontSize="lg" fontWeight="medium" color="#E7E9EA">
                  {match?.best_player}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      }

      <Box backgroundColor="#161616" borderRadius={7} mt={4}>
        <Flex
          justifyContent="flex-start"
          p={4}
          borderBottomColor="gray"
          borderBottomWidth="1px"
        >
          <Text fontSize="sm" color="#E7E9EA">
            MATCH INFORMATION
          </Text>
        </Flex>

        <Flex flexDir="column" p={4}>
          <Flex flexDir="row" alignItems="center" mb={3}>
            <IoFootballOutline size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={5}>
              <Text fontSize="md" color="#E7E9EA">
                Competition
              </Text>
              <Text fontSize="md" color="gray">
                {match?.match_type}
              </Text>
            </Flex>
          </Flex>

          <Flex flexDir="row" alignItems="center" mb={3}>
            <IoPeopleOutline size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={5}>
              <Text fontSize="md" color="#E7E9EA">
                Format
              </Text>
              <Text fontSize="md" color="gray">
                {match?.format}
              </Text>
            </Flex>
          </Flex>

          <Flex flexDir="row" alignItems="center" mb={3}>
            <IoTimeOutline size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={5}>
              <Text fontSize="md" color="#E7E9EA">
                Kick-off
              </Text>
              <Text fontSize="md" color="gray">
                {match?.date} at {match?.time}
              </Text>
            </Flex>
          </Flex>

          <Flex flexDir="row" alignItems="center" mb={3}>
            <IoLocationOutline size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={5}>
              <Text fontSize="md" color="#E7E9EA">
                Location
              </Text>
              <Text fontSize="md" color="gray">
                {match?.location}
              </Text>
            </Flex>
          </Flex>

          <Flex flexDir="row" alignItems="center" mb={3}>
            <GiWhistle size={24} color="#E7E9EA" />
            <Flex flexDir="column" alignItems="flex-start" pl={5}>
              <Text fontSize="md" color="#E7E9EA">
                Refree
              </Text>
              <Text fontSize="md" color="gray">
                {match?.match_official || "TBD"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Overview;
