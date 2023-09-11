import React, { useEffect, useState } from 'react'
import { Button, Text, Center, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '../../chakraExports'

const EditTeamNameModal = ({ isTeamNameOpen, onTeamNameClose, activeTeam, supabase }) => {
  const [teamName, setTeamName] = useState(activeTeam?.team_name)
  const [successMsg, setSuccessMsg] = useState("")



  const handleSaveClicked = async () => {
    const { data, error } = await supabase
      .from('teams')
      .update({ team_name: teamName })
      .eq('team_id', `${activeTeam?.team_id}`)

    if (!error) {
      setSuccessMsg("Team Name updated succesfully")
    }
  }

  return (
    <>
      <Modal isOpen={isTeamNameOpen} onClose={onTeamNameClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Team Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              size="md"
              type="text"
              borderColor="black"
              placeholder="Team Name"
              textColor="black"
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value)
                setSuccessMsg("")
              }}
            />
            {successMsg && <Center my={4}><Text fontSize="lg" colorScheme="blue">{successMsg}</Text></Center>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveClicked}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditTeamNameModal