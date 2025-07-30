import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <section className="grid min-h-screen grid-cols-2">
      <div className="bg-secondary border-r-foreground/5 flex h-full min-w-3/4 flex-col justify-between border-r p-6">
        <header className="flex items-center gap-3">
          <Pizza className="size-8" />
          <h1 className="text-foreground text-lg font-semibold">Pizza Shop</h1>
        </header>
        <footer className="text-muted-foreground text-sm">
          Painel do parceiro &copy; Pizza Shop - {new Date().getFullYear()}
        </footer>
      </div>
      <main>
        <Outlet />
      </main>
    </section>
  )
}
