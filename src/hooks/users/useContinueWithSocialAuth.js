import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/hooks';
import { throttledErrorHandler } from '../../redux/features/authSlice';

export default function useContinueWithSocialAuth() {
	const dispatch = useAppDispatch();

	const continueWithSocialAuth = async (provider, redirect) => {
		try {
			const url = `${import.meta.env.VITE_PUBLIC_HOST}/api/o/${provider}/?redirect_uri=${import.meta.env.NODE_ENV === 'production'
				? import.meta.env.VITE_PUBLIC_REDIRECT_URL
				: 'http://localhost:3000'
				}/auth/${redirect}`;
			const res = await fetch(url, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
				credentials: 'include',
			});
			const data = await res.json();
			if (res.status === 200 && typeof window !== 'undefined') {
				window.location.replace(data.authorization_url);
			} else {
				if (res.status === 429) {
					dispatch(throttledErrorHandler(data.detail));
				}
				toast.error('Something went wrong');
			}
		} catch (err) {
			toast.error('Something went wrong');
		}
	};

	return {continueWithSocialAuth};
};

