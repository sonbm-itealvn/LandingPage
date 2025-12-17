export type Banner = {
  id?: string | number
  image?: string
  image_url?: string
  title?: string
  link?: string
  link_url?: string
  active?: boolean
  is_active?: boolean
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const fetchBanners = async (): Promise<Banner[]> => {
  const response = await fetch(`${API_BASE_URL}/banners/active`)
  if (!response.ok) {
    throw new Error('Không thể tải banner.')
  }
  const data = await response.json()
  // Endpoint trả về một banner object hoặc null
  if (!data || (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0)) {
    return []
  }
  // Nếu là object, wrap vào array
  return Array.isArray(data) ? data : [data]
}

