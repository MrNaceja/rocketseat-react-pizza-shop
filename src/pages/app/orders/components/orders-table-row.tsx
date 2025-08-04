import { ArrowRight, Check, Search, Truck, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

import { Button, type ButtonProps } from '@/components/button'
import { Switch } from '@/components/switch'
import { TableCell, TableRow } from '@/components/table'
import { useOrderStatusMutation } from '@/hooks/use-order-status-mutation'
import { ORDER_STATUS_CAN_CANCEL, OrderStatusEnum } from '@/lib/constants'
import { Formatters } from '@/lib/formatters'
import { OrderDetailsDialog } from '@/pages/app/orders/components/order-details-dialog'
import { OrderStatusTag } from '@/pages/app/orders/components/order-status-tag'
import type { UpdateOrderStatusPayload } from '@/services/pizza-shop/orders.service'

type ChangeStatusMutationAction = (props: {
  loadingMessage: string
  successMessage: string
  status: UpdateOrderStatusPayload['status']
}) => void

interface OrdersTableRowProps {
  order: Order
}
export function OrdersTableRow({ order }: OrdersTableRowProps) {
  const [isDetailsDialogOpened, setIsDetailsDialogOpened] = useState(false)

  const isStatusCanCancel = ORDER_STATUS_CAN_CANCEL.includes(order.status)

  const orderStatusMutation = useOrderStatusMutation()

  const handleChangeStatusAction = useCallback<ChangeStatusMutationAction>(
    ({ loadingMessage, successMessage, status }) => {
      toast.promise(
        orderStatusMutation.mutateAsync({
          orderId: order.orderId,
          status,
        }),
        {
          loading: loadingMessage,
          success: successMessage,
          error(error) {
            return {
              message: `Ocorreu um erro ao tentar alterar o status do pedido. ${(error as Error).message}`,
            }
          },
        },
      )
    },
    [orderStatusMutation, order],
  )

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
        <Switch<Exclude<OrderStatus, 'canceled'>>
          value={order.status}
          components={{
            delivered: OrderStatusActionFinished,
            pending: (
              <OrderStatusActionApprove
                disabled={orderStatusMutation.isPending}
                onClick={() =>
                  handleChangeStatusAction({
                    status: OrderStatusEnum.processing,
                    loadingMessage: 'Aprovando o pedido...',
                    successMessage: 'Pedido aprovado com sucesso!',
                  })
                }
              />
            ),
            delivering: (
              <OrderStatusActionDelivered
                disabled={orderStatusMutation.isPending}
                onClick={() =>
                  handleChangeStatusAction({
                    status: OrderStatusEnum.delivered,
                    loadingMessage: 'Finalizando o pedido...',
                    successMessage: 'Pedido finalizado com sucesso!',
                  })
                }
              />
            ),
            processing: (
              <OrderStatusActionDeliver
                disabled={orderStatusMutation.isPending}
                onClick={() =>
                  handleChangeStatusAction({
                    status: OrderStatusEnum.delivering,
                    loadingMessage: 'Enviando o pedido...',
                    successMessage: 'Pedido enviado com sucesso!',
                  })
                }
              />
            ),
          }}
        />
      </TableCell>
      <TableCell>
        <Button
          size="sm"
          variant="ghost"
          disabled={!isStatusCanCancel}
          onClick={() =>
            handleChangeStatusAction({
              status: OrderStatusEnum.canceled,
              loadingMessage: 'Cancelando o pedido...',
              successMessage: 'Pedido cancelado com sucesso!',
            })
          }
        >
          <X className="size-3.5" />
          <span>Cancelar</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}

function OrderStatusActionFinished(props: ButtonProps) {
  return (
    <Button size="sm" variant="ghost" {...props} disabled>
      <Check />
      <span>Finalizado</span>
    </Button>
  )
}
function OrderStatusActionApprove(props: ButtonProps) {
  return (
    <Button size="sm" variant="outline" {...props}>
      <ArrowRight />
      <span>Aprovar</span>
    </Button>
  )
}
function OrderStatusActionDeliver(props: ButtonProps) {
  return (
    <Button size="sm" variant="outline" {...props}>
      <Truck />
      <span>Entregar</span>
    </Button>
  )
}
function OrderStatusActionDelivered(props: ButtonProps) {
  return (
    <Button size="sm" variant="outline" {...props}>
      <Check />
      <span>Entregue</span>
    </Button>
  )
}
