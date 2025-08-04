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
import { Skeleton } from '@/components/skeleton'
import { useManagerProfile } from '@/hooks/use-manager-profile'
import {
  RestaurantProfileDialog,
  RestaurantProfileDialogTrigger,
} from '@/pages/app/_layout/store-profile-dialog'

export function AccountMenu({ children: trigger }: PropsWithChildren) {
  const { profile, isLoading: isLoadingManagerProfile } = useManagerProfile()
  return (
    <RestaurantProfileDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span className="text-foreground font-bold">
              {isLoadingManagerProfile ? (
                <Skeleton className="h-4 w-32" />
              ) : (
                profile?.name
              )}
            </span>
            <sub className="text-muted-foreground text-xs">
              {isLoadingManagerProfile ? (
                <Skeleton className="h-2 w-full" />
              ) : (
                profile?.email
              )}
            </sub>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <RestaurantProfileDialogTrigger>
            <DropdownMenuItem>
              <Building />
              <span>Perfil da Loja</span>
            </DropdownMenuItem>
          </RestaurantProfileDialogTrigger>
          <DropdownMenuItem variant="destructive">
            <LogOut className="text-destructive" />
            <span className="text-destructive">Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </RestaurantProfileDialog>
  )
}
