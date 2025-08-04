import { cn } from '@/lib/utils'

const orderStatusDescriptionMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  delivering: 'Em entrega',
  delivered: 'Entregue',
  processing: 'Em preparo',
}

interface OrderStatusTagProps {
  status: OrderStatus
}
export function OrderStatusTag({ status }: OrderStatusTagProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn('inline-block size-2.5 rounded-full', {
          'bg-muted': ['pending'].includes(status),
          'bg-destructive': ['canceled'].includes(status),
          'bg-emerald-500': ['delivering', 'delivered'].includes(status),
          'bg-amber-500': ['processing'].includes(status),
        })}
      />
      <span>{orderStatusDescriptionMap[status]}</span>
    </div>
  )
}
