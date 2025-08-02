import { Cell, Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card'
import { type ChartConfig, ChartContainer } from '@/components/chart'

type PopularProductsChartData = {
  productName: string
  amountSelled: number
}

const chartData: PopularProductsChartData[] = [
  {
    productName: 'Pizza pepperoni acebolada',
    amountSelled: 24,
  },
  {
    productName: 'Pizza calabresa',
    amountSelled: 34,
  },
  {
    productName: 'Pizza 4 queijos',
    amountSelled: 12,
  },
  {
    productName: 'Pizza portuguesa',
    amountSelled: 67,
  },
  {
    productName: 'Pizza ao molho barbecue',
    amountSelled: 39,
  },
]

const chartConfig = {
  amountSelled: {
    label: 'Qtd. Vendida',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig

export function PopularProductsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos populares</CardTitle>
        <CardDescription>Produtos mais vendidos</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <PieChart accessibilityLayer>
            <Pie
              data={chartData}
              dataKey="amountSelled"
              nameKey="productName"
              innerRadius={100}
              strokeWidth={8}
              stroke="var(--card)"
              labelLine={false}
              label={({ payload: { productName }, ...props }) => {
                return (
                  <text {...props} className="fill-muted-foreground text-xs">
                    {String(productName).length > 16
                      ? String(productName).substring(0, 16).concat('...')
                      : productName}
                  </text>
                )
              }}
            >
              {chartData.map((_, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={`var(--chart-${++idx})`}
                  className="hover:opacity-75"
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
