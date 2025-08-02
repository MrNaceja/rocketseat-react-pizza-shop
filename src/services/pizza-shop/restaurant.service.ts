import { api } from '@/services/pizza-shop/api'

type FetchManagerProfileResult = {
  name: string
  id: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

type FetchRestaurantProfileResult = {
  name: string
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
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
}
