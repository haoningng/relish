import { apiSlice } from '../services/apiSlice';


const rstaurantApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		restaurantCreateOrDelete: builder.mutation({
			query: ({ place_id, obj, cuisine_type, has_been }) => ({
				url: '/restaurant-create/',
				method: 'POST',
				body: { place_id, obj, cuisine_type, has_been },
			}),
		}),
		getRestaurantList: builder.mutation({
			query: () => ({
				url: '/restaurant-list/',
				method: 'POST',
			}),
		}),
	}),
});

export const {
	useRestaurantCreateOrDeleteMutation,
	useGetRestaurantListMutation,
} = rstaurantApiSlice;