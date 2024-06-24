import { useState } from "react";
import Slider from "./Slider";
import { avatarSvgArray, avatars } from "./avatars";
import getAvaterObj from "./avatars";
import useUserAvatarUpdate from "../../../hooks/users/useUserAvatarUpdate";
import { FaImages } from "react-icons/fa6";
import { Popup } from ".";

export default function Avatar({ path }) {
	const [isOpen, setIsOpen] = useState(false)
	const [isClicked, setIsClicked] = useState(false)
	function customOnsubmit() {
		setIsOpen(false)
		onSubmit()
		setIsClicked(true)
	}
	const {
		icon,
		isLoading,
		isError,
		onChange,
		onSubmit, } = useUserAvatarUpdate()
	return (

		<div className={'profile-avatar-wrapper'} >
			<div className={'profile-avatar-container'}>
				{!isLoading ? (
					<>
						<img className={'profile-avatar'} src={getAvaterObj(isClicked&&!isError?icon:path)} style={{ background: '#b6b6b6', borderRadius: '50vh' }} ></img>
					</>
				) : (
					<>
						<img className={'profile-avatar'} src={'avatar.svg'} style={{ background: '#b6b6b6', borderRadius: '50vh' }} ></img>
					</>
				)}
				{!isOpen ? (
					<>
						<FaImages onClick={() => setIsOpen(pre => !pre)} className={'profile-avatar-edit'} as={'button'} style={{ position: 'absolute', right: 0, bottom: 0, borderRadius: '50vh', padding: '0.2rem', width: '30px', height: '30px', fontSize: '1.3rem', background: '#BF1E2C', cursor: 'pointer' }} />
					</>
				) : (
					<>
						<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
							<Popup svgArray={avatars} setFun={onChange} defaultSvg={path} backFun={setIsOpen} onSubmit={customOnsubmit} path={path} icon={icon}/>
						</div>
					</>
				)}
			</div>
		</div>
	)
}