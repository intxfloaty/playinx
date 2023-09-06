import React, { useEffect, useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "../../chakraExports";
import { IoCloseOutline } from "react-icons/io5";
import TeamStat from "./TeamStat";
import TeamPlayersStat from "./TeamPlayersStat";
import OppPlayersStat from "./OppPlayersStat";

interface Errors {
  [key: string]: string;
}

type TeamStat = {
  teamScore: string;
  teamCorner: string;
  teamYellowCard: string;
  teamRedCard: string;
  teamDiscipline: string;
};

type OppStat = {
  oppScore: string;
  oppCorner: string;
  oppYellowCard: string;
  oppRedCard: string;
  oppDiscipline: string;
};

const UpdateMatchScoreModal = ({ isOpen, onClose, match }) => {
  const supabase = createClientComponentClient();
  const [teamLineup, setTeamLineup] = useState([]);
  const [oppLineup, setOppLineup] = useState([]);

  const [teamStat, setTeamStat] = useState<TeamStat>({
    teamScore: "0",
    teamCorner: "0",
    teamYellowCard: "0",
    teamRedCard: "0",
    teamDiscipline: "On Time",
  });
  const [oppStat, setOppStat] = useState<OppStat>({
    oppScore: "0",
    oppCorner: "0",
    oppYellowCard: "0",
    oppRedCard: "0",
    oppDiscipline: "On Time",
  });

  const [teamPlayers, setTeamPlayers] = useState([]);
  const [oppPlayers, setOppPlayers] = useState([]);
  const [goalError, setGoalError] = useState<Errors>({});

  const [teamPlayerStat, setTeamPlayerStat] = useState([]);
  const [oppPlayerStat, setOppPlayerStat] = useState([]);

  const fetchTeamLineUp = async () => {
    let { data: lineup, error } = await supabase
      .from("lineup")
      .select("*")
      .eq("match_id", `${match?.match_id}`)
      .eq("team_id", `${match?.team_id}`);

    if (!error) {
      setTeamLineup(lineup);
    }
  };

  const fetchOppLineUp = async () => {
    let { data: lineup, error } = await supabase
      .from("lineup")
      .select("*")
      .eq("match_id", `${match?.match_id}`)
      .eq("team_id", `${match?.opponent_id}`);

    if (!error) {
      setOppLineup(lineup);
    }
  };

  const updateMatchScore = async () => {
    const { data, error } = await supabase
      .from("matches")
      .update({
        match_status: "completed",
        team_score: teamStat?.teamScore,
        team_corner: teamStat?.teamCorner,
        team_yellow_card: teamStat?.teamYellowCard,
        team_red_card: teamStat?.teamRedCard,
        team_discipline: teamStat?.teamDiscipline,
        opponent_score: oppStat?.oppScore,
        opponent_corner: oppStat?.oppCorner,
        opponent_yellow_card: oppStat?.oppYellowCard,
        opponent_red_card: oppStat?.oppRedCard,
        opponent_discipline: oppStat?.oppDiscipline,
      })
      .eq("match_id", `${match?.match_id}`);

    console.log(error, "updateMatchErr");
  };

  const updateTeamLineUpStat = () => {
    teamPlayerStat?.map(async (teamPlayer) => {
      const { data, error } = await supabase
        .from("lineup")
        .update({
          goals: teamPlayer?.goals,
          assists: teamPlayer?.assists,
          card: teamPlayer?.card,
        })
        .eq("match_id", `${match?.match_id}`)
        .eq("team_id", `${match?.team_id}`)
        .eq("player_id", `${teamPlayer?.playerId}`);

      console.log(error, "teamStatErr");
    });
  };

  const updateOppLineUpStat = () => {
    oppPlayerStat?.map(async (oppPlayer) => {
      const { data, error } = await supabase
        .from("lineup")
        .update({
          goals: oppPlayer?.goals,
          assists: oppPlayer?.assists,
        })
        .eq("match_id", `${match?.match_id}`)
        .eq("team_id", `${match?.opponent_id}`)
        .eq("player_id", `${oppPlayer?.playerId}`);

      console.log(error, "oppStatErr");
    });
  };

  const validateGoalCount = () => {
    let teamGoalCount = 0;
    let oppGoalCount = 0;
    let errors: Errors = {};

    if (teamPlayerStat) {
      teamGoalCount = teamPlayerStat.reduce((totalGoals, player) => {
        const goals = Number(player?.goals);
        return totalGoals + goals;
      }, 0);
    }

    if (oppPlayerStat) {
      oppGoalCount = oppPlayerStat.reduce((totalGoals, player) => {
        const goals = Number(player?.goals);
        return totalGoals + goals;
      }, 0);
    }

    if (
      !(
        teamGoalCount === Number(teamStat?.teamScore) &&
        oppGoalCount === Number(oppStat?.oppScore)
      )
    ) {
      errors.playerScoreError =
        "Team score and no of goals scored by players should be equal!";
    }

    if (!teamStat?.teamScore) {
      errors.teamScoreErr = "Please enter team score";
    }
    if (!teamStat?.teamCorner) {
      errors.teamCorner = "Please enter team corners";
    }
    if (!teamStat?.teamYellowCard) {
      errors.teamYellowCard = "Please enter team yellow cards";
    }
    if (!teamStat?.teamRedCard) {
      errors.teamRedCard = "Please enter team red cards ";
    }
    if (!teamStat?.teamDiscipline) {
      errors.teamDiscipline = "Please select team discipline";
    }
    if (!oppStat?.oppScore) {
      errors.oppScoreErr = "Please enter team score";
    }
    if (!oppStat?.oppCorner) {
      errors.oppCorner = "Please enter team corners";
    }
    if (!oppStat?.oppYellowCard) {
      errors.oppYellowCard = "Please enter team yellow cards";
    }
    if (!oppStat?.oppRedCard) {
      errors.oppRedCard = "Please enter team red cards ";
    }
    if (!oppStat?.oppDiscipline) {
      errors.oppDiscipline = "Please select team discipline";
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateGoalCount();
    if (Object.keys(errors).length === 0) {
      await updateMatchScore();
      updateTeamLineUpStat();
      updateOppLineUpStat();
      onClose();
    } else setGoalError(errors);
  };

  useEffect(() => {
    if (Object.keys(goalError).length !== 0) {
      setGoalError(validateGoalCount());
    }
  }, [teamPlayerStat, oppPlayerStat, teamStat?.teamScore, oppStat?.oppScore]);

  useEffect(() => {
    fetchTeamLineUp();
    fetchOppLineUp();
  }, []);

  // console.log(oppPlayers, "players");
  // console.log(oppPlayerStat, "stat");
  // console.log(goalError, "gERR");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size="full"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justifyContent="flex-end">
            <IoCloseOutline color="black" size={30} onClick={onClose} />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <TeamStat
            teamStat={teamStat}
            setTeamStat={setTeamStat}
            oppStat={oppStat}
            setOppStat={setOppStat}
            goalError={goalError}
          />
          <Tabs align="center" isFitted variant="unstyled" mt={10}>
            <TabList>
              <Tab fontSize="lg" color="black">
                {match?.team_name}
              </Tab>
              <Tab fontSize="lg" color="black">
                {match?.opponent_name}
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="#161616"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <TeamPlayersStat
                  teamPlayers={teamPlayers}
                  setTeamPlayers={setTeamPlayers}
                  teamLineup={teamLineup}
                  teamPlayerStat={teamPlayerStat}
                  setTeamPlayerStat={setTeamPlayerStat}
                />
              </TabPanel>
              <TabPanel>
                <OppPlayersStat
                  oppPlayers={oppPlayers}
                  setOppPlayers={setOppPlayers}
                  oppLineup={oppLineup}
                  oppPlayerStat={oppPlayerStat}
                  setOppPlayerStat={setOppPlayerStat}
                />
              </TabPanel>
            </TabPanels>
            {(goalError.teamScoreErr || goalError.oppScoreErr) && (
              <Text fontSize="md" color="red">
                {goalError.teamScoreErr || goalError.oppScoreErr}
              </Text>
            )}
            {!goalError.playerScoreError ? (
              <Button colorScheme="messenger" mt={6} onClick={handleSubmit}>
                Submit
              </Button>
            ) : (
              <Text fontSize="md" color="red">
                {goalError.playerScoreError}
              </Text>
            )}
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateMatchScoreModal;
