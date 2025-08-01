import { BrushCleaning, Filter } from 'lucide-react'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select'

type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

type StatusFilterOption = {
  value: OrderStatus | 'any'
  label: string
}

const statusFilterOptions: StatusFilterOption[] = [
  {
    value: 'any',
    label: 'Qualquer status',
  },
  {
    value: 'pending',
    label: 'Pendente',
  },
  {
    value: 'canceled',
    label: 'Cancelado',
  },
  {
    value: 'processing',
    label: 'Em preparo',
  },
  {
    value: 'delivering',
    label: 'Em entrega',
  },
  {
    value: 'delivered',
    label: 'Entrege',
  },
]

export function OrdersFilters() {
  return (
    <header className="flex items-center gap-6">
      <Label>Filtros:</Label>
      <form className="flex items-center gap-3">
        <search className="w-auto">
          <Input placeholder="ID do pedido" type="text" />
        </search>
        <search className="w-xs">
          <Input placeholder="Nome do cliente" type="text" />
        </search>
        <Select defaultValue="any">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusFilterOptions.map(({ value, label }) => (
              <SelectItem value={value} key={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <aside className="flex items-center gap-2">
          <Button size="sm" type="submit">
            <Filter />
            <span>Aplicar filtros</span>
          </Button>

          <Button size="sm" variant="outline" type="button">
            <BrushCleaning />
            <span>Limpar filtros</span>
          </Button>
        </aside>
      </form>
    </header>
  )
}
