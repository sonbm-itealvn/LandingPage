<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import MasterLayout from '../components/MasterLayout.vue'
import { RouterLink } from 'vue-router'
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
  fetchSpecialPostsLatest,
  fetchSpecialPostsRandom,
  fetchPostsByCategory,
  type Post,
} from '../services/postsService'
import {
  fetchEvents,
  formatEventDateRange,
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

const collaborationPosts = ref<Post[]>([])
const isCollaborationLoading = ref(true)
const collaborationError = ref('')

const productPosts = ref<Post[]>([])
const isProductLoading = ref(true)
const productError = ref('')

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

const loadProductPosts = async () => {
  isProductLoading.value = true
  productError.value = ''
  try {
    productPosts.value = await fetchPostsByCategory('san-pham', 1, 5)
  } catch (error) {
    productError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải sản phẩm.'
    productPosts.value = []
  } finally {
    isProductLoading.value = false
  }
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
  loadCollaborationPosts()
  loadProductPosts()
})

onBeforeUnmount(() => {
  stopCountdown()
})

watch(
  () => events.value.length,
  () => {
    startCountdown()
  },
)

const latestHero = computed(() => latestPosts.value[0])
const latestRest = computed(() => latestPosts.value.slice(1, 5))
const eventHero = computed(() => events.value[0])
const showEventSection = computed(() => isEventsLoading.value || events.value.length > 0)
const highlightColumns = computed(() => [highlightPosts.value.slice(0, 3), highlightPosts.value.slice(3, 6)])

watch(
  () => eventHero.value?.end_time,
  () => {
    startCountdown()
  },
)

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

const getPostLink = (post: Post) => post.link || (post.id ? `/posts/${post.id}` : post.slug ? `/posts/${post.slug}` : '#')

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
                  <span class="highlight-card__category">{{ getPostCategory(post) }}</span>
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
            <p class="widget-title">Hợp tác kết nối</p>
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
            <div v-if="productError" class="section-one__state section-one__state--error">
              {{ productError }}
            </div>
            <div v-else-if="isProductLoading" class="section-one__state">Đang tải...</div>
            <div v-else-if="!productPosts.length" class="section-one__state">Chưa có dữ liệu.</div>
            <ul v-else class="collaboration-list">
              <li v-for="post in productPosts" :key="post.id ?? post.slug ?? post.title">
                <RouterLink :to="getPostLink(post)" class="collaboration-item">
                  <img 
                    v-if="post.thumbnail_url" 
                    :src="post.thumbnail_url" 
                    :alt="post.title || 'Sản phẩm'" 
                    class="collaboration-item__thumb"
                    loading="lazy"
                  />
                  <h4 class="collaboration-item__title">{{ post.title || 'Sản phẩm' }}</h4>
                </RouterLink>
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
                <a :href="post.link" target="_blank" rel="noopener" class="sandbox-card__link-wrapper">
                  <div class="sandbox-card__media">
                    <img :src="post.image" :alt="post.title" loading="lazy" />
                  </div>
                  <div class="sandbox-card__body">
                    <!-- <p class="sandbox-card__category">Bài mới</p> -->
                    <h3 class="clamp-2">{{ post.title }}</h3>
                    <!-- <span class="sandbox-card__link">Đọc bài →</span> -->
                  </div>
                </a>
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
                <a :href="post.link" target="_blank" rel="noopener" class="sandbox-card__link-wrapper">
                  <div class="sandbox-card__media">
                    <img :src="post.image" :alt="post.title" loading="lazy" />
                  </div>
                  <div class="sandbox-card__body">
                    <!-- <p class="sandbox-card__category">Chuyên mục</p> -->
                    <h3 class="clamp-2">{{ post.title }}</h3>
                    <!-- <span class="sandbox-card__link">Đọc bài →</span> -->
                  </div>
                </a>
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
