import { zodResolver } from '@hookform/resolvers/zod'
import { BrushCleaning, Filter } from 'lucide-react'
import { useCallback } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import z4 from 'zod/v4'

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

const ordersFiltersSchema = z4.object({
  customerName: z4.string().optional(),
  orderId: z4.string().optional(),
  status: z4.string().optional(),
})

type OrdersFiltersForm = z4.infer<typeof ordersFiltersSchema>

const availableFilters: Array<keyof OrdersFiltersForm> = [
  'customerName',
  'status',
  'orderId',
]

export function OrdersFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const ordersFiltersForm = useForm<OrdersFiltersForm>({
    resolver: zodResolver(ordersFiltersSchema),
    defaultValues: {
      status: searchParams.get('status') || 'any',
      orderId: searchParams.get('orderId') || '',
      customerName: searchParams.get('customerName') || '',
    },
  })

  const handleApplyFilters = useCallback<SubmitHandler<OrdersFiltersForm>>(
    (filters) => {
      setSearchParams((urlState) => {
        availableFilters.forEach((filterName) => {
          if (filters[filterName]) {
            urlState.set(filterName, filters[filterName])
          } else {
            urlState.delete(filterName)
          }
        })

        urlState.set('page', '1')

        return urlState
      })
    },
    [setSearchParams],
  )

  const handleClearFilters = useCallback(() => {
    setSearchParams((urlState) => {
      availableFilters.forEach((filterName) => {
        urlState.delete(filterName)
      })

      urlState.set('page', '1')

      return urlState
    })

    ordersFiltersForm.reset()
  }, [setSearchParams, ordersFiltersForm])
  return (
    <header className="flex items-center gap-6">
      <Label>Filtros:</Label>
      <form
        className="flex items-center gap-3"
        onSubmit={ordersFiltersForm.handleSubmit(handleApplyFilters)}
      >
        <search className="w-auto">
          <Input
            placeholder="ID do pedido"
            type="text"
            {...ordersFiltersForm.register('orderId')}
          />
        </search>
        <search className="w-xs">
          <Input
            placeholder="Nome do cliente"
            type="text"
            {...ordersFiltersForm.register('customerName')}
          />
        </search>
        <Controller
          name="status"
          control={ordersFiltersForm.control}
          render={({ field: statusField }) => (
            <Select
              defaultValue="any"
              onValueChange={statusField.onChange}
              disabled={statusField.disabled}
              name={statusField.name}
              value={statusField.value}
            >
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
          )}
        />
        <aside className="flex items-center gap-2">
          <Button size="sm" type="submit">
            <Filter />
            <span>Aplicar filtros</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={handleClearFilters}
          >
            <BrushCleaning />
            <span>Limpar filtros</span>
          </Button>
        </aside>
      </form>
    </header>
  )
}
