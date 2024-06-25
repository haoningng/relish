import { useState } from 'react'
import { wrap } from 'popmotion';
import { Flex, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import SlideItems from './SlideItems';



export default function SlideAction({ svgArray, eachSlideWidth, setFun, setSelectedSvg }) {
	const [[page, direction], setPage] = useState([0, 0]);
	const imageIndex = wrap(0, svgArray.length, page);
	const [animateWidth, setAnimateWidth] = useState(0);
	const [edge, setEdge] = useState(false);
	const [edgeAnime, setEdgeAnime] = useState(0);
	const paginate = (newDirection) => {
		const stopLength = svgArray.length - 3;
		if (stopLength === imageIndex) {
			if (newDirection === -1) {
				setEdge(false);
				setAnimateWidth(
					(pre) => (pre += newDirection > 0 ? -eachSlideWidth : eachSlideWidth)
				);
				setPage([page + newDirection, newDirection]);
				return;
			} else {
				setEdgeAnime(-20);
				setEdge((state) => true);
				return;
			}
		} else if (!imageIndex) {
			if (newDirection === 1) {
				setEdge(false);
				setAnimateWidth(
					(pre) => (pre += newDirection > 0 ? -eachSlideWidth : eachSlideWidth)
				);
				setPage([page + newDirection, newDirection]);
				return;
			} else {
				setEdgeAnime(20);
				setEdge((state) => true);
				return;
			}
		}
		setAnimateWidth(
			(pre) => (pre += newDirection > 0 ? -eachSlideWidth : eachSlideWidth)
		);
		setPage([page + newDirection, newDirection]);
	};
	let markup;
	if (svgArray.length) {
		markup = (
			<Flex
				w={"100%"}
				h={"100%"}
				position={"relative"}
				alignItems={"center"}
			>
				<Flex
					w="30px"
					h="40px"
					bg="none"
					zIndex={"1"}
					justifyContent={"center"}
					alignItems="center"
					fontSize={"16px"}
					border="none"
					borderRadius={"0.2rem"}
					transform="scale(-1)"
					transition={".3s"}
					cursor={'pointer'}
					_hover={{ bg: "#163300" , color:'#9FE870' }}
					onClick={() => (edge ? "" : paginate(-1))}
				>
					<Box display="inline-block">{"❯"}</Box>
				</Flex>
				<Box
					w={eachSlideWidth * 3}
					h={"60px"}
					overflowX={"hidden"}
					position={"relative"}
				>
					<Flex
						as={motion.div}
						position={"absolute"}
						animate={{
							x: edge ? [edgeAnime, animateWidth - animateWidth] : "",
						}}
						onAnimationComplete={() => {
							setEdge(false);
						}}
					>
						<motion.div animate={{ x: animateWidth }}>
							<SlideItems
								svgArray={svgArray}
								setFun={setFun}
								eachSlideWidth={eachSlideWidth}
								setSelectedSvg={setSelectedSvg}
							/>
						</motion.div>
					</Flex>
				</Box>
				<Flex
					w="30px"
					h="40px"
					bg="none"
					right={"10px"}
					zIndex={"1"}
					justifyContent={"center"}
					alignItems="center"
					border="none"
					borderRadius={"0.2rem"}
					fontSize={"16px"}
					transition={".3s"}
					cursor={'pointer'}
					_hover={{ bg: "#163300" , color:'#9FE870' }}
					onClick={() => (edge ? "" : paginate(1))}
				>
					<Box>{"❯"}</Box>
				</Flex>
			</Flex>
		);
	}
	return <>{markup}</>;
} 
