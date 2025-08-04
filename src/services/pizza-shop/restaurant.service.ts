import { api } from '@/services/pizza-shop/api'

type FetchManagerProfileResult = RestaurantManagerProfile

type FetchRestaurantProfileResult = RestaurantProfile

type UpdateRestaurantProfilePayload = {
  name: string
  description?: string
}

export const RestaurantService = {
  async fetchManagerProfile() {
    const result = await api.get<FetchManagerProfileResult>('/me')
    return result.data
  },
  async fetchRestaurantProfile() {
    const result = await api.get<FetchRestaurantProfileResult>(
      '/managed-restaurant',
    )
    return result.data
  },

  async updateRestaurantProfile({
    name,
    description,
  }: UpdateRestaurantProfilePayload) {
    await api.put('/profile', { name, description })
  },
}
