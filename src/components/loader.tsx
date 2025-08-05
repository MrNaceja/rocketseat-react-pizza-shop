import { Loader2 } from 'lucide-react'
import type { ComponentProps } from 'react'

interface LoaderProps extends ComponentProps<'div'> {}
export function Loader(props: LoaderProps) {
  return (
    <div {...props}>
      <Loader2 className="text-muted-foreground size-12 animate-spin" />
      <p className="sr-only">Carregando...</p>
    </div>
  )
}
