import { cn } from '@/shared/lib/cn'
import { getAssetUrl } from '@/shared/lib/asset'

interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  className?: string
}

/** Drop-in replacement for `next/image`'s subset of props actually used in this codebase (no build-time optimization). */
export function Image({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  priority,
  className,
}: ImageProps) {
  return (
    <img
      src={getAssetUrl(src)}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      className={cn(fill && 'absolute inset-0 size-full', className)}
    />
  )
}