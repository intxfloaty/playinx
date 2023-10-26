import { Center, Spinner } from '../app/chakraExports';

const LoadingSpinner = () => {
  return (
    <Center
      position="fixed"
      top="0"
      bottom="0"
      left="0"
      right="0"
      backgroundColor="rgba(0, 0, 0, 0.5)" // Add overlay effect
    >
      <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
    </Center>
  );
};

export default LoadingSpinner;
