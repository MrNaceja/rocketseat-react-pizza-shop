import { useHead } from '@unhead/react'

import { PaginationControl } from '@/components/pagination-control'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table'
import { OrdersFilters } from '@/pages/app/orders/components/orders-filters'
import { OrdersTableRow } from '@/pages/app/orders/components/orders-table-row'

export function OrdersPage() {
  useHead({
    title: 'Pedidos',
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

      <main className="flex flex-col gap-6">
        <OrdersFilters />
        <article className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead className="text-muted-foreground w-2xs">
                  Identificador
                </TableHead>
                <TableHead className="text-muted-foreground w-[168px]">
                  Realizado há
                </TableHead>
                <TableHead className="text-muted-foreground w-[148px]">
                  Status
                </TableHead>
                <TableHead className="text-muted-foreground">Cliente</TableHead>
                <TableHead className="text-muted-foreground w-[148px]">
                  Total pedido
                </TableHead>
                <TableHead className="w-[148px]"></TableHead>
                <TableHead className="w-[148px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, idx) => (
                <OrdersTableRow key={idx} />
              ))}
            </TableBody>
          </Table>
          <footer className="border-t p-3">
            <PaginationControl
              currentPageIndex={0}
              recordsTotal={10}
              recorsPerPage={5}
            />
          </footer>
        </article>
      </main>
    </div>
  )
}
