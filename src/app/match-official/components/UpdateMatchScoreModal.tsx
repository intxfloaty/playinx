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

  const updateTeamLineUpStat = async () => {
    teamLineup?.map(async (teamPlayer) => {
      // Find the corresponding player in teamPlayerStat
      const playerStat = teamPlayerStat?.find(
        (player) => player.playerId === teamPlayer.player_id
      );
      const GS = Number(teamStat?.teamScore) * 2;
      const GC = Number(oppStat?.oppScore);

      if (playerStat) {
        let matchRating;
        const foul =
          playerStat?.card === "" ? 0 : playerStat?.card === "Y" ? 1 : 3;

        if (teamPlayer?.player_position === "Goal-Keeper") {
          const minRawRating = 0;
          const maxRawRating = Number(teamStat?.teamScore) * 8 + GS - GC;
          const maxMinDiff = maxRawRating - minRawRating;
          const goals = Number(playerStat?.goals) * 8;
          const assists = Number(playerStat?.assists) * 4;
          const rating = goals + assists + GS - foul - GC;
          matchRating = (rating / maxMinDiff) * 10;

          console.log(matchRating, "nor");
        }

        if (teamPlayer?.player_position === "Defence") {
          const minRawRating = 0;
          const maxRawRating = Number(teamStat?.teamScore) * 6 + GS - GC;
          const maxMinDiff = maxRawRating - minRawRating;
          const goals = Number(playerStat?.goals) * 6;
          const assists = Number(playerStat?.assists) * 4;
          const rating = goals + assists + GS - foul - GC;
          matchRating = (rating / maxMinDiff) * 10;

          console.log(matchRating, "nor");
        }

        if (teamPlayer?.player_position === "Mid-Field") {
          const minRawRating = 0;
          const maxRawRating = Number(teamStat?.teamScore) * 5 + GS - GC;
          const maxMinDiff = maxRawRating - minRawRating;
          const goals = Number(playerStat?.goals) * 5;
          const assists = Number(playerStat?.assists) * 2;
          const rating = goals + assists + GS - foul - GC;
          matchRating = (rating / maxMinDiff) * 10;

          console.log(matchRating, "nor");
        }

        if (teamPlayer?.player_position === "Attack") {
          const minRawRating = 0;
          const maxRawRating = Number(teamStat?.teamScore) * 4 + GS - GC;
          const maxMinDiff = maxRawRating - minRawRating;
          const goals = Number(playerStat?.goals) * 4;
          const assists = Number(playerStat?.assists) * 2;
          const rating = goals + assists + GS - foul - GC;
          matchRating = (rating / maxMinDiff) * 10;

          console.log(matchRating, "nor");
        }

        const { data, error } = await supabase
          .from("lineup")
          .update({
            goals: playerStat?.goals,
            assists: playerStat?.assists,
            card: playerStat?.card,
            match_rating: `${matchRating}`,
          })
          .eq("match_id", `${match?.match_id}`)
          .eq("team_id", `${match?.team_id}`)
          .eq("player_id", `${teamPlayer?.player_id}`);

        console.log(error, "teamStatErr");
      } else {
        const minRawRating = 0;
        const maxRawRating = Number(teamStat?.teamScore) * 4;
        const maxMinDiff = maxRawRating - minRawRating;
        const rating = GS - GC;
        const matchRating = (rating / maxMinDiff) * 10;
        console.log(matchRating, "nor");

        const { data, error } = await supabase
          .from("lineup")
          .update({
            match_rating: matchRating,
          })
          .eq("match_id", `${match?.match_id}`)
          .eq("team_id", `${match?.team_id}`)
          .eq("player_id", `${teamPlayer?.player_id}`);

        console.log(error, "teamStatErr");
      }
    });
  };

  const updateOppLineUpStat = () => {
    oppPlayerStat?.map(async (oppPlayer) => {
      const { data, error } = await supabase
        .from("lineup")
        .update({
          goals: oppPlayer?.goals,
          assists: oppPlayer?.assists,
          card: oppPlayer?.card,
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
    // const errors = validateGoalCount();
    // if (Object.keys(errors).length === 0) {
    // await updateMatchScore();
    updateTeamLineUpStat();
    // updateOppLineUpStat();
    // onClose();
    // } else setGoalError(errors);
  };

  // useEffect(() => {
  //   if (Object.keys(goalError).length !== 0) {
  //     setGoalError(validateGoalCount());
  //   }
  // }, [teamPlayerStat, oppPlayerStat, teamStat?.teamScore, oppStat?.oppScore]);

  useEffect(() => {
    fetchTeamLineUp();
    fetchOppLineUp();
  }, []);

  console.log(teamPlayers, "players");
  console.log(teamPlayerStat, "stat");
  console.log(goalError, "gERR");

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
