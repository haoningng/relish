import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { useLoginMutation } from '../../redux/features/authApiSlice';
import { setAuth } from '../../redux/features/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
	const router = useNavigate();
	const location = useLocation()
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const isFirstTime = localStorage.getItem("isFirstTime");
	console.log('isFirstTime ', isFirstTime)
	// send to the original page, or location page if first time, otherwise default send to home page, 
	const from = location.state?.from || isFirstTime === null ? "/location" : isFirstTime === 'true' ? "/location" : "/"; 

	//debug
	console.log('from = ', from)

	const { email, password } = formData;

	const onChange = (event) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();

		login({ email, password })
			.unwrap()
			.then(() => {
				dispatch(setAuth());
				toast.success('Logged in');
				router('/location');
			})
			.catch((e) => {
				console.log(e)
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