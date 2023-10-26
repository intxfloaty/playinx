import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Text,
  Box,
} from "../../../chakraExports";

const DetailsModal = ({ isOpen, onClose, description }) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size="full"
    >
      <ModalOverlay />
      <ModalContent maxH="80vh">
        <Box p={4} overflowY="auto">
          {description?.split(/\n{1,2}/).map((paragraph, index) => (
            <Text key={index}>{paragraph}</Text>
          ))}
        </Box>
        <ModalFooter>
          <Button colorScheme="messenger" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailsModal;
