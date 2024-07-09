import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { ChakraProviders } from "../../providers";
import { useEffect } from "react";

export default function Page() {
	const { isThrottled } = useAppSelector(state => state.auth)
	const router = useNavigate()
	useEffect(() => {
		console.log("EFFECT",isThrottled)
		if (isThrottled) {
			router('/429');
		}
	}, [isThrottled])
	return (
		<ChakraProviders>
			<Outlet />
		</ChakraProviders>
	)
}
