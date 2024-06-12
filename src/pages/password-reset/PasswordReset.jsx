import PasswordResetForm from "../../components/forms/PasswordResetForm";
import { ChakraProviders } from "../../providers";
import { Heading, Flex, Box } from "@chakra-ui/react";
import { BackToHome } from "../../components/common";

export default function PasswordReset() {
  return (
    <>
      <ChakraProviders>
        <Flex flexDirection={"column"} w={"100%"} alignItems={"center"}>
          <Box>
            <Heading mt={"2rem"} mb={"1rem"}>
              Password Reset
            </Heading>
            <PasswordResetForm />
          </Box>
          <Box mt={'1rem'}>
            <BackToHome />
          </Box>
        </Flex>
      </ChakraProviders>
    </>
  );
}
