import React from 'react'
import { Box, Input, Stack, Text, Button, Center, Divider, AbsoluteCenter } from '../chakraExports'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

function page() {
  return (
    <main style={{ paddingInline: "5%" }}>
      <div>
        <img
          style={{ maxWidth: "100%", objectFit: "contain" }}
          alt="Logo"
          src="/images/logo5.svg" />
      </div>

      <Stack spacing={5}>
        <Input textColor='antiquewhite' placeholder='Email or Phone' size='lg' />
        <Input textColor='antiquewhite' placeholder='Password' type='password' size='lg' />
        <Button mt={7} colorScheme='messenger' size='lg'>Log In</Button>
        <Center mt={2}><Link href={"#"}><Text fontSize='md' color="white">Forgotten Password?</Text></Link></Center>
        <Box mt={3} position='relative' padding='10'>
          <Divider />
          <AbsoluteCenter bg="#161616" textColor="gray" px='4'>
            Or log in with
          </AbsoluteCenter>
        </Box>
        <Button colorScheme='messenger' size='lg' leftIcon={<FcGoogle />}>
          Google
        </Button>
        <Center mt={5}><Link href={"#"}><Text fontSize='lg' color="white">Don't have an account? Sign Up</Text></Link></Center>
      </Stack>
    </main>
  )
}

export default page