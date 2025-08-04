import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card'
import { type ChartConfig, ChartContainer } from '@/components/chart'
import { DateRangePicker } from '@/components/data-range-picker'
import { Label } from '@/components/label'
import { MetricsService } from '@/services/pizza-shop/metrics.service'

const chartConfig = {
  date: {
    label: 'Período',
    color: 'var(--chart-1)',
  },
  receipt: {
    label: 'Receita',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig

export function RevenuePeriodChart() {
  const today = new Date()
  const [period, setPeriod] = useState<DateRange | undefined>({
    from: subDays(today, 7),
    to: today,
  })

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-period', period],
    queryFn: () =>
      MetricsService.fetchDailyRevenueInPeriod({
        from: period?.from,
        to: period?.to,
      }),
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map((revenue) => ({
      ...revenue,
      receipt: revenue.receipt / 100,
    }))
  }, [dailyRevenueInPeriod])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receita no período</CardTitle>
        <CardDescription>Receita diária no período</CardDescription>
        <CardAction className="flex flex-row gap-2">
          <Label>Período</Label>
          <DateRangePicker date={period} onDateChange={setPeriod} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <LineChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <Line
              type="linear"
              dataKey="receipt"
              fill="var(--color-receipt)"
              stroke="var(--color-receipt)"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              dx={12}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
