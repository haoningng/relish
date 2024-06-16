import awardImage from '../assets/award.svg';
import awardInactiveImage from '../assets/award_inactive.svg';
import "../styles/index.css";

function Award({ name, title, ifAchieved }) {
  const containerClass = ifAchieved === true ? awardImage : awardInactiveImage;
  return (
    <div className= 'award-container'>
      <img src={containerClass} alt="Award" className="award-emoji" />
      <p className="award-name">{name}</p>
      <p className="award-title">{title}</p>
    </div> 
  );    
}

export default Award;