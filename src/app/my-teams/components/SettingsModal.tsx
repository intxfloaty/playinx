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
  useDisclosure,
  Text,
} from "../../chakraExports";
import { IoPersonAddOutline } from "react-icons/io5";
import AddPlayers from "./AddPlayersModal";

const Settings = ({ isSettingsOpen, onSettingsClose }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Button variant="unstyled" onClick={() => onOpen()}>
              <IoPersonAddOutline size={30} color="#111111" />
            </Button>
            <AddPlayers isAddPlayerOpen={isOpen} onAddPlayerClose={onClose} />
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
