import { Outlet } from "react-router-dom"
import { useState } from "react"
import Footer from "./Footer"

export default function Layout() {
  // default to Melbourne coordinate
  const [coordinate, setCoordinate] = useState({
    lat: -38.1828007,
    lng: 144.458746,
  }); // search location coordinate when available
  const [location, setLocation] = useState('') // location query when user pressed enter OR when coordinate is not available
  const [placeName, setPlaceName] = useState('') // placeName to be shown as link on top left corner home page
  const [priceLevel, setPriceLevel] = useState(null) // price level filter
  const [radius, setRadius] = useState(4000) // distance filter in meters
  const [sort, setSort] = useState('best_match') // sort by filter
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
  const [selectedCuisine, setSelectedCuisine] = useState(''); // selected cuisine option
  const [selectedRestaurant, setSelectedRestaurant] = useState('') // selected restaurant's details to be shown on Restaurant page
  const [offset, setOffset] = useState(0) // offset parameter to be used in Yelp Api Business Search
  const [listing, setListing] = useState([]) // listing after filtering out 'been to' and appending the new ones
  return (
    <div className="site-wrapper">
      <main>
        <Outlet 
          context={{
            coordinate,
            setCoordinate,
            location,
            setLocation,
            placeName,
            setPlaceName,
            priceLevel,
            setPriceLevel,
            radius,
            setRadius,
            sort,
            setSort,
            cuisineList,
            selectedCuisine,
            setSelectedCuisine,
            selectedRestaurant,
            setSelectedRestaurant,
            offset,
            setOffset,
            listing,
            setListing
          }} />
      </main>
      <Footer/>
    </div>
  )
}
