import { useQuery } from '@tanstack/react-query'

import { RestaurantService } from '@/services/pizza-shop/restaurant.service'

export const MANAGER_PROFILE_QUERY_KEY = ['manager-profile']

export function useManagerProfile() {
  const { data: profile, ...managerProfileQuery } = useQuery({
    queryKey: MANAGER_PROFILE_QUERY_KEY,
    queryFn: RestaurantService.fetchManagerProfile,
    staleTime: Infinity,
  })

  return {
    profile,
    ...managerProfileQuery,
  }
}
