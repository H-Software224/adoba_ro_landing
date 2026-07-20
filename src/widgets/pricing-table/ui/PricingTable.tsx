import type { ReactNode } from 'react'
import type { Plan } from '@/entities/plan'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { PricingCard } from './PricingCard'

export function PricingTable({ title, plans }: { title: ReactNode; plans: Plan[] }) {
  return (
    <div className="flex flex-col items-center gap-10">
      <SectionHeading level={3}>{title}</SectionHeading>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  )
}
