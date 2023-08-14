import React from 'react'
import { AbsoluteCenter, Box, Button, Text, Center, Heading, Divider, Input, Link, Stack } from '../../chakraExports'


function NameStep({ onNext, goBack }) {
  return (
    <Stack spacing={5}>
      <Center><Heading color="antiquewhite">What is your name?</Heading></Center>
      <Input type='text' textColor='antiquewhite' placeholder='First Name' size='lg' />
      <Input type='text' textColor='antiquewhite' placeholder='Last Name' size='lg' />
      <Button mt={7} colorScheme='messenger' size='lg' onClick={onNext}>Continue</Button>
      <Center mt={1}><button onClick={goBack}><Text fontSize='lg' color="messenger.300">Go Back</Text></button></Center>
    </Stack>
  )
}

export default NameStep