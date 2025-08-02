import { useQuery } from '@tanstack/react-query'

import { RestaurantService } from '@/services/pizza-shop/restaurant.service'

export function useManagerProfile() {
  const { data: profile, ...managerProfileQuery } = useQuery({
    queryKey: ['manager-profile'],
    queryFn: RestaurantService.fetchManagerProfile,
  })

  return {
    profile,
    ...managerProfileQuery,
  }
}
