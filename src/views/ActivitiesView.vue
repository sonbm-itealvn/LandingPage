<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import MasterLayout from '../components/MasterLayout.vue'
import { RouterLink } from 'vue-router'
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
  fetchPostsByGroup,
  type Post,
} from '../services/postsService'
import {
  fetchEvents,
  formatEventDateRange,
  formatEventTimeRange,
  type EventItem,
} from '../services/eventsService'

const latestPosts = ref<Post[]>([])
const isLatestLoading = ref(true)
const latestError = ref('')

const events = ref<EventItem[]>([])
const isEventsLoading = ref(true)
const eventsError = ref('')

const highlightPosts = ref<Post[]>([])
const isHighlightLoading = ref(true)
const highlightError = ref('')

const activityPosts = ref<Post[]>([])
const isActivityLoading = ref(true)
const activityError = ref('')

const techPosts = ref<Post[]>([])
const isTechLoading = ref(true)
const techError = ref('')


const referencePosts = ref<Post[]>([])
const isReferenceLoading = ref(true)
const referenceError = ref('')


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

const loadActivityPosts = async () => {
  isActivityLoading.value = true
  activityError.value = ''
  try {
    activityPosts.value = await fetchPostsByGroup('hoat-dong-su-kien', 'published')
  } catch (error) {
    activityError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải hoạt động khoa.'
    activityPosts.value = []
  } finally {
    isActivityLoading.value = false
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
  loadActivityPosts()
  loadEvents()
  loadTechPosts()
  loadReferencePosts()
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

// Helper function to get category from postCategories array
const getPostCategoryFromData = (post: Post) => {
  if ((post as any).postCategories && Array.isArray((post as any).postCategories) && (post as any).postCategories.length > 0) {
    const primaryCategory = (post as any).postCategories.find((pc: any) => pc.is_primary) || (post as any).postCategories[0]
    if (primaryCategory?.category?.name) {
      return primaryCategory.category.name
    }
    if (primaryCategory?.category?.slug) {
      return primaryCategory.category.slug
    }
  }
  return getPostCategory(post)
}

// Helper function to get category slug from postCategories array
const getPostCategorySlugFromData = (post: Post) => {
  if ((post as any).postCategories && Array.isArray((post as any).postCategories) && (post as any).postCategories.length > 0) {
    const primaryCategory = (post as any).postCategories.find((pc: any) => pc.is_primary) || (post as any).postCategories[0]
    if (primaryCategory?.category?.slug) {
      return primaryCategory.category.slug
    }
  }
  return null
}

// Group activity posts by category
const activityPostsByCategory = computed(() => {
  const grouped: Record<string, { name: string; posts: Post[] }> = {}
  
  activityPosts.value.forEach((post) => {
    const categorySlug = getPostCategorySlugFromData(post)
    const categoryName = getPostCategoryFromData(post)
    
    // Use category slug as key, or fallback to category name
    const key = categorySlug || categoryName || 'other'
    
    if (!grouped[key]) {
      grouped[key] = {
        name: categoryName || 'Khác',
        posts: []
      }
    }
    
    grouped[key].posts.push(post)
  })
  
  return grouped
})

// Get sorted category keys for rendering
const activityCategoryKeys = computed(() => {
  return Object.keys(activityPostsByCategory.value).sort()
})

// Helper: lấy tối đa 6 bài cho từng danh mục hoạt động
const getActivityPostsPreview = (categoryKey: string) => {
  const category = activityPostsByCategory.value[categoryKey]
  if (!category || !Array.isArray(category.posts)) return []
  return category.posts.slice(0, 6)
}

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

    <!-- Hoạt động khoa Sections - Grouped by Category -->
    <template v-if="!isActivityLoading && !activityError">
      <section
        v-for="categoryKey in activityCategoryKeys"
        :key="categoryKey"
        :id="`section-activity-${categoryKey}`"
        class="activity-section"
      >
        <template v-if="activityPostsByCategory[categoryKey]">
          <header class="section-header">
            <div class="section-header__left">
              <p class="section-tag">{{ activityPostsByCategory[categoryKey]?.name }}</p>
            </div>
            <div
              class="section-header__right"
              v-if="activityPostsByCategory[categoryKey]?.posts.length > 6"
            >
              <RouterLink
                class="see-more-btn"
                :to="{ name: 'activities-category', params: { categorySlug: categoryKey } }"
              >
                Xem tất cả
              </RouterLink>
            </div>
          </header>
          <div v-if="!activityPostsByCategory[categoryKey]?.posts.length" class="section-one__state">
            Chưa có bài viết trong danh mục này.
          </div>
          <div v-else class="activity-grid">
            <article
              v-for="post in getActivityPostsPreview(categoryKey)"
              :key="post.id ?? post.slug ?? post.title"
              class="activity-card"
            >
              <RouterLink :to="getPostLink(post)" class="activity-card__link">
                <div class="activity-card__thumb">
                  <img :src="getPostImage(post)" :alt="post.title || activityPostsByCategory[categoryKey]?.name" loading="lazy" />
                </div>
                <div class="activity-card__body">
                  <p class="activity-card__meta">
                    {{ getPostCategoryFromData(post) }}<span v-if="getPostDate(post)"> · {{ getPostDate(post) }}</span>
                  </p>
                  <h3 class="activity-card__title clamp-2">{{ post.title || activityPostsByCategory[categoryKey]?.name }}</h3>
                  <p v-if="getPostExcerpt(post, 100)" class="activity-card__excerpt">
                    {{ getPostExcerpt(post, 100) }}
                  </p>
                </div>
              </RouterLink>
            </article>
          </div>
        </template>
      </section>
    </template>
    
    <!-- Loading and Error States -->
    <section v-if="activityError" class="activity-section">
      <div class="section-one__state section-one__state--error">
        {{ activityError }}
      </div>
    </section>
    <section v-else-if="isActivityLoading" class="activity-section">
      <div class="section-one__state">Đang tải hoạt động khoa...</div>
    </section>
    <section v-else-if="activityCategoryKeys.length === 0" class="activity-section">
      <div class="section-one__state">Chưa có hoạt động nào.</div>
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
