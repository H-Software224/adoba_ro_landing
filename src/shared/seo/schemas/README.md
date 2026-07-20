# 스키마 매핑

새 페이지를 추가할 때 아래 표에서 해당 섹션을 찾아 필요한 스키마를 `JsonLd`로 주입한다.
전 페이지 공통 스키마(Organization/WebSite/SiteNavigationElement)는 `app/[locale]/layout.tsx`에서 1회 주입한다.

| 페이지 | 스키마 | 빌더 |
|---|---|---|
| 전역 (layout) | Organization | `organization.ts` → `organizationSchema()` |
| 전역 (layout) | WebSite | `website.ts` → `websiteSchema()` |
| 전역 (layout) | SiteNavigationElement | `site-navigation.ts` → `siteNavigationSchema()` |
| Main (`/`) | FAQPage (5문항) | `faq-page.ts` → `faqPageSchema()` |
| Main (`/`) | Service | `service.ts` → `serviceSchema()` |
| Main (`/`) | Review ×3 | `review.ts` → `reviewSchema()` (별점 절대 넣지 말 것) |
| 기능 (`/features`) | Service (howto/process/brand/wallet 4개 섹션을 subServices로 세분화, 각각 serviceType 부여) | `service.ts` → `serviceSchema()` |
| 기능 (`/features`) | HowTo (시작 방법, 1 step) | `how-to.ts` → `howToSchema()` |
| 기능 (`/features`) | HowTo (4단계 프로세스) | `how-to.ts` → `howToSchema()` |
| 기능 (`/features`) | FAQPage (5문항) | `faq-page.ts` → `faqPageSchema()` |
| 요금제 (`/pricing`) | Product+Offer ×3 (Lite/Boost/Max, 월구독 P1M) | `product-offer.ts` → `productOfferSchema()` |
| 요금제 (`/pricing`) | Product+Offer ×3 (RP Package, 단건) | `product-offer.ts` → `productOfferSchema()` (billingDuration 생략) |
| 요금제 (`/pricing`) | FAQPage | `faq-page.ts` → `faqPageSchema()` (중복 문항 콘텐츠에서 정리 후 적용) |
| 소식 (`/news`) | Event (날짜 있는 카드) | `event.ts` → `eventSchema()` |
| 소식 (`/news`) | ItemList (카드 전체) | `item-list.ts` → `itemListSchema()` |
| Tip/매거진 (`/magazine`) | Blog + ItemList | `blog.ts` → `blogSchema()` |
| Tip/매거진 (`/magazine`) | BreadcrumbList | `breadcrumb-list.ts` → `breadcrumbListSchema()` |
| 아티클 상세 (`/magazine/[slug]`) | BlogPosting (headline/image×2/datePublished/author/mainEntityOfPage) + BreadcrumbList | `blog.ts` → `blogPostingSchema()`, `breadcrumb-list.ts` → `breadcrumbListSchema()` |
| 아티클 상세 (`/magazine/brand-visual`, `/magazine/view-count`) | FAQPage (원문 하단 Q&A 2문항, conclusion-first 톤) | `faq-page.ts` → `faqPageSchema()` (원문에 Q&A가 있는 2개 아티클만 — `k-creator`/`live-vod`는 해당 콘텐츠가 없어 미적용) |
| Enterprise (`/enterprise`) | Service (serviceType/audience 포함) | `service.ts` → `serviceSchema()` |
| Enterprise (`/enterprise`) | HowTo (리포트 커스터마이징 4단계) | `how-to.ts` → `howToSchema()` |
| Enterprise (`/enterprise`) | ItemList (데이터 방향성 3단계 파이프라인) | `item-list.ts` → `itemListSchema()` |
| Enterprise (`/enterprise`) | FAQPage (4문항) | `faq-page.ts` → `faqPageSchema()` (실제 답변 확보 후 적용 — 현재 플레이스홀더 답변만 존재) |

비교/사용량 표처럼 schema.org 표준 타입이 없는 데이터는 스키마 대신 `<table>`/`<dl>` 시맨틱 마크업을 사용한다 (`shared/ui/Table`, `shared/ui/DefinitionList`).
