import { Skeleton } from '@/components/skeleton'
import { TableCell, TableRow } from '@/components/table'

export function OrdersTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="size-9" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-20" />
      </TableCell>
    </TableRow>
  )
}
