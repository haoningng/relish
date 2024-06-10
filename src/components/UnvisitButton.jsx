import { useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';

export default function UnvisitButton({ page }) {
  UnvisitButton.propTypes = {
    page: PropTypes.object.isRequired,
  };

  const navigate = useNavigate();

  function handleUnvisitClick(restaurant) {
    try {  
      // 1. Retrieve and Update
      const savedRestaurants = JSON.parse(localStorage.getItem("been-to")) || [];
      
      const filteredRestaurants = savedRestaurants?.filter((each) => {
        return each.id != restaurant.id
      });

      // 2. Serialise the array for Storage
      const serializedData = JSON.stringify(filteredRestaurants);
  
      // 3. Store in localStorage
      localStorage.setItem("been-to", serializedData);
  
      console.log("Restaurant removed from localStorage!");
      navigate('/profile', { state: { filteredRestaurants }})
  
    } catch (error) {
      console.error("Error saving restaurant to localStorage:", error);
      // Handle the error (e.g., display an error message to the user)
    }
  }

  return (
    <span onClick={() => handleUnvisitClick(page.restaurant)} className={`material-symbols-outlined ${page.name}-unvisit-button`} width='20px' height='20px'>delete</span>
  )
}