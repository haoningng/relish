import { ImSpinner3 } from "react-icons/im";

import { motion } from "framer-motion";


export default function CustomSpinner({
	size = "0.8rem",
	isCentered
}) {
	const spinnerSize = () => {
		switch (size) {
			case "sm":
				return { fontSize: "0.8rem" };
			case "md":
				return { fontSize: "1.5rem" };
			case "lg":
				return { fontSize: "2rem" };
			default:
				return size;
		}
	};
	const Wrapper = ({ children }) => {
		if (isCentered) {
			return <div style={{display:'flex',height:'100vh',width:'100vw', alignItems:'center', justifyContent:'center'}}>{children}</div>;
		} else {
			return <>{children}</>;
		}
	};
	return (
		<Wrapper>
			<motion.div
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
				style={{ fontSize: spinnerSize(), display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			>
				<ImSpinner3 style={{ fontSize: spinnerSize() }} />
			</motion.div>
		</Wrapper>
	);
}
