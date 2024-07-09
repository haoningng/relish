import { createSlice } from "@reduxjs/toolkit"


const initialState = {
	isAuthenticated: false,
	isLoading: true,
	isMounted: false,
	isThrottled: false,
	user: '',
	time: 0 //# seconds
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
		},
		setIsThrottledFalse: (state) => {
			state.isThrottled = false
		},
		throttledErrorHandler: (state, action) => {
			const time = Number(action.payload.replace(/[^0-9]/g, ""))
			state.time = time
			state.isThrottled = true
		}
	}
})

export const { setAuth, logout, finishInitialLoad, setTokens, setIsMounted, setUser, setIsThrottledFalse, throttledErrorHandler } = authSlice.actions
export default authSlice.reducer