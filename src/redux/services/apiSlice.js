import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAuth, logout, setIsThrottledFalse, throttledErrorHandler } from '../features/authSlice';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_PUBLIC_HOST}/api`,
	credentials: 'include',
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);
	console.log("TEST", result)
	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQuery(
					{
						url: '/jwt/refresh/',
						method: 'POST'
					},
					api,
					extraOptions
				);
				if (refreshResult.data) {
					api.dispatch(setAuth());
					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	if (result.error && result.error.status === 429) {
		api.dispatch(throttledErrorHandler(result.error.data.detail))

	}
	if (result?.data) {
		api.dispatch(setIsThrottledFalse())
	}
	return result;
};

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({}),
});