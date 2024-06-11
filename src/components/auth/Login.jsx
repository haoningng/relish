import { LoginForm } from "../forms";
import SocialButtons from "./socials/SocialButtons";
import { Heading, Text, Flex, Link, Box } from "@chakra-ui/react";

export default function Page() {
  return (
    <>
      <Flex flexDirection={"column"}>
        <Heading textAlign={"center"}>Login</Heading>
        <LoginForm />
        <Box mt={"1rem"}>
          <SocialButtons/>
        </Box>
        <Text mt={"1rem"} textAlign={"center"}>
          <Link href="/auth/register">
            Forget your password?
          </Link>
        </Text>
      </Flex>
    </>
  );
}
