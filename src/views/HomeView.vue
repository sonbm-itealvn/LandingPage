<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import MasterLayout from '../components/MasterLayout.vue'
import { RouterLink } from 'vue-router'
import { fetchBanners, type Banner } from '../services/bannersService'
import {
  getRandomYoutubeVideos,
  refreshYoutubeVideos,
  formatVideoDate,
  getThumbnail,
  getVideoChannel,
  getVideoDescription,
  getVideoUrl,
  type YoutubeVideo,
} from '../services/youtubeService'
import {
  fetchLatestPosts,
  getPostCategory,
  getPostExcerpt,
  getPostDate,
  getPostShortDescription,
  getPostImage,
  fetchLatestPostsByCategory,
  fetchSpecialPostsLatest,
  fetchSpecialPostsRandom,
  type Post,
} from '../services/postsService'
import {
  fetchEvents,
  formatEventDateRange,
  getEventSubtitle,
  getEventTitle,
  formatEventTimeRange,
  type EventItem,
} from '../services/eventsService'
import { fetchSandboxByCategory, fetchSandboxLatest, type SandboxPost } from '../services/sandboxService'

const latestPosts = ref<Post[]>([])
const isLatestLoading = ref(true)
const latestError = ref('')

const events = ref<EventItem[]>([])
const isEventsLoading = ref(true)
const eventsError = ref('')
const currentEventIndex = ref(0)

const highlightPosts = ref<Post[]>([])
const isHighlightLoading = ref(true)
const highlightError = ref('')

const announcementPosts = ref<Post[]>([])
const isAnnouncementsLoading = ref(true)
const announcementsError = ref('')

const techPosts = ref<Post[]>([])
const isTechLoading = ref(true)
const techError = ref('')

const sandboxRowOne = ref<SandboxPost[]>([])
const sandboxRowTwo = ref<SandboxPost[]>([])
const isSandboxLoading = ref(true)
const sandboxError = ref('')
const sandboxCurrentIndex = ref(0)
const isSliding = ref(false)

const allSandboxPosts = computed(() => [...sandboxRowOne.value, ...sandboxRowTwo.value])

const goToSandboxSlide = (direction: 'prev' | 'next' | number) => {
  if (isSliding.value || !allSandboxPosts.value.length) return
  
  isSliding.value = true
  
  if (typeof direction === 'number') {
    sandboxCurrentIndex.value = direction
  } else if (direction === 'next') {
    sandboxCurrentIndex.value = (sandboxCurrentIndex.value + 1) % allSandboxPosts.value.length
  } else {
    sandboxCurrentIndex.value = (sandboxCurrentIndex.value - 1 + allSandboxPosts.value.length) % allSandboxPosts.value.length
  }
  
  setTimeout(() => {
    isSliding.value = false
  }, 400)
}

const referencePosts = ref<Post[]>([])
const isReferenceLoading = ref(true)
const referenceError = ref('')

const youtubeVideos = ref<YoutubeVideo[]>([])
const isVideosLoading = ref(true)
const videoError = ref('')

const banners = ref<Banner[]>([])
const bannersError = ref('')

const collaborationPosts = ref<Post[]>([])
const isCollaborationLoading = ref(true)
const collaborationError = ref('')

const loadLatestPosts = async () => {
  isLatestLoading.value = true
  latestError.value = ''
  try {
    latestPosts.value = await fetchSpecialPostsLatest('hoat-dong-khoa', 5)
  } catch (error) {
    latestError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải bài viết.'
    latestPosts.value = []
  } finally {
    isLatestLoading.value = false
  }
}

const loadHighlightPosts = async () => {
  isHighlightLoading.value = true
  highlightError.value = ''
  try {
    highlightPosts.value = await fetchSpecialPostsRandom('hoat-dong-khoa', 6)
  } catch (error) {
    highlightError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải tin nổi bật.'
    highlightPosts.value = []
  } finally {
    isHighlightLoading.value = false
  }
}

const loadAnnouncements = async () => {
  isAnnouncementsLoading.value = true
  announcementsError.value = ''
  try {
    announcementPosts.value = await fetchSpecialPostsLatest('thong-bao', 5)
  } catch (error) {
    announcementsError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải thông báo.'
    announcementPosts.value = []
  } finally {
    isAnnouncementsLoading.value = false
  }
}

const loadTechPosts = async () => {
  isTechLoading.value = true
  techError.value = ''
  try {
    techPosts.value = await fetchLatestPostsByCategory('cong-nghe-kien-truc', 4)
  } catch (error) {
    techError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải Công nghệ kiến trúc.'
    techPosts.value = []
  } finally {
    isTechLoading.value = false
  }
}

const loadSandboxPosts = async () => {
  isSandboxLoading.value = true
  sandboxError.value = ''
  try {
    const [rowOne, rowTwo] = await Promise.all([fetchSandboxLatest(), fetchSandboxByCategory(6)])
    sandboxRowOne.value = rowOne
    sandboxRowTwo.value = rowTwo
  } catch (error) {
    sandboxError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải sandbox.'
    sandboxRowOne.value = []
    sandboxRowTwo.value = []
  } finally {
    isSandboxLoading.value = false
  }
}

const loadReferencePosts = async () => {
  isReferenceLoading.value = true
  referenceError.value = ''
  try {
    referencePosts.value = await fetchLatestPostsByCategory('thu-vien-tham-khao', 6)
  } catch (error) {
    referenceError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải thư viện.'
    referencePosts.value = []
  } finally {
    isReferenceLoading.value = false
  }
}

const loadYoutubeVideos = async (forceRefresh = false) => {
  isVideosLoading.value = true
  videoError.value = ''
  try {
    if (forceRefresh) {
      // Force refresh: xóa cache và fetch mới
      await refreshYoutubeVideos()
      youtubeVideos.value = await getRandomYoutubeVideos(3)
    } else {
      // Lấy random 3 video (từ cache nếu có, mỗi lần reload sẽ random lại)
      youtubeVideos.value = await getRandomYoutubeVideos(3)
    }
  } catch (error) {
    videoError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải dữ liệu.'
  } finally {
    isVideosLoading.value = false
  }
}

// Auto refresh sau 10 phút
let videoRefreshInterval: ReturnType<typeof setInterval> | null = null

const startVideoAutoRefresh = () => {
  // Xóa interval cũ nếu có
  if (videoRefreshInterval) {
    clearInterval(videoRefreshInterval)
  }
  
  // Set interval 10 phút
  videoRefreshInterval = setInterval(() => {
    loadYoutubeVideos(true) // Force refresh
  }, 10 * 60 * 1000) // 10 phút
}

const stopVideoAutoRefresh = () => {
  if (videoRefreshInterval) {
    clearInterval(videoRefreshInterval)
    videoRefreshInterval = null
  }
}

const loadEvents = async () => {
  isEventsLoading.value = true
  eventsError.value = ''
  try {
    events.value = await fetchEvents(5)
  } catch (error) {
    eventsError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải sự kiện.'
    events.value = []
  } finally {
    isEventsLoading.value = false
  }
}

const loadBanners = async () => {
  bannersError.value = ''
  try {
    banners.value = await fetchBanners()
  } catch (error) {
    bannersError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải banner.'
    banners.value = []
  }
}

const loadCollaborationPosts = async () => {
  isCollaborationLoading.value = true
  collaborationError.value = ''
  try {
    collaborationPosts.value = await fetchSpecialPostsLatest('hop-tac', 10)
  } catch (error) {
    collaborationError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải hợp tác kết nối.'
    collaborationPosts.value = []
  } finally {
    isCollaborationLoading.value = false
  }
}

const autoSlideDelayMs = 5000
let autoSlideTimer: ReturnType<typeof setInterval> | null = null

const stopAutoSlide = () => {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer)
    autoSlideTimer = null
  }
}

const startAutoSlide = () => {
  stopAutoSlide()
  if (events.value.length <= 1) return
  autoSlideTimer = setInterval(() => {
    currentEventIndex.value = (currentEventIndex.value + 1) % events.value.length
  }, autoSlideDelayMs)
}

onMounted(() => {
  loadLatestPosts()
  loadHighlightPosts()
  loadAnnouncements()
  loadEvents()
  loadTechPosts()
  loadSandboxPosts()
  loadReferencePosts()
  // Mỗi lần reload sẽ random lại 3 video từ cache
  loadYoutubeVideos(false) // false = không force refresh, chỉ random lại
  loadBanners()
  loadCollaborationPosts()
  startVideoAutoRefresh() // Bắt đầu auto refresh sau 10 phút
})

onBeforeUnmount(() => {
  stopAutoSlide()
  stopCountdown()
  stopVideoAutoRefresh() // Dừng auto refresh khi unmount
})

const latestHero = computed(() => latestPosts.value[0])
const latestRest = computed(() => latestPosts.value.slice(1, 5))
const eventHero = computed(() => events.value[0])
const showEventSection = computed(() => isEventsLoading.value || events.value.length > 0)
const hasMultipleEvents = computed(() => events.value.length > 1)
const sliderStyle = computed(() => ({
  transform: `translateX(-${currentEventIndex.value * 100}%)`,
}))
const highlightColumns = computed(() => [highlightPosts.value.slice(0, 3), highlightPosts.value.slice(3, 6)])

const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let countdownInterval: ReturnType<typeof setInterval> | null = null

const updateCountdown = () => {
  if (!eventHero.value?.end_time) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return
  }

  const now = new Date().getTime()
  const endTime = new Date(eventHero.value.end_time).getTime()
  const distance = endTime - now

  if (distance < 0) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return
  }

  countdown.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  }
}

const startCountdown = () => {
  if (countdownInterval) clearInterval(countdownInterval)
  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
}

const stopCountdown = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
    countdownInterval = null
  }
}

const eventBannerStyle = computed(() => {
  if (!eventHero.value?.banner_url) return {}
  return {
    backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('${eventHero.value.banner_url}')`,
  }
})

watch(
  () => events.value.length,
  () => {
    currentEventIndex.value = 0
    startAutoSlide()
    startCountdown()
  },
)

watch(
  () => eventHero.value?.end_time,
  () => {
    startCountdown()
  },
)

const bannerVideoError = ref(false)
const handleVideoError = () => {
  bannerVideoError.value = true
}

const DEFAULT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80'

const isVideoUrl = (url: string): boolean => {
  if (!url) return false
  
  const urlLower = url.toLowerCase()
  
  // Check if URL path contains '/video/' (common in CDN like Cloudinary)
  if (urlLower.includes('/video/')) {
    return true
  }
  
  // Check file extension (remove query params first)
  const urlWithoutQuery = urlLower.split('?')[0]
  if (!urlWithoutQuery) return false
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.m4v', '.flv', '.wmv']
  const hasVideoExtension = videoExtensions.some((ext) => urlWithoutQuery.endsWith(ext))
  
  // Check if URL contains 'video' keyword (but not 'image')
  const hasVideoKeyword = urlLower.includes('video') && !urlLower.includes('image')
  
  return hasVideoExtension || hasVideoKeyword
}

// Convert Cloudinary video URL to supported format (mp4)
const convertVideoUrl = (url: string): string => {
  if (!url) return url
  // If it's a Cloudinary video URL, convert to mp4 format
  if (url.includes('res.cloudinary.com') && url.includes('/video/')) {
    // Cloudinary supports format transformation via URL parameters
    // Try to convert to mp4 by replacing extension or adding format parameter
    if (url.includes('/upload/')) {
      // Split at /upload/ to insert transformation
      const parts = url.split('/upload/')
      if (parts.length === 2 && parts[0] && parts[1]) {
        // Add format transformation: f_mp4 for mp4 format
        return `${parts[0]}/upload/f_mp4/${parts[1].replace(/\.(avi|mov|mkv|wmv|flv|webm)$/i, '.mp4')}`
      }
    }
    // Fallback: just replace extension
    return url.replace(/\.(avi|mov|mkv|wmv|flv|webm)$/i, '.mp4')
  }
  return url
}

const currentBanner = computed(() => banners.value[0])
const bannerUrl = computed(() => {
  if (!currentBanner.value) return null
  return currentBanner.value.image_url || currentBanner.value.image || null
})
const videoUrl = computed(() => {
  if (!bannerUrl.value || !isVideoUrl(bannerUrl.value)) return null
  return convertVideoUrl(bannerUrl.value)
})
const heroImage = computed(() => bannerUrl.value || DEFAULT_HERO_IMAGE)
const isVideoBanner = computed(() => {
  if (!bannerUrl.value) return false
  return isVideoUrl(bannerUrl.value)
})

const heroStyle = computed(() => {
  // If video failed to load, use image fallback
  if (isVideoBanner.value && !bannerVideoError.value) {
    // Remove background image when video is present
    return {
      backgroundImage: 'none',
    }
  }
  return {
    backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.4), rgba(8, 47, 73, 0.6)), url('${heroImage.value}')`,
  }
})

const shouldShowVideo = computed(() => {
  return isVideoBanner.value && videoUrl.value && !bannerVideoError.value
})

// Reset video error when banner changes
watch(
  () => bannerUrl.value,
  () => {
    bannerVideoError.value = false
  },
)

const monthLabels = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12']
const getEventDay = (event: EventItem) => {
  if (!event.start_time) return '--'
  const d = new Date(event.start_time)
  return Number.isNaN(d.getTime()) ? '--' : String(d.getDate()).padStart(2, '0')
}
const getEventMonth = (event: EventItem) => {
  if (!event.start_time) return '---'
  const d = new Date(event.start_time)
  return Number.isNaN(d.getTime()) ? '---' : monthLabels[d.getMonth()] ?? '---'
}
const getEventStatus = (event: EventItem) => {
  if (!event.start_time) return 'Sắp diễn ra'
  const now = Date.now()
  const start = new Date(event.start_time).getTime()
  const end = event.end_time ? new Date(event.end_time).getTime() : null
  if (!Number.isNaN(start) && start > now) return 'Sắp diễn ra'
  if (end && !Number.isNaN(end) && end < now) return 'Đã kết thúc'
  return 'Đang diễn ra'
}

const goToEvent = (index: number) => {
  if (!events.value.length) return
  const safeIndex = ((index % events.value.length) + events.value.length) % events.value.length
  currentEventIndex.value = safeIndex
}

const nextEvent = () => goToEvent(currentEventIndex.value + 1)
const prevEvent = () => goToEvent(currentEventIndex.value - 1)

const getPostLink = (post: Post) => post.link || (post.id ? `/posts/${post.id}` : post.slug ? `/posts/${post.slug}` : '#')

const sandboxProjects = [
  {
    category: 'Nhà ở',
    title: 'VietHung House: Sự giao thoa giữa ánh sáng tự nhiên và ngôn ngữ nội thất',
    summary: 'Không gian mở, khai thác ánh sáng và sự kết nối với cảnh quan.',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Công trình công cộng',
    title: 'Trung Hoa Office – Mô hình văn phòng thích ứng với khí hậu nhiệt đới',
    summary: 'Lớp mặt đứng đa tầng giúp hạn chế nắng gắt và tăng thông gió.',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Cafe - Nhà hàng',
    title: 'Tầm Tầm Vegetarian: Không gian ẩm thực chay tái thiết từ di sản kiến trúc',
    summary: 'Giữ lại chất liệu gốc, bổ sung cây xanh và ánh sáng mềm.',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Cafe - Nhà hàng',
    title: 'Kohi Coffee: Một ngôi nhà nhỏ bên hồ | X11 Design Studio',
    summary: 'Ẩn mình trong vườn cây, sử dụng mái dốc và kính lớn.',
    image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Nhà ở',
    title: 'SS House: Tinh thần nhà Việt trong ngôn ngữ thiết kế đương đại',
    summary: 'Khoảng sân trong kết nối các khối chức năng bằng hành lang mở.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Cafe - Nhà hàng',
    title: 'Fours Bakery Signature: Giao thoa giữa di sản và hơi thở đô thị',
    summary: 'Bố cục mở, vật liệu thô mộc và điểm nhấn cây xanh nội thất.',
    image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=900&q=80',
  },
]

const internationalPartners = [
  {
    name: 'ENSA Paris-Val de Seine',
    program: 'Studio trao đổi đô thị 2025',
    location: 'Paris, Pháp',
  },
  {
    name: 'TU Berlin – Habitat Lab',
    program: 'Hợp tác nghiên cứu đô thị bền vững',
    location: 'Berlin, Đức',
  },
  {
    name: 'National University of Singapore',
    program: 'Workshop vật liệu và giải pháp nhiệt đới',
    location: 'Singapore',
  },
]

const investorHighlights = [
  {
    name: 'LIXIL Việt Nam',
    focus: 'Tài trợ 02 phòng thí nghiệm vật liệu xanh',
    commitment: 'Gói đầu tư 2 tỷ đồng',
  },
  {
    name: 'VietCapital Partners',
    focus: 'Đồng hành mở rộng trung tâm Digital Hub',
    commitment: 'Đầu tư 1,2 tỷ đồng',
  },
  {
    name: 'Kickstart Innovation Fund',
    focus: 'Ươm tạo các dự án sandbox & khởi nghiệp',
    commitment: '10 suất tài trợ 200 triệu',
  },
]

</script>

<template>
  <MasterLayout>
    <section class="hero" :class="{ 'hero--video': shouldShowVideo }" :style="heroStyle">
      <video
        v-if="shouldShowVideo && videoUrl"
        :src="videoUrl || undefined"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        class="hero-video"
        @error="handleVideoError"
      ></video>
      <div v-if="!shouldShowVideo" class="hero-overlay"></div>
      <div v-if="!shouldShowVideo" class="hero-content">
        <p class="eyebrow">2025 Studio Showcase</p>
        <h1>KHOA KIẾN TRÚC</h1>
        <p class="hero-lede">
          Cập nhật đồ án, workshop và sự kiện nội bộ của khoa. Khám phá những câu chuyện kiến trúc mới nhất ngay tại
          campus Hà Nội.
        </p>
        <div class="hero-actions">
          <button class="primary-btn">Truy cập ngay</button>
          <button class="ghost-btn">Lịch sự kiện</button>
        </div>
        <div class="hero-meta">
          <div>
            <p>05</p>
            <span>Workshop tuần này</span>
          </div>
          <div>
            <p>24</p>
            <span>Đồ án trưng bày</span>
          </div>
          <div>
            <p>08</p>
            <span>Đối tác quốc tế</span>
          </div>
        </div>
      </div>
    </section>

    <section id="section-1" class="section-one">
      <div v-if="latestError" class="section-one__state section-one__state--error">
        {{ latestError }}
      </div>
      <div v-else-if="isLatestLoading" class="section-one__state">
        Đang tải bài viết mới nhất...
      </div>
      <div v-else-if="!latestPosts.length" class="section-one__state">
        Chưa có bài viết mới, quay lại sau nhé!
      </div>
      <div v-else class="latest-board">
        <article v-if="latestHero" class="latest-board__item latest-board__item--hero">
          <RouterLink :to="getPostLink(latestHero)" class="latest-board__link">
            <div class="latest-board__thumb">
              <img :src="getPostImage(latestHero)" :alt="latestHero.title || getPostCategory(latestHero)" loading="lazy" />
            </div>
            <div class="latest-board__body">
              <p class="latest-board__meta">
                {{ getPostCategory(latestHero) }}<span v-if="getPostDate(latestHero)"> · {{ getPostDate(latestHero) }}</span>
              </p>
              <h3 class="clamp-2">{{ latestHero.title || 'Bài viết mới' }}</h3>
              <p class="latest-board__excerpt">
                {{ getPostExcerpt(latestHero, 150) || 'Bài viết mới nhất từ khoa.' }}
              </p>
            </div>
          </RouterLink>
        </article>

        <article
          v-for="(post, idx) in latestRest"
          :key="post.id ?? post.slug ?? post.title ?? idx"
          :class="['latest-board__item', `latest-board__item--s${idx + 1}`]"
        >
          <RouterLink :to="getPostLink(post)" class="latest-board__link">
            <div class="latest-board__thumb latest-board__thumb--small">
              <img :src="getPostImage(post)" :alt="post.title || getPostCategory(post)" loading="lazy" />
            </div>
            <div class="latest-board__body">
              <p class="latest-board__meta">
                {{ getPostCategory(post) }}<span v-if="getPostDate(post)"> · {{ getPostDate(post) }}</span>
              </p>
              <h3 class="clamp-2">{{ post.title || 'Bài viết mới' }}</h3>
            </div>
          </RouterLink>
        </article>
      </div>
    </section>

    <section v-if="showEventSection" id="section-2" class="event-banner">
      <div v-if="eventsError" class="event-state event-state--error">
        {{ eventsError }}
      </div>
      <div v-else-if="isEventsLoading" class="event-state">Đang tải sự kiện...</div>
      <div v-else-if="!events.length" class="event-state">Chưa có sự kiện nào.</div>
      <template v-else>
        <RouterLink
          v-if="eventHero"
          :to="eventHero.id ? `/events/${eventHero.id}` : '/hoat-dong-khoa'"
          class="event-banner-full-link"
        >
          <article class="event-banner-full" :style="eventBannerStyle">
          <div class="event-banner-full__wrapper">
            <div class="event-banner-full__right">
              <div class="event-countdown">
                <div class="countdown-label">Còn lại</div>
                <div class="countdown-grid">
                  <div class="countdown-item">
                    <span class="countdown-value">{{ String(countdown.days).padStart(2, '0') }}</span>
                    <span class="countdown-unit">Ngày</span>
                  </div>
                  <div class="countdown-separator">:</div>
                  <div class="countdown-item">
                    <span class="countdown-value">{{ String(countdown.hours).padStart(2, '0') }}</span>
                    <span class="countdown-unit">Giờ</span>
                  </div>
                  <div class="countdown-separator">:</div>
                  <div class="countdown-item">
                    <span class="countdown-value">{{ String(countdown.minutes).padStart(2, '0') }}</span>
                    <span class="countdown-unit">Phút</span>
                  </div>
                  <div class="countdown-separator">:</div>
                  <div class="countdown-item">
                    <span class="countdown-value">{{ String(countdown.seconds).padStart(2, '0') }}</span>
                    <span class="countdown-unit">Giây</span>
                  </div>
                </div>
              </div>
              <div class="event-info-panel">
                <div class="event-info-item">
                  <div class="event-info-icon">🕐</div>
                  <div class="event-info-content">
                    <div class="event-info-label">Thời gian</div>
                    <div class="event-info-value">{{ formatEventDateRange(eventHero) }}</div>
                    <div class="event-info-value event-info-value--time">{{ formatEventTimeRange(eventHero) }}</div>
                  </div>
                </div>
                <div class="event-info-divider"></div>
                <div class="event-info-item">
                  <div class="event-info-icon">📍</div>
                  <div class="event-info-content">
                    <div class="event-info-label">Địa điểm</div>
                    <div class="event-info-value">{{ eventHero.location || 'Đang cập nhật' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        </RouterLink>
      </template>
    </section>

    <section id="section-3" class="news-section">
      <header class="section-header section-header--dual">
        <div class="section-header__left">
          <p class="section-tag">Tin tức</p>
          <RouterLink class="see-more-btn" to="/tin-tuc">Xem thêm</RouterLink>
        </div>
        <div class="section-header__right">
          <p class="section-tag">Hợp tác kết nối</p>
        </div>
      </header>
      <div class="news-columns">
        <div class="news-stream">
          <div v-if="highlightError" class="section-one__state section-one__state--error">
            {{ highlightError }}
          </div>
          <div v-else-if="isHighlightLoading" class="section-one__state">Đang tải tin nổi bật...</div>
          <div v-else-if="!highlightPosts.length" class="section-one__state">Chưa có tin nổi bật.</div>
          <div v-else class="highlight-grid">
            <article
              v-for="(post, idx) in highlightPosts.slice(0, 6)"
              :key="post.id ?? post.slug ?? post.title ?? idx"
              class="highlight-card"
            >
              <RouterLink :to="getPostLink(post)" class="highlight-card__link">
                <div class="highlight-card__thumb">
                  <img :src="getPostImage(post)" :alt="post.title || getPostCategory(post)" loading="lazy" />
                </div>
                <div class="highlight-card__body">
                  <!-- <span class="highlight-card__category">{{ getPostCategory(post) }}</span> -->
                  <h3 class="highlight-card__title clamp-2">{{ post.title || 'Tin mới' }}</h3>
                </div>
              </RouterLink>
            </article>
          </div>

          <div id="faculty-announcements" class="widget widget--stacked announcements-widget">
            <p class="widget-title">Thông báo</p>
            <div v-if="announcementsError" class="section-one__state section-one__state--error">
              {{ announcementsError }}
            </div>
            <div v-else-if="isAnnouncementsLoading" class="section-one__state">Đang tải thông báo...</div>
            <div v-else-if="!announcementPosts.length" class="section-one__state">Chưa có thông báo.</div>
            <ul v-else>
              <li v-for="post in announcementPosts" :key="post.id ?? post.slug ?? post.title">
                <RouterLink :to="getPostLink(post)" class="announcement-item">
                  <h4>{{ post.title || 'Thông báo mới' }}</h4>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <aside class="news-side">
          <div class="widget">
            <!-- <p class="widget-title">Hợp tác kết nối</p> -->
            <div v-if="collaborationError" class="section-one__state section-one__state--error">
              {{ collaborationError }}
            </div>
            <div v-else-if="isCollaborationLoading" class="section-one__state">Đang tải...</div>
            <div v-else-if="!collaborationPosts.length" class="section-one__state">Chưa có dữ liệu.</div>
            <ul v-else class="collaboration-list">
              <li v-for="post in collaborationPosts" :key="post.id ?? post.slug ?? post.title">
                <RouterLink :to="getPostLink(post)" class="collaboration-item">
                  <img 
                    v-if="post.thumbnail_url" 
                    :src="post.thumbnail_url" 
                    :alt="post.title || 'Hợp tác kết nối'" 
                    class="collaboration-item__thumb"
                    loading="lazy"
                  />
                  <h4 class="collaboration-item__title">{{ post.title || 'Hợp tác kết nối' }}</h4>
                </RouterLink>
              </li>
            </ul>
          </div>
          <div class="widget">
            <p class="widget-title">Sản phẩm</p>
            <ul class="investor-list">
              <li v-for="investor in investorHighlights" :key="investor.name">
                <h4>{{ investor.name }}</h4>
                <p>{{ investor.focus }}</p>
                <span>{{ investor.commitment }}</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

    </section>

    <section v-if="isTechLoading || techPosts.length" id="architecture-tech" class="updates-section">
      <header class="section-header">
        <div>
          <p class="section-tag">Công nghệ kiến trúc</p>
        </div>
        <RouterLink class="see-more-btn" to="/tin-tuc">Xem thêm</RouterLink>
      </header>
      <div class="content-grid reference-grid">
        <div v-if="techError" class="section-one__state section-one__state--error">
          {{ techError }}
        </div>
        <div v-else-if="isTechLoading" class="section-one__state">Đang tải Công nghệ kiến trúc...</div>
        <div v-else-if="!techPosts.length" class="section-one__state">Chưa có bài viết.</div>
        <article
          v-else
          v-for="item in techPosts"
          :key="item.id ?? item.slug ?? item.title"
          class="content-card reference-card"
        >
          <div class="reference-meta">
            <span class="pill">Công nghệ</span>
          </div>
          <h3 class="clamp-2">{{ item.title || 'Bài viết' }}</h3>
          <p>{{ getPostShortDescription(item) }}</p>
          <span class="reference-link">Xem chi tiết</span>
        </article>
      </div>
    </section>

    <section id="sandbox-updates" class="sandbox-section">
      <header class="section-header">
        <div>
          <p class="section-tag">Tạp chí kiến trúc</p>
        </div>
        <a class="see-more-btn" href="https://www.tapchikientruc.com.vn/" target="_blank" rel="noopener">Xem thêm</a>
      </header>
      <div class="sandbox-wrapper">
        <div v-if="sandboxError" class="section-one__state section-one__state--error">
          {{ sandboxError }}
        </div>
        <div v-else-if="isSandboxLoading" class="section-one__state">Đang tải bài Sandbox...</div>
        <div v-else-if="!sandboxRowOne.length && !sandboxRowTwo.length" class="section-one__state">Chưa có bài Sandbox.</div>
        <template v-else>
          <!-- Desktop/Tablet: Grid Layout -->
          <div class="sandbox-grid-container">
            <div class="sandbox-grid">
              <article
                v-for="(post, index) in allSandboxPosts"
                :key="post.slug ?? post.title ?? index"
                class="sandbox-card"
              >
                <a :href="post.link" target="_blank" rel="noopener" class="sandbox-card__link-wrapper">
                  <div class="sandbox-card__media">
                    <img :src="post.image" :alt="post.title" loading="lazy" />
                  </div>
                  <div class="sandbox-card__body">
                    <p v-if="index >= sandboxRowOne.length" class="sandbox-card__category">Chuyên mục</p>
                    <h3 class="clamp-2">{{ post.title }}</h3>
                    <span v-if="index >= sandboxRowOne.length" class="sandbox-card__link">Đọc bài →</span>
                  </div>
                </a>
              </article>
            </div>
          </div>

          <!-- Mobile: Slider Layout -->
          <div class="sandbox-slider-container">
            <div class="sandbox-slider-wrapper">
              <div class="sandbox-slider" :class="{ 'sandbox-slider--sliding': isSliding }" :style="{ transform: `translateX(-${sandboxCurrentIndex * 100}%)` }">
                <div
                  v-for="(post, index) in allSandboxPosts"
                  :key="`slider-${post.slug ?? post.title ?? index}`"
                  class="sandbox-slide"
                >
                  <article class="sandbox-card sandbox-card--slider">
                    <a :href="post.link" target="_blank" rel="noopener" class="sandbox-card__link-wrapper">
                      <div class="sandbox-card__media">
                        <img :src="post.image" :alt="post.title" loading="lazy" />
                      </div>
                      <div class="sandbox-card__body">
                        <p v-if="index >= sandboxRowOne.length" class="sandbox-card__category">Chuyên mục</p>
                        <h3 class="clamp-2">{{ post.title }}</h3>
                        <span v-if="index >= sandboxRowOne.length" class="sandbox-card__link">Đọc bài →</span>
                      </div>
                    </a>
                  </article>
                </div>
              </div>
            </div>
            <div class="sandbox-slider-controls">
              <button
                class="sandbox-slider-btn sandbox-slider-btn--prev"
                @click="goToSandboxSlide('prev')"
                aria-label="Bài trước"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <div class="sandbox-slider-dots">
                <button
                  v-for="(_, index) in allSandboxPosts"
                  :key="`dot-${index}`"
                  class="sandbox-slider-dot"
                  :class="{ 'sandbox-slider-dot--active': sandboxCurrentIndex === index }"
                  @click="goToSandboxSlide(index)"
                  :aria-label="`Đi tới slide ${index + 1}`"
                ></button>
              </div>
              <button
                class="sandbox-slider-btn sandbox-slider-btn--next"
                @click="goToSandboxSlide('next')"
                aria-label="Bài tiếp"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </template>
      </div>
    </section>

    <section id="workshop" class="workshop-section">
      <header class="section-header">
        <div>
          <p class="section-tag">Đối thoại kiến trúc</p>
        </div>
        <a href="https://www.youtube.com/@doithoaikientruc" target="_blank" rel="noopener">Xem kênh</a>
      </header>

      <div v-if="videoError" class="video-state video-state--error">
        {{ videoError }}
      </div>
      <div v-else-if="isVideosLoading" class="video-state">
        Đang tải các video mới nhất...
      </div>
      <div v-else-if="!youtubeVideos.length" class="video-state">
        Chưa có video mới, quay lại sau nhé!
      </div>
      <div v-else class="video-grid">
        <article
          v-for="video in youtubeVideos"
          :key="video.id ?? video.videoId ?? video.title"
          class="video-card"
        >
          <div class="video-thumb">
            <img :src="getThumbnail(video)" :alt="video.title || 'Video Đối thoại kiến trúc'" loading="lazy" />
            <a class="video-play" :href="getVideoUrl(video)" target="_blank" rel="noopener" aria-label="Xem trên YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
          </div>
          <div class="video-body">
            <p class="video-channel">{{ getVideoChannel(video) }}</p>
            <h3 class="clamp-2">{{ video.title || 'Video mới' }}</h3>
            <div class="video-meta">
              <span>{{ formatVideoDate(video.publishedAt) }}</span>
              <a :href="getVideoUrl(video)" target="_blank" rel="noopener" class="video-link">Xem ngay</a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section v-if="isReferenceLoading || referencePosts.length" id="reference-library" class="reference-section">
      <header class="section-header">
        <div>
          <p class="section-tag">Thư viện</p>
        </div>
        <RouterLink class="see-more-btn" to="/tin-tuc">Xem thêm</RouterLink>
      </header>
      <div class="content-grid reference-grid">
        <div v-if="referenceError" class="section-one__state section-one__state--error">
          {{ referenceError }}
        </div>
        <div v-else-if="isReferenceLoading" class="section-one__state">Đang tải thư viện...</div>
        <div v-else-if="!referencePosts.length" class="section-one__state">Chưa có tài liệu.</div>
        <article
          v-else
          v-for="item in referencePosts"
          :key="item.id ?? item.slug ?? item.title"
          class="content-card reference-card"
        >
          <div class="reference-meta">
            <span class="pill">Tài liệu</span>
          </div>
          <h3 class="clamp-2">{{ item.title || 'Tài liệu' }}</h3>
          <p>{{ getPostShortDescription(item) }}</p>
          <span class="reference-link">Mở tài liệu</span>
        </article>
      </div>
    </section>
  </MasterLayout>
</template>
