export interface ReviewInput {
  author: string
  reviewBody: string
}

/**
 * ⚠️ ratingValue is intentionally omitted — the design has no star-rating
 * element, so a rating must never be fabricated for this schema.
 */
export function reviewSchema(input: ReviewInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: input.author,
    },
    reviewBody: input.reviewBody,
  }
}
