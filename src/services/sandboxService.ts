export type SandboxPost = {
  title: string
  slug?: string
  link?: string
  image?: string
}

const WP_BASE = 'https://www.tapchikientruc.com.vn/wp-json/wp/v2/posts'
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'

const stripHtml = (value?: string) => (value ? value.replace(/<[^>]+>/g, '').trim() : '')

const mapWpPost = (item: unknown): SandboxPost => {
  const anyItem = item as { title?: { rendered?: string } | string; slug?: string; link?: string; featured_media_url?: string }
  return {
    title: stripHtml(typeof anyItem.title === 'string' ? anyItem.title : anyItem.title?.rendered) || 'Bài viết',
    slug: anyItem.slug,
    link: anyItem.link,
    image: anyItem.featured_media_url || FALLBACK_IMAGE,
  }
}

const requestWp = async (url: string): Promise<SandboxPost[]> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Không thể tải bài viết sandbox.')
  }
  const data = await response.json()
  return Array.isArray(data) ? data.map(mapWpPost) : []
}

export const fetchSandboxLatest = () =>
  requestWp(`${WP_BASE}?_fields=title,slug,link,featured_media_url&per_page=3`)

export const fetchSandboxByCategory = (categoryId: number) =>
  requestWp(
    `${WP_BASE}?categories=${categoryId}&_fields=title,slug,link,featured_media_url&per_page=3`,
  )

