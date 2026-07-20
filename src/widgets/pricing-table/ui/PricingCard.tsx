import Image from 'next/image'
import type { Plan } from '@/entities/plan'
import { SectionHeading } from '@/shared/ui/SectionHeading'

export function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div id={plan.id} className="flex scroll-mt-24 flex-1 flex-col gap-10 rounded-3xl bg-white p-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#f7f8f9] p-4">
            <Image src={plan.icon} alt="" width={32} height={32} />
          </span>
          {plan.type === 'rp-package' && <SectionHeading level={4}>{plan.name}</SectionHeading>}
        </div>
        <div className="flex flex-col gap-4">
          {plan.type === 'subscription' && <SectionHeading level={4}>{plan.name}</SectionHeading>}
          <div className="flex items-end gap-1">
            <p className="text-h2-strong text-text-primary">{plan.price}</p>
            {plan.priceSuffix && <p className="text-b2 text-text-secondary">{plan.priceSuffix}</p>}
          </div>
        </div>
      </div>
      <div className="flex items-end gap-1">
        <p className="text-h3 text-text-primary">{plan.rpLabel}</p>
        <p className="text-b2 text-text-secondary">{plan.rpGrant}</p>
      </div>
    </div>
  )
}
