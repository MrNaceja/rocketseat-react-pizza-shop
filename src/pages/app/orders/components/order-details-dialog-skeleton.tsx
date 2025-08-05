import { Separator } from '@/components/separator'
import { Skeleton } from '@/components/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table'

export function OrderDetailsDialogSkeleton() {
  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableHead className="text-muted-foreground text-xs uppercase">
              Status
            </TableHead>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-32" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-muted-foreground text-xs uppercase">
              Cliente
            </TableHead>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-3xs" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-muted-foreground text-xs uppercase">
              Telefone
            </TableHead>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-2xs" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-muted-foreground text-xs uppercase">
              E-mail
            </TableHead>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-2xs" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-muted-foreground text-xs uppercase">
              Realizado
            </TableHead>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-3xs" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Separator label="Itens do pedido" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-muted-foreground">Produto</TableHead>
            <TableHead className="text-muted-foreground">Qtd.</TableHead>
            <TableHead className="text-muted-foreground">Preço</TableHead>
            <TableHead className="text-muted-foreground">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 2 }).map((_, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Skeleton className="h-5 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total do pedido</TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
