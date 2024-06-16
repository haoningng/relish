import { useEffect, useState, useRef }  from 'react';
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks"
import { PropTypes } from 'prop-types'
import CardsView from './CardsView';
import MapView from './MapView';
import SkeletonListing from "../components/SkeletonListing";

export default function Listing({ mapOn }) {
  const {
    lsLocationObj,
    filterObj,
    selectedCuisine,
    offset,
    setOffset,
    listing,
    setListing,
    loading,
    setLoading,
  } = useOutletContext(); //from Layout.jsx

  Listing.propTypes = {
    mapOn: PropTypes.bool.isRequired
  };

  const [showSeeMore, setShowSeeMore] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

  // Access visted list from Redux Store
  const { restaurantList } = useAppSelector((state) => state.restaurant);

  const saved = useLocation();
  
  const navigate = useNavigate();
  
  function handleSeeMoreClick() {
    setOffset(prevOffset => prevOffset + 20) // show the next 20 listing from Yelp API
    navigate('/');
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
    console.log(restaurantList.map(each => each.place_id))
    if (!listing) {
      setLoading(true);
    }

    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "endpoint": (`https://api.yelp.com/v3/businesses/search?term=${selectedCuisine}%20restaurants${filterObj.priceLevel ? `&price=${filterObj.priceLevel}` : ''}&categories=${selectedCuisine}${filterObj.sort ? `&sort_by=${filterObj.sort}` : ''}${filterObj.radius ? `&radius=${filterObj.radius}` : ''}${`&latitude=${parseFloat(lsLocationObj[0])}&longitude=${parseFloat(lsLocationObj[1])}`}&locale=en_AU&offset=${offset}&limit=20`),
          "id": `django-insecure-0ezwicnx+&u=g+d3e2&9-u!c9un559($jq7--dpd*8p-bshh4$`
      })
    }
    
    fetch(`https://proxy-server-amber-two.vercel.app/api/yelp/`, options)
      .then(response => {   
        if (response.status === 429) {
          // Handle rate limiting error
          throw new Error('Too many requests');
        }
        return response.json()
      })
      .then(data => {
        // 1. Filter the data to remove the been-to restaurants, if there are any been-to restaurants
        const filteredNewListing = restaurantList ?  (data.businesses?.filter((each) => {
          const isNotInBeenTo = !restaurantList?.some(been => been.place_id === each.id);
          return isNotInBeenTo;
        })) : data.businesses;

        setListing(prevListing => {
          // 2. Before pressing the see more button / been-to button, render the filtered list straighaway
          if (prevListing?.length === 0) {
            return filteredNewListing;
          }

          // If see more button is pressed, new data (offset by 20) will need to be be checked against previous Listing
          // If been-to button is pressed, the same data (minus one been-to) will need to be checked against previous Listing
          const uniqueNewListing = filteredNewListing?.filter((each) => {
            const isNotInPrevListing = !prevListing?.some((prev) => prev.id == each.id)
            return isNotInPrevListing;
          });

          // If see more button is pressed, uniqueNewListing will be filled with new items to be appened to previous Listing
          if (uniqueNewListing?.length > 0) {
            return prevListing.concat(uniqueNewListing);
          } else {
            // If been-to button is pressed, uniqueNewListing will be empty
            // if see more button was not pressed at all i.e offet = 0, we can return the filtered list straigtaway
            if (prevListing?.length === 0) {
              return filteredNewListing;
            }
            // if see more button was pressed at least once i.e. offset > 20, we need to filter the previous List one more time
            return prevListing?.filter((each) => {
              const isNotInBeenTo = !restaurantList?.some(been => been.place_id === each.id);
              return isNotInBeenTo;
            })
          }
        })
        setLoading(false);
      })
      .catch(err => {
        if (err.message === 'Too many requests') {
          console.error(err.message);
          setErrorCode(() => 429);
        } else {
          // Handle network errors or other exceptions
          console.error('Fetch Error:', err);
        }
        setLoading(false);
        });
  }, [restaurantList, saved.state?.restaurantList, filterObj.priceLevel, filterObj.radius, filterObj.sort, lsLocationObj, offset, selectedCuisine, setListing]);

  return ( errorCode == 429 ? 
  <p className='error-message'>
    <strong>You have reached the access limit for Yelp API</strong><br/>
    As this is currently a non-for-profit project, there is a daily rate limit of 300 call (Starter Plan) to Yelp Fusion API which powers this application.<br/>
    Please try again tomorrow when rate limit is reset (after midnight UTC).
  </p> :
    mapOn 
    ? <MapView listing={ listing }/> 
    : <div className="listing-container" ref={listingContainerRef}>
        {loading ? <SkeletonListing/> :
        <>
          <CardsView listing={ listing }/>
          <button className={`listing-see-more ${showSeeMore ? 'show' : ''}`} onClick={handleSeeMoreClick}>See More</button>
          <br/>
          <br/>
        </>}
      </div>
  );
}
