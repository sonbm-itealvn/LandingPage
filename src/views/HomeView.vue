<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MasterLayout from '../components/MasterLayout.vue'

type YoutubeThumbnails = {
  url?: string
  medium?: { url?: string }
  high?: { url?: string }
}

type YoutubeVideo = {
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

const youtubeVideos = ref<YoutubeVideo[]>([])
const isVideosLoading = ref(true)
const videoError = ref('')

const getThumbnail = (video: YoutubeVideo) =>
  video.thumbnail ||
  video.thumbnails?.high?.url ||
  video.thumbnails?.medium?.url ||
  video.thumbnails?.url ||
  FALLBACK_THUMBNAIL

const getVideoUrl = (video: YoutubeVideo) =>
  video.url || video.link || (video.videoId ? `https://www.youtube.com/watch?v=${video.videoId}` : '#')

const getVideoChannel = (video: YoutubeVideo) => video.channelTitle || video.channel || video.author || 'Đối thoại Kiến trúc'

const getVideoDescription = (video: YoutubeVideo) => {
  const desc = video.description?.trim()
  if (!desc) {
    return 'Video mới nhất từ Đối thoại Kiến trúc.'
  }
  return desc.length > 140 ? `${desc.slice(0, 140)}…` : desc
}

const formatVideoDate = (value?: string) => {
  if (!value) return 'Vừa cập nhật'
  try {
    return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(value))
  } catch {
    return value
  }
}

const fetchYoutubeVideos = async () => {
  isVideosLoading.value = true
  videoError.value = ''
  try {
    const response = await fetch(YOUTUBE_ENDPOINT)
    if (!response.ok) {
      throw new Error('Không thể tải video mới nhất.')
    }
    const data = await response.json()
    youtubeVideos.value = Array.isArray(data) ? data.slice(0, 5) : []
  } catch (error) {
    videoError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải dữ liệu.'
  } finally {
    isVideosLoading.value = false
  }
}

onMounted(fetchYoutubeVideos)

const sectionOneHero = {
  title: 'LIXIL Experience Center – Không gian tôn vinh những sắc thái của nước',
  category: 'Tin trong nước',
  excerpt: 'Trung tâm trải nghiệm tương tác mang lại góc nhìn mới về vật liệu và giải pháp kiến trúc hiện đại.',
  image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80',
}

const sectionOneLeftPosts = [
  {
    tag: 'Công nghệ - Vật liệu',
    title: 'Thiết kế tham số: Bí quyết tạo nên một tiền đề độc đáo',
    image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=600&q=60',
  },
  {
    tag: 'Nhà ở',
    title: 'Zen Art Sky Villa mang vẻ đẹp tinh tế với phong cách Zen Art',
    image: 'https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?auto=format&fit=crop&w=600&q=60',
  },
]

const sectionOneRightPosts = [
  {
    tag: 'Nhà ở',
    title: 'Terra Villa – Biệt thự lấy cảm hứng từ đất nung',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=60',
  },
  {
    tag: 'Nội thất',
    title: 'Jo Garden Coffee – Quán cà phê với tầng thổ “bay”',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=60',
  },
]

const highlightNews = [
  {
    title: 'Khai mạc tuần lễ đồ án tốt nghiệp',
    date: '12/05/2025',
    excerpt: '35 đồ án tiêu biểu được sàn tuyển chọn, tập trung vào các câu chuyện đô thị mới.',
    image: 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Thành lập câu lạc bộ Studio Lab',
    date: '06/05/2025',
    excerpt: 'Không gian mở cho sinh viên nghiên cứu vật liệu, mô hình và chuyển giao công nghệ.',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Triển lãm chương trình trao đổi quốc tế',
    date: '28/04/2025',
    excerpt: 'Sinh viên Pháp – Việt cùng phát triển các giải pháp kiến trúc ứng phó biến đổi khí hậu.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Danh sách xưởng sáng tạo mùa hè',
    date: '20/04/2025',
    excerpt: '05 xưởng chuyên đề sẽ mở đăng ký trong tháng 6, ưu tiên nhóm nghiên cứu liên ngành.',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=60',
  },
]

const reviewTopics = [
  { title: 'Đồ án cải tạo nhà máy cũ', mentor: 'ThS. Nguyễn Trung Kiên', time: '09:00 - 10:30' },
  { title: 'Ngõ tự xanh – tuyến metro 05', mentor: 'TS. Lê Khánh Linh', time: '10:45 - 12:00' },
  { title: 'Nhà triển lãm cộng đồng Ven Hồ', mentor: 'ThS. Ngô Minh Tâm', time: '13:30 - 15:00' },
  { title: 'Học viện Khí hậu miền Trung', mentor: 'KTS. Đinh Hữu Thịnh', time: '15:15 - 16:30' },
]

const sandboxPosts = [
  { label: 'Studio Update', value: 'Section 1 đã cập nhật rubric 2025.' },
  { label: 'Scholarship', value: 'Quỹ LIXIL chính thức mở cho sinh viên năm cuối.' },
  { label: 'Digital Hub', value: 'Dịch vụ in 3D mở cửa đến 22:00 mỗi ngày.' },
  { label: 'Thực tập', value: 'Hợp tác cùng 12 văn phòng kiến trúc tại Hà Nội.' },
]

</script>

<template>
  <MasterLayout>
    <section class="hero">
      <p class="eyebrow">2025 Studio Showcase</p>
      <h1>KHOA KIẾN TRÚC</h1>
      <p class="hero-lede">
        Cập nhật đồ án, workshop và sự kiện nổi bật của khoa. Khám phá những câu chuyện kiến trúc mới nhất ngay tại
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
      <div class="section-one__frame">
        <div class="section-one__col">
          <article v-for="post in sectionOneLeftPosts" :key="post.title" class="section-one__card">
            <img :src="post.image" :alt="post.title" loading="lazy" />
            <div>
              <p class="section-one__tag">{{ post.tag }}</p>
              <h3>{{ post.title }}</h3>
            </div>
          </article>
        </div>

        <article class="section-one__hero">
          <img :src="sectionOneHero.image" :alt="sectionOneHero.title" loading="lazy" />
          <div>
            <p class="section-one__tag">{{ sectionOneHero.category }}</p>
            <h3>{{ sectionOneHero.title }}</h3>
            <p>{{ sectionOneHero.excerpt }}</p>
          </div>
        </article>

        <div class="section-one__col section-one__col--right">
          <article v-for="post in sectionOneRightPosts" :key="post.title" class="section-one__card">
            <img :src="post.image" :alt="post.title" loading="lazy" />
            <div>
              <p class="section-one__tag">{{ post.tag }}</p>
              <h3>{{ post.title }}</h3>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="section-2" class="event-banner">
      <p class="section-tag">Section 2</p>
      <h3>Post Event nào đã có thời gian cụ thể?</h3>
      <p>Sẽ tự biến mất sau thời gian đồng bộ</p>
      <div class="event-meta">
        <p>FESTIVAL 2025</p>
        <span>Ngày 18 - 24 / 06</span>
      </div>
    </section>

    <section id="section-3" class="news-section">
      <header class="section-header stacked">
        <div>
          <h2>Tin nổi bật &amp; Sân phản biện</h2>
        </div>
        <p>Bản tin cập nhật mỗi tuần từ phòng truyền thông khoa.</p>
      </header>
      <div class="news-columns">
        <div class="news-stream">
          <article v-for="post in highlightNews" :key="post.title" class="news-card">
            <img :src="post.image" :alt="post.title" loading="lazy" />
            <div>
              <p class="news-date">{{ post.date }}</p>
              <h3>{{ post.title }}</h3>
              <p>{{ post.excerpt }}</p>
            </div>
          </article>
        </div>
        <aside class="news-side">
          <div class="widget">
            <p class="widget-title">Thông báo của khoa</p>
            <ul>
              <li v-for="topic in reviewTopics" :key="topic.title">
                <h4>{{ topic.title }}</h4>
                <p>{{ topic.mentor }}</p>
                <span>{{ topic.time }}</span>
              </li>
            </ul>
          </div>
          <div class="widget">
            <p class="widget-title">Sandbox</p>
            <ul>
              <li v-for="item in sandboxPosts" :key="item.label">
                <strong>{{ item.label }}</strong>
                <p>{{ item.value }}</p>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>

    <section id="workshop" class="workshop-section">
      <header class="section-header">
        <div>
          <p class="section-tag">Đối thoại kiến trúc</p>
          <h2>Video mới từ YouTube</h2>
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
            <img :src="getThumbnail(video)" :alt="video.title || 'Video đối thoại kiến trúc'" loading="lazy" />
            <a class="video-play" :href="getVideoUrl(video)" target="_blank" rel="noopener" aria-label="Xem trên YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
          </div>
          <div class="video-body">
            <p class="video-channel">{{ getVideoChannel(video) }}</p>
            <h3>{{ video.title || 'Video mới' }}</h3>
            <p>{{ getVideoDescription(video) }}</p>
            <div class="video-meta">
              <span>{{ formatVideoDate(video.publishedAt) }}</span>
              <a :href="getVideoUrl(video)" target="_blank" rel="noopener" class="video-link">Xem ngay</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  </MasterLayout>
</template>
