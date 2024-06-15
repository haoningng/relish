import { useOutletContext, useNavigate } from "react-router-dom";
import "../styles/index.css";
import { PropTypes } from 'prop-types'

export default function CuisineOptions({ page }) {
  const {
    cuisineList,
    selectedCuisine,
    setSelectedCuisine,
    setOffset,
    setListing,
    setLoading
  } = useOutletContext(); //from Layout.jsx

  const navigate = useNavigate()

  CuisineOptions.propTypes = {
    page: PropTypes.object.isRequired,
  };

  function handleRadio(event) {
    const {value} = event.target;
    setSelectedCuisine(value);
    setOffset(0);
    setLoading(true);
    setListing([]);
    navigate('/');
  }

  return (
    cuisineList.map(each => {
      return (
        <div key={cuisineList.indexOf(each)}>
          <input 
            type="radio"
            id={each}
            name="cuisine"
            value={each}
            checked={selectedCuisine === each}
            onChange={handleRadio}
          />
          <label className={page.className} htmlFor={each}>
            <img 
              style={each === selectedCuisine ? {
                backgroundColor: '#163300',
                border: '2px inset #9FE870',
                borderRadius: '18px',
                padding: '4px'
              }: {}}
              className='cuisine-img'
              src={`/Cuisines/${each}.svg`}
              alt={`${each} icon`} 
            />
            <p
              style={each === selectedCuisine ? {fontWeight: '700'} : {}}
              className={page.descClassName}
            >{each}</p>
          </label>
        </div>
      )
    })
  )
}