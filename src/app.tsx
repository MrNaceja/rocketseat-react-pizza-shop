import { createHead, UnheadProvider } from '@unhead/react/client'
import type { PropsWithChildren } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from 'sonner'

import { AppLayout } from '@/pages/app/_layout'
import { DashboardPage } from '@/pages/app/dashboard'
import { OrdersPage } from '@/pages/app/orders'
import { AuthLayout } from '@/pages/auth/_layout'
import { SignInPage } from '@/pages/auth/sign-in'
import { SignUpPage } from '@/pages/auth/sign-up'
import { ThemeProvider } from '@/providers/theme/provider'

const head = createHead({
  init: [
    {
      titleTemplate: '%s | Pizza Shop',
    },
  ],
})

export function App() {
  return (
    <Providers>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} index />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
    </Providers>
  )
}

function Providers({ children }: PropsWithChildren) {
  return (
    <UnheadProvider head={head}>
      <ThemeProvider defaultTheme="dark">
        <Toaster richColors />
        <BrowserRouter>
          <Routes>{children}</Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UnheadProvider>
  )
}
