import React from 'react'
import { Box, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '../app/chakraExports'

const ComingSoonModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size="sm"
      >
        <ModalOverlay />
        <ModalContent height="15%">
          <Center height="100%">
            <Text fontSize="2xl" color="black" fontWeight="bold">Coming Soon</Text>
          </Center>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ComingSoonModal