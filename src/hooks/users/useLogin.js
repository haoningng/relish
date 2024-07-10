import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { useLoginMutation } from '../../redux/features/authApiSlice';
import { setAuth, setUser } from '../../redux/features/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
	const router = useNavigate();

	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const isFirstTime = JSON.parse(localStorage.getItem("isFirstTime"));

	// send to location page if first time, otherwise default send to home page, 
	const destination = isFirstTime === null ? "/location" : isFirstTime.profile === true ? "/location" : "/"; 

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
				dispatch(setUser(res?.user));
				toast.success('Logged in');
				router(destination);
			})
			.catch((e) => {
				toast.error('Failed to log in, please try again');
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