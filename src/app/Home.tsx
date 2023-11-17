"use client"
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Avatar, Box, Center, Flex, IconButton, Slide, Text, Wrap, WrapItem } from './chakraExports';
import { IoArrowBackOutline, IoArrowForwardOutline, IoFootballOutline, IoLocationOutline, IoPeopleOutline, IoTimeOutline } from 'react-icons/io5';
import router from 'next/router';
import { useRouter } from 'next/navigation';

type Match = {
  match_id: string;
  date: string;
  location: string;
  time: string;
  team_name: string;
  team_id: string;
  opponent_name: string;
  opponent_id: string;
  match_status: string;
  opponent_status: string;
  team_score: string;
  opponent_score: string;
};

const Home = ({ user, myTeams }) => {
  const router = useRouter();
  const myUserId = user?.id
  const supabase = createClientComponentClient();
  // const [myTeams, setMyTeams] = useState([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [eventsList, setEventsList] = useState([])

  // const getMyTeams = async () => {
  //   try {
  //     let { data: teams, error } = await supabase
  //       .from("teams")
  //       .select("*")
  //       .or(`team_admin.eq.${myUserId},players.cs.{${myUserId}}`);

  //     if (teams && teams.length > 0 && error === null) {
  //       setMyTeams(teams);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  async function fetchMatchesForTeams(teamIds) {
    const promises = teamIds.map(async (team) => {
      const { data: matches, error } = await supabase
        .from("matches")
        .select("*")
        .eq("match_status", "pending")
        .or(
          `team_id.eq.${team},opponent_id.eq.${team}`
        );
      return { matches, error };
    });

    const results = await Promise.all(promises);

    const allMatches = results
      .reduce((matches, result) => {
        if (result.matches && result.matches.length > 0 && result.error === null) {
          return matches.concat(result.matches);
        }
        return matches;
      }, []);
    return allMatches;
  }

  const getMatches = async () => {
    const teamIdArr = myTeams?.map(team => team?.team_id);
    fetchMatchesForTeams(teamIdArr)
      .then((matches) => {
        // Do something with the matches, e.g., set them in state
        setMatches(matches);
      })
      .catch((error) => {
        console.error(error, "matchError");
      });
  };

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
    // getMyTeams();
  }, [])

  useEffect(() => {
    if (myTeams?.length > 0) getMatches()
  }, [myTeams])


  console.log(myTeams, "myTeams")
  return (
    <Box p={4}>
      {/* Upcoming matches box */}
      <Box>
        <Text mb={2} fontSize="md" fontWeight="medium" color="#E7E9EA">
          UPCOMING MATCHES
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

            {matches?.length === 0 &&
              <Flex
                flexDir="column"
                backgroundColor="#161616"
                borderRadius={7}
                p={4}
              >
                <Center >
                  <Text mb={2} fontSize="md" fontWeight="medium" color="#E7E9EA">
                    No upcoming matches!
                  </Text>
                </Center>
              </Flex>}

            {matches?.map((match, idx) => {
              return (
                <Box
                  backgroundColor="#161616"
                  borderRadius={7}
                  mb={6}
                  mx={2}
                  p={2}
                  width="75vw" flexShrink={0} 
                  key={idx}
                  onClick={() => {
                    router.push(
                      `/match/${match?.team_name}vs${match?.opponent_name}?matchId=${match?.match_id}`
                    );
                  }}
                  _active={{
                    transform: "scale(0.95)", // Add a slight scale-down effect when clicked
                    backgroundColor: "#333" // Change the background color when clicked
                  }}>
                  {/* upper container */}
                  <Flex
                    flexDir="row"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottomColor="gray"
                    borderBottomWidth="1px"
                  >
                    <Flex
                      flexDir="column"
                      alignItems="flex-start"
                      paddingX={4}
                      paddingY={2}
                    >
                      <Text fontSize="xl" color="#E7E9EA">
                        Matchday
                      </Text>
                      <Text fontSize="sm" color="gray">
                        {match?.date}
                      </Text>
                    </Flex>
                    <Box
                      pr={6}
                    >
                      <IoArrowForwardOutline color="#E7E9EA" size={25} />
                    </Box>
                  </Flex>

                  {/* lower container */}
                  <Flex paddingX={4} paddingY={4} justifyContent="space-between">
                    {/* team box */}
                    <Box
                      flex="4"
                      borderRightColor="gray"
                      borderRightWidth="1px"
                      pr={3}
                    >
                      <Flex flexDir="column">
                        <Flex flex={1} justifyContent="space-between" mb={2}>
                          <Text fontSize="lg" color="#E7E9EA" textAlign="left">
                            {match?.team_name}
                          </Text>
                          {match?.team_score && (
                            <Text fontSize="md" color="#E7E9EA">
                              {match?.team_score}
                            </Text>
                          )}
                        </Flex>
                        <Flex flex={1} justifyContent="space-between">
                          {match?.opponent_name === null && (
                            <Text fontSize="lg" color="#E7E9EA">
                              TBD
                            </Text>
                          )}
                          <Text fontSize="lg" color="#E7E9EA" textAlign="left">
                            {match?.opponent_name}
                          </Text>
                          {match?.opponent_score && (
                            <Text fontSize="md" color="#E7E9EA">
                              {match?.opponent_score}
                            </Text>
                          )}
                        </Flex>
                      </Flex>
                    </Box>

                    {/*  time box */}
                    <Box
                      flex="1"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text fontSize="md" color="gray">
                        {match?.time}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              )
            })
            }
          </Box>
        </Slide>
      </Box>


      {/* team of the week box */}
      <Box mt={4} style={{ position: 'relative' }}>
        <Text mb={2} fontSize="md" fontWeight="medium" color="#E7E9EA">
          TEAM OF THE WEEK
        </Text>
        <Box style={{ position: 'relative' }}>
          <img
            style={{ maxWidth: "100%", objectFit: "contain" }}
            alt="Logo"
            src="/images/Football_field.svg"
          />
          <Wrap style={{
            position: 'absolute',
            top: '40%',
            left: '20%',
            transform: 'translate(-50%, -50%)',
          }}>
            <WrapItem>
              <Avatar
                size="lg"
                name="Pravesh Jha"
              // src="https://doplgubkrufldxyduvlh.supabase.co/storage/v1/object/public/user_avatar/b7b000e5-234a-4719-beba-2211c8d16e9e/1d733274-7830-489c-9887-ffa2cc289e70"
              />
            </WrapItem>
          </Wrap>

          <Wrap style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            <WrapItem>
              <Avatar
                size="lg"
                name="Cristiano Ronaldo"
              // src="https://doplgubkrufldxyduvlh.supabase.co/storage/v1/object/public/user_avatar/b7b000e5-234a-4719-beba-2211c8d16e9e/1d733274-7830-489c-9887-ffa2cc289e70"
              />
            </WrapItem>
          </Wrap>

          <Wrap style={{
            position: 'absolute',
            top: '40%',
            left: '80%',
            transform: 'translate(-50%, -50%)',
          }}>
            <WrapItem>
              <Avatar
                size="lg"
                name="Lionel Messi"
              // src="https://doplgubkrufldxyduvlh.supabase.co/storage/v1/object/public/user_avatar/b7b000e5-234a-4719-beba-2211c8d16e9e/1d733274-7830-489c-9887-ffa2cc289e70"
              />
            </WrapItem>
          </Wrap>

          <Wrap style={{
            position: 'absolute',
            top: '70%',
            left: '20%',
            transform: 'translate(-50%, -50%)',
          }}>
            <WrapItem>
              <Avatar
                size="lg"
                name="Zinedine Zidane"
              // src="https://doplgubkrufldxyduvlh.supabase.co/storage/v1/object/public/user_avatar/b7b000e5-234a-4719-beba-2211c8d16e9e/1d733274-7830-489c-9887-ffa2cc289e70"
              />
            </WrapItem>
          </Wrap>

          <Wrap style={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            <WrapItem>
              <Avatar
                size="lg"
                name="Pravesh Jha"
                src="https://doplgubkrufldxyduvlh.supabase.co/storage/v1/object/public/user_avatar/b7b000e5-234a-4719-beba-2211c8d16e9e/1d733274-7830-489c-9887-ffa2cc289e70"
              />
            </WrapItem>
          </Wrap>

          <Wrap style={{
            position: 'absolute',
            top: '70%',
            left: '80%',
            transform: 'translate(-50%, -50%)',
          }}>
            <WrapItem>
              <Avatar
                size="lg"
                name="Sergio Ramos"
              // src="https://doplgubkrufldxyduvlh.supabase.co/storage/v1/object/public/user_avatar/b7b000e5-234a-4719-beba-2211c8d16e9e/1d733274-7830-489c-9887-ffa2cc289e70"
              />
            </WrapItem>
          </Wrap>
        </Box>
      </Box>

      {/* events box */}
      <Box mt={4} >
        <Text fontSize="md" fontWeight="medium" color="#E7E9EA">
          EVENTS
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
                  <img style={{ maxWidth: "100%", objectFit: "contain" }} src={tourna?.banner_image_URL} alt={`Image ${idx}`} />
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
    </Box>
  );
};

export default Home