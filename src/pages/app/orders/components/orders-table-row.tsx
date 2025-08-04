import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/button'
import { TableCell, TableRow } from '@/components/table'
import { Formatters } from '@/lib/formatters'
import { OrderDetailsDialog } from '@/pages/app/orders/components/order-details-dialog'
import { OrderStatusTag } from '@/pages/app/orders/components/order-status-tag'

interface OrdersTableRowProps {
  order: Order
}
export function OrdersTableRow({ order }: OrdersTableRowProps) {
  const [isDetailsDialogOpened, setIsDetailsDialogOpened] = useState(false)
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
        <Button size="sm" variant="ghost">
          <X className="size-3.5" />
          <span>Cancelar</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
