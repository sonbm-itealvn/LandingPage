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

export const fetchLatestYoutubeVideos = async (limit = 5): Promise<YoutubeVideo[]> => {
  const response = await fetch(YOUTUBE_ENDPOINT)
  if (!response.ok) {
    throw new Error('Khong the tai video moi nhat.')
  }
  const data = await response.json()
  return Array.isArray(data) ? data.slice(0, limit) : []
}
