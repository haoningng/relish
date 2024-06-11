// import { apiSlice } from '../services/apiSlice';
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	isLoading: false,
	restaurantList: []
}

const restaurantSlice = createSlice({
	name: 'restaurant',
	initialState,
	reducers: {
		setIsLoadingFalse: state => {
			state.isLoading = false
		},
		setIsLoadingTrue: state => {
			state.isLoading = true
		},
		setRestaurants: (state, action) => {
			if (Array.isArray(action.payload)) {
				state.restaurantList = action.payload
			} else {
				state.restaurantList = [...state.restaurantList, action.payload];
			}
			console.log("restaurant is set", state.restaurantList)
		},
		deleteRestaurant: (state, action) => {
			console.log("action", action.payload)
      const place_id = action.payload;
			// const place_id = action.payload;
      const updatedList = state.restaurantList.filter(obj => obj.place_id !== place_id);
      state.restaurantList = updatedList;
			console.log( state.restaurantList)
    },

	}
})

export const { setIsLoadingFalse, setIsLoadingTrue, setRestaurants, deleteRestaurant } = restaurantSlice.actions
export default restaurantSlice.reducer