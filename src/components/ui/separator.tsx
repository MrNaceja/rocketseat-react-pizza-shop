import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const separatorVariants = cva(
  'before:bg-border relative grid place-items-center before:absolute before:-z-[1]',
  {
    variants: {
      orientation: {
        horizontal: 'w-full before:h-[1px] before:w-full before:top-1/2',
        vertical: 'h-full before:w-[1px] before:h-full',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
)

interface SeparatorProps
  extends VariantProps<typeof separatorVariants>,
    ComponentProps<'span'> {
  label?: string
}
export function Separator({
  label,
  orientation,
  className,
  ...spanProps
}: SeparatorProps) {
  return (
    <span
      className={cn(separatorVariants({ orientation }), className)}
      {...spanProps}
    >
      {label && (
        <span className="text-muted-foreground bg-background px-1">
          {label}
        </span>
      )}
    </span>
  )
}
