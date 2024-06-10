import { useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';

export default function BeenToButton({ page }) {
  BeenToButton.propTypes = {
    page: PropTypes.object.isRequired,
  };

  const navigate = useNavigate();

  function handleBeenToClick(restaurant) {
    try {  
      // 1. Retrieve and Update
      const savedRestaurants = JSON.parse(localStorage.getItem("been-to")) || [];
      savedRestaurants.push(restaurant);

      // 2. Serialise the array for Storage
      const serializedData = JSON.stringify(savedRestaurants);
  
      // 3. Store in localStorage
      localStorage.setItem("been-to", serializedData);
  
      console.log("Restaurant saved to localStorage!");
      navigate('/', { state: { savedRestaurants }})
  
    } catch (error) {
      console.error("Error saving restaurant to localStorage:", error);
      // Handle the error (e.g., display an error message to the user)
    }
  }

  return (
    // <img onClick={() => handleBeenToClick(page.restaurant)} className={`${page.name}-been-to-button`} src={`/tomato-slice.png`} alt={`Relish icon`} width='20px' height='20px'/>
    <span
      onClick={() => handleBeenToClick(page.restaurant)}
      className={`material-symbols-outlined ${page.name}-been-to-button`}
      width='20px'
      height='20px'
    >
      add_location
    </span>
  )
}