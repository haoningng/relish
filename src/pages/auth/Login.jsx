import { Login } from "../../components/auth"
import { ChakraProviders } from "../../providers"
import { Flex } from "@chakra-ui/react";
import { useAppSelector } from "../../redux/hooks";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify'

export default function Page() {
	const location = useLocation();

	useEffect(() => {
		if (location.state?.key === 'from home') {
			toast.error('This feature is only available after logging in.')
		}
  }, [])
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	return (
		<ChakraProviders>
			<Flex justifyContent={'center'} width={'100%'}>
				<Login />
			</Flex>
		</ChakraProviders>
	)
} 