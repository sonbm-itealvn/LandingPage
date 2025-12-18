<script setup lang="ts">
import { computed, onMounted, ref, onUnmounted } from 'vue'
import MasterLayout from '../components/MasterLayout.vue'
import { RouterLink } from 'vue-router'
import {
  fetchLatestPosts,
  getPostCategory,
  getPostDate,
  getPostImage,
  getPostExcerpt,
  type Post,
} from '../services/postsService'

const latestPosts = ref<Post[]>([])
const isLatestLoading = ref(true)
const latestError = ref('')

const loadLatestPosts = async () => {
  isLatestLoading.value = true
  latestError.value = ''
  try {
    latestPosts.value = await fetchLatestPosts(3)
  } catch (error) {
    latestError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải bài viết.'
    latestPosts.value = []
  } finally {
    isLatestLoading.value = false
  }
}

onMounted(() => {
  loadLatestPosts()
  setupScrollAnimations()
})

onUnmounted(() => {
  cleanupScrollAnimations()
})

const getPostLink = (post: Post) => post.link || (post.id ? `/posts/${post.id}` : post.slug ? `/posts/${post.slug}` : '#')

// Timeline milestones
const timelineMilestones = [
  { year: '1960s', title: 'Thành lập', description: 'Khoa Kiến trúc được thành lập' },
  { year: '1980s', title: 'Phát triển', description: 'Mở rộng chương trình đào tạo' },
  { year: '2000s', title: 'Hiện đại hóa', description: 'Đổi mới phương pháp giảng dạy' },
  { year: '2020s', title: 'Hội nhập', description: 'Hợp tác quốc tế và nghiên cứu khoa học' },
]

// Statistics data
const statistics = [
  { number: '8.000', label: 'Kiến trúc sư', icon: '🏛️' },
  { number: '660', label: 'Thạc sĩ', icon: '🎓' },
  { number: '42', label: 'Tiến sĩ kiến trúc', icon: '👨‍🎓' },
  { number: '78', label: 'Giảng viên', icon: '👨‍🏫' },
]

// Team statistics
const teamStats = [
  { number: '03', label: 'Phó giáo sư', icon: '👨‍🏫' },
  { number: '18', label: 'Tiến sĩ', icon: '🎓' },
  { number: '60', label: 'Thạc sĩ, Kiến trúc sư', icon: '🏗️' },
  { number: '02', label: 'Trợ lí Ban chủ nhiệm', icon: '📋' },
  { number: '03', label: 'Thư kí Khoa', icon: '📝' },
]

// Course specialities
const specialities = [
  {
    title: 'Kiến trúc',
    description: 'Chương trình đào tạo Kiến trúc sư với các studio thực hành và đồ án sáng tạo.',
    icon: '🏛️',
  },
  {
    title: 'Kiến trúc nâng cao',
    description: 'Chương trình đào tạo nâng cao dành cho sinh viên có năng khiếu và đam mê kiến trúc.',
    icon: '⭐',
  },
  {
    title: 'Kiến trúc sư tài năng',
    description: 'Chương trình đào tạo đặc biệt dành cho các sinh viên tài năng trong lĩnh vực kiến trúc.',
    icon: '🌟',
  },
  {
    title: 'Đào tạo sau đại học',
    description: 'Chương trình Thạc sĩ và Tiến sĩ về Kiến trúc, Quy hoạch đô thị và Công nghệ xây dựng.',
    icon: '🎓',
  },
]

// Facilities
const facilities = [
  { title: '7 Phòng ban', description: 'Các phòng ban chuyên môn phục vụ công tác quản lý và đào tạo' },
  { title: '7 Xưởng thực hành', description: 'Xưởng thực hành kiến trúc với đầy đủ trang thiết bị hiện đại' },
  { title: 'Phòng tư liệu', description: 'Thư viện tư liệu chuyên ngành kiến trúc và quy hoạch' },
  { title: 'Phòng trưng bày', description: 'Không gian trưng bày đồ án và tác phẩm của sinh viên' },
]

// Research directions
const researchDirections = [
  {
    title: 'Bảo tồn di sản',
    description: 'Bảo tồn di sản kiến trúc và đô thị, nghiên cứu các giải pháp bảo tồn và phát huy giá trị di sản.',
  },
  {
    title: 'Phê bình kiến trúc',
    description: 'Nghiên cứu và phát triển lý thuyết phê bình kiến trúc đương đại.',
  },
  {
    title: 'Công nghệ thiết kế',
    description: 'Công nghệ và tiêu chuẩn thiết kế kiến trúc đô thị và nông thôn, ứng dụng công nghệ mới.',
  },
  {
    title: 'Phát triển bền vững',
    description: 'Kiến trúc xanh, tiết kiệm năng lượng, thích ứng với biến đổi khí hậu.',
  },
]

// International partners
const internationalPartners = [
  { name: 'University of Nottingham', country: 'Vương quốc Anh' },
  { name: 'National University of Singapore', country: 'Singapore' },
  { name: 'University of Melbourne', country: 'Australia' },
  { name: 'University of Turin', country: 'Italy' },
  { name: 'Kitakyushu University', country: 'Nhật Bản' },
  { name: 'Nagoya University', country: 'Nhật Bản' },
]

// Technology partners
const techPartners = ['VNCC', 'Gansam (Hàn Quốc)', 'SPEC', 'Bkav']

// Information cards with scroll-triggered effect
const infoCards = [
  {
    id: 'growth',
    icon: '📈',
    iconColor: '#10b981',
    tag: '+125%',
    tagColor: '#10b981',
    title: 'Tăng Trưởng Vượt Bậc',
    description: 'Doanh thu của chúng tôi đã tăng trưởng mạnh mẽ trong quý vừa qua, với sự đóng góp từ các dự án chiến lược.',
    progress: 85,
    progressColor: '#10b981',
    iconPosition: 'left',
  },
  {
    id: 'community',
    icon: '👥',
    iconColor: '#3b82f6',
    tag: '50K+',
    tagColor: '#3b82f6',
    title: 'Cộng Đồng Phát Triển',
    description: 'Hơn 50,000 người dùng đã tham gia cộng đồng của chúng tôi, tạo nên một mạng lưới kết nối mạnh mẽ.',
    progress: 90,
    progressColor: '#3b82f6',
    iconPosition: 'right',
  },
  {
    id: 'students',
    icon: '🎓',
    iconColor: '#f97316',
    tag: '8.000+',
    tagColor: '#f97316',
    title: 'Sinh Viên Đã Tốt Nghiệp',
    description: 'Hơn 8.000 kiến trúc sư đã tốt nghiệp từ khoa, đóng góp tích cực cho ngành kiến trúc Việt Nam.',
    progress: 80,
    progressColor: '#f97316',
    iconPosition: 'left',
  },
  {
    id: 'research',
    icon: '🔬',
    iconColor: '#8b5cf6',
    tag: '30+',
    tagColor: '#8b5cf6',
    title: 'Nghiên Cứu Khoa Học',
    description: 'Hơn 30 đề tài nghiên cứu khoa học của sinh viên được hướng dẫn mỗi năm, góp phần phát triển ngành.',
    progress: 75,
    progressColor: '#8b5cf6',
    iconPosition: 'right',
  },
]

// Scroll animation setup
let observer: IntersectionObserver | null = null
let flowLineObserver: IntersectionObserver | null = null
let itemObserver: IntersectionObserver | null = null
let infoCardObserver: IntersectionObserver | null = null
let scrollHandler: (() => void) | null = null

const setupScrollAnimations = () => {
  if (typeof window === 'undefined') return
  
  // Observer for main sections
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('flow-visible')
          // Once visible, we can stop observing
          observer?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  )

  // Observer for individual items (cards, images, etc.)
  itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('item-visible')
          entry.target.classList.remove('item-hidden')
        } else {
          entry.target.classList.remove('item-visible')
          entry.target.classList.add('item-hidden')
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -30px 0px',
    }
  )

  // Observer for info cards with toggle effect
  infoCardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('info-card-visible')
          entry.target.classList.remove('info-card-hidden')
        } else {
          entry.target.classList.remove('info-card-visible')
          entry.target.classList.add('info-card-hidden')
        }
      })
    },
    {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px',
    }
  )

  // Observe main sections
  document.querySelectorAll('.flow-item').forEach((el) => {
    observer?.observe(el)
  })

  // Observe individual items
  document.querySelectorAll('.flow-item-child').forEach((el) => {
    itemObserver.observe(el)
  })

  // Observe info cards
  document.querySelectorAll('.info-card').forEach((el) => {
    infoCardObserver.observe(el)
  })

  // Observe flow line path for animation
  flowLineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const path = entry.target as SVGPathElement
          const length = path.getTotalLength()
          path.style.strokeDasharray = `${length}`
          path.style.strokeDashoffset = `${length}`
          
          // Animate the path drawing
          requestAnimationFrame(() => {
            path.style.transition = 'stroke-dashoffset 2s ease-in-out'
            path.style.strokeDashoffset = '0'
          })
        }
      })
    },
    {
      threshold: 0,
      rootMargin: '0px',
    }
  )

  const flowPath = document.querySelector('.flow-path')
  if (flowPath) {
    flowLineObserver.observe(flowPath)
  }

  // Scroll progress for flow line
  const updateScrollProgress = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollProgress = scrollTop / (documentHeight - windowHeight)
    
    const flowLine = document.querySelector('.flow-line') as HTMLElement
    if (flowLine) {
      const progress = Math.min(scrollProgress, 1)
      flowLine.style.setProperty('--scroll-progress', progress.toString())
    }
  }
  
  // Throttle scroll event
  let ticking = false
  scrollHandler = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollProgress()
        ticking = false
      })
      ticking = true
    }
  }
  
  window.addEventListener('scroll', scrollHandler, { passive: true })
  updateScrollProgress() // Initial call
}

const cleanupScrollAnimations = () => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (itemObserver) {
    itemObserver.disconnect()
    itemObserver = null
  }
  if (infoCardObserver) {
    infoCardObserver.disconnect()
    infoCardObserver = null
  }
  if (flowLineObserver) {
    flowLineObserver.disconnect()
    flowLineObserver = null
  }
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
    scrollHandler = null
  }
}
</script>

<template>
  <MasterLayout>
    <!-- Flow Container -->
    <div class="flow-container">
      <!-- Flow Line Background -->
      <div class="flow-line">
        <svg class="flow-line-svg" viewBox="0 0 100 2000" preserveAspectRatio="none">
          <path
            d="M 50 0 Q 30 200 50 400 T 50 800 T 50 1200 T 50 1600 T 50 2000"
            fill="none"
            stroke="url(#flowGradient)"
            stroke-width="2"
            class="flow-path"
          />
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: var(--hau-accent); stop-opacity: 0.3" />
              <stop offset="50%" style="stop-color: var(--hau-accent); stop-opacity: 0.6" />
              <stop offset="100%" style="stop-color: var(--hau-accent); stop-opacity: 0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- Hero Section with Timeline -->
      <section class="flow-section flow-hero flow-item">
        <div class="flow-hero__content">
          <p class="flow-hero__eyebrow">Dòng chảy lịch sử</p>
          <h1 class="flow-hero__title">Dòng chảy lịch sử Khoa Kiến trúc</h1>
          <p class="flow-hero__description">
            Trải qua gần hơn 60 năm xây dựng và trưởng thành, Khoa Kiến trúc - Trường Đại học Kiến trúc Hà Nội đã đào tạo
            hơn 8.000 Kiến trúc sư, 660 Thạc sĩ và 42 Tiến sĩ kiến trúc.
          </p>
        </div>
        
        <!-- Timeline Flow -->
        <div class="flow-timeline">
          <div v-for="(milestone, index) in timelineMilestones" :key="milestone.year" class="flow-timeline__item">
            <div class="flow-timeline__dot"></div>
            <div class="flow-timeline__line" v-if="index < timelineMilestones.length - 1"></div>
            <div class="flow-timeline__content">
              <div class="flow-timeline__year">{{ milestone.year }}</div>
              <div class="flow-timeline__title">{{ milestone.title }}</div>
              <div class="flow-timeline__description">{{ milestone.description }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Flow Connector -->
      <div class="flow-connector">
        <div class="flow-connector__wave"></div>
      </div>

      <!-- Information Cards Section -->
      <section class="flow-section flow-info-cards flow-item">
        <div class="flow-section__header">
          <p class="flow-section__tag">Thành tựu</p>
          <h2 class="flow-section__title">Thành tựu nổi bật</h2>
        </div>
        <div class="info-cards-container">
          <div
            v-for="card in infoCards"
            :key="card.id"
            class="info-card"
            :class="`info-card--${card.iconPosition}`"
          >
            <div class="info-card__icon-wrapper" :style="{ '--icon-color': card.iconColor }">
              <div class="info-card__icon-circle">
                <div class="info-card__icon">{{ card.icon }}</div>
                  </div>
              <div class="info-card__tag" :style="{ 'background-color': card.tagColor }">
                {{ card.tag }}
                  </div>
                  </div>
            <div class="info-card__content">
              <h3 class="info-card__title">{{ card.title }}</h3>
              <p class="info-card__description">{{ card.description }}</p>
              <div class="info-card__progress">
                <div class="info-card__progress-track">
                  <div
                    class="info-card__progress-fill"
                    :style="{
                      width: card.progress + '%',
                      'background-color': card.progressColor,
                    }"
                  ></div>
                  </div>
                </div>
              </div>
                  </div>
                </div>
      </section>

      <!-- Flow Connector -->
      <div class="flow-connector flow-connector--reverse">
        <div class="flow-connector__wave"></div>
                  </div>

      <!-- Statistics Section -->
      <section class="flow-section flow-stats flow-item">
        <div class="flow-section__header">
          <p class="flow-section__tag">Thống kê</p>
          <h2 class="flow-section__title">Những con số ấn tượng</h2>
        </div>
        <div class="flow-stats__container">
          <div v-for="(stat, index) in statistics" :key="stat.label" class="flow-stat-card flow-item-child" :style="{ '--delay': index * 0.1 + 's' }">
            <div class="flow-stat-card__icon">{{ stat.icon }}</div>
            <div class="flow-stat-card__number">{{ stat.number }}</div>
            <div class="flow-stat-card__label">{{ stat.label }}</div>
            <div class="flow-stat-card__stream"></div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="flow-section flow-team flow-item">
        <div class="flow-section__header">
          <p class="flow-section__tag">Nguồn nhân lực</p>
          <h2 class="flow-section__title">Đội ngũ chuyên nghiệp</h2>
        </div>
        <div class="flow-team__cards">
          <!-- Card 1: Đội ngũ giảng viên -->
          <div class="flow-team-card flow-item-child">
            <div class="flow-team-card__header">
              <div class="flow-team-card__main-number">78</div>
              <div class="flow-team-card__main-label">Giảng viên</div>
            </div>
            <div class="flow-team-card__divider"></div>
            <div class="flow-team-card__subtitle">Trong đó có:</div>
            <div class="flow-team-card__breakdown">
              <div class="flow-team-card__breakdown-item">
                <div class="flow-team-card__number">03</div>
                <div class="flow-team-card__label">Phó giáo sư</div>
              </div>
              <div class="flow-team-card__breakdown-divider"></div>
              <div class="flow-team-card__breakdown-item">
                <div class="flow-team-card__number">18</div>
                <div class="flow-team-card__label">Tiến sĩ</div>
              </div>
              <div class="flow-team-card__breakdown-divider"></div>
              <div class="flow-team-card__breakdown-item">
                <div class="flow-team-card__number">60</div>
                <div class="flow-team-card__label">Thạc sĩ, Kiến trúc sư</div>
              </div>
            </div>
            <div class="flow-team-card__divider"></div>
            <div class="flow-team-card__description">
              Các giảng viên được biên chế tại 8 Bộ môn giảng dạy các môn lí thuyết, thực hành và đồ án chuyên ngành.
            </div>
          </div>

          <!-- Card 2: Văn phòng Khoa -->
          <div class="flow-team-card flow-item-child">
            <div class="flow-team-card__header">
              <div class="flow-team-card__subtitle">Văn phòng Khoa gồm:</div>
            </div>
            <div class="flow-team-card__breakdown">
              <div class="flow-team-card__breakdown-item">
                <div class="flow-team-card__number">02</div>
                <div class="flow-team-card__label">Giảng viên là trợ lí cho Ban chủ nhiệm khoa về công tác đào tạo, quản lí sinh viên</div>
              </div>
              <div class="flow-team-card__breakdown-divider"></div>
              <div class="flow-team-card__breakdown-item">
                <div class="flow-team-card__number">03</div>
                <div class="flow-team-card__label">Thư kí Khoa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Flow Connector -->
      <div class="flow-connector">
        <div class="flow-connector__wave"></div>
      </div>

      <!-- Facilities Section -->
      <section class="flow-section flow-facilities flow-item">
        <div class="flow-section__header">
          <p class="flow-section__tag">Cơ sở vật chất</p>
          <h2 class="flow-section__title">Không gian học tập</h2>
        </div>
        <div class="flow-facilities__grid">
          <div v-for="(facility, index) in facilities" :key="facility.title" class="flow-facility-card flow-item-child" :style="{ '--delay': index * 0.1 + 's' }">
            <div class="flow-facility-card__stream"></div>
            <h3 class="flow-facility-card__title">{{ facility.title }}</h3>
            <p class="flow-facility-card__description">{{ facility.description }}</p>
          </div>
        </div>
        <div class="flow-facilities__gallery">
          <div class="flow-gallery-item">
            <img src="/Ảnh chụp màn hình 2025-12-18 172702.png" alt="Cơ sở vật chất - Lớp học" loading="lazy" />
          </div>
          <div class="flow-gallery-item">
            <img src="/Ảnh chụp màn hình 2025-12-18 172715.png" alt="Cơ sở vật chất - Studio" loading="lazy" />
          </div>
          <div class="flow-gallery-item flow-gallery-item--large">
            <img src="/Ảnh chụp màn hình 2025-12-18 172724.png" alt="Cơ sở vật chất - Xưởng studio" loading="lazy" />
          </div>
        </div>
      </section>

      <!-- Flow Connector -->
      <div class="flow-connector flow-connector--reverse">
        <div class="flow-connector__wave"></div>
      </div>

      <!-- Course Speciality Section -->
      <section class="flow-section flow-courses flow-item">
        <div class="flow-section__header">
          <p class="flow-section__tag">Chương trình đào tạo</p>
          <h2 class="flow-section__title">Hệ thống đào tạo</h2>
        </div>
        <div class="flow-courses__stream">
          <div
            v-for="(speciality, index) in specialities"
            :key="speciality.title"
            class="flow-course-card flow-item-child"
            :style="{ '--delay': index * 0.15 + 's' }"
          >
            <div class="flow-course-card__icon">{{ speciality.icon }}</div>
            <h3 class="flow-course-card__title">{{ speciality.title }}</h3>
            <p class="flow-course-card__description">{{ speciality.description }}</p>
            <div class="flow-course-card__stream"></div>
          </div>
        </div>
        <div class="flow-courses__award">
          <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80" alt="Lễ trao giải" loading="lazy" />
          <div class="flow-award__overlay">
            <p>KHEN THƯỞNG SINH VIÊN NGHIÊN CỨU KHOA HỌC ĐẠT GIẢI CẤP TRƯỜNG</p>
          </div>
        </div>
      </section>

      <!-- Research Section -->
      <section class="flow-section flow-research flow-item">
        <div class="flow-section__header">
          <p class="flow-section__tag">Nghiên cứu khoa học</p>
          <h2 class="flow-section__title">Hoạt động nghiên cứu</h2>
        </div>
        <div class="flow-research__grid">
          <div v-for="(direction, index) in researchDirections" :key="direction.title" class="flow-research-card flow-item-child" :style="{ '--delay': index * 0.1 + 's' }">
            <h3 class="flow-research-card__title">{{ direction.title }}</h3>
            <p class="flow-research-card__description">{{ direction.description }}</p>
            <div class="flow-research-card__stream"></div>
          </div>
        </div>
      </section>

      <!-- Flow Connector -->
      <div class="flow-connector flow-connector--reverse">
        <div class="flow-connector__wave"></div>
      </div>

      <!-- Partnership Section -->
      <section class="flow-section flow-partnership flow-item">
        <div class="flow-section__header">
          <p class="flow-section__tag">Hợp tác</p>
          <h2 class="flow-section__title">Mạng lưới hợp tác</h2>
        </div>
        <div class="flow-partnership__images">
          <div class="flow-partnership-image flow-partnership-image--large">
            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80" alt="Hợp tác quốc tế" loading="lazy" />
          </div>
          <div class="flow-partnership-image">
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80" alt="Đối tác" loading="lazy" />
          </div>
          <div class="flow-partnership-image">
            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80" alt="Giảng dạy" loading="lazy" />
          </div>
        </div>
        <div class="flow-partnership__content">
          <div class="flow-partnership-section">
            <h3 class="flow-partnership-section__title">Đối tác Quốc tế</h3>
            <div class="flow-partnership-list">
              <div v-for="partner in internationalPartners" :key="partner.name" class="flow-partnership-item">
                <strong>{{ partner.name }}</strong>
                <span>{{ partner.country }}</span>
              </div>
            </div>
          </div>
          <div class="flow-partnership-section">
            <h3 class="flow-partnership-section__title">Đối tác Công nghệ</h3>
            <div class="flow-tech-partners">
              <span v-for="partner in techPartners" :key="partner" class="flow-tech-badge">{{ partner }}</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  </MasterLayout>
</template>

<style scoped>
.flow-container {
  position: relative;
  min-height: 100vh;
  padding: 0;
}

/* Flow Line Background */
.flow-line {
  position: fixed;
  left: 50%;
  top: 0;
  width: 2px;
  height: 100vh;
  transform: translateX(-50%);
  z-index: 0;
  pointer-events: none;
}

.flow-line-svg {
  width: 100%;
  height: 100%;
}

.flow-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  transition: stroke-dashoffset 2s ease-in-out;
}

/* Flow Sections */
.flow-section {
  position: relative;
  padding: clamp(4rem, 8vw, 6rem) clamp(2rem, 4vw, 3rem);
  z-index: 1;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.flow-item.flow-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Individual Items */
.flow-item-child {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--delay, 0s);
}

.flow-item-child.item-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.flow-section__header {
  text-align: center;
  margin-bottom: 3rem;
}

.flow-section__tag {
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  color: var(--hau-accent);
  font-weight: 700;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
}

.flow-section__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: var(--hau-dark);
  margin: 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Hero Section */
.flow-hero {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
  border-radius: 0;
  padding-top: clamp(5rem, 10vw, 8rem);
  text-align: center;
}

.flow-hero__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  color: var(--hau-accent);
  font-weight: 700;
  font-size: 0.75rem;
  margin-bottom: 1rem;
}

.flow-hero__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  line-height: 1.15;
  color: var(--hau-dark);
  margin: 0 0 1.5rem;
}

.flow-hero__description {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  line-height: 1.7;
  color: #475569;
  max-width: 900px;
  margin: 0 auto 3rem;
}

/* Timeline Flow */
.flow-timeline {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 4rem auto 0;
  position: relative;
  padding: 2rem 0;
}

.flow-timeline::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--hau-accent), transparent);
  transform: translateY(-50%);
}

.flow-timeline__item {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.flow-timeline__dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--hau-accent);
  border: 4px solid #fff;
  box-shadow: 0 0 0 4px var(--hau-accent);
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 4px var(--hau-accent);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(249, 115, 22, 0.3);
  }
}

.flow-timeline__content {
  text-align: center;
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: var(--hau-shadow);
  min-width: 200px;
}

.flow-timeline__year {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--hau-accent);
  margin-bottom: 0.5rem;
}

.flow-timeline__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--hau-dark);
  margin-bottom: 0.25rem;
}

.flow-timeline__description {
  font-size: 0.9rem;
  color: var(--hau-muted);
}

/* Flow Connector */
.flow-connector {
  position: relative;
  height: 100px;
  overflow: hidden;
  z-index: 1;
}

.flow-connector--reverse {
  transform: rotate(180deg);
}

.flow-connector__wave {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(180deg, #f8fafc 0%, transparent 100%);
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
}

.flow-connector--reverse .flow-connector__wave {
  background: linear-gradient(180deg, transparent 0%, #f8fafc 100%);
}

/* Statistics Section */
.flow-stats {
  background: #fff;
  padding-bottom: clamp(2rem, 4vw, 3rem) !important;
}

.flow-stats__container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 0;
}

.flow-stat-card {
  position: relative;
  background: #fff;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: var(--hau-shadow);
  border-radius: 16px;
  overflow: hidden;
}

.flow-stat-card__stream {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--hau-accent), transparent);
  transform: scaleX(0);
  transition: transform 0.8s ease;
}

.flow-item-child.item-visible .flow-stat-card__stream {
  animation: streamFlow 2s ease infinite;
  animation-delay: var(--delay);
}

@keyframes streamFlow {
  0%, 100% {
    transform: scaleX(0);
  }
  50% {
    transform: scaleX(1);
  }
}

.flow-stat-card__icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.flow-stat-card__number {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  color: var(--hau-accent);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.flow-stat-card__label {
  font-size: 1rem;
  color: var(--hau-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Team Section */
.flow-team {
  background: #fff;
  padding-top: clamp(2rem, 4vw, 3rem) !important;
}

.flow-team__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.flow-team-card {
  background: linear-gradient(180deg, #3b82f6 0%, #1e40af 100%);
  border-radius: 20px;
  padding: 3rem;
  color: #fff;
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
  position: relative;
  overflow: hidden;
}

.flow-team-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.flow-team-card__header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.flow-team-card__main-number {
  font-size: clamp(4rem, 6vw, 5.5rem);
  font-weight: 900;
  line-height: 1;
  margin-bottom: 0.5rem;
  color: #fff;
}

.flow-team-card__main-label {
  font-size: 1.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fff;
}

.flow-team-card__divider {
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    rgba(255, 255, 255, 0.3) 0px,
    rgba(255, 255, 255, 0.3) 8px,
    transparent 8px,
    transparent 16px
  );
  margin: 1.5rem 0;
}

.flow-team-card__subtitle {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1.5rem;
  text-align: center;
}

.flow-team-card__breakdown {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1.5rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.flow-team-card__breakdown-item {
  flex: 1;
  min-width: 120px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.flow-team-card__number {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 900;
  line-height: 1;
  color: #fff;
}

.flow-team-card__label {
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
}

.flow-team-card__breakdown-divider {
  width: 1px;
  height: 60px;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3) 0px,
    rgba(255, 255, 255, 0.3) 8px,
    transparent 8px,
    transparent 16px
  );
  flex-shrink: 0;
}

.flow-team-card__description {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-top: 1rem;
}

/* Facilities Section */
.flow-facilities {
  background: #fff;
}

.flow-facilities__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.flow-facility-card {
  position: relative;
  background: #fff;
  padding: 2rem;
  box-shadow: var(--hau-shadow);
  border-radius: 16px;
  border-left: 4px solid var(--hau-accent);
  overflow: hidden;
}

.flow-facility-card__stream {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, var(--hau-accent), transparent);
  transform: scaleY(0);
  transition: transform 0.8s ease;
}

.flow-item-child.item-visible .flow-facility-card__stream {
  animation: streamFlowVertical 2s ease infinite;
  animation-delay: var(--delay);
}

@keyframes streamFlowVertical {
  0%, 100% {
    transform: scaleY(0);
  }
  50% {
    transform: scaleY(1);
  }
}

.flow-facility-card__title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--hau-dark);
  margin: 0 0 1rem;
}

.flow-facility-card__description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--hau-muted);
  margin: 0;
}

.flow-facilities__gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.flow-gallery-item {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--hau-shadow);
}

.flow-gallery-item--large {
  grid-column: 1 / -1;
}

.flow-gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Courses Section */
.flow-courses {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding-bottom: clamp(2rem, 4vw, 3rem) !important;
}

.flow-courses__stream {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.flow-course-card {
  position: relative;
  background: #fff;
  padding: 2rem;
  box-shadow: var(--hau-shadow);
  border-radius: 16px;
  border-top: 4px solid var(--hau-accent);
  overflow: hidden;
}

.flow-course-card__stream {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--hau-accent), transparent);
  transform: scaleX(0);
  transition: transform 0.8s ease;
}

.flow-item-child.item-visible .flow-course-card__stream {
  animation: streamFlow 2s ease infinite;
  animation-delay: var(--delay);
}

.flow-course-card__icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.flow-course-card__title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--hau-dark);
  margin: 0 0 1rem;
}

.flow-course-card__description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--hau-muted);
  margin: 0;
}

.flow-courses__award {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--hau-shadow);
}

.flow-courses__award img {
  width: 100%;
  height: auto;
  display: block;
}

.flow-award__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  padding: 2rem;
}

.flow-award__overlay p {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Research Section */
.flow-research {
  background: #fff;
  padding-top: clamp(2rem, 4vw, 3rem) !important;
}

.flow-research__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.flow-research-card {
  position: relative;
  background: #fff;
  padding: 2rem;
  box-shadow: var(--hau-shadow);
  border-radius: 16px;
  border-top: 4px solid var(--hau-emerald);
  overflow: hidden;
}

.flow-research-card__stream {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--hau-emerald), transparent);
  transform: scaleX(0);
  transition: transform 0.8s ease;
}

.flow-item-child.item-visible .flow-research-card__stream {
  animation: streamFlow 2s ease infinite;
  animation-delay: var(--delay);
}

.flow-research-card__title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--hau-dark);
  margin: 0 0 1rem;
}

.flow-research-card__description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--hau-muted);
  margin: 0;
}

/* Partnership Section */
.flow-partnership {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.flow-partnership__images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.flow-partnership-image {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--hau-shadow);
}

.flow-partnership-image--large {
  grid-column: 1 / -1;
}

.flow-partnership-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.flow-partnership__content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
}

.flow-partnership-section {
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: var(--hau-shadow);
}

.flow-partnership-section__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--hau-dark);
  margin: 0 0 1.5rem;
}

.flow-partnership-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flow-partnership-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 3px solid var(--hau-accent);
}

.flow-partnership-item strong {
  font-size: 1rem;
  color: var(--hau-dark);
  font-weight: 600;
}

.flow-partnership-item span {
  font-size: 0.9rem;
  color: var(--hau-muted);
  font-weight: 500;
}

.flow-tech-partners {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.flow-tech-badge {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--hau-accent);
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
}

/* Information Cards Section */
.flow-info-cards {
  background: #0f172a;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.flow-info-cards::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.flow-info-cards .flow-section__title {
  background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.info-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
  position: relative;
  z-index: 1;
}

.info-card {
  position: relative;
  background: #1e293b;
  border-radius: 20px;
  padding: 2.5rem;
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
  opacity: 0;
  transform: translateY(60px) scale(0.96);
  transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.7s ease;
}

.info-card.info-card-visible::before {
  opacity: 1;
}

.info-card--left {
  flex-direction: row;
}

.info-card--right {
  flex-direction: row-reverse;
}

.info-card.info-card-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.info-card.info-card-hidden {
  opacity: 0;
  transform: translateY(60px) scale(0.96);
}

.info-card__icon-wrapper {
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  z-index: 2;
}

.info-card__icon-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 3px solid var(--icon-color);
  background: rgba(15, 23, 42, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 0 var(--icon-color);
  transition: box-shadow 0.5s ease, transform 0.3s ease;
  position: relative;
}

.info-card.info-card-visible .info-card__icon-circle {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15), 0 0 30px rgba(59, 130, 246, 0.25);
}

.info-card[style*='--icon-color: #10b981'].info-card-visible .info-card__icon-circle {
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15), 0 0 30px rgba(16, 185, 129, 0.25);
}

.info-card[style*='--icon-color: #f97316'].info-card-visible .info-card__icon-circle {
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.15), 0 0 30px rgba(249, 115, 22, 0.25);
}

.info-card[style*='--icon-color: #8b5cf6'].info-card-visible .info-card__icon-circle {
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15), 0 0 30px rgba(139, 92, 246, 0.25);
}

.info-card.info-card-visible .info-card__icon-circle {
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.info-card__icon {
  font-size: 2.8rem;
  filter: brightness(0) invert(1);
  display: block;
}

.info-card__tag {
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card.info-card-visible .info-card__tag {
  animation: tagBounce 0.6s ease-out 0.3s both;
}

@keyframes tagBounce {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  60% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.info-card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0;
}

.info-card__title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.info-card__description {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
}

.info-card__progress {
  margin-top: 0.5rem;
}

.info-card__progress-track {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.info-card__progress-track::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.info-card.info-card-visible .info-card__progress-track::after {
  opacity: 1;
}

.info-card__progress-fill {
  height: 100%;
  border-radius: 5px;
  width: 0%;
  position: relative;
  overflow: hidden;
}

.info-card__progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

.info-card.info-card-visible .info-card__progress-fill {
  animation: progressFill 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes progressFill {
  from {
    width: 0%;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (max-width: 1024px) {
  .info-cards-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .info-cards-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .info-card {
    flex-direction: column !important;
    padding: 2rem;
    gap: 1.5rem;
  }

  .info-card__icon-wrapper {
    align-self: center;
  }

  .info-card__icon-circle {
    width: 80px;
    height: 80px;
  }

  .info-card__icon {
    font-size: 2.4rem;
  }

  .info-card__title {
    font-size: 1.4rem;
    text-align: center;
  }

  .info-card__description {
    text-align: center;
    font-size: 1rem;
  }
}


@media (max-width: 768px) {
  .flow-line {
    display: none;
  }

  .flow-timeline {
    flex-direction: column;
    gap: 2rem;
  }

  .flow-timeline::before {
    display: none;
  }

  .flow-timeline__item {
    width: 100%;
  }

  .flow-stats__container {
    grid-template-columns: 1fr;
  }

  .flow-team__cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .flow-team-card {
    padding: 2.5rem 2rem;
  }

  .flow-facilities__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  .flow-facilities__gallery {
    grid-template-columns: 1fr;
  }

  .flow-courses__stream {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  .flow-research__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  .flow-partnership__images {
    grid-template-columns: 1fr;
  }

  .flow-partnership__content {
    grid-template-columns: 1fr;
  }

}

@media (max-width: 1024px) {
  .flow-team__cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 600px) {
  .flow-facilities__grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .flow-courses__stream {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .flow-research__grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .flow-team-card {
    padding: 2rem 1.5rem;
  }

  .flow-team-card__breakdown {
    flex-direction: column;
    gap: 1.5rem;
  }

  .flow-team-card__breakdown-divider {
    width: 100%;
    height: 1px;
    background: repeating-linear-gradient(
      to right,
      rgba(255, 255, 255, 0.3) 0px,
      rgba(255, 255, 255, 0.3) 8px,
      transparent 8px,
      transparent 16px
    );
  }

  .flow-team-card__breakdown-item {
    min-width: 100%;
  }
}
</style>
