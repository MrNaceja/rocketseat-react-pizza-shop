import { useQuery } from '@tanstack/react-query'
import { Cell, Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card'
import { type ChartConfig, ChartContainer } from '@/components/chart'
import { MetricsService } from '@/services/pizza-shop/metrics.service'

const chartConfig = {
  amount: {
    label: 'Qtd. Vendida',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig

export function PopularProductsChart() {
  const { data: popularProducts } = useQuery({
    queryKey: ['metrics', 'popular-products'],
    queryFn: MetricsService.fetchPopularProducts,
  })

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
              data={popularProducts}
              dataKey="amount"
              nameKey="product"
              innerRadius={100}
              strokeWidth={8}
              stroke="var(--card)"
              labelLine={false}
              label={({ payload: { product }, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    className="fill-muted-foreground text-xs"
                  >
                    {String(product).length > 16
                      ? String(product).substring(0, 16).concat('...')
                      : product}
                  </text>
                )
              }}
            >
              {popularProducts?.map((_, idx) => (
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
