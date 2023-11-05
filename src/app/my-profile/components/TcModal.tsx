import React, { useEffect, useState } from 'react'
import { Box, Button, Text,  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, InputGroup, InputLeftAddon, Center } from '../../chakraExports'


const TcModal = ({ isOpen, onClose, }) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size="full"
    >
      <ModalOverlay />
      <ModalContent h="xs">
        <ModalCloseButton />
        <ModalBody>
          <Center height="100%">
            <Text fontSize="xl" color="black" fontWeight="bold">For any kind of assistance you can call us at <span style={{ color: "blue" }}>+91-8700502434</span> or write us at <span style={{ color: "blue" }}>playinxsports@gmail.com</span></Text>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default TcModal