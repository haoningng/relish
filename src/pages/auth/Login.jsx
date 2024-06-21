import { Login } from "../../components/auth"
import { ChakraProviders } from "../../providers"
import { Flex } from "@chakra-ui/react";
import { useAppSelector } from "../../redux/hooks";

export default function Page() {
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	return (
		<ChakraProviders>
			<Flex justifyContent={'center'} width={'100%'}>
				<Login />
			</Flex>
		</ChakraProviders>
	)
} 