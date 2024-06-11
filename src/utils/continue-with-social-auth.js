import { toast } from 'react-toastify';

export default async function continueWithSocialAuth(
	provider,
	redirect
) {
	try {
		const url = `${import.meta.env.VITE_PUBLIC_HOST
			}/api/o/${provider}/?redirect_uri=${import.meta.env.NODE_ENV === 'production'
				? import.meta.env.VITE_PUBLIC_REDIRECT_URL
				: 'http://localhost:3000'
			}/auth/${redirect}`;
		console.log("URL", import.meta.env.VITE_PUBLIC_HOST)
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
			toast.error('Something went wrong');
		}
	} catch (err) {
		toast.error('Something went wrong');
	}
}
