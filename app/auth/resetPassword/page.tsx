"use client"

import React from 'react'
import { AbsoluteCenter, Box, Button, Text, Center, Divider, Input, Link, Stack } from '../../chakraExports'
import { FcGoogle } from 'react-icons/fc'

function resetPassword() {

  const goBack = () => {
    console.log("go back")
  }

  return (
    <Stack spacing={5}>
      <Text fontSize='lg' color="white">Enter the email associated with your account</Text>
      <Input type='email' textColor='antiquewhite' placeholder='Email' size='lg' />
      <Text fontSize='lg' color="white">Enter new password</Text>
      <Input textColor='antiquewhite' placeholder='Password' type='password' size='lg' />
      <Button mt={7} colorScheme='messenger' size='lg'>Continue</Button>
      <Center mt={3}><button onClick={goBack}><Text fontSize='lg' color="messenger.300">Go Back</Text></button></Center>
    </Stack>
  )
}

export default resetPassword