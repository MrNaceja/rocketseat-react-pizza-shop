import { api, PizzaShopServiceError } from '@/services/pizza-shop/api'

export type SignInPayload = {
  email: string
}

export type SignUpPayload = {
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
  async signOut() {
    await api.post('/sign-out')
  },

  withUnauthorizedInterceptor(
    interceptor: (error: PizzaShopServiceError) => void,
  ) {
    const unauthorizedRequestInterceptorId = api.interceptors.response.use(
      (res) => res,
      (error: PizzaShopServiceError) => {
        if (error.status === 401) {
          interceptor(error)
        }
        return error
      },
    )

    return () =>
      api.interceptors.response.eject(unauthorizedRequestInterceptorId)
  },
}
