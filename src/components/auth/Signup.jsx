import { RegisterForm } from "../forms";
import SocialButtons from "./socials/SocialButtons";
import { Heading, Flex, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Page() {
  const router = useNavigate()
  return (
    <>
      <Flex position={'relative'} w={'100%'} justifyContent={'center'}>
        <Box 
          as={'button'}
          onClick={() => { router('/auth/login') }}
          position={"absolute"}
          right={0}
          m={'1rem'}
          _hover={{ fontWeight:"700", color:"#9FE870" }}
          color="#ffffff"
          fontWeight="600"
          fontSize="1.2em"
          zIndex="1"
        >
          Login
        </Box>
        <button className='auth-relish-button' onClick={() => router('/')}>Relish</button>
        <Flex flexDirection={"column"} position={"relative"}>
          <Heading 
            textAlign={"center"}
            variant="authHeader"
          >Create An Account</Heading>
          <RegisterForm />
          <Box mt={"1rem"}>
            <SocialButtons />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
