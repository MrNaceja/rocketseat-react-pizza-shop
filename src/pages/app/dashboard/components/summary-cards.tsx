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
import { SummaryCardSkeleton } from '@/pages/app/dashboard/components/summary-card-skeleton'
import { MetricsService } from '@/services/pizza-shop/metrics.service'

export function SummaryCards() {
  const { data: totalAmountRevenueInMonth } = useQuery({
    queryKey: ['metrics', 'total-amount-revenue-month'],
    queryFn: MetricsService.fetchTotalRevenueInMonth,
  })
  const { data: amountCanceledInMonth } = useQuery({
    queryKey: ['metrics', 'amount-canceled-month'],
    queryFn: MetricsService.fetchAmountCanceledInMonth,
  })
  const { data: amountOrdersInDay } = useQuery({
    queryKey: ['metrics', 'amount-orders-day'],
    queryFn: MetricsService.fetchAmountOrdersInDay,
  })
  const { data: amountOrdersInMonth } = useQuery({
    queryKey: ['metrics', 'amount-orders-month'],
    queryFn: MetricsService.fetchAmountOrdersInMonth,
  })

  return (
    <header className="grid grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <span>Receita total (mês)</span>
          <CardAction>
            <DollarSign className="text-muted-foreground size-5" />
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {totalAmountRevenueInMonth ? (
            <>
              <CardTitle className="text-3xl">
                {Formatters.number.currency(
                  totalAmountRevenueInMonth!.receipt / 100,
                )}
              </CardTitle>
              <CardDescription>
                <strong
                  className={cn({
                    'text-emerald-500':
                      totalAmountRevenueInMonth!.diffFromLastMonth > 1,
                    'text-destructive':
                      totalAmountRevenueInMonth!.diffFromLastMonth < 0,
                  })}
                >
                  {totalAmountRevenueInMonth!.diffFromLastMonth}%
                </strong>{' '}
                em relação ao mês passado
              </CardDescription>
            </>
          ) : (
            <SummaryCardSkeleton />
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <span>Pedidos (mês)</span>
          <CardAction>
            <PackageCheck className="text-muted-foreground size-5" />
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {amountOrdersInMonth ? (
            <>
              <CardTitle className="text-3xl">
                {amountOrdersInMonth!.amount}
              </CardTitle>
              <CardDescription>
                <strong
                  className={cn({
                    'text-emerald-500':
                      amountOrdersInMonth!.diffFromLastMonth > 1,
                    'text-destructive':
                      amountOrdersInMonth!.diffFromLastMonth < 0,
                  })}
                >
                  {amountOrdersInMonth!.diffFromLastMonth}%
                </strong>{' '}
                em relação ao mês passado
              </CardDescription>
            </>
          ) : (
            <SummaryCardSkeleton />
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <span>Pedidos (dia)</span>
          <CardAction>
            <PackagePlus className="text-muted-foreground size-5" />
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {amountOrdersInDay ? (
            <>
              <CardTitle className="text-3xl">
                {amountOrdersInDay!.amount}
              </CardTitle>
              <CardDescription>
                <strong
                  className={cn({
                    'text-emerald-500':
                      amountOrdersInDay!.diffFromYesterday > 1,
                    'text-destructive':
                      amountOrdersInDay!.diffFromYesterday < 0,
                  })}
                >
                  {amountOrdersInDay!.diffFromYesterday}%
                </strong>{' '}
                em relação à ontem
              </CardDescription>
            </>
          ) : (
            <SummaryCardSkeleton />
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <span>Cancelamentos (mês)</span>
          <CardAction>
            <PackageX className="text-muted-foreground size-5" />
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {amountCanceledInMonth ? (
            <>
              <CardTitle className="text-3xl">
                {amountCanceledInMonth!.amount}
              </CardTitle>
              <CardDescription>
                <strong
                  className={cn({
                    'text-destructive':
                      amountCanceledInMonth!.diffFromLastMonth > 1,
                    'text-emerald-500':
                      amountCanceledInMonth!.diffFromLastMonth < 0,
                  })}
                >
                  {amountCanceledInMonth!.diffFromLastMonth}%
                </strong>{' '}
                em relação ao mês passado
              </CardDescription>
            </>
          ) : (
            <SummaryCardSkeleton />
          )}
        </CardContent>
      </Card>
    </header>
  )
}
