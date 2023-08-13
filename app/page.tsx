import React from "react"
import { Flex, Text, Button } from '@radix-ui/themes';
import { Input } from "./chakraExports"

export default function Page() {
    return (
      <Flex direction="column" gap="2">
      <Text color="tomato">Hello, Playinx!</Text>
      <Button>Let's go</Button>
      <Input placeholder='Basic usage' size='lg'/>
    </Flex>
    )
  } 