import Image from 'next/image'
import type { Plan } from '@/entities/plan'
import { SectionHeading } from '@/shared/ui/SectionHeading'

export function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div
      id={plan.id}
      className="flex scroll-mt-24 flex-1 flex-col gap-6 rounded-3xl bg-white p-6 sm:gap-8 sm:p-8 md:gap-10 md:p-10"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f7f8f9] p-3 sm:size-14 sm:p-3.5 md:size-16 md:p-4">
            <Image
              src={plan.icon}
              alt=""
              width={32}
              height={32}
              sizes="(min-width: 768px) 32px, (min-width: 640px) 28px, 24px"
              className="size-6 sm:size-7 md:size-8"
            />
          </span>
          {plan.type === 'rp-package' && (
            <SectionHeading level={4} className="min-w-0 xl:whitespace-nowrap">
              {plan.name}
            </SectionHeading>
          )}
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
