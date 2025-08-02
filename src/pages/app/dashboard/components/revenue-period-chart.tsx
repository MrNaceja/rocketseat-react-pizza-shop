import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card'
import { type ChartConfig, ChartContainer } from '@/components/chart'

type RevenuePeriodChartData = {
  period: string
  revenue: number
}

const chartData: RevenuePeriodChartData[] = [
  {
    period: '01/05',
    revenue: 800,
  },
  {
    period: '02/05',
    revenue: 2390,
  },
  {
    period: '03/05',
    revenue: 2380,
  },
  {
    period: '04/05',
    revenue: 8320,
  },
  {
    period: '05/05',
    revenue: 9000,
  },
]

const chartConfig = {
  period: {
    label: 'Período',
    color: 'var(--chart-1)',
  },
  revenue: {
    label: 'Receita',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig

export function RevenuePeriodChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Receita no período</CardTitle>
        <CardDescription>Receita diária no período</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <LineChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <Line
              type="linear"
              dataKey="revenue"
              fill="var(--color-revenue)"
              stroke="var(--color-revenue)"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              dx={12}
              tickFormatter={(value: RevenuePeriodChartData['revenue']) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />
            <XAxis dataKey="period" tickLine={false} axisLine={false} dy={16} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
