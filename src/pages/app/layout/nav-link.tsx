import { Link, type LinkProps, useLocation } from 'react-router'

import { Button } from '@/components/ui/button'

export function NavLink(props: LinkProps) {
  const { pathname } = useLocation()

  return (
    <Button
      asChild
      variant="link"
      className="text-muted-foreground data-[active=true]:text-foreground"
      data-active={pathname === props.to}
    >
      <Link {...props} />
    </Button>
  )
}
