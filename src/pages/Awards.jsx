// Awards.jsx
import Award from '../components/Award';
import "../styles/index.css";
import { useAppSelector } from '../redux/hooks';

function Awards() {
  // from Redux Store
  const { awardList } = useAppSelector((state) => state.award);

  const newAwardList = awardList.map(each => each);
  return (
    <div className="awards-page">
      <div className="awards-title">
        <h1>Awards</h1>
      </div>
      <div className="awards-container">
        {newAwardList.reverse().map((award) => (
          <Award key={award.id} cuisine={award.cuisine_type} name={award.name} title={award.description} ifAchieved={award?.user ? true : false} />
        ))}
      </div>
    </div>
  );    
}

export default Awards;
