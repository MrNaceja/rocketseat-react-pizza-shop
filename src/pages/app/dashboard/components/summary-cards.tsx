import { useQuery } from '@tanstack/react-query'
import { DollarSign, PackageCheck, PackagePlus, PackageX } from 'lucide-react'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card'
import { Formatters } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import { MetricsService } from '@/services/pizza-shop/metrics.service'

export function SummaryCards() {
  const { data: totalAmountRevenueInMonthQuery } = useQuery({
    queryKey: ['total-amount-revenue-month'],
    queryFn: MetricsService.fetchTotalRevenueInMonth,
  })
  const { data: amountCanceledInMonthQuery } = useQuery({
    queryKey: ['amount-canceled-month'],
    queryFn: MetricsService.fetchAmountCanceledInMonth,
  })
  const { data: amountOrdersInDay } = useQuery({
    queryKey: ['amount-orders-day'],
    queryFn: MetricsService.fetchAmountOrdersInDay,
  })
  const { data: amountOrdersInMonth } = useQuery({
    queryKey: ['amount-orders-month'],
    queryFn: MetricsService.fetchAmountOrdersInMonth,
  })

  return (
    <header className="grid grid-cols-4 gap-6">
      {totalAmountRevenueInMonthQuery && (
        <Card>
          <CardHeader>
            <span>Receita total (mês)</span>
            <CardAction>
              <DollarSign className="text-muted-foreground size-5" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <CardTitle className="text-3xl">
              {Formatters.number.currency(
                totalAmountRevenueInMonthQuery.receipt / 100,
              )}
            </CardTitle>
            <CardDescription>
              <strong
                className={cn({
                  'text-emerald-500':
                    totalAmountRevenueInMonthQuery.diffFromLastMonth > 1,
                  'text-destructive':
                    totalAmountRevenueInMonthQuery.diffFromLastMonth < 0,
                })}
              >
                {totalAmountRevenueInMonthQuery.diffFromLastMonth}%
              </strong>{' '}
              em relação ao mês passado
            </CardDescription>
          </CardContent>
        </Card>
      )}
      {amountOrdersInMonth && (
        <Card>
          <CardHeader>
            <span>Pedidos (mês)</span>
            <CardAction>
              <PackageCheck className="text-muted-foreground size-5" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <CardTitle className="text-3xl">
              {amountOrdersInMonth.amount}
            </CardTitle>
            <CardDescription>
              <strong
                className={cn({
                  'text-emerald-500': amountOrdersInMonth.diffFromLastMonth > 1,
                  'text-destructive': amountOrdersInMonth.diffFromLastMonth < 0,
                })}
              >
                {amountOrdersInMonth.diffFromLastMonth}%
              </strong>{' '}
              em relação ao mês passado
            </CardDescription>
          </CardContent>
        </Card>
      )}
      {amountOrdersInDay && (
        <Card>
          <CardHeader>
            <span>Pedidos (dia)</span>
            <CardAction>
              <PackagePlus className="text-muted-foreground size-5" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <CardTitle className="text-3xl">
              {amountOrdersInDay.amount}
            </CardTitle>
            <CardDescription>
              <strong
                className={cn({
                  'text-emerald-500': amountOrdersInDay.diffFromYesterday > 1,
                  'text-destructive': amountOrdersInDay.diffFromYesterday < 0,
                })}
              >
                {amountOrdersInDay.diffFromYesterday}%
              </strong>{' '}
              em relação à ontem
            </CardDescription>
          </CardContent>
        </Card>
      )}
      {amountCanceledInMonthQuery && (
        <Card>
          <CardHeader>
            <span>Cancelamentos (mês)</span>
            <CardAction>
              <PackageX className="text-muted-foreground size-5" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <CardTitle className="text-3xl">
              {amountCanceledInMonthQuery.amount}
            </CardTitle>
            <CardDescription>
              <strong
                className={cn({
                  'text-destructive':
                    amountCanceledInMonthQuery.diffFromLastMonth > 1,
                  'text-emerald-500':
                    amountCanceledInMonthQuery.diffFromLastMonth < 0,
                })}
              >
                {amountCanceledInMonthQuery.diffFromLastMonth}%
              </strong>{' '}
              em relação ao mês passado
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </header>
  )
}
