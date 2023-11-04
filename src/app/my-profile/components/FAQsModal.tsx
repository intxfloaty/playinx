import React, { useEffect, useState } from 'react'
import { Box, Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, InputGroup, InputLeftAddon, Center, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '../../chakraExports'


const FAQsModal = ({ isOpen, onClose, }) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size="full"
    >
      <ModalOverlay />
      <ModalContent h="xs" backgroundColor="black">
          <ModalCloseButton color="#E7E9EA"/>
          <ModalBody mt={10}>
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem my={4}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' color="#E7E9EA">
                     1. What is Playinx?
                    </Box>
                    <AccordionIcon color="#E7E9EA"/>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} color="#E7E9EA">
                  Playinx is a platform that aims to provide a professional experience to amatuer teams and players.
                  Our goal is to create an environment for teams and players where they can improve themselves massively, showcase their talents while having fun playing the game.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem my={4}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' color="#E7E9EA">
                     2. How will Playinx help improve my game?
                    </Box>
                    <AccordionIcon color="#E7E9EA" />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} color="#E7E9EA" >
                 Playinx will provide refrees, match footage, match stats for every match that will help you to analyse your game and improve it significantly.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem my={4}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' color="#E7E9EA">
                     3. How do you calculate match stats?
                    </Box>
                    <AccordionIcon color="#E7E9EA" />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} color="#E7E9EA" >
                  Currently our match stats algorothms are inspired from Elo Rating Algorithm. We calculate the match stats based on playing position, goals, assists, cards, team score, opponent score amd discipline. 
                  We know that you would like to know more of your stats such as max speed, distance covered, interception, shots on target etc.
                  We are actively working to improve our stats algorithm by using AI models and just like the game improving our stats algorithm will take time and effort and we highly appreciate your patience.
                </AccordionPanel>
              </AccordionItem>

              {/* <AccordionItem my={4}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' color="#E7E9EA">
                     4. 
                    </Box>
                    <AccordionIcon color="#E7E9EA"/>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} color="#E7E9EA">
                </AccordionPanel>
              </AccordionItem> */}
            </Accordion>
          </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default FAQsModal