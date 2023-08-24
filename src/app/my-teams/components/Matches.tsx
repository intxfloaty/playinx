import React from "react";
import { Box, Text, Button, useDisclosure, Flex } from "../../chakraExports";
import { IoAddOutline } from "react-icons/io5";
import CreateMatchModal from "./CreateMatchModal";

const Matches = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box backgroundColor="#161616" borderRadius={5} mb={4}>
        {/* upper container */}
        <Flex
          flexDir="column"
          alignItems="flex-start"
          padding={4}
          borderBottomColor="gray"
          borderBottomWidth="1px"
        >
          <Text fontSize="xl" color="#E7E9EA">
            Matchday
          </Text>
          <Text fontSize="sm" color="gray">
            25-08-2023
          </Text>
        </Flex>

        {/* lower container */}
        <Flex paddingX={4} paddingY={6} justifyContent="space-between">
          {/* team box */}
          <Box flex="2" borderRightColor="gray" borderRightWidth="1px" pr={2}>
            <Flex flexDir="column">
              <Flex justifyContent="space-between" mb={2}>
                <Text fontSize="lg" color="#E7E9EA">
                  Athletic Club
                </Text>
                <Text fontSize="md" color="#E7E9EA">
                  1
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontSize="lg" color="#E7E9EA">
                  TBD
                </Text>
                <Text fontSize="md" color="#E7E9EA">
                  3
                </Text>
              </Flex>
            </Flex>
          </Box>

          {/*  score box */}
          <Box
            flex="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="md" color="gray">
              Full-Time
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box position="fixed" bottom={0} right={0} padding={8}>
        <Button variant="unstyled" onClick={onOpen}>
          <IoAddOutline color="#E7E9EA" size={40} />
        </Button>
        <CreateMatchModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
};

export default Matches;
