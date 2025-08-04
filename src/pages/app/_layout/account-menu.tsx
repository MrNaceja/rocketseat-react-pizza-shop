import { Building, LogOut } from 'lucide-react'
import { type PropsWithChildren, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu'
import { Skeleton } from '@/components/skeleton'
import { useAuth } from '@/hooks/use-auth'
import { useManagerProfile } from '@/hooks/use-manager-profile'
import {
  RestaurantProfileDialog,
  RestaurantProfileDialogTrigger,
} from '@/pages/app/_layout/restaurant-profile-dialog'

export function AccountMenu({ children: trigger }: PropsWithChildren) {
  const { profile, isLoading: isLoadingManagerProfile } = useManagerProfile()
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = useCallback(() => {
    toast.promise(signOut, {
      loading: 'Encerrando sessão...',
      success() {
        navigate('/sign-in', { replace: true })
        return {
          message: 'Sessão encerrada.',
        }
      },
      error(error) {
        return {
          message: `Ocorreu um erro ao encerrar. ${(error as Error).message}`,
        }
      },
    })
  }, [signOut, navigate])

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
          <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
            <LogOut className="text-destructive" />
            <span className="text-destructive">Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </RestaurantProfileDialog>
  )
}
