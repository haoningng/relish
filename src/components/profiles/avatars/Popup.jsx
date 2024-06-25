import Slider from "./Slider"

export default function Page({ svgArray, setFun, defaultSvg, backFun, onSubmit, icon, path }) {
	return (
		<>
			<div style={{ background: 'rgb(62, 67, 84)', height: '130px', padding: '1rem', display: 'flex', flexDirection: 'column', borderRadius: '10px', border: 'solid rgb(112, 143, 218)' }}>
				<Slider svgArray={svgArray} setFun={setFun} defaultSvg={defaultSvg} />
				<div>
					<button onClick={() => backFun(pre => !pre)}>Back</button>
					<button onClick={onSubmit} disabled={icon === path}>Submit</button>
				</div>
			</div>
		</>
	)
}