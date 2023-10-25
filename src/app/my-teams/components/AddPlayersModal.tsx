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
  Center,
  useToast,
} from "../../chakraExports";
import useTeamStore from "../../../utils/store/teamStore";

type PlayerDetails = {
  user_id: string;
  name: string;
  dob: string;
  position: string;
  rating: number;
  avatar_URL: string
};

const AddPlayers = ({ isAddPlayerOpen, onAddPlayerClose, activeTeam }) => {
  const supabase = createClientComponentClient();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successMsg, setSuccessMsg] = useState("")
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const validate = () => {
    let error = "";
    if (!phoneNumber) {
      error = "Phone number is required";
    } else if (Number(phoneNumber.length) !== 10) {
      error = "Phone number must have 10 digits";
    }
    return error;
  };

  const isPlayerDuplicate = async () => {
    let { data: players, error } = await supabase
      .from("players")
      .select("*")
      .eq("team_id", `${activeTeam.team_id}`)
      .eq("player_phone", `${phoneNumber}`);

    if (players.length > 0) {
      setPhoneError("Player is already part of the squad!");
      return true;
    }
  };

  const getPlayerDetails = async (): Promise<PlayerDetails | undefined> => {
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("phone", `${phoneNumber}`);

    if (profiles && profiles.length > 0 && error === null) {
      return profiles[0];
    }
  };

  const updateTeamWithPlayer = async (playerDetails) => {
    const { data, error } = await supabase.rpc("add_player_to_team", {
      p_team_id: activeTeam?.team_id,
      p_user_id: `${playerDetails?.user_id}`,
    });

    console.log(data, "rpcData");
    console.log(error, "rpcErr");
  };

  const handleAddClicked = async () => {
    const error = validate();
    setPhoneError(error);
    const duplicatePlayer = await isPlayerDuplicate();
    if (!duplicatePlayer) {
      setIsLoading(true)
      const playerDetails = await getPlayerDetails();
      console.log(playerDetails, "data");
      if (!error) {
        await updateTeamWithPlayer(playerDetails);
        const { data, error } = await supabase
          .from("players")
          .insert([
            {
              team_id: activeTeam.team_id,
              team_name: activeTeam?.team_name,
              player_phone: phoneNumber,
              player_name: playerDetails?.name,
              player_dob: playerDetails?.dob,
              player_position: playerDetails?.position,
              player_rating: playerDetails?.rating,
              avatar_URL: playerDetails?.avatar_URL
            },
          ])
          .select();
        console.log(error, "errdupl");
        if (error?.message === 'null value in column "player_name" of relation "players" violates not-null constraint') {
          setPhoneError("Player does not exist");
        }

        if (!error) {
          onAddPlayerClose()
          toast({
            title: 'Player added!.',
            position: 'top',
            description: `${playerDetails?.name} is added to the squad!.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          setPhoneNumber("")
        }
      }
    }
    setIsLoading(false)
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
                placeholder="Phone number"
                textColor="black"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </InputGroup>
            {phoneError && (
              <Text fontSize="md" color="black">
                {phoneError}
              </Text>
            )}
            {/* {successMsg && <Center my={4}><Text fontSize="lg" colorScheme="blue">{successMsg}</Text></Center>} */}
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} colorScheme="blue" mr={3} onClick={handleAddClicked}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPlayers;
