"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  Input,
  Stack,
  IconButton,
  InputGroup,
  InputRightElement,
} from "../../chakraExports";
import supabase from "../../../src/utils/supabase";
import { useRouter } from "next/navigation";
import { FaEyeSlash, FaEye } from "react-icons/fa";

interface Errors {
  [key: string]: string;
}

function resetPassword() {
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
        await supabase.auth.updateUser({ password: password });
        router.push("/");
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (Object.keys(fieldErrors).length !== 0) {
      setFieldErrors(validate());
    }
  }, [email, password]);

  return (
    <Stack spacing={3}
    w={{
      base: "100%", // 0-48em
      md: "75%", // 48em-80em,
      xl: "50%", // 80em+
    }}
    p={{
      base: null,
      md: "10%",
      xl: "8%",
    }}>
      <Text fontSize="md" color="white">
        Enter the email associated with your account
      </Text>
      {fieldErrors.email && (
        <Text fontSize="md" color="tomato">
          {fieldErrors.email}
        </Text>
      )}
      <Input
        type="email"
        textColor="antiquewhite"
        placeholder="Email"
        size="md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Text fontSize="md" color="white">
        Enter new password
      </Text>
      <InputGroup>
        <Input
          textColor="antiquewhite"
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
        <Text fontSize="md" color="tomato">
          {fieldErrors.password}
        </Text>
      )}
      <Button
        mt={7}
        colorScheme="messenger"
        size="md"
        onClick={handleContinueClick}
      >
        Continue
      </Button>
    </Stack>
  );
}

export default resetPassword;
