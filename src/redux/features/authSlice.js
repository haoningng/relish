// import { apiSlice } from '../services/apiSlice';
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
	isAuthenticated: false,
	isLoading: true,
	isMounted: false,
	user: ''
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
		setIsMounted: state => {
			state.isMounted = true
		},
		setUser: (state, action) => {
			state.user = action.payload
			console.log("SET_USER",state.user)
		}
	}
})

export const { setAuth, logout, finishInitialLoad, setTokens, setIsMounted, setUser } = authSlice.actions
export default authSlice.reducer