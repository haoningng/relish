import { useGetAwardListMutation } from "../../redux/features/awardApiSlice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useEffect } from "react"
import { setAwards } from "../../redux/features/awardSlice";
import { Text } from "@chakra-ui/react";
import Spinner from "../../components/common/Spinner";
import { setIsLoadingFalse, setIsLoadingTrue } from "../../redux/features/awardSlice";


export default function Test() {
	const [getAwardList] = useGetAwardListMutation()
	const dispatch = useAppDispatch()
	const { awardList, isLoading } = useAppSelector((state) => state.award);
	function test() {
		// not working
		fetch('http://127.0.0.1:8000/api/award-list/',{ method: "POST",
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},})
	}
	function handleAwardList() {
		dispatch(setIsLoadingTrue())
		getAwardList()
			.unwrap()
			.then((res) => {
				dispatch(setAwards(res))
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
			return handleAwardList()
			// test()
		}
	}, [])
	return (
		<>
			{!isLoading ? (
				<>
					{awardList.map((e) => (
						<Text key={e.id}>
							{e.description}
						</Text>
					))}
				</>
				)
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