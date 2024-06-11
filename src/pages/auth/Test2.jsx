import { useGetRestaurantListMutation } from "../../redux/features/restaurantApiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useEffect } from "react"
import { Text } from "@chakra-ui/react";
import Spinner from "../../components/common/Spinner";
import { setIsLoadingFalse, setIsLoadingTrue, setRestaurants } from "../../redux/features/restaurantSlice";


export default function Test2({ chidlren }) {
	const [getRestaurantList] = useGetRestaurantListMutation()
	const dispatch = useAppDispatch()
	const { restaurantList, isLoading } = useAppSelector((state) => state.restaurant);
	function handleRestaurantList() {
		dispatch(setIsLoadingTrue())
		getRestaurantList()
			.unwrap()
			.then((res) => {
				console.log("GET REST", res)
				dispatch(setRestaurants(res))
				dispatch(setIsLoadingFalse())
			})
			.catch((e) => {
				console.log("ERROR:", e)
				const firstErrorMsg = Object.values(e.data)[0]
				dispatch(setIsLoadingFalse())
				console.log(firstErrorMsg)
			});
	}
	useEffect(() => {
		if (typeof window !== 'undefined') {
			return handleRestaurantList()
		}
	}, [])
	return (
		<>
			{!isLoading ? (
				<>
					{restaurantList.map((e) => (
						<Text key={e.id}>
							{e.id}
						</Text>
					))}
				</>)
				:
				(
					<>
						<Spinner />
					</>
				)
			}
		</>
	)
}