# 모바일 호환성 체크리스트 — adobaRo 랜딩

프로젝트 실제 구조(Tailwind config, 컴포넌트, layout)를 기준으로 작성됨.
2차에 걸쳐 우선순위 순으로 수정 반영 완료 — 아래 체크된 항목은 코드에 실제 반영됨.

---

## 0. 장치별 분기 구현 현황 (데스크톱 구현 완료 → 모바일 구현 필요)

- [x] `widgets/header/ui/Header.tsx` — `flex-col gap-3` 모바일 / `lg:flex-row lg:h-[72px]` 데스크톱으로 이미 분기됨
- [x] `views/home/ui/ComparisonSection.tsx` — `flex-col` 모바일 / `lg:flex-row` 데스크톱, 행 내부도 `sm:grid sm:grid-cols-2` 단계 존재
- [x] `views/home/ui/FaqSection.tsx` — `flex-col` 모바일 / `lg:flex-row` 데스크톱
- [x] `widgets/pricing-table/ui/PricingTable.tsx` — `grid-cols-1` 모바일 / `lg:grid-cols-3` 데스크톱
- [x] `widgets/article-feed/ui/ArticleFeed.tsx`, `ArticleCard.tsx` — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3(or 4)`로 이미 3단계 분기됨
- [x] `views/home/ui/StatsSection.tsx` — `h-[231px]` 고정 → `min-h-[140px] sm:h-[231px]`로 반응형 전환, 아이콘도 `size-24 sm:size-[180px]`로 축소
- [x] `features/switch-locale/ui/LocaleSwitcher.tsx`, `widgets/header/ui/Header.tsx`의 `StartFreeButton` — `min-h-11`(44px) 적용으로 터치 타겟 기준 충족
- [x] `widgets/feature-showcase/ui/FeatureCard.tsx` (`w-[560px]` 고정폭) → `w-[280px] sm:w-[400px] lg:w-[560px]`로 반응형 전환. `ScrollCarousel.tsx`의 `overflow-x-hidden`(터치 스와이프 차단 버그) → `overflow-x-auto`로 수정
- [x] `views/enterprise/*` — `Hero`/`FaqSection`/`Gnb`/`ComparisonSection`/`ContactForm`/`ContactSection`/`CustomizationSection`/`DataFlowSection`/`ReportHighlightsSection`/`StrengthsSection` 11개 파일 전수 감사 완료. `Gnb`(터치 타겟·폰트·sizes), `ComparisonSection`(스크롤 힌트), `Hero`/`StrengthsSection`(dvh)만 실제 수정 필요했고 나머지는 이미 정상 반응형이었음
- [x] `views/features/*` — `BrandSection`/`WalletSection`/`HowToSection`/`CategoriesSection`/`Hero` 확인 및 `sizes`·`dvh` 반영. `views/magazine/*` — `Hero`/`ListSection` `dvh` 반영
- [x] `widgets/article-body/*` — `fill` 이미지 3곳 `sizes` 추가, `DataTable`(`min-w-[560px]`) 스크롤 힌트 추가

---

## 1. 반응형 레이아웃 (breakpoint, viewport)

- [x] `viewport` meta 태그 — Next.js 기본값 정상 주입 확인, 커스텀 설정 불필요 판단
- [ ] `md`(768px) 브레이크포인트 미사용으로 인한 640~1024px 구간 — 실기기 확인 필요 (하단 "보류" C그룹 참조)
- [ ] `xl`(1280px) 1곳만 사용 — 정보성, 현재 문제로 확인된 바 없음
- [x] `NavMenu.tsx` 가로 스크롤 시각 힌트 — 오른쪽 페이드 그라디언트(`lg:hidden`) 추가
- [x] `body`의 `overflow-x-hidden` — 원인이었던 `FeatureCard`/`StatsSection` 고정폭 요소들을 반응형으로 고쳐 실질 위험 해소
- [ ] 375px 최소 폭 줄바꿈/겹침 — 실기기 확인 필요 (하단 C그룹)
- [ ] locale(ko/en) 텍스트 길이 차이로 인한 레이아웃 깨짐 — 실기기 확인 필요 (하단 C그룹)

## 2. 터치 타겟 크기 (버튼, 링크 최소 44px)

- [x] `shared/ui/Button.tsx` 기본 버튼 — 통과
- [x] `ArticleFeed.tsx` 페이지네이션 버튼(48px) — 통과
- [x] `LocaleSwitcher.tsx` — `min-h-11` 적용으로 수정 완료
- [x] `NavMenu.tsx` 링크 — `min-h-11 inline-flex items-center` 적용으로 수정 완료
- [x] `ArticleCard.tsx` "+" 버튼(56px) — 통과
- [x] `Footer.tsx` SNS 아이콘 — `size-8`(32px) → `size-11`(44px)로 수정 완료
- [x] 인접 타겟 간격(gap-2=8px 등) — 통과

## 3. 폰트/텍스트 가독성 (모바일 최소 폰트 크기)

- [x] `tailwind.config.ts` `fontSize` clamp 하한 — `b1`(18px)/`b2`(16px) 통과, **`b3`는 15px→16px로 상향 수정 완료**
- [x] `LocaleSwitcher`/`Header`/`enterprise/Gnb`의 고정 13px 폰트 — 전부 14px 이상으로 수정 완료
- [x] body `line-height: 1.5` — 통과
- [ ] 제목(`h1`~`h3`) `line-height: 1`의 모바일 줄바꿈 시 겹침 — 실기기 확인 필요 (하단 C그룹)
- [x] `letter-spacing: -0.0225em` — `b3`에 한해 `-0.01em`으로 완화 수정 완료 (다른 사이즈는 Figma 값 유지)
- [x] 다크 배경 텍스트 대비 — Footer `text-white/80` on `#111111` 대비비 12.12:1 계산 확인, 통과

## 4. 이미지/미디어 최적화 (반응형 이미지, lazy loading)

- [x] `next/image` `sizes` 누락 — `fill` 8곳 + 반응형 크기 변경 이미지(`StatsSection`/`FeatureCard`/`BrandSection`/`WalletSection`/`HowToSection`/`enterprise Gnb`) 전부 추가 완료. 렌더 크기가 고정인 로고/아이콘류는 의도적으로 제외(추가해도 효과 없음)
- [x] `next.config.ts` avif/webp 포맷 설정 — 통과
- [x] Hero `priority` — 전 페이지 확인 완료, 통과
- [x] 정적 이미지 용량 — magazine PNG 7개(1.4~2.3MB) → JPEG 변환(52~191KB, 92% 감소) 완료
- [x] `aspect-ratio` 컨테이너 — 통과
- [x] Footer 로고 고정 크기 — 통과

## 5. 성능 (모바일 네트워크 기준 로딩 속도)

- [x] SSG/ISR 렌더링 전략 — `news`/`magazine` `revalidate=3600` 리터럴 선언 확인, 통과
- [x] `'use client'` 컴포넌트 개수 — 6개(`LocaleSwitcher`/`CountUp`/`enterprise/ContactForm`/`ArticleFeed`/`ScrollCarousel`/`NavMenu`) 확인 완료
- [x] Pretendard `font-display` — 패키지 CSS에 이미 전부 `font-display: swap` 설정되어 있음을 확인, **수정 불필요(애초에 문제 아니었음)**
- [ ] Lighthouse Mobile LCP/CLS/INP 실측 — 수동 측정 필요 (하단 C그룹)
- [ ] `ArticleFeed` 클라이언트 페이지네이션 — **의도적으로 미수정.** 서버 사이드 전환은 아티클 수 증가 계획이 있어야 정당화되는 아키텍처 변경이라 보류 (하단 B그룹 참조)
- [x] 외부 링크 `rel="noopener noreferrer"` — 통과

## 6. 접근성 (viewport meta, 터치 제스처)

- [x] viewport 확대 제한 없음 — 통과, 유지
- [x] `NavMenu` 키보드 포커스 — 네이티브 포커스 가능 요소라 문제 없음 확인
- [x] 아이콘 버튼 `aria-label` — 전부 확인 완료, 통과
- [x] `ScrollCarousel` 터치 대체 수단 — 스와이프 차단 버그 수정으로 버튼이 "유일한 수단"이 아닌 "대체 수단"으로 정상화
- [x] `aria-current={boolean}` 버그 — `LocaleSwitcher.tsx`(2곳)·`ArticleFeed.tsx`(1곳) 전부 `'page'`/`'true'`/`undefined`로 수정 완료
- [ ] 모바일 스크린리더(VoiceOver/TalkBack) 실사용 테스트 — 수동 확인 필요 (하단 C그룹)

---

## 보류 / 추가 논의 필요 항목

### A. 디자인 확정이 필요함
- **`enterprise/ComparisonSection.tsx`, `ArticleBody.tsx`의 `min-w-[560px]` 테이블** — 스크롤 페이드 힌트는 추가했지만, 가로 스크롤 유지 vs 모바일 전용 카드형 재설계는 여전히 미결정. 리디자인 규모라 디자이너/기획 논의 필요

### B. 성능 트레이드오프 / 아키텍처 결정이 필요함
- **`ArticleFeed.tsx`의 클라이언트 페이지네이션** — 모든 페이지 아티클을 `hidden` 클래스로 DOM에 유지 중. 아티클 수가 지금(6~11개) 수준에서는 무해. 서버 사이드로 바꾸려면 URL 쿼리 설계 등 아키텍처 변경이 필요해 아티클 수 증가 계획 확인 후 결정

### C. 실기기/수동 QA가 필요함 (코드 수정으로 해결 불가)
- `md`(768px) 브레이크포인트 미사용으로 인한 640~1024px 태블릿 구간 레이아웃 확인
- `SectionHeading` 등 375px 최소 폭에서 줄바꿈/겹침 여부 (전 페이지)
- locale(`ko`/`en`) 텍스트 길이 차이로 인한 모바일 전용 레이아웃 깨짐 여부
- 제목 계열(`h1`~`h3`) `line-height: 1`이 모바일 줄바꿈 시 실제로 붙어 보이는지
- Lighthouse Mobile LCP/CLS/INP 실측
- VoiceOver/TalkBack 스크린리더 실사용 테스트

### D. 참고
- `next/image`에 추가한 `sizes` 값들은 컨테이너 max-width 기준 추정치임 — 실기기/DevTools Network 탭에서 재조정 여지 있음

---

## 7. Figma 디자인 페이지 ↔ 코드 레이아웃 대응 관계

Figma 파일(`qsPRE1pthkz7s6zHnBd52J`) workspace의 5개 "디자인" 프레임 + `Frame 36048`을 실제 코드(`src/views/*`)와 1:1 대조한 결과. 전부 구조적으로 정확히 매칭되며, 빠지거나 순서가 어긋난 섹션은 없음을 확인.

### 01. Main - 디자인 (`58:422`) ↔ `src/views/home/`
| Figma 섹션 | 코드 컴포넌트 |
|---|---|
| Hero | `Hero.tsx` |
| Section 1 (문제 제기 + 4개 카드) | `ProblemSection.tsx` |
| Section 2 (통계: 1-2일/0일/45억명/8개) | `StatsSection.tsx` |
| Section 3 (직접 진행 vs adobaRo 비교) | `ComparisonSection.tsx` |
| Section 4 (크리에이터 후기) | `ReviewsSection.tsx` |
| Section 5 (FAQ) | `FaqSection.tsx` |
| Footer - KR | `widgets/footer` |

### 02. 기능 - 디자인 (`12:405`) ↔ `src/views/features/`
| Figma 섹션 | 코드 컴포넌트 |
|---|---|
| Hero | `Hero.tsx` |
| Section 2 (Agent에게 지시 카테고리 4개) | `CategoriesSection.tsx` |
| Section 3 (업로드→로컬라이징→배포 플로우) | `ProcessSection.tsx` |
| Section 4 (해외 진출 시작 방법, 채팅 목업) | `HowToSection.tsx` |
| Section 5 (브랜드 협업, 포트폴리오) | `BrandSection.tsx` |
| Section 6 (지갑/수익 통합 관리) | `WalletSection.tsx` |
| Section 7 (기존 vs adobaRo 비교표, "수익 정산" 라벨 포함) | `ComparisonSection.tsx` |
| Section 8 (FAQ) | `FaqSection.tsx` |
| Footer - KR | `widgets/footer` |

### 03. 요금제 - 디자인 (`58:791`) ↔ `src/views/pricing/`
| Figma 섹션 | 코드 컴포넌트 |
|---|---|
| Hero | `Hero.tsx` |
| Section 3 (Agent 고용 월구독형: Lite/Boost/Max + RP 패키지 단건구매) | `PlansSection.tsx` — `getSubscriptionPlans`/`getRpPackages` 두 데이터를 `PricingTable` 2개로 렌더링, 확인 완료 |
| Section 4 (RP 사용처: 채널생성/현지화업로드/포트폴리오 등) | `UsageSection.tsx` |
| Section 5 (FAQ) | `FaqSection.tsx` |
| Footer - KR | `widgets/footer` |

### 04. adobaRo 소식 - 디자인 (`37:12879`) ↔ `src/views/news/`
| Figma 섹션 | 코드 컴포넌트 |
|---|---|
| Hero | `Hero.tsx` |
| Section 3 (혜택/소식 카드 6개 + Pagination) | `ListSection.tsx` (+ `widgets/article-feed`) |
| Footer - KR | `widgets/footer` |

FAQ 섹션이 Figma에 없고 코드에도 없음 — 일치.

### 05. Tip - 디자인 (`32:1339`) ↔ `src/views/magazine/`
| Figma 섹션 | 코드 컴포넌트 |
|---|---|
| Hero ("adobaRo 인사이트 매거진") | `Hero.tsx` |
| Section 3 (아티클 카드 2행×4열 + Pagination) | `ListSection.tsx` (+ `widgets/article-feed`, `columns={4}` `pageSize={8}`) |
| Footer - KR | `widgets/footer` |

### `Frame 36048`
workspace 검색 결과 5개 "디자인" 프레임에는 속하지 않고, **`Enterprise`** 최상위 프레임(`142:318`) → `Frame 36029`(데이터 흐름 다이어그램 섹션) 안의 하위 요소였음. 텍스트가 "YouTube 공식 API / 공식 채널·영상 데이터"로, `src/views/enterprise/ui/DataFlowSection.tsx`의 `t('steps.youtubeApi.title')` 박스와 정확히 일치. `DataFlowSection.tsx`는 4단계(YouTube API + 연동 데이터 → 자사 데이터 센터 → 방향성 제시)를 이미 코드로 구현하고 있어 이 하위 요소도 반영되어 있음을 확인.

---

## 8. PC(1024×1176) / 모바일(375×1176) 배율 분기 재정의 계획 — 계획만, 코드 미수정

기준 폭: PC 1024px, 모바일(Android+iOS 공통) 375px. 실제 코드 변경 전 우선순위만 정리.

### 브레이크포인트 전략 제안
- **PC 기준 1024px = Tailwind `lg`와 정확히 일치** — `lg`를 그대로 "PC 완성형 진입점"으로 유지
- **모바일 기준 375px = prefix 없는 기본 클래스 영역** (`sm`=640px 미만)
- 문제: `md`(768px)가 프로젝트 전체에서 0건 사용 중 → 375(모바일)에서 1024(PC)로 갈 때 중간 단계 없이 한 번에 건너뜀. 아래 "도형요소"들이 태블릿 폭(640~1024)에서 데스크톱 크기 그대로 남아 상대적으로 크고 어색해질 위험이 가장 큼
- **제안**: 기본(no prefix)=375 기준 축소값 → `sm:`=완만한 확대 시작 → `md:`=아이콘/도형 요소 축소 해제 시작점(신규 도입) → `lg:`=PC 최종값. 헤딩/본문 텍스트는 이미 `tailwind.config.ts`의 `clamp()` 기반 유동 타이포라 자체적으로 375~1024 사이를 보간하므로 폰트 크기 자체는 우선순위가 낮음 — 아래 우선순위는 **아이콘/도형(고정 px, 반응형 prefix 없음)과 카드 패딩** 위주로 잡음

아래부터는 페이지(디자인) 단위로 세분화한 우선순위. 같은 유형의 이슈라도 페이지마다 등장 빈도·노출 위치가 달라 페이지별로 다시 줄을 세움.

### 01. Main (`views/home/`) — 순위 없음, 추가 작업 불필요
이전 라운드에서 `StatsSection.tsx` 아이콘(`size-24 sm:size-[180px]`), `FeatureShowcase`/`FeatureCard.tsx`의 카드폭·아이콘을 이미 반응형으로 전환 완료. 이 페이지에 남은 고정 크기 도형 요소 없음 — 재작업 불필요.

### 02. 기능 (`views/features/`) — 이번 계획에서 가장 우선순위 높은 페이지
1. `CategoriesSection.tsx:24` — 아이콘 `width={80} height={80}` 고정, 카테고리 카드 4개 반복. 같은 카드의 `CategoriesSection.tsx:23` `p-10` 패딩도 고정이라 아이콘·패딩 함께 축소
2. `ComparisonSection.tsx:25` — 아이콘 `width={80} height={80}` 고정, 비교 행 5개 반복. `ComparisonSection.tsx:23`의 `p-10` 패딩도 동일하게 고정
3. `ComparisonSection.tsx:37` — `ro-mark.svg` 로고 `width={48} height={48}` — 범례용이라 완전 축소보다 소폭 축소 권장(가독성 고려)

### 03. 요금제 (`views/pricing/`) — 두 번째 우선순위
1. `widgets/pricing-table/ui/PricingCard.tsx:7` — `p-10` 고정 패딩. `PlansSection.tsx`가 구독형·RP패키지 두 `PricingTable`을 렌더링하므로 이 카드 하나만 고쳐도 이 페이지의 카드 전부(최대 6장)에 반영됨 — 페이지 내 영향 범위가 가장 큼
2. `PricingCard.tsx:10` — `size-16`(64px) 고정 아이콘 컨테이너 + 내부 `width={32}` 아이콘
3. `UsageSection.tsx:22` — 아이콘 `width={80} height={80}` 고정, RP 사용처 항목 4개 반복. (이 섹션은 카드 패딩 자체가 없어 아이콘만 대상)
4. `PricingCard.tsx:11`의 32px 내부 아이콘 — 이미 작아 급하지 않음, 최하순위로 남김

### 04. adobaRo 소식 (`views/news/`) — 사실상 작업 없음
카드 이미지(`ArticleCard.tsx`)는 이전 라운드에서 `sizes` 반영 완료. 남은 건 공유 위젯인 `ArticleFeed.tsx:59,82`의 32px 페이지네이션 화살표뿐 — 이미 작아 이 페이지 단독으로는 우선순위 없음(아래 "공유 위젯" 항목 참조)

### 05. Tip / 매거진 (`views/magazine/`) — 사실상 작업 없음
News와 동일하게 `ArticleFeed`를 공유해서 쓰므로 페이지 자체에 남은 고정 크기 요소 없음

### Enterprise (`views/enterprise/`) — 세 번째 우선순위
1. `DataFlowSection.tsx:48,55` — `icon-chevron-down` `width={80} height={24}` 고정 2곳 (다이어그램 단계 연결용, 페이지 내 유일하게 남은 반복 요소)
2. `ContactSection.tsx`의 24px 아이콘류(전화/메일/건물) — 이미 작아 낮은 우선순위

### 공유 위젯 — 특정 페이지 소속이 아니라 여러 페이지에 걸쳐 영향
- `widgets/feature-showcase/ui/ScrollCarousel.tsx:59,67` (Main 페이지에서 사용) — 32px 화살표, 이미 작아 낮은 우선순위
- `widgets/article-feed/ui/ArticleFeed.tsx:59,82` (News·Magazine 공용) — 32px 화살표, 동일하게 낮은 우선순위
- 이 둘은 한 곳만 고치면 여러 페이지에 동시 반영되므로, 손대게 되면 다른 우선순위 작업과 묶어 한 번에 처리하는 게 효율적

### 참고 — 이미 이전 라운드에서 반응형 처리 완료된 것(재작업 불필요)
`StatsSection.tsx` 아이콘(`size-24 sm:size-[180px]`), `FeatureCard.tsx` 아이콘·카드폭, `Footer.tsx` 태그라인(`text-[28px] sm:text-[32px] lg:text-[40px]`), `LocaleSwitcher`/`Header`/`enterprise/Gnb`의 버튼 텍스트

## 확인 방법 메모
- 실기기 또는 Chrome DevTools 디바이스 모드 (iPhone SE 375px, iPhone 14 Pro 393px, 일반 안드로이드 360px 기준)
- Lighthouse Mobile 리포트 (Performance / Accessibility 탭)
- `next dev` 실행 후 각 페이지를 위 세 가지 폭에서 직접 스크롤하며 확인
