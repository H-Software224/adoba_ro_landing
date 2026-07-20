import { organizationSchema } from './organization'

export interface ServiceOffer {
  name: string
  url: string
}

export interface ServiceSubType {
  name: string
  description: string
}

export function serviceSchema(params: {
  name: string
  description: string
  areaServed?: string[]
  offers?: ServiceOffer[]
  serviceType?: string | string[]
  audience?: string
  subServices?: ServiceSubType[]
}) {
  const offerItems = (params.offers ?? []).map((offer) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: offer.name,
      url: offer.url,
    },
  }))

  const subServiceItems = (params.subServices ?? []).map((sub) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: sub.name,
      description: sub.description,
      serviceType: sub.name,
    },
  }))

  const catalogItems = [...offerItems, ...subServiceItems]

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    provider: organizationSchema(),
    ...(params.serviceType && { serviceType: params.serviceType }),
    ...(params.audience && { audience: { '@type': 'Audience', audienceType: params.audience } }),
    ...(params.areaServed && { areaServed: params.areaServed }),
    ...(catalogItems.length > 0 && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: params.name,
        itemListElement: catalogItems,
      },
    }),
  }
}
