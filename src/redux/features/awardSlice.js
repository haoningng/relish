// import { apiSlice } from '../services/apiSlice';
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
	isLoading: false,
	awardList: []
}

const awardSlice = createSlice({
	name: 'awards',
	initialState,
	reducers: {
		setIsLoadingFalse: state => {
			state.isLoading = false
		},
		setIsLoadingTrue: state => {
			state.isLoading = true
		},

		setAwards: (state, action) => {
			state.awardList = action.payload
			console.log("SET:", state.awardList)
		},
	}
})

export const { setIsLoadingFalse, setIsLoadingTrue, setAwards} = awardSlice.actions
export default awardSlice.reducer