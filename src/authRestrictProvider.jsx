import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { useIsAuthMutation } from "./redux/features/authApiSlice";
import { useEffect } from "react";
import { setIsMounted, setAuth } from "./redux/features/authSlice";
import { useDispatch } from "react-redux";
import Spinner from "./components/common/Spinner";

export default function AuthRestrictProvider({ children }) {
	const dispatch = useDispatch()
	const [isAuth] = useIsAuthMutation()
	const { isMounted } = useAppSelector((state) => state.auth);
	useEffect(() => {
		function handleIsAuth() {
			isAuth()
				.unwrap()
				.then((res) => {
					dispatch(setAuth(res))
				})
				.catch((e) => {
					const firstErrorMsg = Object.values(e.data)[0]
					console.log(firstErrorMsg)
				})
				.finally(() => {
					dispatch(setIsMounted(true))
				});
		}
		return handleIsAuth()
	}, [])
	return (
		<>
			{isMounted ?
				<>
					{children}
				</>
				:
				<>
					<div style={{ height: '100vh', width: '100vw', justifyContent: 'center', display: 'flex' }}>
					<img className='logo-animation' src={'/Relish.svg'}/>
					</div>
				</>
			}
		</>
	)
}