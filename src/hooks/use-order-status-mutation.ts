import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  type FetchPaginatedOrdersResult,
  OrdersService,
} from '@/services/pizza-shop/orders.service'

export function useOrderStatusMutation() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: OrdersService.updateOrderStatus,
    onSuccess(_, { orderId, status }) {
      const paginatedOrdersCached =
        queryClient.getQueriesData<FetchPaginatedOrdersResult>({
          queryKey: ['paginated-orders'],
        })

      if (paginatedOrdersCached) {
        paginatedOrdersCached.forEach(
          ([paginatedOrdersCacheKey, paginatedOrdersCacheData]) => {
            if (paginatedOrdersCacheData) {
              queryClient.setQueryData(paginatedOrdersCacheKey, {
                ...paginatedOrdersCacheData,
                orders: paginatedOrdersCacheData.orders.map((orderCached) => ({
                  ...orderCached,
                  status:
                    orderCached.orderId === orderId
                      ? status
                      : orderCached.status,
                })),
              })
            }
          },
        )
      }
    },
  })

  return mutation
}
