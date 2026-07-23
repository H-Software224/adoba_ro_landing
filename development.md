# adobaRo Landing 개발 과정 기록

이 문서는 프로젝트 진행 중 수행한 작업을 과정별로 정리한 개발 일지입니다.
체크리스트 형태의 항목별 상태는 `checklist.md`를 참고하고, 이 문서는 "왜 이렇게 됐는지 / 어떤 과정을 거쳤는지"에 초점을 둡니다.

---

## 1. 소식(News) 페이지 로케일별 이미지 검증

`/news` 페이지의 각 카드 이미지가 KO/EN 로케일에 맞게 정확히 렌더링되는지 확인. 처음엔 EN으로 전환했을 때 이미지가 "롤백"되는 것처럼 보이는 문제가 있었으나, 재확인 결과 개발 서버 캐시로 인한 일시적 현상이었고 실제 코드에는 문제가 없었음(사용자 확인 완료).

또한 소식 카드에 있던 "+" 버튼 옆의 북동쪽 화살표 버튼을 전부 제거(단, "+" 버튼은 유지) — EN 전환 시에도 해당 버튼이 사라지도록 KO/EN 양쪽 다 반영.

---

## 2. 모바일 호환성 체크리스트 최초 작성 (`checklist.md`)

실제 프로젝트 구조(Tailwind 설정, 컴포넌트, 레이아웃)를 기준으로 6개 카테고리(반응형 레이아웃, 터치 타겟, 폰트/가독성, 이미지 최적화, 성능, 접근성)에 대한 점검표를 코드 수정 없이 순수 조사만으로 작성. 이후 사용자가 실제 디바이스 기준을 PC(1024×1176) / 모바일(375×1176, 이후 iOS·Android 공통 기준)로 명확히 하면서 우선순위를 페이지(Figma 디자인) 단위로 세분화.

전체 `src/` 코드를 체크리스트와 대조해 pass/fail 표로 진단(코드 수정 없이 조사만 수행) → 이후 우선순위(1~7순위)에 따라 실제 수정 진행. 수정하기 너무 크거나 논의가 필요한 항목은 A(디자인 확정 필요)/B(성능 트레이드오프)/C(실기기 QA 필요)/D(참고)로 분류해 별도 보류.

---

## 3. "코드로 직접 스크린샷 찍어서 비교해봐" — 진짜 원인 발견

사용자가 "375×1176, 1024×1176 두 배율로 실제 스크린샷을 찍어서 비교해보라"고 명시적으로 요청. Playwright(로컬 Chrome 채널)를 scratchpad에 설치해 실제 브라우저 스크린샷으로 검증을 시작한 게 이 세션 전체의 방법론적 전환점이 됨 — 이후 모든 반응형 작업은 "코드만 보고 판단"이 아니라 "실제 렌더링 결과를 스크린샷으로 확인 후 결론" 방식으로 진행.

이 과정에서 사용자가 정정: "`<br>` 이야기가 아니라 텍스트 크기가 가변적이지 않아서 줄바꿈이 생기는 것"이라고 명확히 함. 실제 스크린샷 비교 결과 **진짜 원인은 폰트 크기가 아니라 `word-break: keep-all`이 프로젝트 전체에 단 한 곳도 적용되어 있지 않다는 것**이었음 — 한글이 CJK 기본 규칙대로 아무 글자 사이에서나 끊겨 보이는 현상.

### 수정
- `src/app/globals.css`의 `body` 셀렉터에 `word-break: keep-all;` 한 줄 추가 — 컴포넌트 단위가 아니라 body 레벨로 잡아 전역 해결
- 재검증(스크린샷): Features Hero의 "모든 과" / "정을" 분리 → "모든 과정을" 온전한 단어로 수정 확인. `CategoriesSection`(PC 1024px, `lg:grid-cols-4`)에서는 오히려 **모바일보다 PC가 더 심하게 깨졌던** 것도 확인 — "PC=더 넓다"는 가정이 4열 그리드에서는 틀렸다는 근거가 됨

---

## 4. 아이콘/도형 크기 반응형 전환 (2순위)

Figma가 1440px 데스크톱 기준으로 만들어진 고정 px 아이콘/카드 패딩이 375~1024 사이(특히 `md`가 프로젝트 전체에서 미사용이라 640~1024 구간)에서 그대로 남아있던 문제.

- `views/features/ui/CategoriesSection.tsx`, `ComparisonSection.tsx`: 아이콘 `size-12 sm:size-16 md:size-20`(48→64→80px), 카드 패딩 `p-6 sm:p-8 md:p-10`
- `widgets/pricing-table/ui/PricingCard.tsx`, `views/pricing/ui/UsageSection.tsx`: 동일 패턴
- `views/enterprise/ui/DataFlowSection.tsx`: `icon-chevron-down` 반응형 전환
- `BrandSection.tsx`/`WalletSection.tsx`/`HowToSection.tsx`: `next/image`에 누락된 `sizes` prop 추가

---

## 5. `<br>` 하드코딩 줄바꿈 반응형 처리 (3순위)

`ko.json`/`en.json` 전체에서 `t.rich(..., { br: () => <br /> })` 패턴 22곳(파일 13개) 확인 — 전부 PC 폭(1024~1360px) 기준으로 끊어 넣은 지점이라 375px 모바일에서 다시 한번 자동 줄바꿈되며 부자연스럽게 겹치는 문제.

### 수정
`src/shared/i18n/rich.tsx`에 `softBreak()` 헬퍼 신규 작성:
```tsx
export function softBreak() {
  return (
    <>
      <span className="sm:hidden"> </span>
      <br className="hidden sm:block" />
    </>
  )
}
```
22곳의 `br: () => <br />`를 `br: softBreak`로 교체. 중간에 실제 버그 발견: `<br className="hidden sm:block" />`만 쓰면 `display:none`이 `<br>`의 공백 역할까지 없애버려 "플랫폼으로자동"처럼 단어가 붙어버림 — `span`으로 모바일 공백을 별도로 보강해 해결.

---

## 6. Enterprise 페이지 재점검 — Figma 대비 가변성 누락 발견

사용자가 "Figma 디자인하고 도형 요소에서 가변성 고려 안 한 거 같다"고 지적. 재검증 결과 1차 점검에서 놓친 것들 발견:

1. **`DataFlowSection.tsx`**: 카드 4곳의 고정 패딩(`px-10 py-14`) 반응형 전환 + `icon-plus-connector.svg`가 원래 `hidden sm:block`으로 **모바일에서 아예 안 보이던 버그** 발견(카드 사이 간격에 아무 표시도 없었음) → `hidden` 제거, `size-8 sm:size-10 md:size-14`로 반응형 전환
2. **`FaqSection.tsx`(enterprise)**: +/− 토글 아이콘, `icon-arrow-right.svg`(sizes prop조차 없었음) 반응형 전환
3. **`ComparisonSection.tsx`(enterprise)**: 사용자가 "Frame 36048 → Frame 35982 → Group1192" Figma 경로를 짚어줘서 확인한 결과, `logo-youtube-studio.png`가 `hidden lg:flex`로 **1024px 미만에서 완전히 렌더링 자체가 안 되는 버그**였음(비교표의 요지가 "enterprise가 더 낫다"인데 그 열이 안 보이는 심각한 문제) → `hidden` 제거 + 반응형 크기 전환
4. **테이블의 `min-w-[560px]`**: 로고 수정 후에도 enterprise 열이 스크롤해야만 보이는 문제 발견 → 사용자가 AskUserQuestion으로 "min-w 제거(가장 간단)" 선택 → 제거 + 셀 패딩 반응형 전환
5. **`ArticleBody.tsx`(매거진 본문) `DataTable`**: 동일한 `min-w-[560px]` 패턴 → 같은 방식으로 수정, 3컬럼 테이블(`/magazine/multi-language-channel`)까지 스크린샷으로 검증

---

## 7. Enterprise PC(1024px) 레이아웃 붕괴 — 2건

`min-w-[560px]` 수정 후에도 "PC에서 가독성이 떨어진다"는 재확인 요청으로 375/1024/1440 fullpage 스크린샷 재조사. 아이콘 크기가 아니라 **레이아웃 자체가 붕괴**하는 버그 2건 발견 — 둘 다 Figma가 1440~1920px 캔버스 기준으로 만들어져 "PC 최소 기준"인 1024px에서는 검증되지 않았던 케이스:

1. **`CustomizationSection.tsx`**: `lg:w-[460px]` 알약 4개가 `lg:ml-[360px]` 계단식 마진까지 겹쳐 총 폭 820px 차지 → 1024px 뷰포트(콘텐츠 영역 ~880px)에서 제목 컬럼에 60px밖에 안 남아 거의 한 단어씩 줄바꿈. `lg`~`xl` 구간에 축소된 값을, `xl`부터 Figma 원본 값을 적용해 해결
2. **`StrengthsSection.tsx`**: Figma 원본은 텍스트:리스트 컬럼이 592:375(≈3:2)인데 코드는 `lg:grid-cols-2`(50:50)로 구현되어 제목 컬럼이 원래보다 좁았음 → `grid-cols-[592fr_375fr]`로 교정 + 2단 전환 자체도 `xl`부터 적용

---

## 8. CTA 버튼 기기별 링크 분기 구현

"무료로 시작하기" 등 전 페이지 CTA를 PC/Android/iOS별로 다른 링크로 분기(PC: adobaro.com, Android: Play스토어, iOS: App스토어).

### 아키텍처 결정
기기 판별을 서버(`next/headers`)에서 하면 SSG/ISR이 깨지는 문제가 있어, **클라이언트측 판별**로 결정(AskUserQuestion으로 사용자 확인). `features/start-free/ui/StartFreeButton.tsx`를 `'use client'`로 전환:
- SSR/SSG 시점엔 PC 링크로 렌더링(정적 생성 유지, 무자바스크립트/크롤러 환경에서도 유효)
- 하이드레이션 직후 `useSyncExternalStore`로 실제 `navigator.userAgent` 읽어 교체
- 처음엔 `useEffect`+`setState`로 구현했으나 `react-hooks/set-state-in-effect` 린트 규칙에 걸려 `useSyncExternalStore`로 교체
- 중간에 `suppressHydrationWarning`으로 우회를 시도했으나, 이게 오히려 **클라이언트 값이 반영되지 않고 서버 값이 그대로 유지되는** 정반대 효과였음을 Playwright User-Agent 테스트로 발견 → 제거

### 검증
Playwright로 User-Agent를 Android/iOS/PC로 바꿔가며 실제 렌더링된 `<a href>` 확인. 이후 여러 차례 재확인 요청에서, 사용자가 Chrome DevTools로 테스트할 때 **"Responsive" 모드로 전환해도 이전 기기(Galaxy 등)의 User-Agent 오버라이드가 그대로 남아있어서** 화면 크기와 무관하게 이전 기기 링크가 계속 나오는 현상을 발견 — 코드 문제가 아니라 DevTools 상태 문제로 확인, `Cmd+Shift+M`으로 기기 도구모음을 껐다 켜서 해결.

---

## 9. SSG/Dynamic 렌더링 불일치 — 근본 원인 추적 및 수정

CTA 버튼 작업 중 `npm run build` 결과 `/`, `/features`, `/pricing`, `/news`, `/magazine`이 CLAUDE.md 명시대로 SSG/ISR이 아니라 전부 `ƒ`(Dynamic)로 나오는 걸 발견. `git stash`로 격리 테스트한 결과 이번 세션 작업과 무관한 기존 상태였음을 먼저 확인(범위 밖으로 보고만 하고 넘어감).

이후 사용자가 "SSG 불일치 원인부터 확인, 코드 수정하지 말고. GNB랑 관련된 거야?"라고 재차 요청 → next-intl 라이브러리 소스(`getLocale.js` → `getConfig.js` → `RequestLocale.js`)를 직접 추적:
```js
async function getRequestLocale() {
  return getCachedRequestLocale() || (await getLocaleFromHeader());
}
```
캐시된 로케일이 없으면 `next/headers`의 `headers()`를 호출하는데, 정적 생성 중 `headers()` 호출은 `DYNAMIC_SERVER_USAGE`를 던져 라우트 전체를 동적 렌더링으로 강제 전환시킴. 프로젝트 전체에서 `getLocale()`을 호출하는 곳은 `widgets/footer/ui/Footer.tsx` 한 곳뿐이었고(SNS 아이콘 로케일 분기용), 이 Footer를 5개 페이지가 공유하는 `(main)/layout.tsx`가 쓰다 보니 5곳 전부 영향을 받았던 것.

**결론**: GNB(Header) 자체는 무죄, 같은 레이아웃의 **Footer**가 원인. 사용자 확인 후 진행.

### 수정
`Footer`가 `getLocale()`을 직접 부르는 대신, 부모 `(main)/layout.tsx`가 라우트 `params`에서 이미 알고 있는 `locale`을 prop으로 전달받도록 변경. UI/렌더링 결과는 완전히 동일, 렌더링 시점만 정적으로 복원. `npm run build` 결과 5개 라우트 전부 `●`(SSG)로 전환 확인(news/magazine은 `revalidate=3600` ISR 유지).

---

## 10. 모바일 GNB(Header) 재설계

### 요청 배경
Figma 디자인(`home.adobaro.com_2026` 파일)에서 모바일 헤더 순서가 "adobaRo, world_button(드롭다운 KO/EN), 햄버거 UI(기능/요금제/소식/매거진), 무료로 시작하기"로 되어 있어, 기존의 "adobaRo, KO/EN 필, 무료로 시작하기" + 별도 줄의 가로 스크롤 네비게이션과 다름.

### 구현
- Figma `get_design_context`로 `world_button`(지구본 아이콘), `menu-01`(햄버거 아이콘) 에셋 추출 → `public/images/icons/`에 저장
- `LocaleSwitcher.tsx`에 `icon-dropdown` variant 추가(지구본 아이콘 + 버튼 아래 드롭다운) — AskUserQuestion으로 "드롭다운 패널" 방식 확정
- `widgets/header/ui/MobileNavMenu.tsx` 신규 작성 — 햄버거 아이콘 + 드롭다운으로 4개 메뉴 노출
- `Header.tsx`를 완전히 재구성: 모바일은 로고→햄버거→world_button→CTA 한 줄, 데스크톱은 기존 그대로(`lg:` 분기로 완전 보존)
- 부수적으로 발견/수정: NavMenu의 `lg:gap-12`가 EN 텍스트(더 김)에서 1024px 헤더를 깨뜨리는 것 발견 → `lg:gap-6 xl:gap-12`로 조정

### 이후 요청에 따른 추가 변경
1. world_button 드롭다운과 햄버거 위치를 서로 바꿔달라는 요청 → 로고→햄버거→world_button 순으로 재배치
2. "world_button 드롭다운을 기존 KO/EN 슬라이딩 노브 토글로 바꿀 수 있냐"는 요청 → 드롭다운 UI를 완전히 제거하고 데스크톱과 동일한 토글 스위치로 교체(모바일에서는 축소 크기 64×28px). 이 과정에서 CTA 버튼이 좁아진 공간 때문에 세로 한 글자씩 깨지는 회귀가 생겨 gap 축소로 재조정
3. "무료로 시작하기" 버튼 텍스트가 375px에서 줄바꿈되는 문제 → `whitespace-nowrap` + 폰트 11px로 한 줄 유지
4. 더 이상 쓰이지 않게 된 `icon-dropdown` variant, `icon-world.svg` 에셋은 정리(삭제)

---

## 11. PC(1024px+) KO/EN 슬라이딩 토글 스위치 구현

기존 KO/EN 필(pill) 형태를 iOS 스타일 슬라이딩 노브 토글로 변경(AskUserQuestion으로 "슬라이딩 노브형" 확정). `LocaleSwitcher.tsx`의 기본 variant를 `role="switch"` 단일 버튼으로 교체 — 트랙 안에 KO/EN 라벨이 항상 보이고 어두운 노브가 활성 로케일 쪽으로 슬라이드.

Enterprise의 `pill-dark` variant도 동일한 토글 방식(`toggle-dark`)으로 교체 — 다크 배경에 맞춰 흰색 노브.

부수 발견: 이 작업의 스크린샷 검증 중 1024px에서 로고·네비·토글이 딱 붙는(gap 0px) 레이아웃 붕괴 발견 — EN 텍스트가 KO보다 길어서 정확히 `lg`(1024px) 구간에서 콘텐츠가 넘쳤던 것. `NavMenu` gap과 헤더 패딩을 `lg`/`xl` 구간별로 재조정.

이후 "KO/EN 토글 default가 KO로 나오게 해달라"는 요청에 대해서는, 실제로는 이미 `routing.ts`의 `defaultLocale: 'ko'`로 정상 동작 중임을 확인 — AskUserQuestion으로 원하는 노브 방향(KO=왼쪽, EN=오른쪽)을 재확인한 결과 "현재와 동일, 변경 없음"으로 결론. 이후 사용자가 `LocaleSwitcher.tsx`의 `isEn = locale === 'en'`을 `'ko'`로 바꿔달라고 요청했을 때는, 그렇게 하면 토글이 거꾸로 뒤집힌다는 걸 설명하고 코드는 그대로 유지.

---

## 12. Hero 섹션 상단 정렬 — 스크롤 리빌 이펙트 재검토

### 발견 경위
"375×1176일 때 Hero에서 스크롤하는 과정에서 내용이 상단에 위치해야 할 거 같다, 여백도 조절해야 할 거 같다"는 요청으로 스크린샷 재조사. 5개 페이지 Hero 전부 `min-h-[140dvh]` + `sticky ... h-dvh items-center` 구조였는데, 콘텐츠가 세로 중앙 정렬되다 보니 모바일에서 헤더 바로 아래 200~250px의 빈 공백이 생기고, pin이 풀리는 시점(스크롤 ~450px)에 다음 섹션이 CTA 버튼을 가로질러 어색하게 겹치는 문제 확인.

### 중요한 교정
처음엔 "제목만 별도 sticky 레이어로 분리"하는 방향을 제안했으나, 코드를 더 깊이 조사한 결과 Hero 바로 다음 섹션들(`ProblemSection`, `CategoriesSection`, `PlansSection`, `ListSection` 등)이 이미 전부 `relative z-10 -mt-[40dvh] rounded-t-[40px]`라는 **정교하게 맞춰진 리빌 이펙트**를 쓰고 있다는 걸 발견 — Hero의 `min-h-[140dvh]`(=100dvh+40dvh 여유분)와 정확히 맞물리는 의도된 디자인 언어였음. 별도 레이어 분리는 이 기존 타이밍과 충돌할 위험이 있어, 대신 **Hero 콘텐츠를 상단 정렬**해서 리빌이 시작될 때 버튼이 아니라 그 아래 여백만 덮이도록 여유를 주는 방향으로 수정 방침을 변경(사용자 확인 후 진행).

### 수정
5개 페이지 Hero의 `section` 클래스를 `sticky top-[95px] ... items-center` → `sticky top-16 ... items-start pt-10 sm:pt-14`(모바일/태블릿), `lg:top-[72px] lg:items-center lg:pt-0`(데스크톱 그대로)로 통일. `top-[95px]`/`sm:top-[73px]`는 예전 2줄짜리 모바일 헤더 시절 값이 남아있던 것이라 현재 헤더 높이(h-16=64px)에 맞게 `top-16`으로 함께 정리.

이후 "1024×1176일 때도 일반 페이지·enterprise 둘 다 해달라"는 요청으로, 데스크톱 복귀 시점을 `lg`에서 `xl`(1280px)로 늦춤(`xl:items-center xl:pt-0`) — Enterprise의 `Hero.tsx`(`Gnb` 포함 구조)도 동일 패턴 적용.

---

## 13. FaqSection 1024px 간격 붕괴

"1024×1176일 때 자주 묻는 질문 섹션이 부자연스럽다"는 지적으로 Figma 원본(`26:25112`)과 대조 조사. 홈/기능/요금제 FaqSection이 `lg:gap-[326px]`(제목-아코디언 간격)를 쓰고 있었는데, 이 값이 넓은 데스크톱 기준이라 1024px에서는 아코디언 칸 폭이 331px로 짜부라져 질문들이 2~3줄로 줄바꿈되고 짧은 제목 아래 빈 여백만 크게 남는 문제. `lg:gap-16 xl:gap-[326px]`로 수정(Enterprise의 FaqSection은 원래 `gap-16`을 써서 문제없었음).

※ 이 과정에서 Figma 원본 노드를 열어보니 실제로는 아코디언이 아니라 5개 Q&A가 전부 펼쳐진 카드 리스트 디자인이었음을 발견해 보고했으나, 사용자가 "아코디언이 맞다"고 확인 — 현재 UX 그대로 유지, 간격 수정만 반영.

---

## 14. ComparisonSection(홈) 4카드 그리드 — "너무 크다" 재조사

Figma `Section 3 → Group 1165 → Frame 35938` 노드를 직접 열어 실측한 결과, 폰트 크기(`text-h3`=32px, `text-b2`=24px)는 코드의 clamp 값과 1024px 기준 거의 정확히 일치(31.94px)해서 "텍스트가 크다"는 원인이 아니었음. 실제 원인은 **그리드 전환 시점**: `sm:grid-cols-2`(640~1023px, 2×2 정렬)였다가 `lg:flex lg:flex-row`(1024px+, 가로 스크롤 4열)로 전환되는데, 4열이 전부 들어가려면 실제로는 1440px 캔버스 폭이 필요해서 1024px에서는 카드 2.5개만 보이는 상태로 스크롤 — 화면 대비 카드가 커 보이는 착시였음.

### 수정
`sm:grid sm:grid-cols-2 lg:flex lg:flex-row` → `sm:grid sm:grid-cols-2 2xl:flex 2xl:flex-row`로 전환 시점을 2xl(1536px)까지 늦춤 — 1024~1440px는 2×2 그리드로 4장 전부 노출, 2xl 이상에서만 Figma 원본의 가로 스크롤 4열 노출.

---

## 15. ScrollCarousel — Figma의 "overflow-clip + 화살표 전용" 재현

"Figma에 스크롤 없어도 된다고 했는데 왜 있냐, 배율 상관없이 다 없애달라"는 요청. Figma의 `Frame 35941`(Section 1의 4개 기능 카드)을 열어보니 `overflow-clip`(스크롤 아님)이고 우측 상단 화살표 버튼으로만 넘기는 구조였음 — 코드는 `overflow-x-auto`로 드래그/스와이프 스크롤이 가능했던 것.

### 수정
`ScrollCarousel.tsx`를 네이티브 스크롤(`el.scrollTo`) 방식에서 `translateX` 기반 이동으로 전면 교체. 컨테이너는 `overflow-hidden`으로 바꿔 스크롤/스와이프가 전혀 안 되고, 이전/다음 버튼(및 4초 자동재생)만으로 카드가 넘어감. 배율과 무관하게 매번 실제 컨테이너 너비를 측정해서 이동하므로 375px/1024px/1440px 어디서든 동일하게 동작. 리팩터링 중 `useEffect` deps 배열에 `moveBy`(useCallback으로 감싼 함수)를 추가하며 발생한 `react-hooks/exhaustive-deps` 경고도 해결.

이 변경 직후 "useEffect의 final argument changed size" 콘솔 에러가 발생했는데, 조사 결과 **Fast Refresh(HMR)가 두 번에 걸친 순차 편집 사이의 과도기 상태를 마운트된 인스턴스에 그대로 적용하려다 생긴 일회성 아티팩트**였고, 완전히 새로 페이지를 열면 재현되지 않음을 확인 — 코드 자체는 문제없음.

---

## 16. 기준 뷰포트 재정립 — 실기기 반영

"1024×1176/375×1176이라고 했을 때 모바일 화면을 가정했는데, 다시 분기를 정립해야겠다"는 요청으로 기준을 다음처럼 재정의:
1. PC: `1024×1176`(변경 없음)
2. 모바일 A: iPhone 12 Pro `390×844`
3. 모바일 B: Samsung Galaxy S20 Ultra `412×915`

### 재검증
Home/Features/Pricing/News/Magazine/Enterprise **6개 페이지 전체**를 두 실기기 뷰포트(KO/EN 포함)로 풀페이지 스크린샷 재확인 — 이번 세션의 모든 수정사항이 실기기 기준에서도 정상 작동함을 확인. 이 과정에서 두 가지 "가짜 버그"를 식별하고 실제 버그와 구분:
- CountUp 애니메이션(45억명 등 숫자 카운트업)을 스크린샷 타이밍이 중간값에서 캡처 → 2초 대기 후 재확인해 정상 확인
- `next/image` lazy-loading이 풀페이지 자동 스크린샷 속도보다 느려서 일부 카드 이미지가 빈 회색으로 찍힘 → 실제 대기 시 정상 로드 확인

### 코드 반영
`tailwind.config.ts`의 `theme.extend.screens`에 `iphone12pro: '390px'`, `s20ultra: '412px'` 커스텀 브레이크포인트 추가(기존 `sm`/`md`/`lg`/`xl`/`2xl`은 그대로 유지, min-width 기준이라 다른 브레이크포인트와 동일하게 동작). Chromium/WebKit 두 엔진 + 실제 기기 프로파일로 색상 테스트를 통해 정확히 390px/412px 경계에서 동작함을 검증.

---

## 17. "잘려 보인다" 버그 리포트 — DevTools 표시 문제로 판명

사용자가 iPhone 12 Pro 화면에서 Hero 제목/버튼이 오른쪽에서 잘려 보인다는 스크린샷 제보. Chromium 기본 viewport, Playwright의 정확한 `devices['iPhone 12 Pro']` 프로파일, 실제 WebKit 엔진까지 3가지 방법으로 재현을 시도했으나 전부 정상(`scrollWidth === innerWidth === 390`) — 재현 불가.

사용자가 직접 DevTools 콘솔에서 `document.documentElement.scrollWidth`(390)와 `window.innerWidth`(390)를 확인해 실제로 오버플로우가 없음을 증명. 그런데도 화면은 계속 잘려 보인다는 후속 스크린샷을 보니, DevTools 기기 도구모음의 **줌이 50%로 설정되어 있고 DevTools 패널이 창의 절반을 차지**해 미리보기 영역 자체가 물리적으로 좁았던 것 — 실제 웹페이지가 아니라 **DevTools 미리보기 창이 잘린 것**으로 결론. 코드 수정 없음, 브라우저 창을 넓히거나 DevTools를 분리 창으로 빼는 걸로 해결 안내.

---

## 18. 디자인 시스템 일관성 감사

프로젝트 전체에서 색상/폰트/spacing이 디자인 토큰(tailwind.config)을 통해 일관되게 쓰이는지, 하드코딩된 hex나 임의 px 값이 있는지 조사(코드 수정 없이 조사만 수행).

- **하드코딩 hex**: 31곳(20파일). `#e8ebf6`(5회)/`#ebf2fb`(4회)/`#f7f8fb`(4회)처럼 육안으로 구분 안 되는 유사색이 파일마다 조금씩 다르게 반복되는 진짜 디자인 드리프트 발견
- **임의 px 값**: 117곳(39파일). `max-w-[1360px]`가 **24개 파일에 26회** 반복되는 등, 명백히 공용 토큰화가 필요한 값들 식별
- 375×1176 등 모바일 반응형에는 영향 없음(반응형 접두어와 함께 정상 동작 중)임을 확인
- CTA 버튼 기기별 라우팅 표(5개 페이지 Hero+Footer)를 코드와 항목별로 대조 — 전부 일치 확인
- 사용자 확인 후 토큰화 자체는 보류 중(결정 대기)

---

## 19. 언어 리다이렉트 버그 — 진짜 원인 발견 및 수정

"`localhost:3000` 입력하면 `/en`으로 리다이렉트된다"는 제보. `LocaleSwitcher.tsx`가 원인이 아니라 **`src/proxy.ts`(미들웨어)** 문제였음 — `createMiddleware(routing)`가 next-intl 기본값으로 브라우저의 `Accept-Language` 헤더를 감지해서 `defaultLocale`을 무시하고 리다이렉트하고 있었음(`defaultLocale`은 감지 실패시의 최후 fallback일 뿐).

### 수정
`src/shared/i18n/routing.ts`의 `defineRouting()`에 `localeDetection: false` 추가(처음엔 `createMiddleware`의 두 번째 인자로 시도했으나 이 버전의 next-intl은 1개 인자만 받아 타입 에러 발생 → routing 설정 객체 안으로 이동). `curl`로 `Accept-Language: en-US`/`ko-KR` 양쪽 다 `/ko`로 리다이렉트되는 것 확인, Playwright로 실제 브라우저(`locale: 'en-US'` 컨텍스트)에서도 확인, 이후 수동 토글로 EN 전환도 정상 동작 확인.

---

## 20. CTA 버튼 링크 — DevTools User-Agent 잔존 문제

"Galaxy/iPhone은 잘 되는데 Responsive 1024×1187에서 adobaro.com이 아니라 Play스토어 링크로 간다"는 제보. Playwright로 "Android UA + 1024×1187 뷰포트" 조합을 직접 재현해보니 정확히 같은 현상 발생 → **User-Agent 기준 라우팅이라 화면 크기와 무관하게, Galaxy 프리셋 테스트 후 Responsive로 전환할 때 User-Agent 오버라이드가 리셋되지 않고 남아있던 것**이 원인으로 결론. `Cmd+Shift+M`으로 기기 도구모음을 껐다 켜서 리셋하는 방법을 안내, 사용자 확인으로 해결.

---

## 21. Enterprise 문의 폼 — 수신 이메일 변경

`views/enterprise/ui/ContactForm.tsx`의 `<form action="https://formsubmit.co/sjpark@adoba.net">`을 `adobaro.marketing@adoba.net`으로 변경. 코드베이스 전체에서 이전 이메일 잔존 여부 확인(없음).

---

## 22. 페이지네이션 화살표 색상 통일

"활성화된 화살표가 진한 회색인데 진한 검은색으로 바꿔달라"는 요청. `public/images/icons/pagination-arrow-left.svg`/`pagination-arrow-right.svg` 확인 결과, 왼쪽은 `#0F172A`인데 `fill-opacity="0.2"`(흐릿한 회색으로 보임), 오른쪽은 `#475569`(중간 회색) 100% 불투명도로 서로 다르게 설정되어 있었음.

### 수정
두 아이콘 모두 `fill="var(--fill-0, #0F172A)"`(완전 불투명, opacity 속성 제거)로 통일. 비활성 상태는 기존 `disabled:opacity-40`(버튼 레벨) 로직 그대로 유지 — 다른 요소는 건드리지 않음. `widgets/article-feed/ui/ArticleFeed.tsx`가 공용 위젯이라 소식(News)/매거진(Magazine) 양쪽에 코드 레벨로 동일하게 적용됨(단, 소식 페이지는 현재 기사 6개=1페이지라 페이지네이션 자체가 안 보여 시각적 확인은 매거진에서만 가능했음).

---

## 참고 — 이 세션에서 반복적으로 확인된 패턴

1. **`lg`(1024px) 브레이크포인트는 종종 "너무 이르다"**: Figma가 1440~1920px 캔버스 기준으로 만들어진 요소(고정폭 그리드, 계단식 마진, 넓은 gap)는 `lg`에서 그대로 켜지면 정확히 1024~1279px 구간에서만 붕괴하는 경우가 많았음. 해결 패턴은 거의 항상 "`lg`~`xl`(또는 `2xl`) 구간엔 축소값, 그 이상부터 Figma 원본값"
2. **개발 서버 캐시 실화(失和)**: 오래 켜둔 `next dev`가 `globals.css` 등 전역 CSS 변경을 반영하지 못해 실제로는 고쳐진 코드가 "안 고쳐진 것처럼" 보인 사례가 있었음 — `.next` 삭제 후 재시작으로 해결. 코드가 맞는데 브라우저/도구 쪽 상태가 이상하면 이 가능성을 먼저 의심할 것
3. **DevTools 자체가 원인인 경우가 여러 번 있었음**: 화면 잘림(줌 50%+좁은 창), CTA 링크 오작동(User-Agent 잔존) 둘 다 코드가 아니라 테스트 도구 상태 문제였음 — Playwright로 동일 조건을 정확히 재현해 "코드 문제 아님"을 수치로 증명하는 방식이 유효했음
4. **스크린샷 타이밍 함정**: `CountUp` 애니메이션, `next/image` lazy-loading 둘 다 자동화된 풀페이지 스크린샷이 실제 렌더링보다 빨라서 "버그처럼 보이는" 중간 상태를 캡처한 사례 — 충분히 대기 후 재확인하는 습관으로 걸러냄
