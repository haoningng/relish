import { useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../../redux/features/authApiSlice';
import { useAppDispatch } from '../../redux/hooks';
import { setUser } from '../../redux/features/authSlice';

export default function useUserAvatarUpdate() {
	const [updateUser, { isLoading, error, isSuccess, isError }] = useUpdateUserMutation();
	const dispatch = useAppDispatch()

	const [icon, setIcon] = useState('')
	const onChange = (icon) => {
		setIcon(icon)
	};

	const onSubmit = () => {
		updateUser({ avatar: icon })
			.unwrap()
			.then((res) => {
				dispatch(setUser(res))
				toast.success('Updated successfully!');
			})
			.catch((e) => {
				const firstErrorMsg = Object.values(e.data)[0]
				toast.error('Failed to update!' + '\n' + firstErrorMsg);
			});
	};

	return {
		icon,
		isLoading,
		isError,
		onChange,
		onSubmit,
	};
}