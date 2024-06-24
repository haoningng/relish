import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRestaurantCreateOrDeleteMutation } from '../redux/features/restaurantApiSlice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setRestaurants, deleteRestaurant } from '../redux/features/restaurantSlice';
import { getCuisineType } from '../foods/food_to_cuisine';
import { toast } from 'react-toastify';
import Spinner from "./common/Spinner";
import { PropTypes } from 'prop-types';

export default function BeenToButton({ page }) {

  BeenToButton.propTypes = {
    page: PropTypes.object.isRequired,
  };
  
  const navigate = useNavigate();
  const [RestaurantsCreate] = useRestaurantCreateOrDeleteMutation();
  const [buttonLoading, setButtonLoading] = useState(false)

  // 1. Retrieve and Update
	const { restaurantList } = useAppSelector((state) => state.restaurant);
  // check if user is authenticated
  const { isAuthenticated } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setButtonLoading(false);
  }, [setButtonLoading])


  function handleBeenToClick(restaurant) {
    const cuisineType = getCuisineType(restaurant);
    console.log(`${restaurant.name} is classified as ${cuisineType}`);
    setButtonLoading(true);
    // 2. Store in database
    RestaurantsCreate({ place_id: restaurant.id, obj: restaurant, cuisine_type: cuisineType, has_been: true })
    .unwrap()
    .then((res) => {
      if (res) {
        // 3. if successful, append it to Redux store (global state)
        dispatch(setRestaurants(res))
        toast.success(`${restaurant.name} is marked as visited!\n You can view it in your profile page.`);
        setButtonLoading(false);
        navigate('/', { state: { restaurantList }})
      } else {
        // 4. if already in Redux store, remove it from Redux store.
        dispatch(deleteRestaurant(restaurant.id))
        toast.success(`${restaurant.name} is removed from the previously visited list!`);
        setButtonLoading(false);
        navigate('/profile')
      }
    })
    .catch((e) => {
      console.log("ERROR:", e)
      const firstErrorMsg = Object.values(e.data)[0]
      toast.error('Failed to mark restaurant as visited.' + '\n' + firstErrorMsg);
    });
  }

  return (
    <button
      onClick={() => {
        return isAuthenticated ? 
        handleBeenToClick(page.restaurant)
        : toast.error('Log in to mark a restaurant as visited');
      }}
      className={`material-symbols-outlined ${page.name}-been-to-button`}
    >
      {buttonLoading ? <Spinner size={page.name === 'restaurant' ? 'lg' : 'md'} />
      : page.visited ? `cancel` : `where_to_vote`}
    </button>
    
  )
}