
import PasswordResetForm from "../forms/PasswordResetForm";
import { Heading, Flex, Box } from "@chakra-ui/react";
import BackToHome from "../common/BackToHome";

export default function PasswordReset() {
  return (
    <>
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
    </>
  );
}
