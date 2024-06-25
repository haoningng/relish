import "../styles/index.css";

function Award({ name, title, ifAchieved, cuisine }) {
  const containerClass = `/src/assets/${cuisine}_${ifAchieved ? '0': '1'}.svg`
  return (
    <div className= 'award-container'>
      <img src={containerClass} alt="Award" className="award-emoji" />
      <p className="award-name">{name}</p>
      <p className="award-title">{title}</p>
    </div> 
  );    
}

export default Award;