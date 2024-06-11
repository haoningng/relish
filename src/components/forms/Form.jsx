import CustomInput from "./CustomInput";
import { Flex, Button } from "@chakra-ui/react";
import Spinner from "../common/Spinner";

export default function Form({
  config,
  isLoading,
  btnText,
  btnPosition = "flex-end",
  onChange,
  onSubmit,
  children,
}) {
  return (
    <>
      <form onSubmit={onSubmit}>
        {config.map((input) => (
          <CustomInput
            key={input.labelId}
            labelId={input.labelId}
            // labelText={input.labelText}
            placeholder={input.placeholder}
            type={input.type}
            onChange={onChange}
            value={input.value}
            link={input.link}
            required={input.required}
          />
        ))}

        <Flex mt={"1rem"} flexDirection={"column"}>
          {typeof children !== "undefined" && children}
          <Flex justifyContent={btnPosition}>
            <Button type="submit" mt={"0.7rem"} isDisabled={isLoading}>
              {isLoading ? <Spinner /> : `${btnText}`}
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  );
}
