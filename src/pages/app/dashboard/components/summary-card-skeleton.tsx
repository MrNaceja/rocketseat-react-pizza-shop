import { Skeleton } from '@/components/skeleton'

export function SummaryCardSkeleton() {
  return (
    <>
      <Skeleton className="h-8 w-1/2 rounded" />
      <Skeleton className="h-5 w-full rounded" />
    </>
  )
}
