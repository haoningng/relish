import { useAppSelector } from "../../redux/hooks"
import { useEffect } from "react"
import { Text, Button } from "@chakra-ui/react";
import Spinner from "../../components/common/Spinner";
import useRestaurantsCreate from "../../hooks/restaurants/useRestaurantCreate";


export default function Test3({ chidlren }) {
	const { restaurantList } = useAppSelector((state) => state.restaurant);
	const {place_id, obj, cuisine_type, has_been, isLoading, onChange, onSubmit} = useRestaurantsCreate()
	useEffect(() => {
		if (typeof window !== 'undefined') {
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
			<Button onClick={onSubmit}>Creste</Button>
		</>
	)
}