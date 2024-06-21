import { Image as ChakraImage } from "@chakra-ui/react";
import {
	Box,
	Flex,
	Text,
	StackDivider,
	Stack,
	Skeleton,
	Avatar,
} from "@chakra-ui/react";
import { ChakraProviders } from "../../../providers";

export default function Avatar({ avatarPath }) {
	const [getUser, { isLoading }] = useGetUserMutation();
	return (

		<>
			<ChakraProviders>
				<Flex
					as={
						avatarPath
							? Skeleton
							: Flex
					}
					position={"relative"}
				>
					{!avatarPath ? (
						<>
							<Avatar size={"xl"} />
						</>
					) : (
						<>
							<ChakraImage
								src={avatarPath}
								// srcSet={`${user.avatar} x2`}
								layout="fill"
								alt={"avatar"}
							/>
						</>
					)}
				</Flex>
			</ChakraProviders>
		</>
	)
}