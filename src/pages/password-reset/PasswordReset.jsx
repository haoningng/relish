import PasswordResetForm from "../../components/forms/PasswordResetForm";
import { ChakraProviders } from "../../providers";
import { Heading, Flex, Box } from "@chakra-ui/react";
import { BackToHome } from "../../components/common";

export default function PasswordReset() {
  return (
    <div style={{position: 'fixed', width: '100dvw', height:'100dvh'}}>
      <ChakraProviders>
        <Flex flexDirection={"column"} w={"100%"} alignItems={"center"}>
          <Box>
            <Heading 
              mt={"2rem"}
              mb={"1rem"}
              variant="authHeader"
            >
              Password Reset
            </Heading>
            <PasswordResetForm />
          </Box>
          <Box mt={'1rem'}>
            <BackToHome />
          </Box>
        </Flex>
      </ChakraProviders>
    </div>
  );
}
