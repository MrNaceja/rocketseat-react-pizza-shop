import { DollarSign, PackageCheck, PackagePlus, PackageX } from 'lucide-react'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card'

export function SummaryCards() {
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
          <CardTitle className="text-3xl">R$ 1248,90</CardTitle>
          <CardDescription>
            <strong className="text-emerald-500">+2%</strong> em relação ao mês
            passado
          </CardDescription>
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
          <CardTitle className="text-3xl">246</CardTitle>
          <CardDescription>
            <strong className="text-emerald-500">+8%</strong> em relação ao mês
            passado
          </CardDescription>
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
          <CardTitle className="text-3xl">123</CardTitle>
          <CardDescription>
            <strong className="text-destructive">-5%</strong> em relação à ontem
          </CardDescription>
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
          <CardTitle className="text-3xl">15</CardTitle>
          <CardDescription>
            <strong className="text-emerald-500">-5%</strong> em relação ao mês
            passado
          </CardDescription>
        </CardContent>
      </Card>
    </header>
  )
}
