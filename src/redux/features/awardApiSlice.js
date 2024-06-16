import { apiSlice } from '../services/apiSlice';

export const awardApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAwardList: builder.mutation({
			query: () => ({
				url: '/award-list/',
				method: 'POST',
			}),
		}),
	}),
});

export const {
	useGetAwardListMutation,
} = awardApiSlice;
