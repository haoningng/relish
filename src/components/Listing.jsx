import { useEffect, useState, useRef }  from 'react';
import { useOutletContext } from "react-router-dom";
import { PropTypes } from 'prop-types'
import CardsView from './CardsView';
import MapView from './MapView';

export default function Listing({ mapOn }) {
  const {
    coordinate,
    setCoordinate,
    location,
    selectedCuisine,
    priceLevel,
    radius,
    sort
  } = useOutletContext(); //from Layout.jsx

  Listing.propTypes = {
    mapOn: PropTypes.bool.isRequired
  };

  const [showSeeMore, setShowSeeMore] = useState(false);
  const [listing, setListing] = useState([])

  function handleSeeMoreClick() {
    console.log('see more')
  }

  const listingContainerRef = useRef(null); // Add ref to the scrollable div

  useEffect(() => {
    const listingContainer = listingContainerRef.current;

    const handleScroll = () => {
      if (
        listingContainer.scrollTop + listingContainer.clientHeight >=
        listingContainer.scrollHeight - 0.1 * listingContainer.scrollHeight
      ) {
        setShowSeeMore(true);
      } else {
        setShowSeeMore(false);
      }
    };

    if (listingContainer) {
      listingContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listingContainer) {
        listingContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "endpoint": (`https://api.yelp.com/v3/businesses/search?term=${selectedCuisine}${priceLevel ? `&price=` + `${String(priceLevel)}` :''}&categories=${selectedCuisine}&sort_by=${sort}&radius=${radius}${location ? `&location=` + location + ' VIC Australia' : `&latitude=${coordinate.lat}&longitude=${coordinate.lng}` }&locale=en_AU&offset=0`),
          "id": `django-insecure-0ezwicnx+&u=g+d3e2&9-u!c9un559($jq7--dpd*8p-bshh4$`
      })
    }
    
    fetch(`https://proxy-server-amber-two.vercel.app/api/yelp/`, options)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setListing(data.businesses)
        setCoordinate({lat: data.region.center.latitude, lng: data.region.center.longitude});
      })
      .catch(err => console.error(err));
  }, [coordinate.lat, coordinate.lng, location, priceLevel, radius, selectedCuisine, setCoordinate, sort]);

  return ( mapOn 
    ? <MapView listing={ listing }/> 
    : <div className="listing-container" ref={listingContainerRef}>
        <CardsView listing={ listing }/>
        <button className={`listing-see-more ${showSeeMore ? 'show' : ''}`} onClick={handleSeeMoreClick}>See More</button>
        <br/>
        <br/>
      </div>
  );
}
