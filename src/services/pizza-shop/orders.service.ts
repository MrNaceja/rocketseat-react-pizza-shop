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

type FetchOrderDetailsPayload = Pick<Order, 'orderId'>

type FetchOrderDetailsResult = Omit<
  Order,
  'orderId' | 'customerName' | 'total'
> & {
  id: Order['orderId']
  totalInCents: number
  customer: Pick<RestaurantManagerProfile, 'name' | 'phone' | 'email'>
  orderItems: Array<{
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }>
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

  async fetchOrderDetails({ orderId }: FetchOrderDetailsPayload) {
    const result = await api.get<FetchOrderDetailsResult>(`/orders/${orderId}`)
    return result.data
  },
}
