import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, Search, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/button'
import { TableCell, TableRow } from '@/components/table'
import { ORDER_STATUS_CAN_CANCEL, OrderStatusEnum } from '@/lib/constants'
import { Formatters } from '@/lib/formatters'
import { OrderDetailsDialog } from '@/pages/app/orders/components/order-details-dialog'
import { OrderStatusTag } from '@/pages/app/orders/components/order-status-tag'
import {
  type FetchPaginatedOrdersResult,
  OrdersService,
} from '@/services/pizza-shop/orders.service'

interface OrdersTableRowProps {
  order: Order
}
export function OrdersTableRow({ order }: OrdersTableRowProps) {
  const queryClient = useQueryClient()
  const [isDetailsDialogOpened, setIsDetailsDialogOpened] = useState(false)

  const isStatusCanCancel = ORDER_STATUS_CAN_CANCEL.includes(order.status)

  const cancelOrderMutation = useMutation({
    mutationFn: OrdersService.cancelOrder,
    onSuccess() {
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
                    orderCached.orderId === order.orderId
                      ? OrderStatusEnum.canceled
                      : order.status,
                })),
              })
            }
          },
        )
      }
    },
  })

  const handleCancelOrder = useCallback(() => {
    toast.promise(cancelOrderMutation.mutateAsync({ orderId: order.orderId }), {
      loading: 'Cancelando pedido...',
      success: 'Pedido cancelado com sucesso!',
      error(error) {
        return {
          message: `Ocorreu um erro ao tentar cancelar o pedido. ${(error as Error).message}`,
        }
      },
    })
  }, [cancelOrderMutation, order])

  return (
    <TableRow>
      <TableCell>
        <OrderDetailsDialog
          orderId={order.orderId}
          open={isDetailsDialogOpened}
          onOpenChange={setIsDetailsDialogOpened}
        >
          <Button size="icon" variant="outline">
            <Search className="size-3.5" />
            <span className="sr-only">Detalhes do Pedido</span>
          </Button>
        </OrderDetailsDialog>
      </TableCell>
      <TableCell>{order.orderId}</TableCell>
      <TableCell>
        {Formatters.temporal.distanceToNow(order.createdAt)}
      </TableCell>
      <TableCell>
        <OrderStatusTag status={order.status} />
      </TableCell>
      <TableCell>{order.customerName}</TableCell>
      <TableCell>{Formatters.number.currency(order.total / 100)}</TableCell>
      <TableCell>
        <Button size="sm" variant="outline">
          <ArrowRight />
          <span>Aprovar</span>
        </Button>
      </TableCell>
      <TableCell>
        <Button
          size="sm"
          variant="ghost"
          disabled={!isStatusCanCancel}
          onClick={handleCancelOrder}
        >
          <X className="size-3.5" />
          <span>Cancelar</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
