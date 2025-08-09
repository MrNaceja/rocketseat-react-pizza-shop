import { Route } from 'react-router'

import { AppLayout } from '@/pages/app/_layout'
import { DashboardPage } from '@/pages/app/dashboard'
import { OrdersPage } from '@/pages/app/orders'
import { AuthLayout } from '@/pages/auth/_layout'
import { SignInPage } from '@/pages/auth/sign-in'
import { SignUpPage } from '@/pages/auth/sign-up'
import { NotFoundPage } from '@/pages/not-found'

import { ErrorBoundaryPage } from "@/pages/error-boundary"
import { ThemeProvider } from "@/providers/theme/provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createHead, UnheadProvider } from "@unhead/react/client"
import type { PropsWithChildren } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { BrowserRouter, Routes } from "react-router"
import { Toaster } from "sonner"

const head = createHead({
  init: [
    {
      titleTemplate: '%s | Pizza Shop',
    },
  ],
})

const queryClient = new QueryClient()

export const appProvidersDependencies = {
  head, 
  queryClient
}

export function App() {
  return (
    <Providers>
      <Route path="*" element={<NotFoundPage />} />
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
        <ErrorBoundary FallbackComponent={ErrorBoundaryPage}>
          <QueryClientProvider client={queryClient}>
            <Toaster richColors />
            <BrowserRouter>
              <Routes>{children}</Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </UnheadProvider>
  )
}


