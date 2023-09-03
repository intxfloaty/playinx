import React from "react";
import { Button, Flex, Text } from "../../chakraExports";
import { useRouter } from "next/navigation";
import { IoArrowBack, IoFootball } from "react-icons/io5";

const MatchHeader = ({ match }) => {
  const router = useRouter();

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        paddingX={4}
        paddingY={2}
      >
        <Button variant="unstyled">
          <IoArrowBack
            onClick={() => router.back()}
            color="#E7E9EA"
            size={22}
          />
        </Button>
        <Button variant="unstyled">
          {/* <IoSettingsOutline
            onClick={() => onOpen()}
            color="#E7E9EA"
            size={22}
          /> */}
        </Button>
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
        >
          <IoFootball color="green" size={36} />
          <Text fontSize="md" color="#E7E9EA" mt={2}>
            {match?.team_name}
          </Text>
        </Flex>
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
        >
          {match?.match_status === "completed" ? (
            <Flex
              flexDir="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="xl" color="#E7E9EA" p={1}>
                {match?.team_score}
              </Text>
              <Text fontSize="xl" color="#E7E9EA">
                :
              </Text>
              <Text fontSize="xl" color="#E7E9EA" p={1}>
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
        >
          <IoFootball color="green" size={36} />
          <Text fontSize="md" color="#E7E9EA" mt={2}>
            {match?.opponent_name}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default MatchHeader;
