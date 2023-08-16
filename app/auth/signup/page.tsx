"use client";
import React, { useState, useEffect } from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Text,
  Center,
  Divider,
  Input,
  Link,
  Stack,
} from "../../chakraExports";
import { FcGoogle } from "react-icons/fc";
import supabase from "../../../src/utils/supabase";

interface Errors {
  [key: string]: string;
}

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const validate = () => {
    let errors: Errors = {};
    if (!email) {
      errors.email = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }
    if (!password) {
      errors.password = "Please enter a password";
    } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/i.test(password)) {
      errors.password =
        "Password must have minimum of 8 characters, including at least one number and one special character";
    }
    return errors;
  };

  const handleContinueClick = async () => {
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        let { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error.message === "User already registered") {
          setFieldErrors({
            userExists: "User is already registered with this email",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleGoogleClick = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      console.log(data, "data");
      console.log(error.message, "mess");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(fieldErrors).length !== 0) {
      setFieldErrors(validate());
    }
  }, [email, password]);

  return (
    <Stack spacing={5}>
      {fieldErrors.email && (
        <Text fontSize="md" color="tomato">
          {fieldErrors.email}
        </Text>
      )}
      <Input
        type="email"
        textColor="antiquewhite"
        placeholder="Email"
        size="lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        textColor="antiquewhite"
        placeholder="Password"
        type="password"
        size="lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {fieldErrors.password && (
        <Text fontSize="md" color="tomato">
          {fieldErrors.password}
        </Text>
      )}

      <Button
        mt={7}
        colorScheme="messenger"
        size="lg"
        onClick={handleContinueClick}
      >
        Continue
      </Button>

      {fieldErrors.userExists && (
        <Center>
          <Text fontSize="md" color="tomato">
            {fieldErrors.userExists}
          </Text>
        </Center>
      )}

      <Box mt={3} position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="#161616" textColor="gray" px="4">
          Or sign up with
        </AbsoluteCenter>
      </Box>

      <Button
        colorScheme="messenger"
        size="lg"
        leftIcon={<FcGoogle />}
        onClick={handleGoogleClick}
      >
        Google
      </Button>

      <Center mt={5}>
        <Link href={"#"}>
          <Text fontSize="lg" color="white">
            Already have an account? Log In
          </Text>
        </Link>
      </Center>
    </Stack>
  );
}

export default page;
