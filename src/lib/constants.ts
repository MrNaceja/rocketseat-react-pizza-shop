export const OrderStatusEnum = {
  pending: 'pending',
  delivered: 'delivered',
  delivering: 'delivering',
  canceled: 'canceled',
  processing: 'processing',
} as const

export const ORDER_STATUS: OrderStatus[] = [
  OrderStatusEnum.canceled,
  OrderStatusEnum.delivered,
  OrderStatusEnum.delivering,
  OrderStatusEnum.pending,
  OrderStatusEnum.processing,
]

export const ORDER_STATUS_CAN_CANCEL: OrderStatus[] = [
  OrderStatusEnum.pending,
  OrderStatusEnum.processing,
]
