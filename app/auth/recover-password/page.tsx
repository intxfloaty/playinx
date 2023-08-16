"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  Center,
  Input,
  Stack,
} from "../../chakraExports";
import supabase from "../../../src/utils/supabase";
import Link from "next/link";

function recoverPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isResetPasswordLink, setIsPasswordLink] = useState(false);

  const validate = () => {
    let error = "";
    if (!email) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      error = "Invalid email address";
    }
    return error;
  };

  const handleContinueClick = async () => {
    const error = validate();
    setEmailError(error);
    if (!error) {
      try {
        let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: "http://localhost:3000/auth/reset-password",
        });
        console.log(data, "data");
        console.log(error, "error");
        if (error === null) {
          setIsPasswordLink(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (emailError !== "") {
      setEmailError(validate());
    }
  }, [email]);

  return (
    <Stack spacing={5}>
      <Text fontSize="lg" color="white">
        Enter the email associated with your account
      </Text>
      <Input
        type="email"
        textColor="antiquewhite"
        placeholder="Email"
        size="lg"
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && (
        <Text fontSize="md" color="tomato">
          {emailError}
        </Text>
      )}
      {!isResetPasswordLink && (
        <Button
          mt={7}
          colorScheme="messenger"
          size="lg"
          onClick={handleContinueClick}
        >
          Continue
        </Button>
      )}
      {isResetPasswordLink && (
        <Text fontSize="lg" color="white">
          A password reset link has been sent to your email address
        </Text>
      )}
      <Center mt={3}>
        <Link href={"/auth/login"}>
          <Text fontSize="lg" color="messenger.300">
            Go Back
          </Text>
        </Link>
      </Center>
    </Stack>
  );
}

export default recoverPassword;
