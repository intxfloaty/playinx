import React from 'react'
import { Box, Button, Flex, Text, useDisclosure } from "../chakraExports";
import { IoFootballOutline, IoLocationOutline, IoPeopleOutline, IoTimeOutline } from 'react-icons/io5';


const Tournaments = ({ user }) => {
  return (
    <Box p={4}>
      <Box backgroundColor="#161616" mt={4}  borderRadius={7} mb={12}>
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
            <Text fontFamily="monospace" fontSize="xl" textAlign="center" color="#E7E9EA">Damians Cup Football Knockout Tournament</Text>
          </Flex>

          <Flex flexDir="row" justifyContent="space-between">
            <Flex mt={2} flexDir="column" flex={1}>
              <Flex flexDir="row" alignItems="center" mb={3}>
                <IoFootballOutline size={24} color="#E7E9EA" />
                <Flex flexDir="column" alignItems="flex-start" pl={5}>
                  <Text fontSize="md" color="gray">
                    Category
                  </Text>
                  <Text fontSize="xl" color="#E7E9EA">
                    Open
                  </Text>
                </Flex>
              </Flex>

              <Flex flexDir="row" alignItems="center" mb={3}>
                <IoPeopleOutline size={24} color="#E7E9EA" />
                <Flex flexDir="column" alignItems="flex-start" pl={5}>
                  <Text fontSize="md" color="gray">
                    Format
                  </Text>
                  <Text fontSize="xl" color="#E7E9EA">
                    6v6
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
                  <Text fontSize="xl"color="#E7E9EA">
                    Aug 11, 2023
                  </Text>
                </Flex>
              </Flex>

              <Flex flexDir="row" alignItems="center" mb={3}>
                <IoLocationOutline size={24} color="#E7E9EA" />
                <Flex flexDir="column" alignItems="flex-start" pl={5}>
                  <Text fontSize="md" color="gray">
                    Location
                  </Text>
                  <Text fontSize="xl"  color="#E7E9EA">
                    MRIS, Charmwood
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>


        </Flex>

      </Box>
    </Box>
  )
}

export default Tournaments