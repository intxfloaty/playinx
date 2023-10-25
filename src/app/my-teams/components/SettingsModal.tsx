"use client";
import React from "react";
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
  useDisclosure as EditTeamNameDisclosure,
  useDisclosure as AddPlayersDisclosure,
  Text,
  Flex,
} from "../../chakraExports";
import { IoPencilOutline, IoPersonAddOutline } from "react-icons/io5";
import AddPlayers from "./AddPlayersModal";
import EditTeamNameModal from "./EditTeamNameModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Settings = ({ isSettingsOpen, onSettingsClose, userId, activeTeam }) => {
  const supabase = createClientComponentClient();
  const editTeamNameDisclosure = EditTeamNameDisclosure();
  const addPlayersDisclosure = AddPlayersDisclosure();

  return (
    <>
      <Modal
        isOpen={isSettingsOpen}
        onClose={onSettingsClose}
        size="full"
        motionPreset="scale"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Team settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>




            {activeTeam?.team_admin === userId &&
              <>
                <Stack spacing={6}>
                  {/* <Flex flexDir="row" alignItems="center" justifyContent="space-between">
                    <Text fontSize="lg" colorScheme="black" fontWeight="bold">Edit Team Name</Text>
                    <Button variant="unstyled" onClick={editTeamNameDisclosure.onOpen}>
                      <IoPencilOutline size={30} color="#111111" />
                    </Button>
                    <EditTeamNameModal isTeamNameOpen={editTeamNameDisclosure.isOpen} onTeamNameClose={editTeamNameDisclosure.onClose} activeTeam={activeTeam} supabase={supabase}/>
                  </Flex> */}
                  <Flex flexDir="row" alignItems="center" justifyContent="space-between">
                    <Text fontSize="lg" colorScheme="black" fontWeight="bold">Add Players</Text>
                    <Button variant="unstyled" onClick={addPlayersDisclosure.onOpen}>
                      <IoPersonAddOutline size={30} color="#111111" />
                    </Button>
                    <AddPlayers isAddPlayerOpen={addPlayersDisclosure.isOpen} onAddPlayerClose={addPlayersDisclosure.onClose} activeTeam={activeTeam} />
                  </Flex>
                </Stack>
              </>
            }

          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSettingsClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Settings;
