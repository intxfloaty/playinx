import React from 'react';
import { Stack, Center, Heading, Input, Button, Select, Text } from '../../chakraExports';
import Link from 'next/link';

function DOBStep({ onNext }) {
  return (
    <Stack spacing={5}>
      <Center>
        <Heading size="md" color="antiquewhite">What is your Date of Birth?</Heading>
      </Center>
      <Input type='date' textColor='antiquewhite' size='lg' />
      <Select placeholder=' select gender' size="lg" bg= "antiquewhite" >
        <option value='option1'>Male</option>
        <option value='option2'>Female</option>
      </Select>
      <Button mt={7} colorScheme='messenger' size='lg' onClick={onNext}>
        Continue
      </Button>
      <Center mt={1}><Link href={"#"}><Text fontSize='lg' color="messenger.300">Go Back</Text></Link></Center>

    </Stack>
  );
}

export default DOBStep;
