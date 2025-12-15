export type Banner = {
  id?: string | number
  image?: string
  title?: string
  link?: string
  active?: boolean
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const fetchBanners = async (active = true): Promise<Banner[]> => {
  const response = await fetch(`${API_BASE_URL}/banners?active=${active}`)
  if (!response.ok) {
    throw new Error('Không thể tải banner.')
  }
  const data = await response.json()
  return Array.isArray(data)
    ? data
    : Array.isArray((data as { data?: unknown[] })?.data)
      ? (data as { data?: Banner[] }).data ?? []
      : []
}

