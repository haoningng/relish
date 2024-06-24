import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState, useRef, forwardRef } from "react";
import { SelectedSvg as Selected, SlideAction} from ".";

export default function Slider({ svgArray, setFun, defaultSvg }) {
  const [selectedSvg, setSelectedSvg] = useState("");
  const [eachSlideWidth, setEachSlideWidth] = useState(56);
  useEffect(() => {
    if (typeof defaultSvg !== "undefined") {
      const def = svgArray.find(e => e.name === defaultSvg)
      if(def) {
        setSelectedSvg(def.path)
      } 
      setFun(defaultSvg)
    } else {
      setSelectedSvg(svgArray[0].path)
      setFun(svgArray[0].name)
    }

  }, []);
  return (
    <>
      <Flex w={"100%"} h={"100%"} alignItems={"center"} className={"out"}>
        <Selected selectedSvg={selectedSvg} />

        <SlideAction
          svgArray={svgArray}
          setFun={setFun}
          eachSlideWidth={eachSlideWidth}
          setSelectedSvg={setSelectedSvg}
        />
      </Flex>
    </>
  );
}
