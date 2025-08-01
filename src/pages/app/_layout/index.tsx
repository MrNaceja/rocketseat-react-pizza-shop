import { Outlet } from 'react-router'

import { Header } from '@/pages/app/_layout/header'

export function AppLayout() {
  return (
    <section>
      <Header />
      <Outlet />
    </section>
  )
}
