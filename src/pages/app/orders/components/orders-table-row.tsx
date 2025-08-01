import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/button'
import { TableCell, TableRow } from '@/components/table'

export function OrdersTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Button size="icon" variant="outline">
          <Search className="size-3.5" />
          <span className="sr-only">Detalhes do Pedido</span>
        </Button>
      </TableCell>
      <TableCell>sdalfhsdoufhsodlfjçsdlfksdf</TableCell>
      <TableCell>há 15 minutos</TableCell>
      <TableCell className="space-x-2">
        <span className="bg-muted inline-block size-2.5 rounded-full" />
        <span>Pendente</span>
      </TableCell>
      <TableCell>Eduardo Narcizo Neto Toriani</TableCell>
      <TableCell>R$ 149.90</TableCell>
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
