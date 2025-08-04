import type { ComponentType, ReactNode } from 'react'

type CaseComponent = ReactNode | ComponentType

interface SwitchProps<T extends string | number | symbol = string> {
  components: Record<T, CaseComponent>
  defaultComponent?: CaseComponent
  value: T | string | number
}
export function Switch<T extends string | number | symbol>({
  components,
  defaultComponent = null,
  value,
}: SwitchProps<T>) {
  const RenderedComponent = (components[value] ||
    defaultComponent) as CaseComponent

  if (typeof RenderedComponent === 'function') {
    return <RenderedComponent />
  }

  return <>{RenderedComponent}</>
}
