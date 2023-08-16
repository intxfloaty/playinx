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
  Stack,
  IconButton,
  InputGroup,
  InputRightElement,
} from "../../chakraExports";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import supabase from "../../../src/utils/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Errors {
  [key: string]: string;
}

function page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        console.log(data);
        console.log(error);
        if (data.user !== null && data.session !== null && error === null) {
          router.push("/profile");
        }
        if (error?.message === "User already registered") {
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
        options: { redirectTo: "http//localhost:3000/profile" },
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

      <InputGroup>
        <Input
          textColor="antiquewhite"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          size="lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width="2rem">
          <IconButton
            h="1.5rem"
            size="sm"
            variant="unstyled"
            icon={
              showPassword ? (
                <FaEyeSlash color="white" />
              ) : (
                <FaEye color="white" />
              )
            }
            onClick={() => setShowPassword(!showPassword)}
            aria-label={""}
          />
        </InputRightElement>
      </InputGroup>

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
        <Link href={"/auth/login"}>
          <Text fontSize="lg" color="white">
            Already have an account? Log In
          </Text>
        </Link>
      </Center>
    </Stack>
  );
}

export default page;
