export interface ProductOfferInput {
  name: string
  description: string
  price: number
  priceCurrency: string
  url: string
  /** ISO 8601 duration, e.g. 'P1M' for a monthly subscription. Omit for one-time purchases. */
  billingDuration?: string
}

export function productOfferSchema(input: ProductOfferInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    offers: {
      '@type': 'Offer',
      url: input.url,
      price: input.price,
      priceCurrency: input.priceCurrency,
      ...(input.billingDuration
        ? {
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: input.price,
              priceCurrency: input.priceCurrency,
              billingDuration: input.billingDuration,
            },
          }
        : {}),
    },
  }
}
