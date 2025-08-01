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

export function OrderDetailsDialog({ children: trigger }: PropsWithChildren) {
  return (
    <Dialog defaultOpen={false}>
      <DialogClose />
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>Detalhes do pedido</DialogDescription>
          <DialogTitle className="uppercase">
            #dsffsdjklfhsdjkfhjsdf
          </DialogTitle>
        </DialogHeader>

        <Table>
          <TableBody>
            <TableRow>
              <TableHead className="text-muted-foreground text-xs uppercase">
                Status
              </TableHead>
              <TableCell className="flex justify-end">
                <div className="flex w-fit items-center gap-2">
                  <span className="bg-muted inline-block size-2.5 rounded-full" />
                  <span>Pendente</span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="text-muted-foreground text-xs uppercase">
                Cliente
              </TableHead>
              <TableCell className="flex justify-end">
                Nome do Cliente
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="text-muted-foreground text-xs uppercase">
                Telefone
              </TableHead>
              <TableCell className="flex justify-end">
                (99) 99999-9999
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="text-muted-foreground text-xs uppercase">
                E-mail
              </TableHead>
              <TableCell className="flex justify-end">
                example@email.com
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="text-muted-foreground text-xs uppercase">
                Realizado
              </TableHead>
              <TableCell className="flex justify-end">há 3 minutos</TableCell>
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
            <TableRow>
              <TableCell>Pizza peperoni familia</TableCell>
              <TableCell>2</TableCell>
              <TableCell>R$ 29,90</TableCell>
              <TableCell>R$ 61,10</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell>R$ 189,90</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </DialogContent>
    </Dialog>
  )
}
