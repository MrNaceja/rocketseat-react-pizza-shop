import { Building, LogOut } from 'lucide-react'
import type { PropsWithChildren } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu'

export function AccountMenu({ children: trigger }: PropsWithChildren) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
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
        <DropdownMenuItem variant="destructive">
          <LogOut className="text-destructive" />
          <span className="text-destructive">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
