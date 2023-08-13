import React from 'react'
import { AbsoluteCenter, Box, Button, Text, Center, Heading, Divider, Input, Link, Stack } from '../../chakraExports'


function NameStep({ onNext }) {
  return (
    <Stack spacing={5}>
      <Center><Heading color="antiquewhite">What is your name?</Heading></Center>
      <Input type='text' textColor='antiquewhite' placeholder='First Name' size='lg' />
      <Input type='text' textColor='antiquewhite' placeholder='Last Name' size='lg' />
      <Button mt={7} colorScheme='messenger' size='lg' onClick={onNext}>Continue</Button>
    </Stack>
  )
}

export default NameStep