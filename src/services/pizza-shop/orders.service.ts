import { api } from '@/services/pizza-shop/api'

type FetchPaginatedOrdersResult = {
  orders: Order[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export const OrdersService = {
  async fetchPaginatedOrders() {
    const result = await api.get<FetchPaginatedOrdersResult>('/orders', {
      params: {
        pageIndex: 0,
      },
    })

    return result.data
  },
}
