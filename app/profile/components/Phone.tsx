import React from 'react'
import { AbsoluteCenter, Box, Button, Text, Center, Heading, Divider, Input, InputGroup, InputLeftAddon, Stack } from '../../chakraExports'
import Link from 'next/link'


function Phone({ onNext, goBack }) {
  return (
    <Stack spacing={5}>
      <Center>
        <Heading size="md" color="antiquewhite">Phone Number</Heading>
      </Center>
      <InputGroup size='lg'>
        <InputLeftAddon children='+91' bg="#161616" textColor='antiquewhite'/>
        <Input type='number' placeholder='phone number' textColor='antiquewhite' />
      </InputGroup>
      <Button mt={7} colorScheme='messenger' size='lg' onClick={onNext}>Continue</Button>
      <Center mt={1}><button onClick={goBack}><Text fontSize='lg' color="messenger.300">Go Back</Text></button></Center>
    </Stack>
  )
}

export default Phone