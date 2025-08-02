import { useQuery } from '@tanstack/react-query'

import { RestaurantService } from '@/services/pizza-shop/restaurant.service'

export function useRestaurantProfile() {
  const { data: profile, ...restaurantProfileQuery } = useQuery({
    queryKey: ['restaurant-profile'],
    queryFn: RestaurantService.fetchRestaurantProfile,
  })

  return {
    profile,
    ...restaurantProfileQuery,
  }
}
