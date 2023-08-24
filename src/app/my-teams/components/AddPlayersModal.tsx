"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Input,
  InputGroup,
  InputLeftAddon,
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
} from "../../chakraExports";
import useTeamStore from "../../../utils/store/teamStore";

interface PlayerDetails {
  name: string;
  dob: string;
  position: string;
  rating: string;
}

const initialPlayerDetails: PlayerDetails = {
  name: "",
  dob: "",
  position: "",
  rating: "",
};

const AddPlayers = ({ isAddPlayerOpen, onAddPlayerClose }) => {
  const supabase = createClientComponentClient();
  const activeTeam = useTeamStore((state) => state.activeTeam);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [playerDetails, setPlayerDetails] = useState<PlayerDetails>(initialPlayerDetails);

  console.log(playerDetails, "playerDeta");

  const validate = () => {
    let error = "";
    if (!phoneNumber) {
      error = "Phone number is required";
    } else if (Number(phoneNumber.length) !== 10) {
      error = "Phone number must have 10 digits";
    }
    return error;
  };

  const getPlayerDetails = async () => {
    let { data: profiles, error } = await supabase.from("profiles").select("*");

    if (profiles && profiles.length > 0 && error === null) {
      setPlayerDetails(profiles[0]);
    }
  };

  const handleAddClicked = async () => {
    const error = validate();
    setPhoneError(error);
    getPlayerDetails();
    if (!error) {
      const { data, error } = await supabase
        .from("players")
        .insert([
          {
            team_id: activeTeam.team_id,
            player_phone: phoneNumber,
            player_name: playerDetails?.name,
            player_dob: playerDetails?.dob,
            player_position: playerDetails?.position,
            player_rating: playerDetails?.rating
          },
        ])
        .select();
    }
  };

  useEffect(() => {
    if (phoneError !== "") {
      setPhoneError(validate());
    }
  }, [phoneNumber]);

  return (
    <>
      <Modal isOpen={isAddPlayerOpen} onClose={onAddPlayerClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Players</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup size="md">
              <InputLeftAddon
                children="+91"
                bg="#161616"
                textColor="antiquewhite"
              />
              <Input
                type="number"
                isInvalid={!!phoneError}
                errorBorderColor={phoneError ? "#FFB400" : ""}
                placeholder="phone number"
                textColor="antiquewhite"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </InputGroup>
            {phoneError && (
              <Text fontSize="md" color="black">
                {phoneError}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddClicked}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPlayers;
