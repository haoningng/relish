import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import { useRestaurantCreateOrDeleteMutation } from '../redux/features/restaurantApiSlice';
import { useGetAwardListMutation } from '../redux/features/awardApiSlice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setRestaurants, deleteRestaurant } from '../redux/features/restaurantSlice';
import { setAwards } from '../redux/features/awardSlice';
import { getCuisineType } from '../foods/food_to_cuisine';
import { toast } from 'react-toastify';
import CustomSpinner from './common/CustomSpinner';
import { PropTypes } from 'prop-types';

export default function BeenToButton({ page }) {
  const {
    setCelebrating
  } = useOutletContext(); //from Layout.jsx

  BeenToButton.propTypes = {
    page: PropTypes.object.isRequired,
  };
  
  const navigate = useNavigate();
  const [RestaurantsCreate] = useRestaurantCreateOrDeleteMutation();
  const [getAwardList] = useGetAwardListMutation()
  const [buttonLoading, setButtonLoading] = useState(false)

  const { awardList } = useAppSelector((state) => state.award);
  // 1. Retrieve and Update
	const { restaurantList } = useAppSelector((state) => state.restaurant);
  // check if user is authenticated
  const { isAuthenticated } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setButtonLoading(false);
  }, [setButtonLoading])

  function handleMilestone() {
    const milestones = [25, 50, 75, 100];
    console.log(restaurantList?.length)
    console.log(restaurantList?.length + 1)
    if (milestones.includes(restaurantList?.length + 1)) {
      toast.success(`Congratulations for having visited ${restaurantList?.length + 1} restaurants!`)
      setCelebrating(true);
    }
  }

  function handleAwardList() {
    getAwardList()
			.unwrap()
			.then((res) => {
        console.log("GET AWARDS", res)
				dispatch(setAwards(res))
        const oldAwdList = awardList.filter(each => each?.user ? true : false)
        const newAwdList = res.filter(each => each?.user ? true : false)
        const oddOneOut = newAwdList.filter(newAwdItem => {
          return !oldAwdList.some(oldAwdItem => oldAwdItem.id === newAwdItem.id); 
        });
        if (oddOneOut.length) {
          toast.success('Congratulation for unlocking a new award! Check it out in your profile page');
          setCelebrating(true);
        }
			})
			.catch((e) => {
				console.log("ERROR:", e)
				const firstErrorMsg = Object.values(e.data)[0]
				console.log(firstErrorMsg)
			});
  }
  
  function handleBeenToClick(restaurant) {
    const cuisineType = getCuisineType(restaurant);
    console.log(`${restaurant.name} is classified as ${cuisineType}`);
    setButtonLoading(true);
    // 2. Store in database
    RestaurantsCreate({ place_id: restaurant.id, obj: restaurant, cuisine_type: cuisineType, has_been: true })
    .unwrap()
    .then((res) => {
      if (res) {
        console.log(awardList);
        // 3. if successful, append it to Redux store (global state)
        dispatch(setRestaurants(res))
        toast.success(`${restaurant.name} is marked as visited!\n You can view it in your profile page.`);
        setButtonLoading(false);
        handleAwardList();
        handleMilestone();
        navigate('/', { state: { restaurantList }})
      } else {
        // 4. if already in Redux store, remove it from Redux store.
        dispatch(deleteRestaurant(restaurant.id))
        toast.success(`${restaurant.name} is removed from the previously visited list!`);
        setButtonLoading(false);
        handleAwardList();
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
      {buttonLoading ? <CustomSpinner size={page.name === 'restaurant' ? 'md' : 'sm'} />
      : page.visited ? `cancel` : `where_to_vote`}
    </button>
    
  )
}