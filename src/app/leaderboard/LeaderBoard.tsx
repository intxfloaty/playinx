"use client"

import React, { useEffect, useState } from 'react'
import { Box, Text, Button, Flex, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '../chakraExports'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { IoArrowBack, IoSettingsOutline } from 'react-icons/io5'



const LeaderBoard = () => {
  const supabase = createClientComponentClient()
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])

  const fetchTeams = async () => {
    let { data: teams, error } = await supabase
      .from('teams')
      .select('*')
      .order('rating', { ascending: false }) // Order by rating in descending order

    if (!error) {
      setTeams(teams)
    }
  }

  const fetchPlayers = async () => {
    let { data: players, error } = await supabase
      .from('profiles')
      .select('*')
      .order('rating', { ascending: false }) // Order by rating in descending order

    if (!error) {
      setPlayers(players)
    }
  }

  useEffect(() => {
    fetchTeams()
    fetchPlayers()
  }, [])

  return (
    <Box>
      <Tabs align="center" isFitted variant="unstyled">
        <TabList>
          <Tab fontSize="lg" color="#E7E9EA">
            Team
          </Tab>
          <Tab fontSize="lg" color="#E7E9EA">
            Player
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="#E7E9EA"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel>
            {/* Render the leaderboard based on teams' ratings */}
            <ul>
              {teams.map((team, index) => (
                <li key={index}>
                  <Flex justifyContent="space-between" backgroundColor="#161616" p={4} borderRadius={7} >
                    <Text fontSize="md" color="#E7E9EA">
                      {` ${index + 1}. ${team.team_name}`}
                    </Text>
                    <Text fontSize="md" color="#E7E9EA">
                      {`+${team.rating}`}
                    </Text>
                  </Flex>
                </li>
              ))}
            </ul>
          </TabPanel>

          <TabPanel>
            {/* Render the leaderboard based on players' ratings */}
            <ul>
              {players.map((player, index) => (
                <li key={index}>
                  <Flex justifyContent="space-between" backgroundColor="#161616" p={4} borderRadius={7} >
                    <Text fontSize="md" color="#E7E9EA">
                      {` ${index + 1}. ${player.name}`}
                    </Text>
                    <Text fontSize="md" color="#E7E9EA">
                      {`+${player.rating}`}
                    </Text>
                  </Flex>
                </li>
              ))}
            </ul>
          </TabPanel>


        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default LeaderBoard