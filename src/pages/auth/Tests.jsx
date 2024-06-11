import { ChakraProviders } from "../../providers"
import { Signup, Login } from "../../components/auth"
import { Flex, Box } from "@chakra-ui/react"
import Test from "./Test"
import Test2 from "./Test2"
import Test3 from "./Test3"

export default function Auth() {
	return (
		<ChakraProviders>
			<Flex justifyContent={'center'} width={'100%'}>
				<Login />
				<Test />
			</Flex>
			{/* <Signup />
			<Test3/>
			{chidlren} */}
		</ChakraProviders>
	)
}