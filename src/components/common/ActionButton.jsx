import { Button } from "@chakra-ui/react"

export default function Page({ ...arrts }) {
	return (
		<Button
			{...arrts}
			bg={'#BF1E2C'}
			color={'#FFFFFF'}
			w={'240px'}
			h={'60px'}
			borderRadius={'100px'}
			fontSize={'20px'}
			fontWeight={600}
			text-align={'center'}
			_hover={{backgroundColor: '#D03238'}}
			boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.25)'} />
	)
}