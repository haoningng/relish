import { Login } from "../../components/auth"
import { ChakraProviders } from "../../providers"
import { Flex } from "@chakra-ui/react";

export default function Page() {
	return (
		<ChakraProviders>
			<Flex justifyContent={'center'} width={'100%'}>
				<Login />
			</Flex>
		</ChakraProviders>
	)
} 