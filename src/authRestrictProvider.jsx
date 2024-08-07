import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { useIsAuthMutation } from "./redux/features/authApiSlice";
import { useEffect } from "react";
import { setIsMounted, setAuth, setUser } from "./redux/features/authSlice";
import { useDispatch } from "react-redux";

export default function AuthRestrictProvider({ children }) {
	const dispatch = useDispatch()
	const [isAuth] = useIsAuthMutation()
	const { isMounted } = useAppSelector((state) => state.auth);
	useEffect(() => {
		function handleIsAuth() {
			isAuth()
				.unwrap()
				.then((res) => {
					dispatch(setUser(res))
					dispatch(setAuth(true))
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
					<div style={{ height: window.innerHeight, width: window.innerWidth, justifyContent: 'center', display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
						<img className='logo-animation' src={'/Relish.svg'} />
					</div>
				</>
			}
		</>
	)
}