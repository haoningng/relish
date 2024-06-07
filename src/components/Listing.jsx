import { useEffect, useState, useRef }  from 'react';
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
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
    sort,
    offset,
    setOffset,
    listing,
    setListing
  } = useOutletContext(); //from Layout.jsx

  Listing.propTypes = {
    mapOn: PropTypes.bool.isRequired
  };

  const [showSeeMore, setShowSeeMore] = useState(false);

  const saved = useLocation();
  
  const navigate = useNavigate();
  
  function handleSeeMoreClick() {
    setOffset(prevOffset => prevOffset + 20) // show the next 20 listing from Yelp API
    navigate('/Home');
  }
  
  const listingContainerRef = useRef(null); // Add ref to the scrollable div
  
  useEffect(() => {
    const listingContainer = listingContainerRef.current;
    
    const handleScroll = () => {
      if (
        listingContainer.scrollTop + listingContainer.clientHeight >=
        listingContainer.scrollHeight - 0.3 * listingContainer.scrollHeight
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
    // 1. deserialise the restaurant list from localStorage
    const beenToRestaurants = JSON.parse(localStorage.getItem('been-to'));
    
    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "endpoint": (`https://api.yelp.com/v3/businesses/search?term=${selectedCuisine}${priceLevel ? `&price=` + `${String(priceLevel)}` :''}&categories=${selectedCuisine}&sort_by=${sort}&radius=${radius}${location ? `&location=` + location + ' VIC Australia' : `&latitude=${coordinate.lat}&longitude=${coordinate.lng}` }&locale=en_AU&offset=${offset}&limit=20`),
          "id": `django-insecure-0ezwicnx+&u=g+d3e2&9-u!c9un559($jq7--dpd*8p-bshh4$`
      })
    }
    
    fetch(`https://proxy-server-amber-two.vercel.app/api/yelp/`, options)
      .then(response => response.json())
      .then(data => {
        // 2. Filter the data to remove the been-to restaurants, if there are any been-to restaurants
        const filteredNewListing = beenToRestaurants ?  (data.businesses?.filter((each) => {
          const isNotInBeenTo = !beenToRestaurants.some(been => been.id === each.id);
          return isNotInBeenTo;
        })) : data.businesses;

        setListing(prevListing => {
          // 3. Before pressing the see more button / been-to button, render the filtered list straighaway
          if (prevListing.length === 0) {
            return filteredNewListing;
          }

          // If see more button is pressed, new data (offset by 20) will need to be be checked against previous Listing
          // If been-to button is pressed, the same data (minus one been-to) will need to be checked against previous Listing
          const uniqueNewListing = filteredNewListing.filter((each) => {
            const isNotInPrevListing = !prevListing.some((prev) => prev.id == each.id)
            return isNotInPrevListing;
          });

          // If see more button is pressed, uniqueNewListing will be filled with new items to be appened to previous Listing
          if (uniqueNewListing.length > 0) {
            return prevListing.concat(uniqueNewListing);
          } else {
            // If been-to button is pressed, uniqueNewListing will be empty
            // if see more button was not pressed at all i.e offet = 0, we can return the filtered list straigtaway
            if (prevListing.length === 0) {
              return filteredNewListing;
            }
            // if see more button was pressed at least once i.e. offset > 20, we need to filter the previous List one more time
            return prevListing.filter((each) => {
              const isNotInBeenTo = !beenToRestaurants.some(been => been.id === each.id);
              return isNotInBeenTo;
            })
          }
        })
      setCoordinate({lat: data.region.center.latitude, lng: data.region.center.longitude});
      })
      .catch(err => console.error(err));
  }, [coordinate.lat, coordinate.lng, location, offset, priceLevel, radius, saved.state?.savedRestaurants, selectedCuisine, setCoordinate, sort]);

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
