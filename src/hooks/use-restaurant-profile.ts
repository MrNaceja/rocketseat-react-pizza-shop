import { useQuery } from '@tanstack/react-query'

import { RestaurantService } from '@/services/pizza-shop/restaurant.service'

export const RESTAURANT_PROFILE_QUERY_KEY = ['restaurant-profile']

export function useRestaurantProfile() {
  const { data: profile, ...restaurantProfileQuery } = useQuery({
    queryKey: RESTAURANT_PROFILE_QUERY_KEY,
    queryFn: RestaurantService.fetchRestaurantProfile,
    staleTime: Infinity,
  })

  return {
    profile,
    ...restaurantProfileQuery,
  }
}
