import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '@/components/button'

interface PaginationControlProps {
  currentPageIndex: number
  recordsTotal: number
  recorsPerPage: number
}
export function PaginationControl({
  currentPageIndex,
  recordsTotal,
  recorsPerPage,
}: PaginationControlProps) {
  const totalPages = Math.ceil(recordsTotal / recorsPerPage) || 1
  const currentPage = currentPageIndex + 1

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground text-sm">
        Total de {recordsTotal} registro(s)
      </span>

      <div className="flex items-center gap-6">
        <span className="text-muted-foreground text-sm">
          Página {currentPage} de {totalPages}
        </span>
        <aside className="flex items-center gap-1">
          <Button size="icon" variant="outline">
            <ChevronsLeft />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button size="icon" variant="outline">
            <ChevronLeft />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button size="icon" variant="outline">
            <ChevronRight />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button size="icon" variant="outline">
            <ChevronsRight />
            <span className="sr-only">Última página</span>
          </Button>
        </aside>
      </div>
    </div>
  )
}
