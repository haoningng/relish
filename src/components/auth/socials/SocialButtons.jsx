import { FcGoogle } from "react-icons/fc";
import { Flex, Icon, Text } from "@chakra-ui/react";
import useContinueWithSocialAuth from "../../../hooks/users/useContinueWithSocialAuth";


export default function SocialButtons({ setEmailOpen, noEmail }) {
  const { continueWithSocialAuth } = useContinueWithSocialAuth();
  return (
    <Flex
      className={"social"}
      w={"100%"}
      justifyContent={'center'}
      cursor={'pointer'}
      onClick={() => continueWithSocialAuth('google-oauth2', 'google')}
    >
      <Flex
        w={'240px'}
        p={"0.6rem"}
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}
        border={"1px"}
        borderRadius={"10px"}
        bg={'white'}
      >
        <Icon as={FcGoogle} left={3} position={"absolute"} />
        <Text fontWeight={"bold"} fontSize={"sm"} color={"gray"}>
          Continue with Google
        </Text>
      </Flex>
    </Flex >
  );
}
