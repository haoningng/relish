import { useSocialAuthenticateMutation } from "../../redux/features/authApiSlice";
import useSocialAuth from "../../hooks/users/useSocialAuth";
import Spinner from "../../components/common/Spinner";
import { Flex } from "@chakra-ui/react";
import { ChakraProviders } from "../../providers";

export default function Google() {
  const [googleAuthenticate] = useSocialAuthenticateMutation();
  useSocialAuth(googleAuthenticate, "google-oauth2");

  return (
    <ChakraProviders>
      <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
        <Spinner/>
      </Flex>
    </ChakraProviders>
  );
}
