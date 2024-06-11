import { useState } from 'react';
import { useRegisterMutation } from '../../redux/features/authApiSlice';
import { toast } from 'react-toastify';

export default function useRegister() {
	const [register, { isLoading }] = useRegisterMutation();

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		re_password: '',
	});

	const { username, email, password, re_password } = formData;

	const onChange = (event) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();

		register({ username, email, password, re_password })
			.unwrap()
			.then(() => {
				toast.success('Please check email to verify account');
			})
			.catch((e) => {
				const firstErrorMsg = Object.values(e.data)[0]
				toast.error('Failed to register account' + '\n' + firstErrorMsg);
			});
	};

	return {
		username,
		email,
		password,
		re_password,
		isLoading,
		onChange,
		onSubmit,
	};
}