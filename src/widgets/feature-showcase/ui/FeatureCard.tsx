import { Image } from '@/shared/ui/Image'
import type { ProductFeature } from '@/entities/product-feature'
import { SectionHeading } from '@/shared/ui/SectionHeading'

export function FeatureCard({ feature }: { feature: ProductFeature }) {
  return (
    <div className="flex w-[280px] shrink-0 items-center gap-6 rounded-3xl bg-white p-6 sm:w-[400px] sm:gap-8 sm:p-10 lg:w-[560px]">
      <Image
        src={feature.icon}
        alt=""
        width={120}
        height={120}
        sizes="(min-width: 640px) 120px, 72px"
        className="size-[72px] shrink-0 sm:size-[120px]"
      />
      <div className="flex flex-col gap-4">
        <SectionHeading level={3}>{feature.title}</SectionHeading>
        <p className="whitespace-pre-line text-b1 text-text-secondary">{feature.description}</p>
      </div>
    </div>
  )
}
