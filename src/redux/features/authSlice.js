// import { apiSlice } from '../services/apiSlice';
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
	isAuthenticated: false,
	isLoading: true,
	username: ''
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: state => {
			state.isAuthenticated = true
		},
		logout: state => {
			state.isAuthenticated = false
		},
		finishInitialLoad: state => {
			state.isLoading = false
		},
		setUsername: (state, action) => {
			state.username = action.payload
			console.log("Set username", state.username)
		},
	}
})

export const { setAuth, logout, finishInitialLoad, setTokens, setUsername } = authSlice.actions
export default authSlice.reducer