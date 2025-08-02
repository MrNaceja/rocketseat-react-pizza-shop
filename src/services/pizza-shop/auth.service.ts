import { isAxiosError } from 'axios'

import { api } from '@/services/pizza-shop/api'

class UnauthorizedError extends Error {
  constructor() {
    super('Usuário não autorizado!')
    this.name = 'UnauthorizedError'
  }
}

type SignInPayload = {
  email: string
}
export const AuthService = {
  async signIn({ email }: SignInPayload) {
    try {
      await api.post('/authenticate', { email })
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.response?.data.code === 'UNAUTHORIZED') {
          throw new UnauthorizedError()
        }
      }
      throw e
    }
  },
  async signUp() {},
}
