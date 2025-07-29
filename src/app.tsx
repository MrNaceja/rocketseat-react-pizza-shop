import { BrowserRouter, Route, Routes } from 'react-router'

import { AppLayout } from '@/pages/app/_layout'
import { DashboardPage } from '@/pages/app/dashboard'
import { AuthLayout } from '@/pages/auth/_layout'
import { SignInPage } from '@/pages/auth/sign-in'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} index />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
