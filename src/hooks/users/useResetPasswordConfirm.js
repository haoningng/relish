import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordConfirmMutation } from '../../redux/features/authApiSlice';
import { toast } from 'react-toastify';

export default function useResetPasswordConfirm(uid, token) {
	const router = useNavigate();

	const [resetPasswordConfirm, { isLoading }] =
		useResetPasswordConfirmMutation();

	const [formData, setFormData] = useState({
		new_password: '',
		re_new_password: '',
	});

	const { new_password, re_new_password } = formData;

	const onChange = (event) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();

		resetPasswordConfirm({ uid, token, new_password, re_new_password })
			.unwrap()
			.then(() => {
				toast.success('Password reset successful');
				router('/auth/login');
			})
			.catch(() => {
				toast.error('Password reset failed');
			});
	};

	return {
		new_password,
		re_new_password,
		isLoading,
		onChange,
		onSubmit,
	};
}