import { useMemo } from 'react';
import { getCuisineType } from '../foods/food_to_cuisine';
import { PropTypes } from 'prop-types'

export default function CuisineTag({ restaurant, page}) {

  CuisineTag.propTypes = {
    restaurant: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    page: PropTypes.object,
    rest: PropTypes.object
  };

  const colorMatch = {
    "Breakfast": "#BF270C",
    "Vegan": "#4CB654",
    "Cafe": "#995C00",
    "Desserts": "#D2691E",
    "Bakery": "#C19C6A",
    "Seafood": "#008080",
    "Malaysian": "#FF9E26",
    "Indonesian": "#6F4E37",
    "Italian": "#A32121",
    "Chinese": "#C83232",
    "Mexican": "#3498DB", 
    "Japanese": "#DC6868",
    "Indian": "#DE8500", 
    "French": "#A235B4", 
    "American": "#E32939", 
    "Greek": "#006400", 
    "Thai": "#4B0082", 
    "Spanish": "#8B4513",
    "Korean": "#E43996",
    "Vietnamese": "#6B8E23",
    "MiddleEast": "#663399", 
    "Mediterranean": "#A365E1", 
    "Halal": "#786DE7",
    "Burger": "#994024",
    "FastFood": "#FF69B4",
    "Brazilian": "#FFCC00",
    "Turkish": "#288E8E",
    "Ethiopian": "#BA55D3",
    "Caribbean": "#8B0000",
    "Moroccan": "#800000",
    "European": "#326AFB",
    "Australian": "#F08080", 
    "Bar": "#660000", 
    "Others": "#343434",
    "Unknown": "#666666"
  }
  const cuisineType = useMemo(() => {
    if (typeof restaurant === 'object' && Object.prototype.hasOwnProperty.call(restaurant, 'categories')) {
      return getCuisineType(restaurant);
    } else {
      console.log(getCuisineType(restaurant))  
      return 'Unknown';
    }
  }, [restaurant]);

  return (
    cuisineType !== 'Unknown' && ( // Only render if cuisineType is valid
      <div 
        className={`${page.name}-cuisine-tag`} 
        style={{ backgroundColor: colorMatch[cuisineType] }}
      >
        {cuisineType}
      </div>
    )
  );

}