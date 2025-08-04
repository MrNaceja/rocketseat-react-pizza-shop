import { api } from '@/services/pizza-shop/api'

type FetchPaginatedOrdersResult = {
  orders: Order[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

type FetchPaginatedOrdersPayload = {
  pageIndex: number
}

export const OrdersService = {
  async fetchPaginatedOrders({ pageIndex }: FetchPaginatedOrdersPayload) {
    const result = await api.get<FetchPaginatedOrdersResult>('/orders', {
      params: {
        pageIndex,
      },
    })

    return result.data
  },
}
