<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import MasterLayout from '../components/MasterLayout.vue'
import { RouterLink } from 'vue-router'
import { fetchBanners, type Banner } from '../services/bannersService'
import {
  fetchLatestYoutubeVideos,
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

const referencePosts = ref<Post[]>([])
const isReferenceLoading = ref(true)
const referenceError = ref('')

const youtubeVideos = ref<YoutubeVideo[]>([])
const isVideosLoading = ref(true)
const videoError = ref('')

const banners = ref<Banner[]>([])
const bannersError = ref('')

const loadLatestPosts = async () => {
  isLatestLoading.value = true
  latestError.value = ''
  try {
    latestPosts.value = await fetchLatestPosts(5)
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
    highlightPosts.value = await fetchLatestPostsByCategory('hoat-dong-khoa', 6)
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
    announcementPosts.value = await fetchLatestPostsByCategory('thong-bao', 5)
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

const loadYoutubeVideos = async () => {
  isVideosLoading.value = true
  videoError.value = ''
  try {
    youtubeVideos.value = await fetchLatestYoutubeVideos()
  } catch (error) {
    videoError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải dữ liệu.'
  } finally {
    isVideosLoading.value = false
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
    banners.value = await fetchBanners(true)
  } catch (error) {
    bannersError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải banner.'
    banners.value = []
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
  loadYoutubeVideos()
  loadBanners()
})

onBeforeUnmount(() => {
  stopAutoSlide()
})

watch(
  () => events.value.length,
  () => {
    currentEventIndex.value = 0
    startAutoSlide()
  },
)

const sectionOneHero = computed(() => latestPosts.value[0])
const sectionOneLeftPosts = computed(() => latestPosts.value.slice(1, 3))
const sectionOneRightPosts = computed(() => latestPosts.value.slice(3, 5))
const eventHero = computed(() => events.value[0])
const showEventSection = computed(() => isEventsLoading.value || events.value.length > 0)
const hasMultipleEvents = computed(() => events.value.length > 1)
const sliderStyle = computed(() => ({
  transform: `translateX(-${currentEventIndex.value * 100}%)`,
}))
const highlightColumns = computed(() => [highlightPosts.value.slice(0, 3), highlightPosts.value.slice(3, 6)])

const DEFAULT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80'
const heroImage = computed(() => banners.value[0]?.image || DEFAULT_HERO_IMAGE)
const heroStyle = computed(() => ({
  backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.4), rgba(8, 47, 73, 0.6)), url('${heroImage.value}')`,
}))

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
    <section class="hero" :style="heroStyle">
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
      <div v-else class="section-one__frame">
        <div class="section-one__col">
          <article
            v-for="post in sectionOneLeftPosts"
            :key="post.id ?? post.slug ?? post.title"
            class="section-one__card"
          >
            <RouterLink :to="getPostLink(post)">
              <img :src="getPostImage(post)" :alt="post.title || getPostCategory(post)" loading="lazy" />
            </RouterLink>
            <div>
              <h3 class="clamp-2">{{ post.title || 'Bài viết mới' }}</h3>
            </div>
          </article>
        </div>

        <article v-if="sectionOneHero" class="section-one__hero">
          <RouterLink :to="getPostLink(sectionOneHero)">
            <img
              :src="getPostImage(sectionOneHero)"
              :alt="sectionOneHero.title || getPostCategory(sectionOneHero)"
              loading="lazy"
            />
          </RouterLink>
          <div>
            <h3 class="clamp-2">{{ sectionOneHero.title || 'Bài viết mới' }}</h3>
            <p>{{ getPostExcerpt(sectionOneHero) || 'Bài viết mới nhất từ khoa.' }}</p>
          </div>
        </article>

        <div class="section-one__col section-one__col--right">
          <article
            v-for="post in sectionOneRightPosts"
            :key="post.id ?? post.slug ?? post.title"
            class="section-one__card"
          >
            <RouterLink :to="getPostLink(post)">
              <img :src="getPostImage(post)" :alt="post.title || getPostCategory(post)" loading="lazy" />
            </RouterLink>
            <div>
              <h3 class="clamp-2">{{ post.title || 'Bài viết mới' }}</h3>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section v-if="showEventSection" id="section-2" class="event-banner">
      <header class="section-header">
        <div>
          <p class="section-tag">Sự kiện</p>
        </div>
        <RouterLink class="see-more-btn" to="/hoat-dong-khoa">Xem thêm</RouterLink>
      </header>
      <div v-if="eventsError" class="event-state event-state--error">
        {{ eventsError }}
      </div>
      <div v-else-if="isEventsLoading" class="event-state">Đang tải sự kiện...</div>
      <div v-else-if="!events.length" class="event-state">Chưa có sự kiện nào.</div>
      <template v-else>
        <div
          class="event-slider"
          @mouseenter="stopAutoSlide()"
          @mouseleave="startAutoSlide()"
        >
          <div class="event-slider__track" :style="sliderStyle">
            <article
              v-for="(event, idx) in events"
              :key="event.id ?? event.title ?? idx"
              class="event-slide"
            >
              <div class="event-slide__inner">
                <div class="event-datecard">
                  <p class="event-datecard__status">{{ getEventStatus(event) }}</p>
                  <div class="event-datecard__day">{{ getEventDay(event) }}</div>
                  <p class="event-datecard__month">{{ getEventMonth(event) }}</p>
                  <span class="event-datecard__time">{{ formatEventTimeRange(event) }}</span>
                </div>
                <div class="event-content">
                  <div class="event-chip">Sự kiện</div>
                  <h3 class="clamp-2">{{ getEventTitle(event) }}</h3>
                  <p class="event-subtitle">{{ getEventSubtitle(event) }}</p>
                  <div class="event-meta">
                    <div>
                      <span class="event-meta__label">Thời gian</span>
                      <p class="event-meta__value">{{ formatEventDateRange(event) }}</p>
                      <p class="event-meta__value event-meta__value--muted">{{ formatEventTimeRange(event) }}</p>
                    </div>
                    <div>
                      <span class="event-meta__label">Địa điểm</span>
                      <p class="event-meta__value">{{ event.location || 'Đang cập nhật' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div v-if="hasMultipleEvents" class="event-slider__controls">
            <button class="event-btn" type="button" @click="prevEvent">‹</button>
            <div class="event-dots">
              <button
                v-for="(event, idx) in events"
                :key="event.id ?? event.title ?? idx"
                type="button"
                class="event-dot"
                :class="{ 'event-dot--active': idx === currentEventIndex }"
                @click="goToEvent(idx)"
                :aria-label="`Chuyển đến sự kiện ${idx + 1}`"
              ></button>
            </div>
            <button class="event-btn" type="button" @click="nextEvent">›</button>
          </div>
        </div>
      </template>
    </section>

    <section id="section-3" class="news-section">
      <header class="section-header">
        <div>
          <p class="section-tag">Tin tức</p>
          <h2>Tin nổi bật</h2>
        </div>
        <RouterLink class="see-more-btn" to="/tin-tuc">Xem thêm</RouterLink>
      </header>
      <div class="news-columns">
        <div class="news-stream">
          <div v-if="highlightError" class="section-one__state section-one__state--error">
            {{ highlightError }}
          </div>
          <div v-else-if="isHighlightLoading" class="section-one__state">Đang tải tin nổi bật...</div>
          <div v-else-if="!highlightPosts.length" class="section-one__state">Chưa có tin nổi bật.</div>
          <div v-else class="news-grid">
            <div v-for="(col, cIdx) in highlightColumns" :key="`col-${cIdx}`" class="news-grid__col">
              <article v-for="post in col" :key="post.id ?? post.slug ?? post.title" class="news-card">
                <RouterLink :to="getPostLink(post)" class="news-card__media">
                  <img :src="getPostImage(post)" :alt="post.title || getPostCategory(post)" loading="lazy" />
                </RouterLink>
                <div>
                  <h3 class="clamp-2">{{ post.title || 'Tin mới' }}</h3>
                </div>
              </article>
            </div>
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
                <h4>{{ post.title || 'Thông báo mới' }}</h4>
              </li>
            </ul>
          </div>
        </div>
        <aside class="news-side">
          <div class="widget">
            <p class="widget-title">Đối tác quốc tế</p>
            <ul class="partner-list">
              <li v-for="partner in internationalPartners" :key="partner.name">
                <h4>{{ partner.name }}</h4>
                <p>{{ partner.program }}</p>
                <span>{{ partner.location }}</span>
              </li>
            </ul>
          </div>
          <div class="widget">
            <p class="widget-title">Nhà đầu tư</p>
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
          <div class="sandbox-row">
            <div class="sandbox-grid">
              <article
                v-for="post in sandboxRowOne"
                :key="post.slug ?? post.title"
                class="sandbox-card"
              >
                <a :href="post.link" target="_blank" rel="noopener" class="sandbox-card__media">
                  <img :src="post.image" :alt="post.title" loading="lazy" />
                </a>
                <div class="sandbox-card__body">
                  <p class="sandbox-card__category">Bài mới</p>
                  <h3 class="clamp-2">{{ post.title }}</h3>
                  <a :href="post.link" target="_blank" rel="noopener" class="sandbox-card__link">Đọc bài →</a>
                </div>
              </article>
            </div>
          </div>

          <div class="sandbox-row">
            <div class="sandbox-grid">
              <article
                v-for="post in sandboxRowTwo"
                :key="post.slug ?? post.title"
                class="sandbox-card"
              >
                <a :href="post.link" target="_blank" rel="noopener" class="sandbox-card__media">
                  <img :src="post.image" :alt="post.title" loading="lazy" />
                </a>
                <div class="sandbox-card__body">
                  <p class="sandbox-card__category">Chuyên mục</p>
                  <h3 class="clamp-2">{{ post.title }}</h3>
                  <a :href="post.link" target="_blank" rel="noopener" class="sandbox-card__link">Đọc bài →</a>
                </div>
              </article>
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
