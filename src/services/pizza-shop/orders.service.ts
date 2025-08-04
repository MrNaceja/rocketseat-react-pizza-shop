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
  customerName?: string | null
  orderId?: string | null
  status: OrderStatus | 'any'
}

export const OrdersService = {
  async fetchPaginatedOrders({
    pageIndex,
    customerName,
    orderId,
    status,
  }: FetchPaginatedOrdersPayload) {
    const result = await api.get<FetchPaginatedOrdersResult>('/orders', {
      params: {
        pageIndex,
        customerName,
        orderId,
        status: status === 'any' ? null : status,
      },
    })

    return result.data
  },
}
