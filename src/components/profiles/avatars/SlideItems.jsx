import { Flex, Box } from "@chakra-ui/react";

export default function SlideItems({
  svgArray,
  setFun,
  eachSlideWidth,
  setSelectedSvg,
}) {
  if (svgArray.length) {
    return (
      <Flex>
        {svgArray.map((file, index) => {
          return (
            <Box
              h={eachSlideWidth + "px"}
              w={eachSlideWidth + "px"}
              key={index}
              borderRadius={"15px"}
              _hover={{ bg: "#ececec" }}
              transition={".3s"}
              position="relative"
              cursor={'pointer'}
              onClick={() => {
                setSelectedSvg(file.path)
                setFun(file.name)
              }}
            >
              <img width='50px' src={file.path} />
            </Box>
          );
        })}
      </Flex>
    );
    }
  return <></>;
}
