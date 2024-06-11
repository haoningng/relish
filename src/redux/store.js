import { configureStore } from '@reduxjs/toolkit';
import { apiSlice, } from './services/apiSlice';
import authReducer from './features/authSlice';
import restaurantReducer from './features/restaurantSlice';
import awardReducer from './features/awardSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
		award: awardReducer,
		restaurant: restaurantReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: import.meta.env.NODE_ENV !== 'production',
});