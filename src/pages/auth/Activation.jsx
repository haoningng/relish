import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActivationMutation } from "../../redux/features/authApiSlice";
import { toast } from "react-toastify";
import { Flex, Heading } from "@chakra-ui/react";

export default function Page() {
	const router = useNavigate();
	const { uid, token } = useParams();
	const [activation] = useActivationMutation();

	useEffect(() => {
		if (uid && token) {
			activation({ uid, token })
				.unwrap()
				.then(() => {
					toast.success("Account activated");
				})
				.catch(() => {
					toast.error("Failed to activate account");
				})
				.finally(() => {
					router("/auth/login");
				});
		}
	}, [uid, token, activation, router]);

	return (
		<Flex justifyContent={'center'}>
			<Heading>Activating your account...</Heading>
		</Flex>
	);
}
