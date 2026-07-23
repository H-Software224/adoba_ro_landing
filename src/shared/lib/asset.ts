export function getAssetUrl(path: string) {
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('//') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path
  }

  const baseUrl = import.meta.env.BASE_URL

  if (path.startsWith(baseUrl)) {
    return path
  }

  return `${baseUrl}${path.replace(/^\/+/, '')}`
}