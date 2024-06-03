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

  function handleClick(restaurant) {
    setSelectedRestaurant(restaurant);
    navigate(`./${restaurant.id}`)
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
        onClick={() => handleClick(each)}
        style={{textDecoration: 'none', color: 'white'}}
      >
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
        <div className='listing-desc'>
          <h3 className='listing-desc-text-1'>{each.name}</h3>
          <div className='listing-desc-text-2'>
            <p>{`${each.rating} ★ (${each.review_count}+)`}</p>
            <p>{`${each.price ? each.price : ''}`}</p>
          </div>
          <div className='listing-desc-text-3'>
            <p>
              {/* <span className={!each.is_closed ? 'opening-green' : 'closing-red'}>{!each.is_closed ? `Open` : `Closed`}</span> */}
              <span>{` • < ${parseFloat(each.distance/1000).toFixed(1)} km`}</span>
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