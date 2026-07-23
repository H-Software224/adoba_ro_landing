import { Link } from '@/shared/i18n/navigation'
import { SectionHeading } from '@/shared/ui/SectionHeading'

export function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <SectionHeading level={1} size="h2">
        404
      </SectionHeading>
      <p className="text-b2 text-text-secondary">페이지를 찾을 수 없습니다.</p>
      <Link href="/" className="text-b3 text-text-brand underline">
        홈으로
      </Link>
    </div>
  )
}
