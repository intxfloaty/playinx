import React from "react";
import { Box, Button, useDisclosure } from "../../chakraExports";
import { IoAddOutline } from "react-icons/io5";
import CreateMatchModal from "./CreateMatchModal";

const Matches = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position="fixed" bottom={0} right={0} padding={8}>
      <Button variant="unstyled" onClick={onOpen}>
        <IoAddOutline color="#E7E9EA" size={40} />
      </Button>
      <CreateMatchModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Matches;
