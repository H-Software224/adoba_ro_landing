export interface Article {
  id: string
  type: 'news' | 'insight'
  title: string
  /** Omitted when no thumbnail has been designed yet for this article */
  image?: string
  /** ISO date, only set when the event has a confirmed public date */
  startDate?: string
  endDate?: string
  /** Fuller title/body shown in the detail modal. Card stays non-interactive when omitted. */
  modalTitle?: string
  modalDescription?: string
  /** Source post this article's content is based on (e.g. an Instagram or blog post) */
  externalUrl?: string
  /** Who can participate in this event, e.g. '전체 유저' — only set for date-bound events */
  eligibility?: string
  /** Reward(s) attendees receive, e.g. RP grants */
  rewardOffers?: { name: string; description?: string }[]
  /** Canonical thumbnail from the source post (og:image) — distinct from `image`, which is the on-site card art */
  sourceImage?: string
  /** ISO date the source post was published */
  datePublished?: string
  /** In-site detail route (e.g. '/magazine/brand-visual'). Card links here when set. */
  detailHref?: string
  /** Short excerpt shown on the detail page and used as the BlogPosting description */
  excerpt?: string
  /** Byline shown on the detail page and used as the BlogPosting author name */
  authorName?: string
  /** Q&A block from the source post's body, in its own conclusion-first tone — only set when the source actually has one */
  faq?: { question: string; answer: string }[]
  /** Full article body, when the source post's complete text is available. Falls back to `excerpt` + external link when omitted. */
  fullBody?: ArticleFullBody
}

export interface ArticleFullBody {
  /** Omitted when the source post has no distinct "핵심 요약" block */
  summaryTitle?: string
  summaryText?: string
  /** Bulleted variant of summaryText. `**text**` spans render as bold. */
  summaryItems?: string[]
  pullQuote?: string
  /** Illustrative image shown after the pull quote, e.g. a before/after comparison */
  bodyImage?: { src: string; aspectRatio: string }
  /** Omitted when the source post opens straight into its first titled section */
  intro?: string
  sections: {
    title: string
    intro?: string
    /** Illustrative image shown after this section's content */
    image?: { src: string; aspectRatio: string }
    subsections?: { title: string; text: string }[]
    /** Simple data table shown after this section's content (or after its subsections) */
    table?: { headers: string[]; rows: string[][] }
  }[]
  conclusion?: { title: string; paragraphs: string[] }
}
