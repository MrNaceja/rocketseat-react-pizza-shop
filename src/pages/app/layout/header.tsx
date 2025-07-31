import { Home, Pizza, UtensilsCrossed } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { AccountMenu } from '@/pages/app/layout/account-menu'
import { NavLink } from '@/pages/app/layout/nav-link'
import { ThemeToggle } from '@/providers/theme/toggle'

export function Header() {
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
        <AccountMenu />
      </aside>
    </header>
  )
}
