import { createHead, UnheadProvider } from '@unhead/react/client'
import type { PropsWithChildren } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from 'sonner'

import { AppLayout } from '@/pages/app/_layout'
import { DashboardPage } from '@/pages/app/dashboard'
import { AuthLayout } from '@/pages/auth/_layout'
import { SignInPage } from '@/pages/auth/sign-in'
import { SignUpPage } from '@/pages/auth/sign-up'

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
      <Toaster richColors />
      <BrowserRouter>
        <Routes>{children}</Routes>
      </BrowserRouter>
    </UnheadProvider>
  )
}
