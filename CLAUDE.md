# adobaRo Landing

## 배경
adobaRo는 AI 기반 글로벌 크리에이터 확장 서비스(다국어 로컬라이징 + 멀티플랫폼 배포).
이 리포는 **마케팅 랜딩**이며 본 서비스(https://adobaro.com)와 별개다.
"무료로 시작하기" CTA는 본 서비스로의 **외부 리다이렉트**다. 내부 라우팅으로 바꾸지 말 것.

> **GEO 트레이드오프**: 이 리포는 원래 Next.js App Router 기반 SSG/ISR였고 "모든 콘텐츠가
> 원본 HTML에 존재해야 GEO(생성형 엔진 최적화)에 유리하다"가 최우선 요구사항이었다. 이후
> 별도 프로젝트(본 서비스 앱)와 툴체인을 맞추기 위해 **Vite + React 클라이언트 SPA로
> 전환**하기로 결정했고(2026-07-23), 이는 사용자가 명시적으로 승인한 트레이드오프다.
> CSR이므로 JS를 실행하지 않는 크롤러(GPTBot·ClaudeBot·PerplexityBot 등)에게는 초기 HTML에
> 콘텐츠가 없다 — GEO 관점에서 이전보다 불리해졌다는 점을 새 세션은 인지하고 있어야 한다.

## 스택
Vite · React 19 · TypeScript · Tailwind CSS · react-i18next · react-router-dom · FSD
데이터 페칭은 컴포넌트에서 직접 처리(현재 실제 CMS 연동 없음, 정적 mock 데이터). **React Query 도입 금지.**

`package.json`의 dependencies/devDependencies는 본 서비스 앱(`adoba_ro_v3`)의 목록과
의도적으로 맞춰져 있다 — `antd`, `mobx`, `firebase`, `googleapis`, `@paddle/paddle-js`,
`echarts`, `react-rnd`, `lottie-react` 등은 **이 랜딩 코드에서 실제로 쓰이지 않는다**
(설치만 됨). 이 패키지들을 보고 실제 사용 중이라 가정하지 말 것. 예외적으로
`tailwindcss`/`@tailwindcss/postcss`/`clsx`/`tailwind-merge`(스타일링 유지),
`eslint-plugin-boundaries`(FSD 린트 유지), `pretendard`/`@types/node`(빌드 필수)는
목록에 없어도 추가로 설치되어 있다.

## 명령어
```bash
npm run dev         # 개발 서버 (vite)
npm run build        # 프로덕션 빌드 + sitemap.xml/robots.txt 생성 (scripts/generate-seo-files.js)
npm run preview       # 빌드 결과 로컬 프리뷰
npm run lint          # ESLint (FSD boundaries 포함)
npm run typecheck     # tsc --noEmit
npm run translations  # ko.json/en.json 키 동기화 검증
```
작업 완료 전 `npm run lint && npm run typecheck` 통과 필수.

## 환경 변수
- `VITE_SITE_URL` — hreflang · sitemap 생성용 (Vite는 `VITE_` 접두사만 클라이언트에 노출)
- `VITE_CMS_API_KEY` — 소식/매거진 페칭용 (현재 미사용, 자리만 유지)
- `.env.local` 커밋 금지

---

## 절대 규칙

### 1. CSR SPA — RSC 개념 없음
Next.js App Router의 React Server Components는 더 이상 존재하지 않는다. 모든 컴포넌트가
브라우저에서 렌더링되므로 `'use client'` 지시어도 쓰지 않는다(의미 없음). 위 GEO 트레이드오프
문단 참고 — 이 구조를 "서버 렌더링으로 되돌려야 하나"라는 질문이 나오면, 그건 되돌리는 게 아니라
별도의 SSR 프레임워크(Vike 등)로 재전환하는 것에 가깝다는 점을 사용자에게 알릴 것.

### 2. FSD import 방향 (단방향)

pages → widgets → features → entities → shared
- 역방향 import 금지
- 동일 레이어 간 import 금지 (widgets/header ↛ widgets/footer)
- 크로스 임포트가 필요하면 상위 레이어에서 조합
- 슬라이스는 `index.ts`로만 노출. 내부 경로 직접 import 금지 (린트로 강제되지 않음 — 리뷰에서 확인)
- `eslint-plugin-boundaries`가 레이어 방향 위반을 차단 (`eslint.config.mjs`)

### 3. 라우트는 `src/app/router.tsx`에서 조합
Next 라우트 파일 껍데기 컨벤션은 없다. 대신 `src/app/router.tsx`가 `createBrowserRouter`로
전체 라우트 트리를 구성하고, 각 라우트의 `element`는 `src/views/*`의 페이지 컴포넌트를
그대로 가리킨다. 라우트 정의 파일(`router.tsx`, `LocaleLayout.tsx`, `MainLayout.tsx`)에는
페이지 고유 로직·JSX를 넣지 말 것 — 조합만 담당.

### 4. 헤딩은 SectionHeading으로만
`<h1>`~`<h6>` 직접 사용 금지. `shared/ui/SectionHeading`의 `level` prop 사용.
- 페이지당 `h1` 1개. 레이아웃이 아닌 각 페이지에서 선언
- 레벨 건너뛰기 금지 (h2 → h4 ✗)

### 5. 새 페이지 = 스키마 필수
`shared/seo/schemas`의 적절한 스키마를 `JsonLd`로 주입. 매핑은 `shared/seo/schemas/README.md` 참조.
CSR이므로 이 스키마는 JS 실행 후에만 DOM에 존재한다(§1 GEO 트레이드오프 참고) — 그래도 검색엔진
리치 리절트나 JS를 실행하는 크롤러에는 여전히 유효하니 계속 주입할 것.

### 6. 메타데이터는 `useDocumentMeta` 훅으로
`generateMetadata`(Next)는 없다. 대신 각 뷰의 `src/views/*/model/metadata.ts`가
`use{View}Meta()` 훅을 export하고, 해당 페이지 컴포넌트가 최상단에서 이 훅을 호출해
`shared/lib/useDocumentMeta`를 통해 `document.title`/`<meta description>`/hreflang을
마운트 시점에 채운다. `alternates`는 반드시 `buildAlternates()` 사용 (hreflang ko/en/x-default).

### 7. i18n
- 하드코딩된 한국어/영어 문자열 금지. 전부 `shared/i18n/messages/{ko,en}.json`
- 두 파일의 키는 항상 동기화 (`npm run translations`로 검증)
- `next-intl`은 없다. `getTranslations`/`useTranslations`/`getLocale`은
  `@/shared/i18n/compat`가 제공하는 next-intl 호환 shim(i18next 기반)이다.
  `t.rich()`/`t.markup()`/`t.raw()`도 이 shim이 재구현한 것이니 시그니처를 임의로
  next-intl 문서와 다르게 확장하지 말 것 — 메시지 JSON의 `<tag></tag>`/`{placeholder}`
  파싱 규칙이 `compat.ts`의 정규식에 고정되어 있다.
- 내부 링크는 `@/shared/i18n/navigation`의 `Link`/`usePathname`/`useRouter`/`useLocale` 사용
  (react-router-dom 기반, locale 세그먼트를 자동으로 붙임). `react-router-dom`의 `Link`를
  직접 쓰면 locale prefix가 빠지니 금지.

### 8. 외부 링크
adobaro.com 등 외부 링크는 `next/link`류 대신 plain `<a>`:
```tsx
<a href="https://adobaro.com" target="_blank" rel="noopener noreferrer">
```

### 9. Tailwind
- 임의값(`w-[327px]`) 지양. 디자인 토큰은 `tailwind.config.ts`의 theme에 정의
- 조건부 클래스는 `cn()` 유틸 사용. 템플릿 리터럴로 클래스 조합 금지
- `@apply` 사용 금지. 반복되는 패턴은 `shared/ui` 컴포넌트로 추출
- 인라인 `style` 속성 금지 (동적 계산값 제외)
- `package.json`에 `antd`/`less`가 설치돼 있지만 스타일링은 여전히 전량 Tailwind다.
  antd 컴포넌트를 새 UI에 끌어오지 말 것 (§ 스택 문단 참고).

---

## 도메인 규칙

### article 엔티티는 하나
소식(news)과 매거진(insight)은 **동일 엔티티**. `type: 'news' | 'insight'`로 구분.
- `entities/article`을 news용/magazine용으로 분리하지 말 것
- `widgets/article-feed`도 `type` prop으로 분기. 별도 위젯 금지
- 갈리는 것은 스키마(NewsArticle vs BlogPosting)뿐

### 네이밍
`entities/product-feature` — FSD의 `features` 레이어와 혼동 방지용. `entities/feature`로 개명 금지.

### next/image 대체
`next/image`는 없다. `shared/ui/Image`가 `src`/`alt`/`width`/`height`/`fill`/`sizes`/`priority`/
`className` 서브셋만 지원하는 plain `<img>` 래퍼다. 빌드타임 최적화(포맷 변환·리사이즈)는
하지 않으니 새로 추가하는 이미지는 미리 적절한 크기/포맷으로 준비할 것.

---

## 렌더링 전략
- 전 라우트가 CSR (Vite SPA, 서버 렌더링 없음)
- `ko`/`en` 두 로케일 모두 `/:locale` 라우트 세그먼트로 클라이언트에서 분기 (사전 빌드 시
  로케일별 정적 페이지를 따로 생성하지 않음)
- `npm run build` 이후 `scripts/generate-seo-files.js`가 `dist/sitemap.xml`·`dist/robots.txt`를
  정적 생성 (Next의 `src/app/{sitemap,robots}.ts` 대체)

---

## 구조

`src/app/router.tsx`         라우트 트리 (`createBrowserRouter`)
`src/app/LocaleLayout.tsx`    `:locale` 검증 + 전역 JsonLd + i18n 언어 전환
`src/app/MainLayout.tsx`      Header/Footer 래핑 레이아웃
`src/app/globals.css`        Tailwind 진입점
`src/index.tsx`              앱 엔트리 (`createRoot` + `RouterProvider`)
`index.html`                 Vite 엔트리 HTML
`vite.config.ts`             빌드 설정 + `@/*` alias
`scripts/generate-seo-files.js`  빌드 후 sitemap/robots 생성
`scripts/build-translations.js`  ko/en 키 동기화 검증
`public/llms.txt`            GEO (여전히 유지 — JS 없이도 읽히는 정적 파일이라 CSR 전환의 영향을 받지 않음)
`src/views/`                 FSD pages 레이어. 페이지 조합 + `model/metadata.ts`(useMeta 훅)
`src/widgets/`               header, footer, feature-showcase,
`pricing-table`, `article-feed`, `article-body`
`src/features/`              switch-locale, start-free
`src/entities/`              article, plan, product-feature
`src/shared/`                ui, seo, i18n(`compat.ts`/`navigation.tsx`/`i18n.ts`), api, lib

---

## 금지
- 요청 없이 라이브러리 추가 (특히 상태관리, CSS-in-JS, 애니메이션) — `package.json`에
  이미 설치된 antd/mobx/framer-motion 등을 "설치돼 있으니 써도 된다"고 판단하지 말 것,
  용도가 다른 프로젝트와의 의존성 동기화이지 사용 승인이 아니다
- 기존 컴포넌트 임의 리팩터링
- 코드 설명용 주석 채우기

## 체크리스트
- [ ] `@/shared/i18n/compat`/`@/shared/i18n/navigation`을 안 쓰고 i18next/react-router-dom을 직접 불렀는가?
- [ ] import 방향이 단방향인가?
- [ ] 헤딩을 직접 태그로 썼는가?
- [ ] 새 페이지에 스키마·`useDocumentMeta`·hreflang이 있는가?
- [ ] 문자열을 하드코딩했는가?
- [ ] Tailwind 임의값을 남발했는가?
- [ ] package.json에 있다는 이유로 antd/mobx 등을 실사용으로 끌어왔는가?
