import Slider from "./Slider"

export default function Page({ svgArray, setFun, defaultSvg, backFun, onSubmit, icon, path }) {
	return (
		<>
			<div style={{ background: '#878686', height: '130px', padding: '1rem', display: 'flex', flexDirection: 'column', borderRadius: '10px', border: 'solid #4b4b4b' }}>
				<Slider svgArray={svgArray} setFun={setFun} defaultSvg={defaultSvg} />
				<div>
					<button onClick={() => backFun(pre => !pre)}>Back</button>
					<button onClick={onSubmit} disabled={icon===path}>Submit</button>
				</div>
			</div>
		</>
	)
}