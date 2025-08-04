import { api } from '@/services/pizza-shop/api'

export type FetchPaginatedOrdersResult = {
  orders: Order[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export type FetchPaginatedOrdersPayload = {
  pageIndex: number
  customerName?: string | null
  orderId?: string | null
  status: OrderStatus | 'any'
}

export type FetchOrderDetailsPayload = Pick<Order, 'orderId'>

export type FetchOrderDetailsResult = Omit<
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

export type UpdateOrderStatusPayload = {
  orderId: Order['orderId']
  status: Exclude<OrderStatus, 'pending'>
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

  async updateOrderStatus({ orderId, status }: UpdateOrderStatusPayload) {
    const updateOrderStatusEndpointMap: Record<
      UpdateOrderStatusPayload['status'],
      string
    > = {
      canceled: 'cancel',
      processing: 'approve',
      delivered: 'deliver',
      delivering: 'dispatch',
    }
    await api.patch(
      `/orders/${orderId}/${updateOrderStatusEndpointMap[status]}`,
    )
  },
}
