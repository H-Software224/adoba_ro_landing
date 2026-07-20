export interface ItemListEntry {
  name: string
  url: string
}

export function itemListSchema(items: ItemListEntry[], numberOfItems?: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: numberOfItems ?? items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  }
}
