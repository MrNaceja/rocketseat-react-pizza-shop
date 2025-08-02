import axios, { AxiosError } from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_PIZZA_SHOP_API_URL,
})

type PizzaShopApiError = {
  code: 'UNAUTHORIZED' | string
  message: string
}

export class PizzaShopServiceError extends Error {
  public status: number = 500
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) =>
    Promise.reject(
      new PizzaShopServiceError(
        (error.response?.data as PizzaShopApiError).message || error.message,
        error.status || 500,
      ),
    ),
)
