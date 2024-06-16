import { useOutletContext, useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types'
import StaticMap from "./StaticMap";
import BeenToButton from "./BeenToButton";
import CuisineTag from "./CuisineTag";

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
      navigate(`/listing/${restaurant.id}`)
    }
  }
  
  const cards = listing?.map(each => {
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
            <CuisineTag restaurant={each} page={{name: 'listing'}}/>
            <BeenToButton 
              page={{
                name: 'listing',
                restaurant: each,
                visited: false
              }}
            />
        </div>
        <div className='listing-desc'>
          <h3 className='listing-desc-text-1'>{each.name}</h3>
          <div className='listing-desc-text-2'>
            <p>{`${each.rating} ★ (${each.review_count}+)`}</p>
            <p>{`${each.price ? each.price : ''}`}</p>
          </div>
          <div className='listing-desc-text-3'>
            <p>
              <span>{`< ${parseFloat(each.distance/1000).toFixed(1)} km`}</span>
            </p>
          </div>
        </div>
      </div>
    )
  })
return (
    listing?.length ? cards 
    : <p className='error-message'>
        {`0 Results of ${selectedCuisine} at this range or price level\nTry again`}
      </p>
  )
}