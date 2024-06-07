import { Outlet } from "react-router-dom"
import { useState } from "react"
import Footer from "./Footer"

export default function Layout() {
  // default to Melbourne coordinate
  const [locationObj, setLocationObj] = useState({
    coordinate: {
      lat: -38.1828007,
      lng: 144.458746,
    },
    placeName: 'Melbourne CBD', // placeName to be shown as link on top left corner home page
  })

  const [filterObj, setFilterObj] = useState({
    priceLevel: null,
    radius: 4000,
    sort: 'best_match'
  })

  const [selectedCuisine, setSelectedCuisine] = useState(''); // selected cuisine option
  const [selectedRestaurant, setSelectedRestaurant] = useState('') // selected restaurant's details to be shown on Restaurant page
  const [offset, setOffset] = useState(0) // offset parameter to be used in Yelp Api Business Search
  const [listing, setListing] = useState([]) // listing after filtering out 'been to' and appending the new ones

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
  
  return (
    <div className="site-wrapper">
      <main>
        <Outlet 
          context={{
            locationObj,
            setLocationObj,
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
            setListing
          }} />
      </main>
      <Footer/>
    </div>
  )
}
