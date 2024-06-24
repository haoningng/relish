import { Flex } from "@chakra-ui/react";

export default function SlectedSvg({ selectedSvg }) {
  return (
    <>
      <Flex fontSize={"2rem"} mr={"1rem"} alignItems={"center"}>
        <Flex
          w={"50px"}
          h={"50px"}
          border={"solid #eeeeee"}
          borderRadius={"5px"}
          bg={'#c2bfbfa1'}
          justifyContent={"center"}
          alignItems={"center"}
          position={'relative'}
        >
          {selectedSvg && (<img width='50px' src={selectedSvg}/>)}
        </Flex>
      </Flex>
    </>
  );
}