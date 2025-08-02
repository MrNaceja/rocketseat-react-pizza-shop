import { useHead } from '@unhead/react'
import { ArrowLeft, Pizza } from 'lucide-react'

import { NavLink } from '@/pages/app/_layout/nav-link'

export function NotFoundPage() {
  useHead({
    title: '404 Not Found',
  })

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-9xl font-bold tracking-widest">
        <span className="inline-block -rotate-12">4</span>
        <span className="inline-block">
          <Pizza className="text-primary size-28" />
        </span>
        <span className="inline-block rotate-12">4</span>
      </h1>
      <p className="text-foreground">
        Opss, parece que você saiu dos nossos limites.
      </p>

      <NavLink to="/" className="group">
        <ArrowLeft className="transition group-hover:-translate-x-1" />
        <span>Voltar para os limites</span>
      </NavLink>
    </section>
  )
}
