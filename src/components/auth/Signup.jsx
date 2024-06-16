import { RegisterForm } from "../forms";
import SocialButtons from "./socials/SocialButtons";
import { Heading, Flex, Link, Box } from "@chakra-ui/react";

export default function Page() {
  return (
    <>
      <Link href="/auth/login" position={"absolute"} right={0} m={'1rem'}>
        Login
      </Link>
      <Flex flexDirection={"column"} position={"relative"}>
        <Heading textAlign={"center"}>Create an acount</Heading>
        <RegisterForm />
        <Box mt={"1rem"}>
          <SocialButtons />
        </Box>
      </Flex>
    </>
  );
}
