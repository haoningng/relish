import { LoginForm } from "../forms";
import SocialButtons from "./socials/SocialButtons";
import { Heading, Text, Flex, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Page() {
  const router = useNavigate()
  return (
    <>
      <Flex position={'relative'} w={'100%'} justifyContent={'center'}>
        <Box 
          as={'button'}
          onClick={() => { router('/auth/signup') }}
          position={"absolute"}
          left={0}
          m={'1rem'}
          _hover={{ fontWeight:"700" }}
          color="#ffffff"
          fontWeight="600"
          fontSize="1.2em"
        >
          Signup
        </Box>
        <Flex flexDirection={"column"} >
          <Heading 
            textAlign={"center"}
            variant="authHeader"
          >Login</Heading>
          <LoginForm />
          <Box mt={"1rem"}>
            <SocialButtons />
          </Box>
          <Text mt={"1rem"} textAlign={"center"}>
            <Box
              as={'button'}
              onClick={() => { router('/password-reset') }}
              _hover={{ textDecoration: 'underline' }}
              color="#ffffff"
              fontWeight="600"
              fontSize="1em"
            >
              Forget your password?
            </Box>
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
