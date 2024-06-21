import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { setAuth } from '../../redux/features/authSlice';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function useSocialAuth(authenticate, provider) {
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const router = useNavigate();
	const effectRan = useRef(false);

	useEffect(() => {
		const state = searchParams.get('state');
		const code = searchParams.get('code');

		if (state && code && !effectRan.current) {
			console.log("state:",state)
			console.log(" code", code)
			console.log(searchParams)
			authenticate({ provider, state, code })
				.unwrap()
				.then(() => {
					dispatch(setAuth());
					router('/location');
					toast.success('Logged in');
				})
				.catch((e) => {
					console.log("ERROR_SOCIAL:", e)
					if(typeof e.data.non_field_errors==='undefined') {
						toast.error('Failed to log in. This Email might exist already.');
					}
					router('/auth');
				});
		}

		return () => {
			effectRan.current = true;
		};
	}, [authenticate, provider]);
}