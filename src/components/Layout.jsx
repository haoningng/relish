import { Outlet, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useGetRestaurantListMutation } from "../redux/features/restaurantApiSlice";
import { useAppDispatch } from "../redux/hooks"
import { setRestaurants } from "../redux/features/restaurantSlice";
import useLocalStorageState from 'use-local-storage-state'
import Footer from "./Footer"

export default function Layout() {
  const [lsLocationObj, setLsLocationObj] = useLocalStorageState('locationObj', {
    // default to Melbourne coordinate
    defaultValue: ['-37.8136', '144.9631', 'Melbourne CBD']
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

	const [getRestaurantList] = useGetRestaurantListMutation()
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
    // 'ComfortFood', --removed due to no results found
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

  return (
    <div className="site-wrapper">
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
          }} />
      </main>
      <Footer/>
    </div>
  )
}
