import type { DialogProps } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog'
import { Separator } from '@/components/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table'
import { Formatters } from '@/lib/formatters'
import { OrderStatusTag } from '@/pages/app/orders/components/order-status-tag'
import { OrdersService } from '@/services/pizza-shop/orders.service'

interface OrderDetailsDialogProps extends PropsWithChildren, DialogProps {
  orderId: Order['orderId']
}
export function OrderDetailsDialog({
  children: trigger,
  orderId,
  ...dialogProps
}: OrderDetailsDialogProps) {
  const { data: orderDetails } = useQuery({
    queryKey: ['order-details', orderId],
    queryFn: () => OrdersService.fetchOrderDetails({ orderId }),
    enabled: dialogProps.open,
  })

  return (
    <Dialog {...dialogProps}>
      <DialogClose />
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>Detalhes do pedido</DialogDescription>
          <DialogTitle className="uppercase">{orderId}</DialogTitle>
        </DialogHeader>
        {orderDetails && (
          <>
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead className="text-muted-foreground text-xs uppercase">
                    Status
                  </TableHead>
                  <TableCell className="flex justify-end">
                    <OrderStatusTag status={orderDetails.status} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-muted-foreground text-xs uppercase">
                    Cliente
                  </TableHead>
                  <TableCell className="flex justify-end">
                    {orderDetails.customer.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-muted-foreground text-xs uppercase">
                    Telefone
                  </TableHead>
                  <TableCell className="flex justify-end">
                    {orderDetails.customer.phone || 'Não informado'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-muted-foreground text-xs uppercase">
                    E-mail
                  </TableHead>
                  <TableCell className="flex justify-end">
                    {orderDetails.customer.email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-muted-foreground text-xs uppercase">
                    Realizado
                  </TableHead>
                  <TableCell className="flex justify-end">
                    {Formatters.temporal.distanceToNow(orderDetails.createdAt)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Separator label="Itens do pedido" />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground">
                    Produto
                  </TableHead>
                  <TableHead className="text-muted-foreground">Qtd.</TableHead>
                  <TableHead className="text-muted-foreground">Preço</TableHead>
                  <TableHead className="text-muted-foreground">
                    Subtotal
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderDetails.orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {Formatters.number.currency(item.priceInCents / 100)}
                    </TableCell>
                    <TableCell>
                      {Formatters.number.currency(
                        (item.priceInCents / 100) * item.quantity,
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total do pedido</TableCell>
                  <TableCell>
                    {Formatters.number.currency(
                      orderDetails.totalInCents / 100,
                    )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
