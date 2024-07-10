import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";

export default function Page() {
	const { isThrottled } = useAppSelector(state => state.auth)
	const router = useNavigate()
	useEffect(() => {
		if (isThrottled) {
			router('/429');
		}
	}, [isThrottled])
	return (
		<Outlet />
	)
}
