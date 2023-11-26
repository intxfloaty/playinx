import React, { useEffect, useState } from "react";
import {
  Input,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex
} from "../../chakraExports";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useTeamStore from "../../../utils/store/teamStore";
import { format, parse } from "date-fns";

interface Errors {
  [key: string]: string;
}
const CreateLineupModal = ({ isOpen, onClose, players, mySquad, oppSquad, matchId, team_id }) => {
  const supabase = createClientComponentClient();
  const [selectedPlayers, setSelectedPlayers] = useState([]);


  const [isLoading, setIsLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  // Array to store lineup data for batch insert
  const lineupData = [];

  const handleCheckboxChange = (player) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter((selectedPlayer) => selectedPlayer !== player));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const insertLineup = (match_id, pId, pName, pPosition, pRating, team_id) => {
    // Check for duplicates before adding to lineupData
    const isDuplicate = mySquad?.some(
      (lineup) =>
        lineup.match_id === match_id &&
        lineup.player_id === pId &&
        lineup.player_name === pName &&
        lineup.player_position === pPosition &&
        lineup.player_rating === pRating &&
        lineup.team_id === team_id
    ) || oppSquad?.some(
      (lineup) =>
        lineup.match_id === match_id &&
        lineup.player_id === pId &&
        lineup.player_name === pName &&
        lineup.player_position === pPosition &&
        lineup.player_rating === pRating &&
        lineup.team_id === team_id
    )

    if (!isDuplicate) {
      lineupData.push({
        player_id: pId,
        match_id: match_id,
        player_name: pName,
        player_position: pPosition,
        player_rating: pRating,
        team_id: team_id,
      });
    }
  };

  const onCreateLineupClicked = async () => {
    setIsLoading(true)
    // Iterate over selected players and add to lineupData array
    selectedPlayers.forEach((player) => {
      const pId = player?.player_id
      const pName = player?.player_name;
      const pPosition = player?.player_position;
      const pRating = player?.player_rating;

      insertLineup(matchId, pId, pName, pPosition, pRating, team_id);
    });

    // Perform batch insert
    if (lineupData.length > 0) {
      const { data, error } = await supabase.from("lineup").insert(lineupData);
      console.log(error, "lineupError");
      if (!error) {
        onClose()
      }
    }

    setIsLoading(false)
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom" size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Lineup</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {players?.map((player, idx) => {
            const isDuplicate = mySquad?.some((lineup) =>
              lineup.player_name === player.player_name &&
              lineup.player_position === player.player_position &&
              lineup.player_rating === player.player_rating)
              ||
              oppSquad?.some((lineup) =>
                lineup.player_name === player.player_name &&
                lineup.player_position === player.player_position &&
                lineup.player_rating === player.player_rating
              )
            return (
              <Flex key={idx} mt={10}>
                <Checkbox
                  size="lg"
                  colorScheme="green"
                  isDisabled={isDuplicate}
                  isChecked={selectedPlayers.includes(player)}
                  onChange={() => handleCheckboxChange(player)}
                >
                  {player?.player_name}
                </Checkbox>
              </Flex>
            )
          })}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="messenger" onClick={onCreateLineupClicked} isLoading={isLoading}>
            Create Lineup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateLineupModal;
