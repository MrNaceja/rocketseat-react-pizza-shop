import { PopularProductsChart } from '@/pages/app/dashboard/components/popular-products-chart'
import { RevenuePeriodChart } from '@/pages/app/dashboard/components/revenue-period-chart'

export function SummaryCharts() {
  return (
    <article className="grid grid-cols-9 gap-6">
      <div className="col-span-6">
        <RevenuePeriodChart />
      </div>
      <div className="col-span-3">
        <PopularProductsChart />
      </div>
    </article>
  )
}
