import { api } from '@/services/pizza-shop/api'

export type FetchAmountOrdersInMonth = {
  amount: number
  diffFromLastMonth: number
}
export type FetchAmountOrdersInDay = {
  amount: number
  diffFromYesterday: number
}

export type FetchTotalRevenueInMonth = {
  receipt: number
  diffFromLastMonth: number
}

export type FetchAmountCanceledInMonth = {
  amount: number
  diffFromLastMonth: number
}

export const MetricsService = {
  async fetchAmountOrdersInMonth() {
    const result = await api.get<FetchAmountOrdersInMonth>(
      '/metrics/month-orders-amount',
    )

    return result.data
  },
  async fetchAmountOrdersInDay() {
    const result = await api.get<FetchAmountOrdersInDay>(
      '/metrics/day-orders-amount',
    )

    return result.data
  },

  async fetchTotalRevenueInMonth() {
    const result = await api.get<FetchTotalRevenueInMonth>(
      '/metrics/month-receipt',
    )
    return result.data
  },
  async fetchAmountCanceledInMonth() {
    const result = await api.get<FetchAmountCanceledInMonth>(
      '/metrics/month-canceled-orders-amount',
    )
    return result.data
  },
}
