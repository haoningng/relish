import { ChangeEvent, useEffect } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Flex,
  Link,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { FormLabel } from "@chakra-ui/react";
import { ImEyeBlocked, ImEye } from "react-icons/im";
import { GoMail } from "react-icons/go";
import { RiLockPasswordLine, RiUserLine } from "react-icons/ri";


export default function CustomInput({
  labelId,
  labelText,
  type,
  placeholder,
  onChange,
  value,
  // defaultValue,
  link,
  required = false,
}) {

  const [showPassword, setShowpassword] = useState(false);

  const isPassword = () => {
    if (type === "password") {
      return true;
    }
  };
  function leftElement() {
    if (labelId === "username") {
      return <RiUserLine />;
    } else if (labelId === "email") {
      return <GoMail />;
    } else if (isPassword()) {
      return <RiLockPasswordLine />;
    }
  }
  return (
    <>
      <Box mt={"0.5rem"}>
        <Flex justifyContent={"space-between"}>
          <FormLabel>{labelText}</FormLabel>
          {link && (
            <Link href={link.linkUrl} color={"#7e7eff"}>
              {link.linkText}
            </Link>
          )}
        </Flex>
        <InputGroup>
          {/* {leftElement() && (
            <InputLeftElement pointerEvents="none">
              {leftElement()}
            </InputLeftElement>
          )} */}
          <Input
            placeholder={placeholder}
            name={labelId}
            type={isPassword() && showPassword ? "text" : type}
            value={value}
            onChange={onChange}
            variant={"outline"}
            required={required}
            borderRadius={10}
          />
          {isPassword() && (
            <InputRightElement>
              <IconButton
                aria-label="hide-or-show-password"
                onClick={() => setShowpassword(!showPassword)}
                background={"none"}
                size="sm"
                color={"gray.500"}
                icon={showPassword ? <ImEye /> : <ImEyeBlocked />}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </Box>
    </>
  );
}
