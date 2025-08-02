import { api } from '@/services/pizza-shop/api'

type SignInPayload = {
  email: string
}

type SignUpPayload = {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export const AuthService = {
  async signIn({ email }: SignInPayload) {
    await api.post('/authenticate', { email })
  },
  async signUp({ restaurantName, managerName, email, phone }: SignUpPayload) {
    await api.post('/restaurants', {
      restaurantName,
      managerName,
      email,
      phone,
    })
  },
}
