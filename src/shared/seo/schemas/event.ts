export interface EventOffer {
  name: string
  description?: string
}

export interface EventInput {
  name: string
  description: string
  startDate: string
  endDate: string
  url: string
  image?: string
  /** Who can participate, e.g. '전체 유저'. Kept as source text — not normalized into a fixed vocabulary. */
  audience?: string
  /** Reward(s) attendees receive, e.g. RP grants — modeled as Offer since they're a thing of value. */
  offers?: EventOffer[]
}

export function eventSchema(input: EventInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: input.name,
    description: input.description,
    startDate: input.startDate,
    endDate: input.endDate,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    url: input.url,
    image: input.image,
    organizer: {
      '@type': 'Organization',
      name: 'adobaRo',
    },
    ...(input.audience && { audience: { '@type': 'Audience', audienceType: input.audience } }),
    ...(input.offers && {
      offers: input.offers.map((offer) => ({
        '@type': 'Offer',
        name: offer.name,
        ...(offer.description && { description: offer.description }),
      })),
    }),
  }
}
