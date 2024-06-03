import { useOutletContext, useNavigate } from "react-router-dom";
import "../styles/index.css";
import { PropTypes } from 'prop-types'

export default function CuisineOptions({ page }) {
  const {
    cuisineList,
    selectedCuisine,
    setSelectedCuisine
  } = useOutletContext(); //from Layout.jsx

  const navigate = useNavigate()

  CuisineOptions.propTypes = {
    page: PropTypes.object.isRequired,
  };

  function handleRadio(event) {
    const {value} = event.target;
    setSelectedCuisine(value);
    navigate('/Home')
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
            <img className='cuisine-img' src={`/Cuisines/${each}.svg`} alt={`${each} icon`} />
            <p className={page.descClassName}>{each}</p>
          </label>
        </div>
      )
    })
  )
}