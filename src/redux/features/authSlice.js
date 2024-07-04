import { createSlice } from "@reduxjs/toolkit"


const initialState = {
	isAuthenticated: false,
	isLoading: true,
	isMounted: false,
	isThrottled: false,
	user: '',
	time:0 //# seconds
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
		setIsThrottled: (state, action) => {
			state.isThrottled = action.payload
			console.log('SET_ISTH:', state.isThrottled)
		},
		setTime: (state, action) => {
			state.time = action.payload
			console.log('SET_TIME:', state.time)
		},
	}
})

export const { setAuth, logout, finishInitialLoad, setTokens, setIsMounted, setUser, setIsThrottled, setTime } = authSlice.actions
export default authSlice.reducer