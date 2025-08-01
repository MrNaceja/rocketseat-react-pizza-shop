import { useHead } from '@unhead/react'

export function DashboardPage() {
  useHead({
    title: 'Dashboard',
  })

  return (
    <>
      <h1>Dashboard</h1>
    </>
  )
}
