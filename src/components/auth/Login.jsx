import { LoginForm } from "../forms";
import SocialButtons from "./socials/SocialButtons";
import { Heading, Text, Flex, Link, Box } from "@chakra-ui/react";

export default function Page() {
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
