import React from 'react';
import { Stack, Center, Heading, Input, Button, Select, Text } from '../../chakraExports';
import Link from 'next/link';

function DOBStep({ onNext, goBack }) {
  return (
    <>
      <Center>
        <Heading size="sm" color="antiquewhite">What is your Date of Birth?</Heading>
      </Center>
      <Input type='date' textColor='antiquewhite' size='md' />
      <Select placeholder=' select gender' size="md" bg= "antiquewhite" >
        <option value='option1'>Male</option>
        <option value='option2'>Female</option>
      </Select>
      <Button mt={5} colorScheme='messenger' size='md' onClick={onNext}>
        Continue
      </Button>
      <Center mt={1}><button onClick={goBack}><Text fontSize='md' color="messenger.300">Go Back</Text></button></Center>

    </>
  );
}

export default DOBStep;
