// import { apiSlice } from '../services/apiSlice';
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
	isAuthenticated: false,
	isLoading: true,
	isMounted: false
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: state => {
			state.isAuthenticated = true
			console.log("AUTH is SET",state.isAuthenticated)
		},
		logout: state => {
			state.isAuthenticated = false
		},
		finishInitialLoad: state => {
			state.isLoading = false
		},
		setIsMounted : state => {
			state.isMounted = true
			console.log("SET_IS_MOUNTED", state.isMounted)
		}
	}
})

export const { setAuth, logout, finishInitialLoad, setTokens, setIsMounted } = authSlice.actions
export default authSlice.reducer