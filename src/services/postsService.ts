export type Post = {
  id?: string | number
  slug?: string
  title?: string
  excerpt?: string
  short_description?: string
  description?: string
  summary?: string
  content?: string
  link?: string
  date?: string
  publishedAt?: string
  createdAt?: string
  category?: string | { name?: string }
  tags?: string[]
  image?: string
  thumbnail?: string
  thumbnail_url?: string
  featuredImage?: string
  coverImage?: string
  heroImage?: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const POSTS_ENDPOINT = `${API_BASE_URL}/posts/latest`
const ALL_POSTS_ENDPOINT = `${API_BASE_URL}/posts`
const FALLBACK_POST_IMAGE =
  'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=900&q=80'

export const getPostImage = (post: Post) =>
  post.thumbnail_url ||
  post.featuredImage ||
  post.coverImage ||
  post.heroImage ||
  post.image ||
  post.thumbnail ||
  FALLBACK_POST_IMAGE

export const getPostCategory = (post: Post) => {
  if (typeof post.category === 'string' && post.category.trim()) return post.category
  if (post.category && typeof post.category === 'object' && 'name' in post.category && post.category.name) {
    return post.category.name as string
  }
  if (Array.isArray(post.tags) && post.tags.length) return post.tags[0] ?? 'Bài viết'
  return 'Bài viết'
}

export const getPostExcerpt = (post: Post, limit = 140) => {
  const content = post.excerpt || post.short_description || post.description || post.summary
  if (!content) return ''
  const normalized = content.trim()
  return normalized.length > limit ? `${normalized.slice(0, limit)}...` : normalized
}

export const getPostShortDescription = (post: Post, limit = 120) => {
  const content = post.short_description || post.excerpt || post.summary || post.description
  if (!content) return ''
  const normalized = content.trim()
  return normalized.length > limit ? `${normalized.slice(0, limit)}...` : normalized
}

export const getPostDate = (post: Post) => {
  const raw = post.date || post.publishedAt || post.createdAt
  if (!raw) return ''
  try {
    return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(raw))
  } catch {
    return raw
  }
}

export const fetchLatestPosts = async (limit = 5): Promise<Post[]> => {
  const response = await fetch(`${POSTS_ENDPOINT}?limit=${limit}`)
  if (!response.ok) {
    throw new Error('Không thể tải bài viết mới nhất.')
  }
  const data = await response.json()
  const posts = Array.isArray(data)
    ? data
    : Array.isArray((data as { data?: unknown[] })?.data)
      ? (data as { data?: Post[] }).data ?? []
      : []
  return posts.slice(0, limit)
}

export const fetchAllPosts = async (): Promise<Post[]> => {
  const response = await fetch(ALL_POSTS_ENDPOINT)
  if (!response.ok) {
    throw new Error('Không thể tải danh sách bài viết.')
  }
  const data = await response.json()
  return Array.isArray(data)
    ? data
    : Array.isArray((data as { data?: unknown[] })?.data)
      ? (data as { data?: Post[] }).data ?? []
      : []
}

export const fetchLatestPostsByCategory = async (slug: string, limit = 5): Promise<Post[]> => {
  const response = await fetch(`${API_BASE_URL}/posts/category/${slug}/latest?limit=${limit}`)
  if (!response.ok) {
    throw new Error('Không thể tải bài viết nổi bật.')
  }
  const data = await response.json()
  const posts = Array.isArray(data)
    ? data
    : Array.isArray((data as { data?: unknown[] })?.data)
      ? (data as { data?: Post[] }).data ?? []
      : []
  return posts.slice(0, limit)
}

export const fetchPostById = async (id: string | number): Promise<Post | null> => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`)
  if (!response.ok) {
    throw new Error('Không thể tải bài viết.')
  }
  const data = await response.json()
  return (data ?? null) as Post | null
}

