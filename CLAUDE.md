# adobaRo Landing

## 배경
adobaRo는 AI 기반 글로벌 크리에이터 확장 서비스(다국어 로컬라이징 + 멀티플랫폼 배포).
이 리포는 **마케팅 랜딩**이며 본 서비스(https://adobaro.com)와 별개다.
"무료로 시작하기" CTA는 본 서비스로의 **외부 리다이렉트**다. 내부 라우팅으로 바꾸지 말 것.

최우선 요구사항은 **GEO(생성형 엔진 최적화)** — 모든 콘텐츠는 원본 HTML에 존재해야 한다.

## 스택
Next.js (App Router) · TypeScript · Tailwind CSS · next-intl · FSD
데이터 페칭은 서버 컴포넌트에서 직접 fetch. **React Query 도입 금지.**

## 명령어
```bash
npm run dev        # 개발 서버
npm run build      # 프로덕션 빌드
npm run lint       # ESLint (FSD boundaries 포함)
npm run typecheck  # tsc --noEmit
```
작업 완료 전 `npm run lint && npm run typecheck` 통과 필수.

## 환경 변수
- `NEXT_PUBLIC_SITE_URL` — hreflang · sitemap 생성용
- `CMS_API_KEY` — 소식/매거진 페칭용
- `.env.local` 커밋 금지

---

## 절대 규칙

### 1. 서버 컴포넌트 우선
기본은 서버 컴포넌트. `'use client'`는 상호작용이 있을 때만.
현재 정당한 클라이언트 컴포넌트: `features/switch-locale/ui/LocaleSwitcher.tsx`

**이유**: GPTBot·ClaudeBot·PerplexityBot은 JS를 실행하지 않는다. 클라이언트에서 렌더링되는 콘텐츠는 GEO 관점에서 존재하지 않는 것과 같다.

### 2. FSD import 방향 (단방향)

pages → widgets → features → entities → shared
- 역방향 import 금지
- 동일 레이어 간 import 금지 (widgets/header ↛ widgets/footer)
- 크로스 임포트가 필요하면 상위 레이어에서 조합
- 슬라이스는 `index.ts`로만 노출. 내부 경로 직접 import 금지 (린트로 강제되지 않음 — 리뷰에서 확인)
- ESLint(`eslint-plugin-boundaries`)가 레이어 방향 위반을 차단
  (`@feature-sliced/eslint-config`는 0.1.x대 alpha/beta뿐이라 미사용)

### 3. Next 라우트 파일은 껍데기만
`src/app/**/page.tsx`에 로직·JSX 금지. 이 형태만 허용:
```tsx
export { generateMetadata, generateStaticParams } from '@/views/pricing'
export { PricingPage as default } from '@/views/pricing'
```
예외: `revalidate`/`dynamic` 등 [route segment config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)는
Next.js가 정적 분석하므로 재-export 불가 — route 파일에 리터럴로 직접 선언 (`news`, `magazine` 참고).

### 4. 헤딩은 SectionHeading으로만
`<h1>`~`<h6>` 직접 사용 금지. `shared/seo/SectionHeading`의 `level` prop 사용.
- 페이지당 `h1` 1개. 레이아웃이 아닌 각 페이지에서 선언
- 레벨 건너뛰기 금지 (h2 → h4 ✗)

### 5. 새 페이지 = 스키마 필수
`shared/seo/schemas`의 적절한 스키마를 `JsonLd`로 주입. 매핑은 `shared/seo/schemas/README.md` 참조.

### 6. 메타데이터는 pages 레이어에서
`generateMetadata`는 `src/views/*/model/metadata.ts`에 위치.
`alternates`는 반드시 `buildAlternates()` 사용 (hreflang ko/en/x-default).

### 7. i18n
- 하드코딩된 한국어/영어 문자열 금지. 전부 `shared/i18n/messages/{ko,en}.json`
- 두 파일의 키는 항상 동기화
- 내부 링크는 locale 세그먼트 포함 (`/ko/pricing`)

### 8. 외부 링크
adobaro.com 등 외부 링크는 `next/link` 금지:
```tsx
<a href="https://adobaro.com" target="_blank" rel="noopener noreferrer">
```

### 9. Tailwind
- 임의값(`w-[327px]`) 지양. 디자인 토큰은 `tailwind.config.ts`의 theme에 정의
- 조건부 클래스는 `cn()` 유틸 사용. 템플릿 리터럴로 클래스 조합 금지
- `@apply` 사용 금지. 반복되는 패턴은 `shared/ui` 컴포넌트로 추출
- 인라인 `style` 속성 금지 (동적 계산값 제외)

---

## 도메인 규칙

### article 엔티티는 하나
소식(news)과 매거진(insight)은 **동일 엔티티**. `type: 'news' | 'insight'`로 구분.
- `entities/article`을 news용/magazine용으로 분리하지 말 것
- `widgets/article-feed`도 `type` prop으로 분기. 별도 위젯 금지
- 갈리는 것은 스키마(NewsArticle vs BlogPosting)뿐

### 네이밍
`entities/product-feature` — FSD의 `features` 레이어와 혼동 방지용. `entities/feature`로 개명 금지.

---

## 렌더링 전략
- `/`, `/features`, `/pricing` → SSG
- `/news`, `/magazine` → ISR (`revalidate: 3600`)
- `generateStaticParams`로 ko/en 두 언어 모두 빌드 시 생성

---

## 구조
> ⚠️ Next.js는 `app`과 형제 위치에 `pages`라는 이름의 폴더가 있으면 이를 레거시 Pages
> Router로 오인해 마이그레이션 호환 타입체크를 강제한다 (`next dev` 실행 시 `pages`와
> `app`이 같은 루트에 있어야 한다는 에러, 이후 `.next/dev/types` 타입 검증 오류로 이어짐).
> 그래서 Next 라우트(`app/`)와 FSD `pages` 레이어를 모두 `src/` 아래로 두되, FSD
> `pages` 레이어의 **폴더명만** `src/views/`로 피해서 사용한다. FSD 개념상으로는 여전히
> "pages 레이어"이고, import alias만 `@/views/*`다.

`src/app/[locale]/*/page.tsx`   Next 라우트 (껍데기)
`src/app/{robots,sitemap}.ts`   GEO
`src/proxy.ts`               locale 감지 → 리다이렉트 (Next 16의 middleware.ts 후속 컨벤션)
`public/llms.txt`           GEO
`src/app/`                  Next 라우트 + providers, config
`src/views/`                 FSD pages 레이어. 페이지 조합 + metadata
`src/widgets/`              header, footer, feature-showcase,
`pricing-table`, `article-feed`, `article-body`
`src/features/`             switch-locale, start-free
`src/entities/`             article, plan, product-feature
`src/shared/`               ui, seo, i18n, api, lib

---

## 금지
- 요청 없이 라이브러리 추가 (특히 상태관리, CSS-in-JS, 애니메이션)
- 기존 컴포넌트 임의 리팩터링
- 코드 설명용 주석 채우기

## 체크리스트
- [ ] `'use client'`가 정말 필요한가?
- [ ] import 방향이 단방향인가?
- [ ] 헤딩을 직접 태그로 썼는가?
- [ ] 새 페이지에 스키마와 hreflang이 있는가?
- [ ] 문자열을 하드코딩했는가?
- [ ] Tailwind 임의값을 남발했는가?