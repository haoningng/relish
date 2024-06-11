import { useSocialAuthenticateMutation } from "../../redux/features/authApiSlice";
import useSocialAuth from "../../hooks/users/useSocialAuth";
import Spinner from "../../components/common/Spinner";
import { Flex } from "@chakra-ui/react";

export default function Google() {
  const [googleAuthenticate] = useSocialAuthenticateMutation();
  useSocialAuth(googleAuthenticate, "google-oauth2");

  return (
    // <PrivateRouterWithAuth>
      <Flex h={"80vh"} justifyContent={"center"} alignItems={"center"}>
        <Spinner size="lg" />
      </Flex>
    // </PrivateRouterWithAuth>
  );
}
