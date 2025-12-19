export type YoutubeThumbnails = {
  url?: string
  medium?: { url?: string }
  high?: { url?: string }
}

export type YoutubeVideo = {
  id?: string | number
  videoId?: string
  title?: string
  description?: string
  thumbnail?: string
  thumbnails?: YoutubeThumbnails
  publishedAt?: string
  channelTitle?: string
  channel?: string
  author?: string
  url?: string
  link?: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const YOUTUBE_ENDPOINT = `${API_BASE_URL}/youtube/posts`
const FALLBACK_THUMBNAIL =
  'https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=900&q=80'

export const getThumbnail = (video: YoutubeVideo) =>
  video.thumbnail ||
  video.thumbnails?.high?.url ||
  video.thumbnails?.medium?.url ||
  video.thumbnails?.url ||
  FALLBACK_THUMBNAIL

export const getVideoUrl = (video: YoutubeVideo) =>
  video.url || video.link || (video.videoId ? `https://www.youtube.com/watch?v=${video.videoId}` : '#')

export const getVideoChannel = (video: YoutubeVideo) =>
  video.channelTitle || video.channel || video.author || 'Doi thoai Kien truc'

export const getVideoDescription = (video: YoutubeVideo) => {
  const desc = video.description?.trim()
  if (!desc) {
    return 'Video moi nhat tu Doi thoai Kien truc.'
  }
  return desc.length > 140 ? `${desc.slice(0, 140)}...` : desc
}

export const formatVideoDate = (value?: string) => {
  if (!value) return 'Vua cap nhat'
  try {
    return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(value))
  } catch {
    return value
  }
}

const STORAGE_KEY = 'youtube_videos_cache'
const STORAGE_TIMESTAMP_KEY = 'youtube_videos_timestamp'
const CACHE_DURATION_MS = 10 * 60 * 1000 // 10 phút

// Lưu danh sách video vào localStorage
const saveVideosToStorage = (videos: YoutubeVideo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos))
    localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString())
  } catch (error) {
    console.warn('Không thể lưu video vào localStorage:', error)
  }
}

// Lấy danh sách video từ localStorage
const getVideosFromStorage = (): YoutubeVideo[] | null => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY)
    const timestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY)
    
    if (!cached || !timestamp) return null
    
    const cacheAge = Date.now() - parseInt(timestamp, 10)
    if (cacheAge > CACHE_DURATION_MS) {
      // Cache đã hết hạn
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(STORAGE_TIMESTAMP_KEY)
      return null
    }
    
    return JSON.parse(cached)
  } catch (error) {
    console.warn('Không thể đọc video từ localStorage:', error)
    return null
  }
}

// Lấy random N video từ mảng
export const getRandomVideos = (videos: YoutubeVideo[], count: number): YoutubeVideo[] => {
  if (videos.length <= count) return videos
  
  const shuffled = [...videos].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Map dữ liệu từ API response sang format YoutubeVideo
const mapVideoData = (item: any): YoutubeVideo => {
  return {
    id: item.id,
    videoId: item.id,
    title: item.title,
    description: item.description,
    thumbnail: item.thumbnails?.high?.url || item.thumbnails?.medium?.url || item.thumbnails?.default?.url,
    thumbnails: {
      url: item.thumbnails?.default?.url,
      medium: { url: item.thumbnails?.medium?.url },
      high: { url: item.thumbnails?.high?.url },
    },
    publishedAt: item.publishedAt,
    channelTitle: item.channelTitle || 'Doi thoai Kien truc',
    url: item.url,
    link: item.url,
  }
}

// Fetch tất cả video từ API và lưu vào storage
export const fetchAllYoutubeVideos = async (): Promise<YoutubeVideo[]> => {
  const response = await fetch(YOUTUBE_ENDPOINT)
  if (!response.ok) {
    throw new Error('Khong the tai video moi nhat.')
  }
  const data = await response.json()
  const rawVideos = Array.isArray(data) ? data : []
  
  // Map dữ liệu sang format đúng
  const allVideos = rawVideos.map(mapVideoData)
  
  // Lưu tất cả video vào storage
  saveVideosToStorage(allVideos)
  
  console.log(`Đã lưu ${allVideos.length} video vào localStorage`)
  
  return allVideos
}

// Lấy random 3 video (từ cache nếu có, nếu không thì fetch mới)
export const getRandomYoutubeVideos = async (count = 3): Promise<YoutubeVideo[]> => {
  // Kiểm tra cache trước
  const cachedVideos = getVideosFromStorage()
  
  if (cachedVideos && cachedVideos.length > 0) {
    // Lấy random từ cache
    return getRandomVideos(cachedVideos, count)
  }
  
  // Nếu không có cache hoặc cache hết hạn, fetch mới
  const allVideos = await fetchAllYoutubeVideos()
  return getRandomVideos(allVideos, count)
}

// Force refresh danh sách video (xóa cache và fetch mới)
export const refreshYoutubeVideos = async (): Promise<YoutubeVideo[]> => {
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(STORAGE_TIMESTAMP_KEY)
  const allVideos = await fetchAllYoutubeVideos()
  return allVideos
}

// Giữ lại hàm cũ để tương thích
export const fetchLatestYoutubeVideos = async (limit = 5): Promise<YoutubeVideo[]> => {
  const response = await fetch(YOUTUBE_ENDPOINT)
  if (!response.ok) {
    throw new Error('Khong the tai video moi nhat.')
  }
  const data = await response.json()
  return Array.isArray(data) ? data.slice(0, limit) : []
}
