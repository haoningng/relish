"use client";

import { PasswordResetConfirmForm } from "@/components/forms";
import { PrivateRouterWithAuth } from "@/components/common/PrivateRouter";
import { Heading, Flex, Box } from "@chakra-ui/react";

export default function Page({ params: { uid, token } }) {
  return (
    <>
      <PrivateRouterWithAuth>
        <Flex flexDirection={"column"} w={"100%"} alignItems={"center"}>
          <Box>
            <Heading mb={"1rem"}>Password Reset</Heading>
            <PasswordResetConfirmForm uid={uid} token={token} />
          </Box>
        </Flex>
      </PrivateRouterWithAuth>
    </>
  );
}
