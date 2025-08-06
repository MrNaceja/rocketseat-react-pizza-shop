import { useHead } from '@unhead/react'
import { RefreshCw } from 'lucide-react'
import { type FallbackProps } from 'react-error-boundary'

import { Button } from '@/components/button'

export function ErrorBoundaryPage({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  useHead({
    title: 'Opps',
  })

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold tracking-tight">
        Opss, ocorreu um erro inesperado!
      </h1>
      <pre className="text-destructive">
        {(error as Error).message || JSON.stringify(error)}
      </pre>

      <Button onClick={resetErrorBoundary} className="group">
        <RefreshCw className="transition duration-500 group-hover:-rotate-180" />
        <span>Tentar novamente</span>
      </Button>
    </section>
  )
}
