import React from 'react'
import { Flex, Text } from '../../../chakraExports'

const EventTeamList = ({ event }) => {
  return (
    <>
      {event?.teams?.map((team, idx) => {
          return (
            <Flex key={idx} justifyContent="space-between" backgroundColor="#161616" p={4} borderRadius={7} >
              <Text fontSize="md" color="#E7E9EA">
               {team.teamName}
              </Text>
            </Flex>
          )
      })}
    </>
  )
}

export default EventTeamList