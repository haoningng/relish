import { useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../../redux/features/authApiSlice';
import { useAppDispatch } from '../../redux/hooks';

export default function useUserAvatarUpdate() {
	const [updateUser, { isLoading, error, isSuccess, isError }] = useUpdateUserMutation();
	const dispatch = useAppDispatch()

	const [icon, setIcon] = useState('')
	const onChange = (icon) => {
		console.log("SET", icon)
		setIcon(icon)
	};

	const onSubmit = () => {
		updateUser({ avatar: icon })
			.unwrap()
			.then((res) => {
				toast.success('Syccessfully updated!');
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