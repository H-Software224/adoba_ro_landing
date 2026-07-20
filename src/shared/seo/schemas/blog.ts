export interface BlogPostingSummary {
  headline: string
  image?: string
  url: string
  datePublished?: string
}

export function blogSchema(params: { name: string; url: string; posts: BlogPostingSummary[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: params.name,
    url: params.url,
    blogPost: params.posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.headline,
      image: post.image,
      url: post.url,
      datePublished: post.datePublished,
    })),
  }
}

export interface BlogPostingInput {
  headline: string
  description: string
  image: string[]
  datePublished: string
  authorName: string
  url: string
}

export function blogPostingSchema(input: BlogPostingInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.headline,
    description: input.description,
    abstract: input.description,
    image: input.image,
    datePublished: input.datePublished,
    author: {
      '@type': 'Organization',
      name: input.authorName,
    },
    mainEntityOfPage: input.url,
  }
}
