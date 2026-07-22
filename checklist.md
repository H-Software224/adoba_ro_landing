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
- [x] `widgets/article-body/*` — `fill` 이미지 3곳 `sizes` 추가, `DataTable`은 이후 `min-w-[560px]` 자체를 제거해 스크롤 없이 375px에 전부 노출되도록 재수정(아래 "보류" A그룹 참조)

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
- ~~`enterprise/ComparisonSection.tsx`의 `min-w-[560px]` 테이블~~ — 11번 섹션에서 `min-w-[560px]` 제거 + 셀 패딩 반응형 전환으로 해결 완료(사용자 확인 후 진행)
- ~~`ArticleBody.tsx`(매거진 본문)의 `min-w-[560px]` 테이블~~ — 같은 방식(`min-w-[560px]` 제거, 셀 패딩 `px-2 sm:px-4`)으로 해결 완료. 2컬럼(`요인`/`영향 방식`)뿐 아니라 문장이 긴 3컬럼 테이블(예: `/magazine/multi-language-channel`의 "구분/MLA/언어별 채널" 표)까지 `/ko/magazine/multi-language-channel`에서 375px 스크린샷으로 확인 — 스크롤 없이 전부 노출, 셀 텍스트는 2~3줄로 자연스럽게 줄바꿈됨

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

## 8. PC(1024×1176) / 모바일(375×1176) 배율 분기 재정의 계획 ✅ 2·3순위 수정 완료

기준 폭: PC 1024px, 모바일(Android+iOS 공통) 375px. 실제 코드 변경 전 우선순위만 정리.

### 브레이크포인트 전략 제안
- **PC 기준 1024px = Tailwind `lg`와 정확히 일치** — `lg`를 그대로 "PC 완성형 진입점"으로 유지
- **모바일 기준 375px = prefix 없는 기본 클래스 영역** (`sm`=640px 미만)
- 문제: `md`(768px)가 프로젝트 전체에서 0건 사용 중 → 375(모바일)에서 1024(PC)로 갈 때 중간 단계 없이 한 번에 건너뜀. 아래 "도형요소"들이 태블릿 폭(640~1024)에서 데스크톱 크기 그대로 남아 상대적으로 크고 어색해질 위험이 가장 큼
- **제안**: 기본(no prefix)=375 기준 축소값 → `sm:`=완만한 확대 시작 → `md:`=아이콘/도형 요소 축소 해제 시작점(신규 도입) → `lg:`=PC 최종값. 헤딩/본문 텍스트는 이미 `tailwind.config.ts`의 `clamp()` 기반 유동 타이포라 자체적으로 375~1024 사이를 보간하므로 폰트 크기 자체는 우선순위가 낮음 — 아래 우선순위는 **아이콘/도형(고정 px, 반응형 prefix 없음)과 카드 패딩** 위주로 잡음

아래부터는 페이지(디자인) 단위로 세분화한 우선순위. 같은 유형의 이슈라도 페이지마다 등장 빈도·노출 위치가 달라 페이지별로 다시 줄을 세움.

### 01. Main (`views/home/`) — 순위 없음, 추가 작업 불필요
이전 라운드에서 `StatsSection.tsx` 아이콘(`size-24 sm:size-[180px]`), `FeatureShowcase`/`FeatureCard.tsx`의 카드폭·아이콘을 이미 반응형으로 전환 완료. 이 페이지에 남은 고정 크기 도형 요소 없음 — 재작업 불필요.

### 02. 기능 (`views/features/`) ✅ 수정 완료
1. `CategoriesSection.tsx:24` — 아이콘 `size-12 sm:size-16 md:size-20`(48→64→80px)로 반응형 전환, 카드 패딩(`:23`)도 `p-6 sm:p-8 md:p-10`으로 함께 축소
2. `ComparisonSection.tsx:25` — 아이콘 동일 패턴 적용, 카드 패딩(`:23`)도 `p-6 sm:p-8 md:p-10`
3. `ComparisonSection.tsx:37` — `ro-mark.svg` 로고 `size-8 sm:size-10 md:size-12`(32→40→48px)로 소폭 축소, 감싸는 `span` 폭도 `w-10 sm:w-12 md:w-[67px]`로 맞춤

### 03. 요금제 (`views/pricing/`) ✅ 수정 완료
1. `widgets/pricing-table/ui/PricingCard.tsx:7` — 카드 패딩 `p-6 sm:p-8 md:p-10`로 전환 (`PlansSection.tsx`가 구독형·RP패키지 두 `PricingTable`을 렌더링하므로 최대 6장에 한 번에 반영됨)
2. `PricingCard.tsx:10` — 아이콘 컨테이너 `size-12 sm:size-14 md:size-16`(48→56→64px), 내부 아이콘 `size-6 sm:size-7 md:size-8`(24→28→32px)
3. `UsageSection.tsx:22` — 아이콘 `size-12 sm:size-16 md:size-20`(48→64→80px)로 전환

### 04. adobaRo 소식 (`views/news/`) — 사실상 작업 없음
카드 이미지(`ArticleCard.tsx`)는 이전 라운드에서 `sizes` 반영 완료. 남은 건 공유 위젯인 `ArticleFeed.tsx:59,82`의 32px 페이지네이션 화살표뿐 — 이미 작아 이 페이지 단독으로는 우선순위 없음(아래 "공유 위젯" 항목 참조)

### 05. Tip / 매거진 (`views/magazine/`) — 사실상 작업 없음
News와 동일하게 `ArticleFeed`를 공유해서 쓰므로 페이지 자체에 남은 고정 크기 요소 없음

### Enterprise (`views/enterprise/`) ✅ 수정 완료
1. `DataFlowSection.tsx:48,55` — `icon-chevron-down` 2곳 모두 `w-12 sm:w-16 md:w-20`(48→64→80px, `h-auto`로 비율 유지)로 전환
2. `ContactSection.tsx`의 24px 아이콘류 — 이미 작아 낮은 우선순위라 이번 라운드에서는 미수정

### 남겨둔 항목 (낮은 우선순위, 미수정)
- `PricingCard.tsx:11`의 32px 내부 아이콘 — 이미 작아 급하지 않음
- `widgets/feature-showcase/ui/ScrollCarousel.tsx:59,67` (Main 페이지), `widgets/article-feed/ui/ArticleFeed.tsx:59,82`(News·Magazine 공용) 32px 화살표 — 여러 페이지 공유 위젯이라 손대면 한번에 여러 페이지에 반영되지만, 이미 작아 우선순위 낮음

### 재검증 (스크린샷)
Features `CategoriesSection`을 375px/1024px에서 재확인 — 모바일은 아이콘·패딩이 더 컴팩트해졌고, PC(1024px, `md:` 이상)는 기존과 동일하게 유지됨. `PricingCard`도 모바일에서 아이콘 컨테이너·패딩이 축소된 것 확인. `npm run lint && npm run typecheck` 통과.

---

## 9. 줄바꿈(`<br>`) 관련 우선순위 — 모바일 가독성 ✅ 수정 완료

`ko.json`/`en.json` 전체에서 `t.rich(..., { br: () => <br /> })` 패턴(하드코딩 줄바꿈)을 22곳 확인. 전부 **PC 폭(1024~1360px 컨테이너) 기준으로 끊어 넣은 지점**이라, 375px 모바일에서는 그 줄 자체가 다시 한번 자동 줄바꿈되면서 "의도한 줄바꿈 + 의도치 않은 줄바꿈"이 겹쳐 부자연스럽게 잘리는 문제가 생김. 끊기 전 텍스트 길이가 길수록(대략 25자 이상) 위험도가 높고, 본문(`b1`/`b2`, 이미 여러 줄로 흐르는 문단)보다 제목(`SectionHeading`, 큰 폰트로 한 덩어리처럼 보여야 하는 문구)에서 더 눈에 띄게 어색해짐.

### 01. Main — 가장 우선순위 높음 (진입 첫 화면)
1. `home.hero.description`(`Hero.tsx`) — 4단 줄바꿈, 앞 세 줄이 각각 30~38자 내외로 김. 페이지 최상단 첫 문단이라 영향 가장 큼
2. `home.problem.description`(`ProblemSection.tsx`) — 첫 줄이 약 45자로 22곳 중 가장 김
3. `home.footer.tagline`(`Footer.tsx`) — 첫 줄 약 18자, 폰트 크기는 이미 반응형 처리했지만 줄바꿈 자체는 그대로라 재검토 필요
4. `home.problem.title`, `home.reviews.title` — 줄당 13~16자로 상대적으로 짧아 우선순위 낮음

### 02. 기능 — 두 번째 우선순위
1. `features.howto.description`(`HowToSection.tsx`) — 가운데 줄에 7개 언어권을 괄호로 나열해 45자 이상, 22곳 중 가장 긴 축에 속함
2. `features.process.description`(`ProcessSection.tsx`) — 4단 줄바꿈, 각 20~27자
3. `features.brand.description`(`BrandSection.tsx`) — 4단 줄바꿈, 각 18~27자
4. `features.wallet.description`(`WalletSection.tsx`) — 2단, 18/24자로 중간 정도
5. `features.process.title`(`ProcessSection.tsx`) — 이미 3단으로 짧게(10~11자) 끊어놔서 우선순위 낮음
6. `features.categories.title`, `features.categories.brand` — 13자 내외로 짧아 우선순위 낮음

### 03. 요금제 — 세 번째 우선순위
1. `pricing.hero.description`(`Hero.tsx`) — 첫 줄이 약 45자로 김, Hero 영역이라 노출 비중 큼
2. `pricing.plans.title`(`PlansSection.tsx`) — 19자/23자지만 `SectionHeading`(큰 clamp 폰트)이라 재줄바꿈 시 시각적으로 더 어색해 보일 수 있어 순위 상향

### 04. adobaRo 소식 / 05. Tip — 해당 없음
두 페이지의 Hero/리스트 텍스트에는 하드코딩 `<br>` 패턴이 사용되지 않음(확인 완료) — 점검 대상 없음

### Enterprise — 이번 조사에서 제외
`enterprise/*` 파일들은 `t.rich`의 `br` prop을 쓰긴 하나 `ko.json`의 `enterprise.*` 텍스트 확인 결과 실제 `<br>` 태그가 포함된 곳이 없어 이번 우선순위에서는 대상 없음(추후 재확인 권장)

### 참고 — 표(테이블) 셀 안의 줄바꿈
`features.comparison.rows.operation.adobaro`("7개 언어권 + 중국 5개 플랫폼<br></br>통합 운영") 등은 이미 8번 섹션에서 다룬 `min-w-[560px]` 고정폭 테이블 안에 있어 셀 폭 자체가 고정이므로 줄바꿈 문제가 테이블 재설계(디자인 결정 필요) 이슈와 묶여 있음 — 이번 수정 대상에서 제외

### 수정 내용
`shared/i18n/rich.tsx`에 `softBreak()` 헬퍼를 새로 만들어 22곳(파일 13개) 전체 `br: () => <br />`를 `br: softBreak`로 교체. 단순히 `<br className="hidden sm:block" />`로만 바꾸면 `display:none`이 `<br>`의 공백 역할까지 없애버려 "플랫폼으로자동"처럼 단어가 붙어버리는 새 버그가 생기는 걸 스크린샷으로 발견 — `<span className="sm:hidden"> </span>`(모바일용 공백)과 `<br className="hidden sm:block" />`(sm 이상용 줄바꿈)를 함께 렌더링하는 방식으로 수정. 로직이 19곳에 중복되는 걸 막기 위해 컴포넌트 반복 없이 `shared` 레이어에 한 곳으로 모음.

### 재검증 (스크린샷)
Home Hero 설명문을 375px/1024px에서 재확인 — 모바일은 짧은 잔여줄 없이 자연스러운 문단으로 흐르고, PC(1024px)는 기존 4단 줄바꿈 그대로 유지됨. `npm run lint && npm run typecheck` 통과.

### 참고 — 이미 이전 라운드에서 반응형 처리 완료된 것(재작업 불필요)
`StatsSection.tsx` 아이콘(`size-24 sm:size-[180px]`), `FeatureCard.tsx` 아이콘·카드폭, `Footer.tsx` 태그라인(`text-[28px] sm:text-[32px] lg:text-[40px]`), `LocaleSwitcher`/`Header`/`enterprise/Gnb`의 버튼 텍스트

---

## 10. `break-keep` 누락 — 실제 스크린샷으로 확인한 근본 원인 ✅ 수정 완료

Playwright(system Chrome)로 `localhost:3000`을 **375×1176(모바일)**과 **1024×1176(PC)**에서 실제 스크린샷을 찍어 비교. 사용자가 지적한 "줄바꿈 때문에 가독성이 떨어지는" 현상의 원인은 폰트 크기가 고정이라서가 아니라, **`word-break: keep-all`(Tailwind `break-keep`)이 프로젝트 전체에 단 한 곳도 적용되어 있지 않아** 브라우저 기본 CJK 줄바꿈 규칙대로 한글이 아무 글자 사이에서나 끊기기 때문임을 스크린샷으로 직접 확인.

### 확인된 증거
- **`views/home/ui/Hero.tsx`(모바일 375px)**: `SectionHeading`(h1) "지금 크리에이터가 겪고 있는 문제, 해답은 글로벌 진출입니다."(ProblemSection 제목) → 화면상 "글로벌 진출입니" / "다." 로 단어 중간에서 분리
- **`views/features/ui/Hero.tsx`(모바일 375px)**: 제목 "글로벌 진출의 모든 과정을 하나로" → "모든 과" / "정을 하나로"로 분리. 설명문도 "…배" / "포 모두를…"로 분리
- **`views/features/ui/CategoriesSection.tsx`(PC 1024px, `lg:grid-cols-4` 활성 구간)** — **모바일보다 PC에서 더 심하게 깨짐**: 4열 그리드라 칸당 실폭이 약 236px까지 좁아져 "글로벌 채" / "널 개설", "콘텐츠 로" / "컬라이징", "광고·브랜" / "드" / "협업 매칭"까지 전부 단어 중간 분리. 같은 카드가 모바일(1열, 전체 폭 사용)에서는 자연스러운 지점("광고·브랜드" / "협업 매칭")에서 끊김 — **즉 지금 그리드 분기는 "PC=더 넓음"이라는 가정이 이 섹션에서는 틀렸음**, 8번 섹션에서 제안한 `md:grid-cols-2` 중간 단계 도입과 직결되는 근거

### 원인
`shared/ui/SectionHeading.tsx`를 포함해 프로젝트 어디에도 `break-keep`/`word-break: keep-all`이 없음(grep 확인, 0건). 한글은 기본적으로 글자 단위로 줄바꿈 가능하기 때문에, 컨테이너 폭이 좁아질수록(모바일) 혹은 그리드 칸이 좁아질수록(위 CategoriesSection처럼 PC에서도 발생 가능) 단어 중간에서 끊길 확률이 올라감

### 수정 내용
`src/app/globals.css`의 `body` 셀렉터에 `word-break: keep-all;` 한 줄 추가 — `SectionHeading` 컴포넌트뿐 아니라 `p`/`text-b1`~`b3` 등 본문 텍스트까지 전부 포함해서 전역 적용됨(컴포넌트 단위가 아니라 body 레벨로 잡아 범위 문제 자체가 해소됨).

### 수정 후 재검증 (스크린샷)
- Features Hero(모바일 375px): "모든 과정을" 온전한 단어로 줄바꿈됨(기존 "모든 과" / "정을" 분리 해소), 설명문 "배포"도 정상
- Features `CategoriesSection`(PC 1024px, `lg:grid-cols-4`): "채널", "로컬라이징", "브랜드" 전부 온전한 단어로 줄바꿈됨. 단, "광고 · 브랜드" 카드는 칸 폭이 좁아(236px) 여전히 3줄로 감 — 이건 별개의 그리드 폭 이슈(8번 섹션에서 이미 다룸), 오늘 고친 단어 쪼개짐 버그와는 무관
- `npm run lint && npm run typecheck` 통과 확인

---

## 11. Enterprise 재점검 (Frame 36048 포함) ✅ 감사 완료 + 일부 수정

10번(`break-keep`)·9번(`<br>`) 수정이 사이트 전역/`t.rich` 사용 여부에 달려 있어, Enterprise만 따로 다시 스크린샷으로 전수 점검(Hero → DataFlowSection → CustomizationSection → 비교표 → FAQ → ContactSection → ContactForm, 375px 전체).

### 1순위 `break-keep` — 이미 해결됨, 추가 작업 없음
전역 `body` CSS라 Enterprise에도 자동 적용됨. 실제 스크린샷에서 Hero/FAQ/ContactSection 전부 단어 쪼개짐 없이 정상 줄바꿈 확인. `break-all` 등으로 덮어쓰는 곳도 없음(grep 확인).

### 2순위 아이콘/도형 크기 — 1차 점검에서 놓친 부분 재발견 및 수정
1차 점검 때 `DataFlowSection.tsx`의 chevron 아이콘만 보고 "완료"로 표기했는데, **같은 파일 안의 커넥터 아이콘과 카드 패딩, `FaqSection.tsx`의 아이콘들을 전부 놓쳤음**을 재검증하며 발견 — Figma 기준 고정 px 값을 그대로 쓴 채 반응형 클래스가 아예 없던 곳들이었음.
1. **`DataFlowSection.tsx`의 카드 4곳**(`px-10 py-14` 고정 패딩) — ✅ `px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-14`로 전환
2. **`DataFlowSection.tsx`의 `icon-plus-connector.svg`** — ✅ 1차로 크기만 `sm:size-8 md:size-14` 반응형 전환했으나, 원래 `hidden sm:block`이라 **모바일에서는 아예 안 보이는 문제**를 스크린샷으로 재발견(카드 사이 간격에 아무 표시도 없음, 바로 아래 chevron 화살표들과 비교하면 눈에 띄게 어색함). `hidden`을 제거해 전 breakpoint에서 노출하고 `size-8 sm:size-10 md:size-14`(32→40→56px)로 재조정 — 모바일 `absolute left-1/2 top-1/2` 중앙 정렬이 1열 스택 레이아웃에서도 카드 사이 간격에 자연스럽게 위치함을 확인
3. **`FaqSection.tsx`의 +/− 토글 아이콘**(`size-8`=32px 고정) — ✅ `size-6 sm:size-7 md:size-8`(24→28→32px)로 전환
4. **`FaqSection.tsx`의 `icon-arrow-right.svg`**(24px, `sizes` prop조차 없었음) — ✅ `size-5 md:size-6`(20→24px)로 전환
5. **`ContactSection.tsx`의 24px 아이콘 3곳**(전화/메일/건물) — ✅ `size-5 md:size-6`(20→24px)로 전환 (직전 라운드에 완료)
6. **`ComparisonSection.tsx`(enterprise) 테이블 헤더 로고 2개**(Figma "Group 1192") — 재검증 결과 단순 "고정 크기라 재설계와 묶어서 보류" 수준이 아니라 **`logo-youtube-studio.png`가 `hidden lg:flex`로 1024px 미만에서 완전히 렌더링 자체가 안 되는 버그**였음(데이터 행은 보이는데 헤더가 통째로 빈 칸). ✅ 두 로고 모두 `hidden` 제거 + 반응형 크기로 수정: `logo-youtube-studio.png`는 `w-20 sm:w-[100px] lg:w-[132px]`, `logo-enterprise-full.png`는 `h-8 sm:h-10 lg:h-[52px]`
7. **테이블 자체의 `min-w-[560px]`** — 로고 수정 후 재확인하니 핵심(enterprise) 열이 모바일 기본 화면에 아예 안 보이고 가로 스크롤을 해야만 나타나는 문제 발견(이 비교표의 요지가 "enterprise가 더 낫다"인데 그 열이 안 보임). 사용자 확인 후 ✅ `min-w-[560px]` 제거 + 각 셀 패딩(`px-10`→`px-4 sm:px-6 lg:px-10` 등)과 라벨 열 `whitespace-nowrap`도 `sm:` 이상에서만 적용되도록 반응형 전환 — 375px에서 스크롤 없이 3열 전부 노출(텍스트는 더 많이 줄바꿈됨), 1024px(PC)는 기존 한 줄 레이아웃 그대로 유지
7. `StrengthsSection.tsx`/`ReportHighlightsSection.tsx`/`CustomizationSection.tsx` — 아이콘 없는 순수 텍스트·불릿 구조라 해당 없음

### 3순위 `<br>` — 이미 해결됨, 추가 작업 없음
`ko.json`의 `enterprise.*`와 `views/enterprise/*.tsx`의 `t.rich`/`br` 사용처 재확인 — 하드코딩 `<br>` 없음(`StrengthsSection.tsx`의 `t.rich`는 `accent` prop만 사용).

### 재검증 (스크린샷)
`DataFlowSection` 375px: 카드 패딩이 눈에 띄게 컴팩트해짐. 1차 수정 직후 재확인 중 "+" 커넥터 아이콘이 모바일에서 `hidden` 때문에 완전히 안 보이는 걸 발견해 추가로 수정(위 2번 항목 참조) — 재재검증 결과 카드 사이 간격에 32px 크기로 정상 노출됨. 1024px(PC): "+" 커넥터 아이콘(56px)과 카드 패딩이 기존 디자인 그대로 유지됨. `FaqSection` 375px: "+" 아이콘과 `ContactSection` 아이콘 모두 작아진 것 확인. `npm run lint && npm run typecheck` 통과.

---

## 12. Enterprise PC(1024px) 레이아웃 붕괴 ✅ 수정 완료

`min-w-[560px]` 테이블 수정 이후에도 "PC(1024px)에서 텍스트·도형 가변성이 안 보인다"는 재확인 요청으로 Enterprise 전체 페이지를 375px/1024px/1440px fullpage 스크린샷으로 다시 훑음. 아이콘 크기 문제가 아니라 **레이아웃 붕괴** 2건을 발견 — 둘 다 Figma가 넓은 캔버스(1440~1920px) 기준으로 만들어진 요소가 "PC 최소 기준"인 1024px에서는 검증되지 않았던 케이스.

### 발견 1 — `CustomizationSection.tsx`: 알약 리스트가 제목 컬럼을 잠식
`lg:w-[460px]` 알약 4개가 최대 `lg:ml-[360px]` 계단식 마진까지 겹쳐 총 폭 820px를 차지 → 1024px 뷰포트(콘텐츠 영역 ~880px)에서 제목(`flex-1`) 컬럼에 남는 공간이 60px 수준. 결과: "원하는 / 형태로 / 리포트 / 커스터마이징"처럼 거의 한 단어씩 줄바꿈.
- ✅ 수정: `lg`~`xl`(1024~1279px) 구간엔 축소된 알약 폭(`lg:w-[280px] lg:px-6`)과 축소된 계단식 마진(`lg:ml-0/40/80/120px`)을 적용하고, `xl:`(1280px)부터 Figma 원본 값(`xl:w-[460px] xl:px-10`, `xl:ml-0/120/240/360px`) 그대로 복원
- 재검증: 1024px에서 제목이 의도한 2줄("원하는 형태로" / "리포트 커스터마이징")로 정확히 나옴, 알약 텍스트도 잘리지 않음. 1440px은 기존 디자인 그대로 유지

### 발견 2 — `StrengthsSection.tsx`: 코드가 Figma 컬럼 비율과 다르게 구현됨
Figma 원본은 텍스트 컬럼(592) : 리스트 컬럼(375) ≈ 3:2 비율인데, 코드는 `lg:grid-cols-2`(정확히 50:50)로 구현되어 있어 제목 컬럼이 원래보다 좁았음. h2가 clamp 상한(52px)에 도달한 상태에서 "YouTube Studio를 넘어서는"이 그 좁은 컬럼에 들어가지 못해 줄바꿈이 계속 겹침.
- ✅ 수정: 그리드 비율을 Figma 실측값 그대로 `grid-cols-[592fr_375fr]`로 교정 + `CustomizationSection`과 같은 이유로 2단 전환 자체도 `lg`가 아닌 `xl`(1280px)부터 적용 — 1024~1279px 구간은 1열로 쌓여 제목이 전체 폭을 다 씀
- 재검증: 1024px에서 제목이 의도한 2줄("YouTube Studio를 넘어서는" / "MCN 전용 AI 분석 솔루션")로 정확히 나옴. 1440px에서는 Figma 비율(592:375) 그대로 2단 레이아웃 확인

### 참고
두 건 모두 원인이 "아이콘이 고정 크기라서"가 아니라 **1024px이 `lg` 브레이크포인트 발동 시점과 겹치면서 넓은 화면 전제로 짠 고정폭/고정비율 요소가 정확히 이 구간에서만 무너지는 문제**였음. 이후 비슷한 2단 레이아웃을 새로 만들 때는 1024px에서 별도로 확인 필요. `npm run lint && npm run typecheck` 통과, 모바일(375px) 영향 없음 재확인.

## 확인 방법 메모
- 실기기 또는 Chrome DevTools 디바이스 모드 (iPhone SE 375px, iPhone 14 Pro 393px, 일반 안드로이드 360px 기준)
- Lighthouse Mobile 리포트 (Performance / Accessibility 탭)
- `next dev` 실행 후 각 페이지를 위 세 가지 폭에서 직접 스크롤하며 확인

---

## 13. "무료로 시작하기" 등 CTA 버튼 — 기기별 링크 분기 ✅ 구현 완료

01~05 전 페이지의 Hero/Footer/Header "무료로 시작하기"(및 News의 "이벤트 참여하기", Magazine의 "adobaRo에서 실행해보기") 버튼을 PC/Android/iOS 기기별로 다른 링크로 분기:
- PC: `https://adobaro.com`
- Android: `https://play.google.com/store/apps/details?id=com.adoba.adobaro&pcampaignid=web_share`
- iOS: `https://apps.apple.com/kr/app/adobaro/id6756643937`

### 구현 방식 (사용자 확인 후 진행)
기기 판별은 요청이 와야 아는 정보라 서버(`next/headers`)에서 판별하면 해당 페이지가 SSG/ISR을 못 쓰고 매 요청 동적 렌더링으로 바뀌는 문제가 있어, **클라이언트측 판별**로 결정. `features/start-free/ui/StartFreeButton.tsx`를 `'use client'`로 전환:
- SSR/SSG 시점엔 `navigator`가 없으므로 PC 링크(`adobaro.com`)로 렌더링 — 정적 생성 유지, 크롤러·무자바스크립트 환경에서도 유효한 링크
- 하이드레이션 직후 `useSyncExternalStore`로 실제 `navigator.userAgent`를 읽어 OS별 링크로 교체
- 처음엔 `useEffect`+`setState` 패턴으로 구현했으나 `react-hooks/set-state-in-effect` lint 규칙에 걸림(`eslint-disable` 주석도 통과 안 됨) — 브라우저 전용 값 동기화에 맞는 `useSyncExternalStore`(구독 불필요라 `subscribe`는 no-op)로 교체해 해결
- `views/news/ui/Hero.tsx`는 기존에 `StartFreeButton`을 안 쓰고 `https://adobaro.com`을 직접 하드코딩한 별도 `<Button>`이었음 — 로직 중복을 피하려고 `StartFreeButton`으로 교체

### 검증
Playwright로 User-Agent를 Android/iOS/PC로 바꿔가며 실제 렌더링된 `<a href>` 확인 — Home/News/Magazine 전부 기기별로 정확한 링크가 나오는 것 확인. `npm run build`로 SSG 상태도 재확인(단, `/`, `/features`, `/pricing`, `/news`, `/magazine`이 이미 이번 변경과 무관하게 `ƒ`(Dynamic)로 표시되는 걸 발견 — `git stash`로 격리 테스트한 결과 이번 작업 이전부터 있던 기존 상태였음, 범위 밖이라 별도 보고만 하고 손대지 않음). `npm run lint && npm run typecheck` 통과.

### 참고 — 별도 확인 필요(범위 밖, 보고만 함)
`npm run build` 결과 `/[locale]`, `/[locale]/features`, `/[locale]/pricing`, `/[locale]/news`, `/[locale]/magazine`이 CLAUDE.md에 명시된 SSG/ISR이 아니라 전부 `ƒ`(Dynamic, 매 요청 서버 렌더링)로 나옴. `/[locale]/enterprise`만 `●`(SSG)로 정상. 오늘 변경 전(`git stash`) 상태에서도 동일했으므로 이번 세션에서 만든 문제는 아니지만, CLAUDE.md의 렌더링 전략과 실제 빌드 결과가 어긋나 있어 원인 확인이 필요함(예: `next-intl`의 로케일 감지 방식, 혹은 다른 서버 전용 API 사용 여부).
