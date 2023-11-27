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
      <ModalContent maxH="80vh">
        <Box overflowY="auto">
          <ModalBody mt={10}>
            <ModalCloseButton />
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem my={4}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                      1. What is Playinx?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}  >
                  Have you ever scored a match winning goal, made a crucial tackle, dribbled passed many defenders?
                  We bet you have.
                  But wouldn't it be awesome if you had video clips of these moments along with some match stats as a proof of your skills, passion and commitment towards this beautiful game.
                  Playinx solves just that, it is a platform that aims to provide a professional playing experience to amatuer teams and players.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem my={4}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                      2. What to do after signing up?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}  >
                  After signing up you need to create/join your team. If you are your team's captain/coach/admin please go ahead and create your team inside Profile section.
                  <div style={{ marginTop: "2px" }}>If you are not your team's captain/coach, share the link <span style={{ color: "blue" }}>https://playinx.vercel.app/</span> and please ask them to create team and add you and other players in the team.</div>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem my={4}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                      3. How can I add players to my team?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}  >
                  You can add players using the phone number they used for signing up. <span style={{ color: "blue", }}>Click on your team from the side menu, on the team's page click on the three vertical dots which should give you the option of adding players. Enter the phone number and press Add. </span>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem my={4}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                      4. How can I create a match?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}  >
                  Team admins can create matches and send match request to other teams using the <span style={{ color: "blue", }}>"+" sign at the right bottom of the team's page. </span> 
                  You can also edit the match after a match is created.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem my={4}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                      5. I have created a match with a team, what next?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}  >
                  After a match is created, players can now click and view match details and join the lineup for that match by paying <span style={{ color: "blue", }}> ₹35/player</span>. Please note that we are currently only accepting payments at the venue.
                  <div style={{ color: "blue" }}>After the lineup of both teams are ready, the teams will play the match at the venue which will be officiated by our refrees and then based on match results, match stats will be updated for that match.</div>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem my={4}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                      6. Why am I paying ₹35?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}  >
                  At just ₹35/player you will get a professional playing experience with match stats, player stats, leaderboard and refree point-of-view match clip.
                  <span style={{ color: "blue" }}> ₹35 is the cost per player for a single match. In a 6v6 match with 2 substitues, the total a team will have to pay is ₹280.</span>

                  <div style={{color:"rebeccapurple", marginTop:"4px"}}>Please note that this cost does not include turf booking charges. We do not provide neither charge any amount for venue booking services. Venue booking has to be be done by teams via other mediums. </div>
                </AccordionPanel>
              </AccordionItem>


              <AccordionItem my={4}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                      7. How will Playinx help improve my game?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}   >
                  Playinx will provide refrees, match footage, match stats for every match that will help you to analyse your game and improve it significantly.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem my={4}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                      8. How do you calculate match stats?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}   >
                  Currently our match stats algorothms are inspired from Elo Rating Algorithm. We calculate the match stats based on playing position, goals, assists, cards, team score, opponent score and discipline.
                  We know that you would like to know more of your stats such as max speed, distance covered, interception, shots on target etc.
                  We are actively working to improve our stats algorithm by using AI models and just like the game improving our stats algorithm will take time and effort. We highly appreciate your patience.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem my={4}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                      9. I am not satisfied with the match refree?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}  >
                  Just like every normal human being refrees also tend to make mistakes during the match. We deeply regret any inconvenience caused to you by the judgement of our refree. For any complains and other concerns regarding refrees you can always contact us.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem my={4}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                      10. Will Playinx be available as an app?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}  >
                  We are actively developing the android and ios app and it will soon be available for download.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default FAQsModal