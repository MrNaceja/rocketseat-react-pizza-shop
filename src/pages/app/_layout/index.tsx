import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { Header } from '@/pages/app/_layout/header'
import { AuthService } from '@/services/pizza-shop/auth.service'

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    return AuthService.withUnauthorizedInterceptor(() => {
      navigate('/sign-in')
    })
  }, [navigate])
  return (
    <section>
      <Header />
      <Outlet />
    </section>
  )
}
