import { Building, ChevronDown, LogOut } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="group">
          <span>Nome do Restaurante</span>
          <ChevronDown className="size-5 transition duration-200 group-data-[state=open]:-rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-foreground font-bold">Nome do Usuário</span>
          <sub className="text-muted-foreground text-xs">email@usuario.com</sub>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Building />
          <span>Perfil da Loja</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="text-destructive" />
          <span className="text-destructive">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
