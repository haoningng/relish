import { useState } from 'react';
import { useRestaurantCreateOrDeleteMutation } from '../../redux/features/restaurantApiSlice';
import { toast } from 'react-toastify';
import { setRestaurants, deleteRestaurant } from '../../redux/features/restaurantSlice';
import { useAppDispatch } from '../../redux/hooks';
import { setIsLoadingFalse, setIsLoadingTrue } from '../../redux/features/restaurantSlice';

export default function useRestaurantsCreate() {
	const [RestaurantsCreate, { isLoading }] = useRestaurantCreateOrDeleteMutation();
	const [formData, setFormData] = useState({
		place_id: '',
		obj: '',
		cuisine_type: '',
		has_been: true,
	});
	const dispatch = useAppDispatch()
	const { place_id, obj, cuisine_type, has_been } = formData;

	const onChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(setIsLoadingTrue())
		RestaurantsCreate({ place_id: place_id, obj: obj, cuisine_type: cuisine_type, has_been: has_been })
			.unwrap()
			.then((res) => {
				if (res) {
					dispatch(setRestaurants(res))
					toast.success('Successfully created!');
				} else {
					dispatch(deleteRestaurant(place_id))
					toast.success('Successfully deleted!');
				}
				dispatch(setIsLoadingFalse())
			})
			.catch((e) => {
				console.log("ERROR:", e)
				const firstErrorMsg = Object.values(e.data)[0]
				toast.error('Failed to create a Restaurants' + '\n' + firstErrorMsg);
				dispatch(setIsLoadingFalse())
			});
	};

	return {
		place_id,
		obj,
		cuisine_type,
		has_been,
		isLoading,
		onChange,
		onSubmit,
	};
}