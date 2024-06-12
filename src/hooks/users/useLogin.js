import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { useLoginMutation } from '../../redux/features/authApiSlice';
import { setAuth } from '../../redux/features/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setUsernameFromJWT } from '../../utils/setUsername';
import { setUsername } from '../../redux/features/authSlice';

export default function useLogin() {
	const router = useNavigate();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (event) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();

		login({ email, password })
			.unwrap()
			.then((res) => {
				dispatch(setAuth());
				dispatch(setUsername(setUsernameFromJWT(res.access)))
				toast.success('Logged in');
				router('/location');
			})
			.catch((e) => {
				console.log(e)
				toast.error('Failed to log in');
			});
	};

	return {
		email,
		password,
		isLoading,
		onChange,
		onSubmit,
	};
}