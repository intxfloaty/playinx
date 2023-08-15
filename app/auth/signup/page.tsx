"use client"

import React from 'react'
import { AbsoluteCenter, Box, Button, Text, Center, Divider, Input, Link, Stack } from '../../chakraExports'
import { FcGoogle } from 'react-icons/fc'
import supabase from '../../../src/utils/supabase'

function page() {

  const handleContinueClick = async () => {
    try {
      let { data, error } = await supabase.auth.signUp({
        email: 'praveshjha5@gmail.com',
        password: 'LQmulxTcblQjuymGKWwV'
      })
      console.log(data, "data")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Stack spacing={5}>
      <Input type='email' textColor='antiquewhite' placeholder='Email' size='lg' />
      <Input textColor='antiquewhite' placeholder='Password' type='password' size='lg' />
      <Button mt={7} colorScheme='messenger' size='lg' onClick={handleContinueClick}>Continue</Button>
      <Box mt={3} position='relative' padding='10'>
        <Divider />
        <AbsoluteCenter bg="#161616" textColor="gray" px='4'>
          Or sign up with
        </AbsoluteCenter>
      </Box>
      <Button colorScheme='messenger' size='lg' leftIcon={<FcGoogle />}>
        Google
      </Button>
      <Center mt={5}><Link href={"#"}><Text fontSize='lg' color="white">Already have an account? Log In</Text></Link></Center>
    </Stack>
  )
}

export default page