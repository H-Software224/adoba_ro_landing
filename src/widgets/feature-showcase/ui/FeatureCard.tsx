import Image from 'next/image'
import type { ProductFeature } from '@/entities/product-feature'
import { SectionHeading } from '@/shared/ui/SectionHeading'

export function FeatureCard({ feature }: { feature: ProductFeature }) {
  return (
    <div className="flex w-[560px] shrink-0 snap-start items-center gap-8 rounded-3xl bg-white p-10">
      <Image src={feature.icon} alt="" width={120} height={120} className="shrink-0" />
      <div className="flex flex-col gap-4">
        <SectionHeading level={3}>{feature.title}</SectionHeading>
        <p className="text-b1 text-text-secondary">{feature.description}</p>
      </div>
    </div>
  )
}
