type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface Order {
  orderId: string
  createdAt: string
  status: OrderStatus
  customerName: string
  total: number
}
