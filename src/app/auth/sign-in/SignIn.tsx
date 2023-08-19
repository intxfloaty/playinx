"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../../../database.types";
import {
  Box,
  Input,
  Stack,
  Text,
  Button,
  Center,
  Divider,
  AbsoluteCenter,
  InputGroup,
  IconButton,
  InputRightElement,
} from "../../chakraExports";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEyeSlash, FaEye } from "react-icons/fa";

interface Errors {
  [key: string]: string;
}

function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const supabase = createClientComponentClient<Database>();

  const validate = () => {
    let errors: Errors = {};
    if (!email) {
      errors.email = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }
    if (!password) {
      errors.password = "Please enter your password to login";
    } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/i.test(password)) {
      errors.password =
        "Password must have minimum of 8 characters, including at least one number and one special character";
    }
    return errors;
  };

  const handleLogin = async () => {
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        let { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        console.log(data, "data");
        console.log(error, "error");
        if (data.user !== null && data.session !== null && error === null) {
          router.push("/profile");
        }
        if (error?.message === "Invalid login credentials") {
          setFieldErrors({
            userExists:
              "Invalid login credentials, please enter correct email and password",
          });
        }
      } catch (e) {
        console.log(e);
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
    <Stack
      spacing={3}
      w={{
        base: "100%", // 0-48em
        md: "75%", // 48em-80em,
        xl: "50%", // 80em+
      }}
      p={{
        base: null,
        md: "10%",
        xl: "8%",
      }}
    >
      {fieldErrors.email && (
        <Text fontSize="md" color="#FFB400">
          {fieldErrors.email}
        </Text>
      )}
      <Input
        textColor="antiquewhite"
        isInvalid={!!fieldErrors.email}
        errorBorderColor={fieldErrors.email ? "#FFB400" : ""}
        placeholder="Email"
        size="md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputGroup>
        <Input
          textColor="antiquewhite"
          isInvalid={!!fieldErrors.password}
          errorBorderColor={fieldErrors.password ? "#FFB400" : ""}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          size="md"
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
        <Text fontSize="md" color="#FFB400">
          {fieldErrors.password}
        </Text>
      )}
      <Button mt={7} colorScheme="messenger" size="md" onClick={handleLogin}>
        Log In
      </Button>

      {fieldErrors.userExists && (
        <Center>
          <Text fontSize="md" color="#FFB400">
            {fieldErrors.userExists}
          </Text>
        </Center>
      )}

      <Center mt={2}>
        <Link href={"/auth/reset-password"}>
          <Text fontSize="md" color="white">
            Forgotten Password?
          </Text>
        </Link>
      </Center>
      <Box my={1} position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="#161616" textColor="gray" px="4">
          Or log in with
        </AbsoluteCenter>
      </Box>
      <Button
        colorScheme="messenger"
        size="md"
        leftIcon={<FcGoogle />}
        onClick={handleGoogleClick}
      >
        Google
      </Button>
      <Center mt={5}>
        <Link href={"/auth/sign-up"}>
          <Text fontSize="lg" color="white">
            Don't have an account? Sign Up
          </Text>
        </Link>
      </Center>
    </Stack>
  );
}

export default SignIn;
