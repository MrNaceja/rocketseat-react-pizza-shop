import type { DateRange } from 'react-day-picker'

import { api } from '@/services/pizza-shop/api'

export type FetchAmountOrdersInMonthResult = {
  amount: number
  diffFromLastMonth: number
}
export type FetchAmountOrdersInDayResult = {
  amount: number
  diffFromYesterday: number
}

export type FetchTotalRevenueInMonthResult = {
  receipt: number
  diffFromLastMonth: number
}

export type FetchAmountCanceledInMonthResult = {
  amount: number
  diffFromLastMonth: number
}

export type FetchPopularProductsResult = {
  product: string | null
  amount: number
}[]

export type FetchDailyRevenueInPeriodResult = {
  date: string
  receipt: number
}[]

export type FetchDailyRevenueInPeriodPayload = Partial<DateRange>

export const MetricsService = {
  async fetchAmountOrdersInMonth() {
    const result = await api.get<FetchAmountOrdersInMonthResult>(
      '/metrics/month-orders-amount',
    )

    return result.data
  },
  async fetchAmountOrdersInDay() {
    const result = await api.get<FetchAmountOrdersInDayResult>(
      '/metrics/day-orders-amount',
    )

    return result.data
  },

  async fetchTotalRevenueInMonth() {
    const result = await api.get<FetchTotalRevenueInMonthResult>(
      '/metrics/month-receipt',
    )
    return result.data
  },
  async fetchAmountCanceledInMonth() {
    const result = await api.get<FetchAmountCanceledInMonthResult>(
      '/metrics/month-canceled-orders-amount',
    )
    return result.data
  },

  async fetchPopularProducts() {
    const result = await api.get<FetchPopularProductsResult>(
      '/metrics/popular-products',
    )

    return result.data
  },

  async fetchDailyRevenueInPeriod({
    from,
    to,
  }: FetchDailyRevenueInPeriodPayload) {
    const result = await api.get<FetchDailyRevenueInPeriodResult>(
      '/metrics/daily-receipt-in-period',
      {
        params: {
          from,
          to,
        },
      },
    )

    return result.data
  },
}
