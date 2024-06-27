// Awards.jsx
import Award from '../components/Award';
import "../styles/index.css";
import { useAppSelector } from '../redux/hooks';
import { PropTypes } from 'prop-types'

function Awards({ setShowAwards }) {
  // from Redux Store
  const { awardList } = useAppSelector((state) => state.award);

  Awards.propTypes = {
    setShowAwards: PropTypes.func.isRequired
  };

  const newAwardList = awardList.map(each => each);
  return (
    <div className="awards-page">
      <div className="awards-title">
        <h1>Awards</h1>
      </div>
      <button className='material-symbols-outlined awards-close' onClick={() => setShowAwards(prev => !prev)}>
        close
      </button>
      <div className="awards-container">
        {newAwardList.reverse().map((award) => (
          <Award key={award.id} cuisine={award.cuisine_type} name={award.name} title={award.description} ifAchieved={award?.user ? true : false} />
        ))}
      </div>
    </div>
  );    
}

export default Awards;
