export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON-LD requires raw script injection
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
