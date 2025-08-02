import { useHead } from '@unhead/react'

import { SummaryCards } from '@/pages/app/dashboard/components/summary-cards'
import { SummaryCharts } from '@/pages/app/dashboard/components/summary-charts'

export function DashboardPage() {
  useHead({
    title: 'Dashboard',
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <main className="flex flex-col gap-6">
        <SummaryCards />
        <SummaryCharts />
      </main>
    </div>
  )
}
