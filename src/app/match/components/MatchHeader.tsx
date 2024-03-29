import React from "react";
import { Box, Button, Flex, Text, useDisclosure } from "../../chakraExports";
import { useRouter } from "next/navigation";
import { IoArrowBack, IoFootball, IoSettingsOutline, } from "react-icons/io5";
import EditMatchModal from "./EditMatchModal";

const MatchHeader = ({ activeTeam, match, userId }) => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        paddingX={4}
        paddingTop={2}
      >
        <Button variant="unstyled">
          <IoArrowBack
            onClick={() => router.back()}
            color="#E7E9EA"
            size={22}
          />
        </Button>
        {
          activeTeam?.team_admin === userId && !(match?.match_status === "completed") && !(match?.match_type === "Tournament") &&
          <>
            <Button variant="unstyled">
              <IoSettingsOutline
                onClick={onOpen}
                color="#E7E9EA"
                size={22}
              />
            </Button>
            <EditMatchModal
              isOpen={isOpen}
              onClose={onClose}
              activeTeam={activeTeam}
              match={match} />
          </>
        }
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        paddingX={8}
        paddingY={4}
      >
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
        >
          <Box flex={1}>
            <IoFootball color="green" size={36} />
          </Box>
          <Text flex={1} fontSize="md" color="#E7E9EA" mt={2} textAlign="center">
            {match?.team_name}
          </Text>
        </Flex>
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
        >
          {match?.match_status === "completed" ? (
            <Flex
              flexDir="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="2xl" color="#E7E9EA" p={1} fontWeight="medium">
                {match?.team_score}
              </Text>
              <Text fontSize="xl" color="#E7E9EA">
                :
              </Text>
              <Text fontSize="2xl" color="#E7E9EA" p={1} fontWeight="medium">
                {match?.opponent_score}
              </Text>
            </Flex>
          ) : (
            <Text fontSize="xl" color="#E7E9EA" p={1}>
              {match?.date}
            </Text>
          )}
          {match?.match_status === "completed" ? (
            <Text fontSize="md" color="gray">
              Full-Time
            </Text>
          ) : (
            <Text fontSize="md" color="gray">
              {match?.time}
            </Text>
          )}
        </Flex>
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
        >
          <Box flex={1}>
            <IoFootball color="green" size={36} />
          </Box>
          <Text flex={2} fontSize="md" color="#E7E9EA" mt={2} textAlign="center">
            {match?.opponent_name ? match?.opponent_name : "TBD"}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default MatchHeader;
