import React from "react";
import { Box, Flex, Input, Select } from "../../chakraExports";

const TeamStat = ({
  goalError,
  teamStat,
  setTeamStat,
  oppStat,
  setOppStat,
}) => {


  return (
    <>
      {/* Goals */}
      <Flex
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        mt={4}
      >
        <Box w="20%">
          <Input
            type="number"
            color="black"
            borderColor="#161616"
            textAlign="center"
            isInvalid={!!goalError.teamScoreErr}
            errorBorderColor={goalError.teamScoreErr ? "#FFB400" : ""}
            value={teamStat?.teamScore}
            onChange={(e) => {
              setTeamStat({ ...teamStat, teamScore: e.target.value });
            }}
          />
        </Box>
        <Box>Goals</Box>
        <Box w="20%">
          <Input
            type="number"
            color="black"
            borderColor="#161616"
            textAlign="center"
            isInvalid={!!goalError.oppScoreErr}
            errorBorderColor={goalError.oppScoreErr ? "#FFB400" : ""}
            value={oppStat?.oppScore}
            onChange={(e) => {
              setOppStat({ ...oppStat, oppScore: e.target.value });
            }}
          />
        </Box>
      </Flex>

      {/* Corners */}
      <Flex
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        mt={4}
      >
        <Box w="20%">
          <Input
            type="number"
            color="black"
            borderColor="#161616"
            textAlign="center"
            isInvalid={!!goalError.teamCorner}
            errorBorderColor={goalError.teamCorner ? "#FFB400" : ""}
            value={teamStat?.teamCorner}
            onChange={(e) => {
              setTeamStat({ ...teamStat, teamCorner: e.target.value });
            }}
          />
        </Box>
        <Box>Corners</Box>
        <Box w="20%">
          <Input
            type="number"
            color="black"
            borderColor="#161616"
            textAlign="center"
            isInvalid={!!goalError.oppCorner}
            errorBorderColor={goalError.oppCorner ? "#FFB400" : ""}
            value={oppStat?.oppCorner}
            onChange={(e) => {
              setOppStat({ ...oppStat, oppCorner: e.target.value });
            }}
          />
        </Box>
      </Flex>

      {/* Yellow card */}
      <Flex
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        mt={4}
      >
        <Box w="20%">
          <Input
            type="number"
            color="black"
            borderColor="#161616"
            textAlign="center"
            isInvalid={!!goalError.teamYellowCard}
            errorBorderColor={goalError.teamYellowCard ? "#FFB400" : ""}
            value={teamStat?.teamYellowCard}
            onChange={(e) => {
              setTeamStat({ ...teamStat, teamYellowCard: e.target.value });
            }}
          />
        </Box>
        <Box>Yellow card</Box>
        <Box w="20%">
          <Input
            type="number"
            color="black"
            borderColor="#161616"
            textAlign="center"
            isInvalid={!!goalError.oppYellowCard}
            errorBorderColor={goalError.oppYellowCard ? "#FFB400" : ""}
            value={oppStat?.oppYellowCard}
            onChange={(e) => {
              setOppStat({ ...oppStat, oppYellowCard: e.target.value });
            }}
          />
        </Box>
      </Flex>

      {/* Red card */}
      <Flex
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        mt={4}
      >
        <Box w="20%">
          <Input
            type="number"
            color="black"
            borderColor="#161616"
            textAlign="center"
            isInvalid={!!goalError.teamRedCard}
            errorBorderColor={goalError.teamRedCard ? "#FFB400" : ""}
            value={teamStat?.teamRedCard}
            onChange={(e) => {
              setTeamStat({ ...teamStat, teamRedCard: e.target.value });
            }}
          />
        </Box>
        <Box>Red card</Box>
        <Box w="20%">
          <Input
            type="number"
            color="black"
            borderColor="#161616"
            textAlign="center"
            isInvalid={!!goalError.oppRedCard}
            errorBorderColor={goalError.oppRedCard ? "#FFB400" : ""}
            value={oppStat?.oppRedCard}
            onChange={(e) => {
              setOppStat({ ...oppStat, oppRedCard: e.target.value });
            }}
          />
        </Box>
      </Flex>

      {/* Discipline */}
      <Flex
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        mt={4}
      >
        <Box w="30%">
          <Select
            placeholder="Select"
            color="black"
            borderColor="#161616"
            isInvalid={!!goalError.teamDiscipline}
            errorBorderColor={goalError.teamDiscipline ? "#FFB400" : ""}
            value={teamStat?.teamDiscipline}
            onChange={(e) => {
              setTeamStat({ ...teamStat, teamDiscipline: e.target.value });
            }}
          >
            <option value="On Time">On Time</option>
            <option value="Late">Late</option>
            <option value="No Show">No Show</option>
          </Select>
        </Box>
        <Box>Discipline</Box>
        <Box w="30%">
          <Select
            placeholder="Select"
            color="black"
            borderColor="#161616"
            isInvalid={!!goalError.oppDiscipline}
            errorBorderColor={goalError.oppDiscipline ? "#FFB400" : ""}
            value={oppStat?.oppDiscipline}
            onChange={(e) => {
              setOppStat({ ...oppStat, oppDiscipline: e.target.value });
            }}
          >
            <option value="On Time">On Time</option>
            <option value="Late">Late</option>
            <option value="No Show">No Show</option>
          </Select>
        </Box>
      </Flex>
    </>
  );
};

export default TeamStat;
