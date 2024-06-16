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
    "Vegan": "#68C76F",
    "Cafe": "#995C00",
    "Desserts": "#D2691E",
    "Bakery": "#D2B48C",
    "Seafood": "#008080",
    "Malaysian": "#FF9E26",
    "Indonesian": "#6F4E37",
    "Italian": "#A52A2A",
    "Chinese": "#C83232",
    "Mexican": "#3498DB", 
    "Japanese": "#006400",
    "Indian": "#FF9900", 
    "French": "#800080", 
    "American": "#E32939", 
    "Greek": "#006400", 
    "Thai": "#4B0082", 
    "Spanish": "#8B4513",
    "Korean": "#DC143C",
    "Vietnamese": "#6B8E23",
    "MiddleEast": "#663399", 
    "Mediterranean": "#663399", 
    "Halal": "#786DE7",
    "Burger": "#660000",
    "FastFood": "#FF69B4",
    "Brazilian": "#FFCC00",
    "Turkish": "#006400",
    "Ethiopian": "#BA55D3",
    "Caribbean": "#8B0000",
    "Moroccan": "#800000",
    "European": "#F08080",
    "Australian": "#F08080", 
    "Bar": "#660000", 
    "Others": "#000000",
    "Unknown": "#8DA656"
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