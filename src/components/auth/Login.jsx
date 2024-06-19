import { LoginForm } from "../forms";
import { useEffect } from 'react';
import SocialButtons from "./socials/SocialButtons";
import { useLocation } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { toast } from 'react-toastify';
import { Heading, Text, Flex, Link, Box } from "@chakra-ui/react";

export default function Page() {
  const location = useLocation()

  // debug
  const { isAuthenticated } = useAppSelector(state => state.auth)
  console.log("Debug: isAuthenticated = ", isAuthenticated);


  useEffect(() => {
    if (location.state?.message) {
      toast.error(location.state?.message)
    }
  }, [location.state?.message])

  return (
    <>
      <Link href="/auth/signup" position={"absolute"} left={0} m={'1rem'}>
        Signup
      </Link>
      <Flex flexDirection={"column"}>
        <Heading textAlign={"center"}>Login</Heading>
        <LoginForm />
        <Box mt={"1rem"}>
          <SocialButtons />
        </Box>
        <Text mt={"1rem"} textAlign={"center"}>
          <Link href="/password-reset">
            Forget your password?
          </Link>
        </Text>
      </Flex>
    </>
  );
}
