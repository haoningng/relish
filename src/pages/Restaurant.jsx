import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StaticMap from '../components/StaticMap';
import BeenToButton from '../components/BeenToButton';

export default function Restaurant() {
  const {
    selectedRestaurant
  } = useOutletContext(); //from Layout.jsx

  const coordinate = {
    lat: selectedRestaurant?.coordinates.latitude,
    lng: selectedRestaurant?.coordinates.longitude
  }
  
  const [openNow, setOpenNow] = useState(null);

  useEffect(() => {
    const fetchOpenNowStatus = async () => {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "endpoint": `https://api.yelp.com/v3/businesses/${selectedRestaurant.id}`,
            "id": `django-insecure-0ezwicnx+&u=g+d3e2&9-u!c9un559($jq7--dpd*8p-bshh4$`
          }),
        };

        const response = await fetch(`https://proxy-server-amber-two.vercel.app/api/yelp/`, options); 
        const data = await response.json();

        if (response.ok) {
          setOpenNow(data.hours[0].is_open_now);
        } else {
          setOpenNow(null)
          console.error('Yelp API Error:', data.error);
          // Handle the error (e.g., display an error message to the user)
        }
      } catch (err) {
        setOpenNow(null)
        console.error('Fetch Error:', err);
        // Handle the fetch error
      }
    };

    if (selectedRestaurant.id) { // Fetch only if selectedRestaurant.id exists
      fetchOpenNowStatus();
    }
  }, [selectedRestaurant.id]); 
  
  return ( selectedRestaurant ?
      <div className='restaurant-desc'>
        <div>
          <div className="restaurant-img-container">
            {selectedRestaurant.image_url ? <img
              className='restaurant-img'
              width='100vw'
              height='250px'
              alt={`The restaurant photo of ${selectedRestaurant.name}`}
              src={selectedRestaurant.image_url}
            /> :  <StaticMap
                    coordinate={coordinate}
                    page={{
                      name: 'restaurant-img'
                    }}
                  />}
            <BeenToButton 
              page={{
                name: 'restaurant',
                restaurant: selectedRestaurant,
              }}
            />
          </div>
          <h3 className='restaurant-text-1'>{selectedRestaurant.name}</h3>
          <div className='restaurant-text-2'>
            <p>{`${selectedRestaurant.rating} ★ (${selectedRestaurant.review_count}+)`}</p>
            <p>{selectedRestaurant.price ? `${selectedRestaurant.price}` : ''}</p>
          </div>
          <a
            className='restaurant-map-link'
            href={`https://www.google.com/maps/search/?api=1&query=${selectedRestaurant.name}+${selectedRestaurant.location.address1}`}
            target="_blank"
            rel="noopener noreferrer"
          >{selectedRestaurant.location.display_address.join(', ')}</a>
          <div className='restaurant-text-3'>
            <p>
              <span className={openNow ? 'opening-green' : 'closing-red'}>{openNow ? `Open` : openNow === null ? '' : `Closed`}</span>
              <span>{` • < ${parseFloat(selectedRestaurant.distance/1000).toFixed(1)} km`}</span>
            </p>
          </div>
        </div>
        <div className='restaurant-buttons-container'>
          <a
              href={`tel:${selectedRestaurant.phone}`}
              target="_blank"
              rel="noopener noreferrer"
          >
            <button className="restaurant-buttons">
              <img className='cuisine-img' src={`/phone.svg`} alt={`phone icon`} /><br />
                Book a table
            </button>
          </a>
          <a
            href={`${selectedRestaurant.url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="restaurant-buttons">
            <img className='cuisine-img' src={`/googleReview.svg`} alt={`Google Review icon`} /><br />
              Yelp Reviews
            </button>
          </a>
        </div>
        {coordinate.lat ? 
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${selectedRestaurant.name}+${selectedRestaurant.location.address1}`}
            target="_blank"
            rel="noopener noreferrer"
          >
          <StaticMap
            coordinate={coordinate}
            page={{
              name: 'restaurant'
            }}
          />
        </a>
        : ''}
      </div>
  : 404)
}