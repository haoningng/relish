import Slider from "./Slider"

export default function Page({ svgArray, setFun, defaultSvg, backFun, onSubmit, icon, path }) {
	return (
		<>
			<div style={{ background: '#95A593', height: '130px', padding: '1rem', display: 'flex', flexDirection: 'column', borderRadius: '10px', border: 'solid #EDF1D6' }}>
				<Slider svgArray={svgArray} setFun={setFun} defaultSvg={defaultSvg} />
				<div>
					<button className='profile-avatar-popup-btn' onClick={() => backFun(pre => !pre)}>Back</button>
					<button className='profile-avatar-popup-btn' onClick={onSubmit} disabled={icon === path}>Submit</button>
				</div>
			</div>
		</>
	)
}