import awardImage from '../assets/award.svg';
import "../styles/index.css";

function Award({ title, name }) {
  return (
    <div className="award-container">
      <img src={awardImage} alt="Award" className="award-emoji" />
      <p className="award-name">{name}</p>
      <p className="award-title">{title}</p>
    </div> 
  );    
}

export default Award;