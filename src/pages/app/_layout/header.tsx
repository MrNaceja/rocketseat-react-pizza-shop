import { ChevronDown, Home, Pizza, UtensilsCrossed } from 'lucide-react'

import { Button } from '@/components/button'
import { Separator } from '@/components/separator'
import { Skeleton } from '@/components/skeleton'
import { useRestaurantProfile } from '@/hooks/use-restaurant-profile'
import { AccountMenu } from '@/pages/app/_layout/account-menu'
import { NavLink } from '@/pages/app/_layout/nav-link'
import { ThemeToggle } from '@/providers/theme/toggle'

export function Header() {
  const { profile, isLoading: isLoadingRestaurantProfile } =
    useRestaurantProfile()

  return (
    <header className="border-muted flex h-16 items-center gap-6 border-b px-6">
      <figure className="flex items-center gap-2">
        <Pizza className="size-8" />
        <figcaption className="text-foreground text-lg font-semibold">
          Pizza Shop
        </figcaption>
      </figure>

      <Separator orientation="vertical" className="h-6" />

      <nav>
        <ul className="flex items-center gap-3">
          <li>
            <NavLink to="/">
              <Home />
              <span>Início</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders">
              <UtensilsCrossed />
              <span>Pedidos</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <aside className="ml-auto flex items-center gap-3">
        <ThemeToggle />
        <AccountMenu>
          <Button variant="outline" className="group">
            <span>
              {isLoadingRestaurantProfile ? (
                <Skeleton className="h-4 w-24" />
              ) : (
                profile?.name
              )}
            </span>
            <ChevronDown className="size-5 transition duration-200 group-data-[state=open]:-rotate-180" />
          </Button>
        </AccountMenu>
      </aside>
    </header>
  )
}
