import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const Formatters = {
  number: {
    currency(value: number) {
      const formatter = Intl.NumberFormat('pt-br', {
        currency: 'BRL',
        style: 'currency',
      })
      return formatter.format(value)
    },
  },
  temporal: {
    distanceToNow(date: string | Date) {
      date = new Date(date)
      return formatDistanceToNow(date, {
        locale: ptBR,
        addSuffix: true,
      })
    },
  },
}
