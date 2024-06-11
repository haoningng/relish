import { FcGoogle } from "react-icons/fc";
import { continueWithGoogle } from "../../../utils";
import { Flex, Icon, Text } from "@chakra-ui/react";



export default function SocialButtons({ setEmailOpen, noEmail }) {
  return (
    <Flex
      className={"social"}
      w={"100%"}
      justifyContent={'center'}
      cursor={'pointer'}
      onClick={continueWithGoogle}
    >
      <Flex
        w={"250px"}
        p={"0.6rem"}
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}
        border={"1px"}
        borderColor={"black"}
        borderRadius={"5px"}
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
