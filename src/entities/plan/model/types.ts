export interface Plan {
  id: string
  type: 'subscription' | 'rp-package'
  icon: string
  name: string
  price: string
  priceSuffix?: string
  rpLabel: string
  rpGrant: string
}
