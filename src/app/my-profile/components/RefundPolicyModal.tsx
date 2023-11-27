import React, { useEffect, useState } from 'react'
import { Box, Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, InputGroup, InputLeftAddon, Center } from '../../chakraExports'


const RefundPolicyModal = ({ isOpen, onClose, }) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size="full"
    >
      <ModalOverlay />
      <ModalContent h="xs" maxH="80vh">
        <Box overflowY="auto">
          <ModalCloseButton />
          <ModalBody mt={16}>
            <h2 ><strong>Refund Policy</strong></h2>

            <p>We understand that there may be instances where our services do not meet your expectations. In the event of service failure, customers are eligible for a refund. To qualify, customers must request a refund within 2 days from the date when the services were not provided.</p>

            <p>Refunds will be processed in the form of app credits.</p>

            <h3><strong>Contact Information:</strong></h3>

            <p>Customers can initiate a refund request by sending an email to playinxsports@gmail.com. To expedite the process, please provide your account details and payment receipt.</p>


            <h3><strong>Processing Time:</strong></h3>

            <p>Refunds will be processed within 7-14 business days from the date of approval.</p>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default RefundPolicyModal