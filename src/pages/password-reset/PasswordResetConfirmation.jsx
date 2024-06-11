
import { PasswordResetConfirmForm } from "../../components/forms";
import { Heading, Flex, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ChakraProviders } from "../../providers";

export default function Page() {
  const { uid, token } = useParams();
  return (
    <>
      <ChakraProviders>
        {/* <PrivateRouterWithAuth> */}
        <Flex flexDirection={"column"} w={"100%"} alignItems={"center"}>
          <Box>
            <Heading mb={"1rem"}>Password Reset</Heading>
            <PasswordResetConfirmForm uid={uid} token={token} />
          </Box>
        </Flex>
        {/* </PrivateRouterWithAuth> */}
      </ChakraProviders>
    </>
  );
}
