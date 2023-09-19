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

  const calculateMatchRating = (playerStat, teamPlayer, teamStat, oppStat) => {
    const maxMultiplier = Number(teamStat?.teamScore) > Number(oppStat?.oppScore) ? Number(teamStat?.teamScore) : Number(oppStat?.oppScore);
    let goals
    let assists
    let rating
    let matchRating;
    const foul = playerStat?.card === "Y" ? 1 : playerStat?.card === "R" ? 3 : 0;
    const card = playerStat?.card === "Y" ? "Y" : playerStat?.card === "R" ? "R" : ""

    const getPositionMultiplier = (position) => {
      switch (position) {
        case "Goal-Keeper":
          return {
            minRawRating: 0,
            maxRawRating: maxMultiplier * 8,
            goalsMultiplier: 8,
            assistsMultiplier: 6,
          };
        case "Defence":
          return {
            minRawRating: 0,
            maxRawRating: maxMultiplier * 6,
            goalsMultiplier: 6,
            assistsMultiplier: 4,
          };
        case "Mid-Field":
          return {
            minRawRating: 0,
            maxRawRating: maxMultiplier * 5,
            goalsMultiplier: 5,
            assistsMultiplier: 3,
          };
        case "Attack":
          return {
            minRawRating: 0,
            maxRawRating: maxMultiplier * 4,
            goalsMultiplier: 4,
            assistsMultiplier: 2,
          };
        default:
          return null;
      }
    };

    const positionMultiplier = getPositionMultiplier(teamPlayer?.player_position);

    if (positionMultiplier) {
      const maxMinDiff = positionMultiplier.maxRawRating - positionMultiplier.minRawRating;
      goals = playerStat?.goals ? Number(playerStat?.goals) : 0

      assists = playerStat?.assists ? Number(playerStat?.assists) : 0
      rating = (goals * positionMultiplier.goalsMultiplier) + (assists * positionMultiplier.assistsMultiplier) - foul;
      matchRating = (rating / maxMinDiff) * 10;
    }
    return { goals, assists, card, matchRating }
  };

  const avgOverallRating = () => {
    const arr = [];
    const nameArr = []
    teamLineup?.forEach((teamPlayer) => {
      const playerStat = teamPlayerStat?.find(
        (player) => player.playerId === teamPlayer.player_id
      );
      const { goals, assists, card, matchRating } = calculateMatchRating(playerStat, teamPlayer, teamStat, oppStat);
      arr.push(matchRating)
      nameArr.push({ name: teamPlayer?.player_name, goals, assists, matchRating })
    });

    oppLineup?.forEach((oppPlayer) => {
      const playerStat = oppPlayerStat?.find(
        (player) => player.playerId === oppPlayer.player_id
      );
      const { goals, assists, matchRating } = calculateMatchRating(playerStat, oppPlayer, teamStat, oppStat);
      arr.push(matchRating)
      nameArr.push({ name: oppPlayer?.player_name, goals, assists, matchRating })
    });

    const sum = arr.reduce((total, currentValue) => total + currentValue, 0);
    const average = arr.length > 0 ? sum / arr.length : 0;
    console.log(nameArr, average, "--------avg>>>");

    return average;
  };



  const calculateMinMax = () => {
    const relativeArr = [];
    const average = avgOverallRating();
    teamLineup?.forEach((teamPlayer) => {
      const playerStat = teamPlayerStat?.find(
        (player) => player.playerId === teamPlayer.player_id
      );
      const { goals, assists, matchRating } = calculateMatchRating(playerStat, teamPlayer, teamStat, oppStat);
      const relativeRating = matchRating * (average / 10);
      relativeArr.push(relativeRating);
    });

    const minValue = Math.min(...relativeArr);
    const maxValue = Math.max(...relativeArr);

    console.log(relativeArr, minValue, maxValue, "----->team")

    return { minValue, maxValue };
  };

  const calculateOppMinMax = () => {
    const relativeArr = [];
    const average = avgOverallRating();
    oppLineup?.forEach((teamPlayer) => {
      const playerStat = oppPlayerStat?.find(
        (player) => player.playerId === teamPlayer.player_id
      );
      const { goals, assists, matchRating } = calculateMatchRating(playerStat, teamPlayer, teamStat, oppStat);
      const relativeRating = matchRating * (average / 10);
      relativeArr.push(relativeRating);
    });

    const minValue = Math.min(...relativeArr);
    const maxValue = Math.max(...relativeArr);

    console.log(relativeArr, minValue, maxValue, "----->opponent")

    return { minValue, maxValue };
  };


  const calculateScaledRating = (matchRating, average, minValue, maxValue) => {

    const teamScore = Number(teamStat?.teamScore);
    const oppScore = Number(oppStat?.oppScore);

    let scaleFactor = 0;
    let finalRating = 0;
    let normalizedRating = 0

    if (teamScore >= oppScore) {
      if (maxValue !== minValue) {
        scaleFactor = (10 - 5) / (maxValue - minValue);
      }
      normalizedRating = matchRating * (average / 10);
      finalRating = (normalizedRating - minValue) * scaleFactor + 5;
    } else {
      if (maxValue !== minValue) {
        scaleFactor = (8 - 4) / (maxValue - minValue);
      }
      normalizedRating = matchRating * (average / 10);
      finalRating = (normalizedRating - minValue) * scaleFactor + 4;
    }
    return { scaleFactor, normalizedRating, finalRating };
  };


  const calculateOppScaledRating = (matchRating, average, minValue, maxValue) => {
    const teamScore = Number(teamStat?.teamScore);
    const oppScore = Number(oppStat?.oppScore);

    let scaleFactor = 0;
    let finalRating = 0;
    let normalizedRating = 0

    if (oppScore >= teamScore) {
      if (maxValue !== minValue) {
        scaleFactor = (10 - 5) / (maxValue - minValue);
      }
      normalizedRating = matchRating * (average / 10);
      finalRating = (normalizedRating - minValue) * scaleFactor + 5;
    } else {
      if (maxValue !== minValue) {
        scaleFactor = (8 - 4) / (maxValue - minValue);
      }
      normalizedRating = matchRating * (average / 10);
      finalRating = (normalizedRating - minValue) * scaleFactor + 4;
    }
    return { scaleFactor, normalizedRating, finalRating };
  };


  const updateTeamLineUpStat = async () => {
    const average = avgOverallRating();
    const { minValue, maxValue } = calculateMinMax();

    // Create an array of promises
    const promises = teamLineup?.map(async (teamPlayer) => {
      const playerStat = teamPlayerStat?.find(
        (player) => player.playerId === teamPlayer.player_id
      );
      const { goals, assists, card, matchRating } = calculateMatchRating(playerStat, teamPlayer, teamStat, oppStat);
      const { scaleFactor, normalizedRating, finalRating } = calculateScaledRating(matchRating, average, minValue, maxValue);
      console.log(scaleFactor, normalizedRating, finalRating.toFixed(2), teamPlayer?.player_name, teamPlayer?.player_position);

      const { data, error } = await supabase
        .from("lineup")
        .update({
          goals: goals,
          assists: assists,
          card: card,
          match_rating: card === "R" ? 0 : finalRating.toFixed(2)
        })
        .eq("match_id", `${match?.match_id}`)
        .eq("team_id", `${match?.team_id}`)
        .eq("player_id", `${teamPlayer?.player_id}`);

      console.log(error, "updateTeamLineUpStatErr");
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
  };


  const updateOppLineUpStat = async () => {
    const average = avgOverallRating();
    const { minValue, maxValue } = calculateOppMinMax();

    // Create an array of promises
    const promises = oppLineup?.map(async (oppPlayer) => {
      const playerStat = oppPlayerStat?.find((player) => player.playerId === oppPlayer.player_id);
      const { goals, assists, card, matchRating } = calculateMatchRating(playerStat, oppPlayer, teamStat, oppStat);
      const { scaleFactor, normalizedRating, finalRating } = calculateOppScaledRating(matchRating, average, minValue, maxValue);
      console.log(scaleFactor, normalizedRating, finalRating.toFixed(2), oppPlayer?.player_name, oppPlayer?.player_position);

      const { data, error } = await supabase
        .from("lineup")
        .update({
          goals: goals,
          assists: assists,
          card: card,
          match_rating: card === "R" ? 0 : finalRating.toFixed(2)
        })
        .eq("match_id", `${match?.match_id}`)
        .eq("team_id", `${match?.opponent_id}`)
        .eq("player_id", `${oppPlayer?.player_id}`);

      console.log(error, "updateOppLineUpStat");
    });

    // Wait for all promises to resolve
    await Promise.all(promises);
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
      // await updateMatchScore();
      await updateTeamLineUpStat();
      await updateOppLineUpStat();
      onClose();
    } else setGoalError(errors);
  };

  useEffect(() => {
    if (Object.keys(goalError).length !== 0) {
      setGoalError(validateGoalCount());
    }
  }, [teamPlayerStat, oppPlayerStat, teamStat, oppStat]);

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
        <div style={{ maxHeight: "100vh", overflowY: "scroll" }}>
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
            <Tabs align="center" isFitted variant="soft-enclosed" colorScheme="messenger" mt={10}>
              <TabList>
                <Tab fontSize="lg" color="black">
                  {match?.team_name}
                </Tab>
                <Tab fontSize="lg" color="black">
                  {match?.opponent_name}
                </Tab>
              </TabList>
              {/* <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="#161616"
                borderRadius="1px"
              /> */}
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
        </div>
      </ModalContent>
    </Modal>
  );
};

export default UpdateMatchScoreModal;