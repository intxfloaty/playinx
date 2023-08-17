import React from 'react'
import { AbsoluteCenter, Box, Button, Text, Center, Heading, Divider, Input, Link, Stack } from '../../chakraExports'


function NameStep({ onNext, goBack }) {
  return (
    <>
      <Input type='text' textColor='antiquewhite' placeholder='First Name' size='md' />
      <Input type='text' textColor='antiquewhite' placeholder='Last Name' size='md' />
      <Button mt={7} colorScheme='messenger' size='md' onClick={onNext}>Continue</Button>
      <Center mt={1}><button onClick={goBack}><Text fontSize='md' color="messenger.300">Go Back</Text></button></Center>
    </>
  )
}

export default NameStep