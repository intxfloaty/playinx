import React from 'react';
import { Box, Flex, Text } from '../../chakraExports';

function ProgressIndicator({ totalSteps, currentStep }) {
  const stepItems = Array.from({ length: totalSteps }, (_, index) => (
    <Box
      key={index}
      w="20px"
      h="4px"
      bg={index <= currentStep ? 'messenger.500' : 'gray.300'}
      mx="1"
      borderRadius="full"
    />
  ));

  return (
    <Flex mt={5}
      justify="center"
      position="fixed"
      bottom="2"
      left="0"
      right="0"
      p={3}
      boxShadow="0 -2px 10px rgba(0, 0, 0, 0.1)"
      zIndex={1} // Ensure the progress indicator is above other content
    >
      {stepItems}
    </Flex>
  );
}

export default ProgressIndicator;
