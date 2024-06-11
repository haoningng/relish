import { ImSpinner3 } from "react-icons/im";
import { Center, Flex, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";


export default function Spinner({
  size,
  isCentered,
  hasContainer,
  top,
}) {
  const spinnerSize = () => {
    switch (size) {
      case "sm":
        return { fontSize: "0.8rem" };
      case "md":
        return { fontSize: "1.5rem" };
      case "lg":
        return { fontSize: "2rem" };
    }
  };
  const containerStyle = {
    background: "#80808042",
    borderRadius: "10px",
    padding: "0.5rem",
  };
  const Wrapper = ({ children }) => {
    if (isCentered) {
      return <Flex h={"100vh"}>{children}</Flex>;
    } else {
      return <>{children}</>;
    }
  };
  return (
    <Wrapper>
      <Center w={"100%"} mb={top ? top : 0}>
        <Box {...(hasContainer ? containerStyle : "")}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <ImSpinner3 {...(size ? spinnerSize() : "")} />
          </motion.div>
        </Box>
      </Center>
    </Wrapper>
  );
}
