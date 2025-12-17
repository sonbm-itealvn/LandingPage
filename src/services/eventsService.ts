export type EventItem = {
  id?: string | number
  title?: string
  name?: string
  start_time?: string
  end_time?: string
  location?: string
  description?: string
  short_description?: string
  summary?: string
  banner_url?: string
  content?: string
  status?: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const EVENTS_ENDPOINT = `${API_BASE_URL}/events`

const pad = (value: number) => String(value).padStart(2, '0')

export const getEventTitle = (event: EventItem) => event.title || event.name || 'Sự kiện nổi bật'

export const getEventSubtitle = (event: EventItem) =>
  event.short_description || event.description || event.summary || event.location || 'Sự kiện đã có thời gian cụ thể.'

export const formatEventTimeRange = (event: EventItem) => {
  const toTime = (value?: string) => {
    if (!value) return null
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return null
    const hh = String(date.getHours()).padStart(2, '0')
    const mm = String(date.getMinutes()).padStart(2, '0')
    return `${hh}:${mm}`
  }

  const start = toTime(event.start_time)
  const end = toTime(event.end_time)
  if (start && end) return `${start} - ${end}`
  if (start && !end) return `${start}`
  if (!start && end) return `Đến ${end}`
  return 'Thời gian cập nhật'
}

export const formatEventDateRange = (event: EventItem) => {
  if (!event.start_time && !event.end_time) return 'Đang cập nhật'

  const toParts = (value: string) => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return null
    return {
      day: pad(date.getDate()),
      month: pad(date.getMonth() + 1),
      year: date.getFullYear(),
    }
  }

  const startParts = event.start_time ? toParts(event.start_time) : null
  const endParts = event.end_time ? toParts(event.end_time) : null

  if (!startParts && !endParts) return 'Đang cập nhật'
  if (startParts && !endParts) return `Ngày ${startParts.day}/${startParts.month}/${startParts.year}`
  if (!startParts && endParts) return `Kết thúc ${endParts.day}/${endParts.month}/${endParts.year}`

  if (!startParts || !endParts) return 'Đang cập nhật'

  const sameMonth = startParts.month === endParts.month && startParts.year === endParts.year
  const sameYear = startParts.year === endParts.year

  if (sameMonth) {
    return `Ngày ${startParts.day} - ${endParts.day} / ${startParts.month}/${startParts.year}`
  }

  if (sameYear) {
    return `Ngày ${startParts.day}/${startParts.month} - ${endParts.day}/${endParts.month}/${startParts.year}`
  }

  return `Ngày ${startParts.day}/${startParts.month}/${startParts.year} - ${endParts.day}/${endParts.month}/${endParts.year}`
}

export const fetchEvents = async (limit = 3): Promise<EventItem[]> => {
  const response = await fetch(`${EVENTS_ENDPOINT}?limit=${limit}`)
  if (!response.ok) {
    throw new Error('Không thể tải danh sách sự kiện.')
  }
  const data = await response.json()
  const events = Array.isArray(data)
    ? data
    : Array.isArray((data as { data?: unknown[] })?.data)
      ? (data as { data?: EventItem[] }).data ?? []
      : []
  return events.slice(0, limit)
}

export const fetchEventById = async (id: string | number): Promise<EventItem | null> => {
  const response = await fetch(`${EVENTS_ENDPOINT}/${id}`)
  if (!response.ok) {
    throw new Error('Không thể tải chi tiết sự kiện.')
  }
  const data = await response.json()
  return (data ?? null) as EventItem | null
}

