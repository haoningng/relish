import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { useGetRestaurantListMutation } from "../redux/features/restaurantApiSlice";
import { useGetAwardListMutation } from "../redux/features/awardApiSlice";
import { useAppDispatch } from "../redux/hooks"
import { setRestaurants } from "../redux/features/restaurantSlice";
import { setAwards } from "../redux/features/awardSlice";
import useLocalStorageState from 'use-local-storage-state'
import Footer from "./Footer"
import { useSwipeable } from 'react-swipeable';

export default function Layout() {
  const [lsLocationObj, setLsLocationObj] = useLocalStorageState('locationObj', {
    // default to Melbourne coordinate
    defaultValue: ['-37.8136', '144.9631', 'Melbourne CBD']
  })

  const [isFirstTime, setIsFirstTime] = useLocalStorageState('isFirstTime', {
    // default to Melbourne coordinate
    defaultValue: {
      location: true,
      quiz: true,
      home: true,
      profile: true
    }
  })

  const [filterObj, setFilterObj] = useState({
    priceLevel: 0,
    radius: 0,
    sort: 0
  })

  const [selectedCuisine, setSelectedCuisine] = useState(''); // selected cuisine option
  const [selectedRestaurant, setSelectedRestaurant] = useState('') // selected restaurant's details to be shown on Restaurant page
  const [offset, setOffset] = useState(0) // offset parameter to be used in Yelp Api Business Search
  const [listing, setListing] = useState([]) // listing after filtering out 'been to' and appending the new ones

  const [loading, setLoading] = useState(true); // if true, home page will render skeleton animation until yelp api is fetched

  const [celebrating, setCelebrating] = useState(false);

	const [getRestaurantList] = useGetRestaurantListMutation()
  const [getAwardList] = useGetAwardListMutation()
	const dispatch = useAppDispatch()

	function handleRestaurantList() {
		getRestaurantList()
			.unwrap()
			.then((res) => {
				console.log("GET REST", res)
				dispatch(setRestaurants(res))
			})
			.catch((e) => {
				console.log("ERROR:", e)
				const firstErrorMsg = Object.values(e.data)[0]
				console.log(firstErrorMsg)
			});
	}

  function handleAwardList() {
		getAwardList()
			.unwrap()
			.then((res) => {
        console.log("GET AWARDS", res)
				dispatch(setAwards(res))
			})
			.catch((e) => {
				console.log("ERROR:", e)
				const firstErrorMsg = Object.values(e.data)[0]
				console.log(firstErrorMsg)
			});
	}

  const location = useLocation(); // Get the current route

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      // Determine the next route based on the current location.pathname
      if (location.pathname === '/') {
        const targetElement = eventData.event.target;
        const isInsideScrollableArea = targetElement.closest('.home-cuisine-container'); // ignore the cuisine container
        const isInsideMapView = targetElement.closest('.mapview-container'); // ignore the mapview
        
        if (!isInsideScrollableArea && !isInsideMapView) {
          navigate('/profile');
        }
      } else if (location.pathname === '/location') {
        navigate('/');
      } 
    },
    onSwipedRight: (eventData) => {
      if (location.pathname === '/profile') {
        const targetElement = eventData.event.target;
        const isInsideScrollableArea = targetElement.closest('.profile-visited-scrollable'); // ignore the visited container
        const isInsideMapView = targetElement.closest('.mapview-container'); // ignore the mapview
        
        if (!isInsideScrollableArea && !isInsideMapView) {
          navigate('/');
        }
      } else if (location.pathname === '/') {
        const targetElement = eventData.event.target;
        const isInsideScrollableArea = targetElement.closest('.home-cuisine-container'); // ignore the cuisine container
        const isInsideMapView = targetElement.closest('.mapview-container'); // ignore the mapview
        
        if (!isInsideScrollableArea && !isInsideMapView) {
          navigate('/location');
        }
      }
    },
    swipeDuration: 500,
    preventScrollOnSwipe: false,
    trackMouse: true
  });
  
  const cuisineList = [
    'Japanese',
    'Mexican',
    'Indian',
    'Chinese',
    'Italian',
    'Thai',
    'Vegan',
    'Pizza',
    'FastFood',
    'Burgers',
    'Desserts',
    'Asian',
    'Halal', 
    'Chicken',
    'Breakfast',
    'Sandwich',
    'Bakery',
    'American',
    'Seafood',
    'Salad'
    ] // cuisine options

  // if locationObj is not initialised in localStorage
  const navigate = useNavigate();
  useEffect(() => {
    if (lsLocationObj[0] === 'undefined' || !lsLocationObj) {
      setLsLocationObj(() => (
        [`-37.8136`, `144.9631`, 'Melbourne CBD']
      ));
      navigate('/location');
    }
  }, [lsLocationObj, navigate])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      return handleRestaurantList()
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      return handleAwardList()
    }
  }, [])

  return (
      <div className="site-wrapper" {...handlers}>
        <main>
          <Outlet 
            context={{
              lsLocationObj,
              setLsLocationObj,
              filterObj,
              setFilterObj,
              cuisineList,
              selectedCuisine,
              setSelectedCuisine,
              selectedRestaurant,
              setSelectedRestaurant,
              offset,
              setOffset,
              listing,
              setListing,
              loading,
              setLoading,
              isFirstTime,
              setIsFirstTime,
              celebrating,
              setCelebrating,
            }} />
        </main>
        <Footer isFirstTime={isFirstTime}/>
      </div>
  )
}
