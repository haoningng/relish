import { useState } from "react";
import Slider from "./Slider";
import { avatarSvgArray, avatars } from "./avatars";
import getAvaterObj from "./avatars";
import useUserAvatarUpdate from "../../../hooks/users/useUserAvatarUpdate";
import { FaImages } from "react-icons/fa6";
import { Popup } from ".";
import { Skeleton } from "../../common";

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
		onChange,
		onSubmit, } = useUserAvatarUpdate()
	return (
		<div className={'profile-avatar-wrapper'} >
			<div className={'profile-avatar-container'}>
				{!isLoading ? (
					<>
						<img className={'profile-avatar'} src={getAvaterObj(path)} style={{ background: '#95A593', borderRadius: '50vh', padding: path ? '' : '0.7rem', border:'2px solid #53535a' }} ></img>
					</>
				) : (
					<>
						<div className={'profile-avatar'} style={{ borderRadius: '50vh', overflow: 'hidden', border:'2px solid #53535a' }}>
							<Skeleton />
						</div>
					</>
				)}
				{!isOpen ? (
					<>
						<button onClick={() => setIsOpen(pre => !pre)} disabled={isLoading} className={'profile-avatar-edit'} as={'button'} style={{ position: 'absolute', right: 0, bottom: 0, borderRadius: '50vh', padding: '0.2rem', width: '30px', height: '30px', fontSize: '1.3rem', cursor: isLoading ? '' : 'pointer', color: 'white', overflow: 'hidden' }}>
							{isLoading ? (
								<></>) : (<><FaImages /></>)}

						</button>
					</>
				) : (
					<>
						<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
							<Popup svgArray={avatars} setFun={onChange} defaultSvg={path} backFun={setIsOpen} onSubmit={customOnsubmit} path={path} icon={icon} />
						</div>
					</>
				)}
			</div>
		</div>
	)
}