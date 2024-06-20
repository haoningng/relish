import { RegisterForm } from "../forms";
import SocialButtons from "./socials/SocialButtons";
import { Heading, Flex, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Page() {
  const router = useNavigate()
  return (
    <>
      <Flex position={'relative'} w={'100%'} justifyContent={'center'}>
        <Box as={'button'} onClick={() => { router('/auth/login') }} position={"absolute"} right={0} m={'1rem'} _hover={{ textDecoration: 'underline' }}>
          Login
        </Box>
        <Flex flexDirection={"column"} position={"relative"}>
          <Heading textAlign={"center"}>Create an acount</Heading>
          <RegisterForm />
          <Box mt={"1rem"}>
            <SocialButtons />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
