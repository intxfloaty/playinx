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
  useDisclosure,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Box,
  Radio,
  RadioGroup,
  Flex
} from "../../../chakraExports";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";
import { IoCloseOutline } from "react-icons/io5";

interface Errors {
  [key: string]: string;
}

const RulesModal = ({ isOpen, onClose, }) => {

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
        <ModalHeader>Tournament Rules</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="messenger" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RulesModal;
