import React from 'react'
import { AbsoluteCenter, Box, Button, Text, Center, Heading, Divider, Input, InputGroup, InputLeftAddon, Stack } from '../../chakraExports'
import Link from 'next/link'


function Phone({ onNext, goBack }) {
  return (
    <>
      <InputGroup size='md'>
        <InputLeftAddon children='+91' bg="#161616" textColor='antiquewhite'/>
        <Input type='number' placeholder='phone number' textColor='antiquewhite' />
      </InputGroup>
      <Button mt={7} colorScheme='messenger' size='md' onClick={onNext}>Continue</Button>
      <Center mt={1}><button onClick={goBack}><Text fontSize='md' color="messenger.300">Go Back</Text></button></Center>
    </>
  )
}

export default Phone