import { useOutletContext, useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types'
import StaticMap from "./StaticMap";

export default function CardsView({ listing }) {
  const {
    selectedCuisine,
    setSelectedRestaurant
  } = useOutletContext(); //from Layout.jsx

  CardsView.propTypes = {
    listing: PropTypes.array.isRequired
  };

  const navigate = useNavigate();

  function handleClick(event, restaurant) {
    if (event.target.closest('.listing-restaurant-photo')) {
      setSelectedRestaurant(restaurant);
      navigate(`./${restaurant.id}`)
    }
  }

  function handleBeenToClick(restaurant) {
    try {  
      // 1. Retrieve and Update
      const savedRestaurants = JSON.parse(localStorage.getItem("been-to")) || [];
      savedRestaurants.push(restaurant);

      // 2. Serialise the array for Storage
      const serializedData = JSON.stringify(savedRestaurants);
  
      // 3. Store in localStorage
      localStorage.setItem("been-to", serializedData);
  
      console.log("Restaurant saved to localStorage!");
      navigate('/Home', { state: { savedRestaurants }})
  
    } catch (error) {
      console.error("Error saving restaurant to localStorage:", error);
      // Handle the error (e.g., display an error message to the user)
    }
  }
  
  const cards = listing.map(each => {
    const imageUrl = each.image_url;
    const coordinate = {
      lat: each.coordinates.latitude,
      lng: each.coordinates.longitude
    }

    return (
      <div
        className='listing-card'
        to={each.id}
        key={each.id}
        onClick={(event) => handleClick(event, each)}
        style={{textDecoration: 'none', color: 'white'}}
      >
        <div className='listing-photo-container'>
          {imageUrl ? <img
            className='listing-restaurant-photo'
            width='360px'
            height='180px'
            alt={`The restaurant photo of ${each.name}`}
            src={imageUrl}
            /> :  <StaticMap
            coordinate={coordinate}
            page={{
              name: 'cardsview'
            }}
            />}
            <img onClick={() => handleBeenToClick(each)} className='listing-been-to-button' src={`/tomato-slice.png`} alt={`Relish icon`} width='20px' height='20px'/>
        </div>
        <div className='listing-desc'>
          <h3 className='listing-desc-text-1'>{each.name}</h3>
          <div className='listing-desc-text-2'>
            <p>{`${each.rating} ★ (${each.review_count}+)`}</p>
            <p>{`${each.price ? each.price : ''}`}</p>
          </div>
          <div className='listing-desc-text-3'>
            <p>
              {/* <span className={!each.is_closed ? 'opening-green' : 'closing-red'}>{!each.is_closed ? `Open` : `Closed`}</span> */}
              <span>{`< ${parseFloat(each.distance/1000).toFixed(1)} km`}</span>
            </p>
          </div>
        </div>
      </div>
    )
  })
return (
    listing.length ? cards : `0 Results of ${selectedCuisine} dish/restaurant at this range\nTry again`
  )
}