# 모바일 호환성 체크리스트 — adobaRo 랜딩

프로젝트 실제 구조(Tailwind config, 컴포넌트, layout)를 기준으로 작성됨.
아직 아무 것도 수정하지 않았음 — 확인/점검용 체크리스트.

---

## 1. 반응형 레이아웃 (breakpoint, viewport)

- [ ] `viewport` meta 태그 확인 — Next.js 기본값(`width=device-width, initial-scale=1`)이 주입되고 있음(확인됨). 커스텀 `viewport` export가 없으므로 확대/축소 제한(`maximumScale`, `userScalable`) 등 의도적 설정이 필요한지 검토
- [ ] 사용 중인 브레이크포인트가 `sm`(640px), `lg`(1024px) 중심이고 **`md`(768px)는 프로젝트 전체에서 한 번도 사용되지 않음** — 640~1024px 사이 태블릿 구간에서 레이아웃이 어색하게 끼거나 깨지는 화면이 없는지 각 페이지에서 실기기/에뮬레이터로 확인
- [ ] `xl`(1280px)은 단 1곳에서만 사용됨 — 데스크톱 대형 화면 대응이 `lg` 이후 전부 고정폭에 의존하고 있지 않은지 확인
- [ ] `src/widgets/header/ui/NavMenu.tsx`의 모바일 내비게이션이 햄버거 메뉴 없이 `overflow-x-auto` 가로 스크롤 방식임 — 메뉴 항목이 늘어날 경우 잘림/스크롤 유도 시각 힌트(그라디언트 등) 없이 사용자가 스크롤 가능함을 인지하기 어려울 수 있음, 실기기에서 확인
- [ ] `body`에 `overflow-x-hidden`이 전역 적용되어 있음(`src/app/[locale]/layout.tsx`) — 특정 섹션에서 요소가 뷰포트 밖으로 넘칠 때 가로 스크롤 대신 콘텐츠가 잘리는지, 의도한 동작인지 확인
- [ ] `SectionHeading`(h1~h6) 및 각 섹션 컴포넌트가 375px(iPhone SE급 최소 폭) 기준에서 줄바꿈이 어색하거나 겹치는 곳이 없는지 페이지별 확인 (`/`, `/features`, `/pricing`, `/news`, `/magazine`, `/enterprise`)
- [ ] `next-intl` locale별(`ko`/`en`) 텍스트 길이 차이로 인해 모바일에서만 레이아웃이 깨지는 지점이 없는지 (특히 영어가 더 길어지는 버튼/뱃지류) 확인

## 2. 터치 타겟 크기 (버튼, 링크 최소 44px)

- [ ] `shared/ui/Button.tsx` 기본 버튼(`px-8 py-4` + `text-b3`)은 약 54px 높이로 44px 기준 충족 — 통과
- [ ] `widgets/article-feed/ui/ArticleFeed.tsx` 페이지네이션 버튼(`size-12` = 48px)은 기준 충족 — 통과
- [ ] `features/switch-locale/ui/LocaleSwitcher.tsx`의 `default` variant는 모바일에서 `px-2 py-1 text-[13px]`로 패딩이 작음 — 실측 높이가 44px 미만일 가능성 있어 확인 필요 (`sm:` 이상에서만 `px-3`로 커짐)
- [ ] `widgets/header/ui/NavMenu.tsx`의 내비게이션 링크가 별도 패딩 없이 텍스트 자체 라인하이트에만 의존함 — 탭 가능 영역이 좁아 오탭 유발 가능성 확인
- [ ] `widgets/article-feed/ui/ArticleCard.tsx`의 "+" 확장 버튼(`size-14` = 56px)은 기준 충족 — 통과
- [ ] `widgets/footer/ui/Footer.tsx`의 SNS 아이콘 링크(`size-8` = 32px 컨테이너, 아이콘 24px)는 44px 미만 — 터치 타겟이 작으므로 확인 필요 (아이콘 크기가 아니라 탭 가능 영역 자체가 작음)
- [ ] 인접한 터치 타겟 간 최소 간격(8px 권장) 확보 여부 — 특히 Footer SNS 아이콘 `gap-2`(8px)와 Header 내비게이션 `gap-6`/`gap-12` 확인

## 3. 폰트/텍스트 가독성 (모바일 최소 폰트 크기)

- [ ] `tailwind.config.ts`의 `fontSize`가 전부 `clamp()` 기반 유동 타이포그래피임 — 각 사이즈의 모바일 하한값이 실제로 16px(1rem) 미만으로 내려가지 않는지 확인:
  - `b1`: 최소 1.125rem(18px) — 통과
  - `b2`: 최소 1rem(16px) — 경계값, 통과
  - `b3`: 최소 0.9375rem(15px) — **16px 미만, 버튼/캡션 등 본문에 쓰일 경우 가독성 확인 필요**
- [ ] `LocaleSwitcher`의 `text-[13px]`(모바일)/`text-[14px]`(sm 이상)는 고정 px 값으로 clamp 시스템 밖에 있음 — 13px는 일반적 모바일 가독성 최소 기준(보통 14~16px 권장)보다 작아 확인 필요
- [ ] 본문 텍스트의 `line-height`가 `b1`/`b2`/`b3` 모두 `1.5`로 통일되어 있음 — 통과
- [ ] 제목 계열(`h1`~`h3`)의 `line-height: 1`이 모바일 좁은 폭에서 줄바꿈 시 글자가 서로 붙어 보이지 않는지 확인 (특히 한글 받침/영문 디센더)
- [ ] `letter-spacing: -0.0225em`(음수 트래킹)이 작은 화면·작은 폰트 크기에서 글자가 과도하게 붙어 보이지 않는지 확인
- [ ] 다크 배경 위 텍스트(Footer `#111111` 배경의 `text-white/80`, Enterprise 섹션 등)의 명도 대비가 모바일 야외 환경에서도 읽히는 수준인지 확인

## 4. 이미지/미디어 최적화 (반응형 이미지, lazy loading)

- [ ] **`next/image` 사용처 28곳 중 `sizes` prop을 지정한 곳이 0곳** — `fill`을 쓰는 5곳을 포함해 전부 `sizes` 미지정 상태로, 기본값(`fill`은 100vw, 고정 크기는 실제 렌더 크기 무시)에 의해 모바일에서 불필요하게 큰 srcset 이미지가 다운로드될 가능성이 있음. 페이지별 실제 렌더 크기에 맞는 `sizes` 지정 검토
- [ ] `next.config.ts`의 `images.formats: ['image/avif', 'image/webp']` 설정은 되어 있음 — 통과 (모바일 브라우저 대부분 AVIF/WebP 지원)
- [ ] Above-the-fold 히어로 이미지(각 페이지 최상단)에 `priority` prop이 적용되어 있는지, 반대로 스크롤 하단 이미지(뉴스/매거진 카드 등)는 기본 lazy loading(모든 `next/image`의 기본 동작)이 의도대로 적용되는지 확인
- [ ] `public/images/news/`, `public/images/magazine/` 등 정적 PNG 자산의 실제 파일 용량 확인 — 일부 477×700 PNG가 300~500KB대로, 모바일 3G/4G 기준 로딩 지연 요인이 될 수 있어 WebP/AVIF 우선 서빙 외에 원본 압축 여지 확인
- [ ] `ArticleCard.tsx`의 `aspect-[3/4]`(news) / `aspect-square`(insight) 컨테이너가 실제 모바일 그리드(`grid-cols-1 sm:grid-cols-2`)에서 이미지 비율 깨짐 없이 유지되는지 확인
- [ ] Footer 로고(`ro-mark-white.png`)처럼 고정 `width`/`height`를 준 이미지가 실제 표시 크기와 일치해 불필요한 다운스케일이 없는지 확인

## 5. 성능 (모바일 네트워크 기준 로딩 속도)

- [ ] `/`, `/features`, `/pricing`은 SSG, `/news`, `/magazine`은 ISR(`revalidate: 3600`)로 서버 렌더링 전략은 확인됨 — 통과 (모바일에서도 클라이언트 JS 없이 초기 콘텐츠 표시 가능)
- [ ] `'use client'` 컴포넌트가 `LocaleSwitcher` 외에 얼마나 있는지 재확인 — 클라이언트 번들 크기가 모바일 저사양 기기 하이드레이션 시간에 영향
- [ ] Pretendard 폰트가 `globals.css`에서 `@import`로 전체 웹폰트(Regular, SemiBold)를 로드함 — 모바일에서 FOUT/FOIT 여부 및 폰트 파일 용량 확인, `font-display` 전략 점검
- [ ] Lighthouse Mobile 기준 LCP/CLS/INP 측정 — 특히 히어로 섹션 이미지·유동 폰트(`clamp`) 렌더링으로 인한 레이아웃 시프트(CLS) 여부 확인
- [ ] `ArticleFeed.tsx`가 `'use client'`로 전체 카드 목록을 클라이언트에 내려보내고 페이지네이션을 클라이언트 상태로 처리함 — 모바일에서 초기 페이로드에 전체 아티클(6~11개)이 한번에 포함되는 구조라 데이터量 증가 시 확인 필요
- [ ] 외부 링크(`adobaro.com` 리다이렉트, SNS 링크 등)가 `target="_blank"`로 새 탭/앱 전환 시 모바일 브라우저에서 지연 없이 동작하는지 확인

## 6. 접근성 (viewport meta, 터치 제스처)

- [ ] `viewport` meta에 `maximum-scale`/`user-scalable=no` 등 확대를 막는 설정이 **없음** — 이는 접근성 관점에서 오히려 바람직함(사용자 핀치 줌 허용), 의도치 않게 추가되지 않도록 유지
- [ ] `NavMenu`의 가로 스크롤 영역이 스크린리더/키보드 포커스 이동 시 자연스럽게 순회되는지, `overflow-x-auto` 영역에 대한 포커스 트랩이나 스와이프 전용 UX가 아닌지 확인
- [ ] 모든 아이콘 전용 버튼(Footer SNS, 페이지네이션 화살표, ArticleCard "+" 버튼)이 `aria-label`을 갖고 있는지 확인 — 코드상 대부분 지정되어 있음(재확인 필요), 이미지 `alt=""`는 장식용으로 의도된 것인지 점검
- [ ] 터치 제스처(스와이프 등)에 의존하는 UI(`ScrollCarousel` 등)에 대응하는 버튼/키보드 대체 조작 수단이 있는지 확인
- [ ] `aria-current`가 `LocaleSwitcher`, `NavMenu`, 페이지네이션 등에서 실제로 boolean이 아닌 `"page"`/`"true"` 문자열 규격에 맞게 렌더링되는지 확인 (`aria-current={isActive}`처럼 boolean을 바로 넘기면 DOM에 `aria-current="true"`/`"false"`로 렌더되어 `false`일 때도 속성이 남는 문제가 있을 수 있음)
- [ ] 모바일 스크린리더(VoiceOver/TalkBack)로 주요 페이지(`/`, `/pricing`, `/news`) 실사용 테스트

---

## 확인 방법 메모
- 실기기 또는 Chrome DevTools 디바이스 모드 (iPhone SE 375px, iPhone 14 Pro 393px, 일반 안드로이드 360px 기준)
- Lighthouse Mobile 리포트 (Performance / Accessibility 탭)
- `next dev` 실행 후 각 페이지를 위 세 가지 폭에서 직접 스크롤하며 확인
