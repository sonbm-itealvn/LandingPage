<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MasterLayout from '../components/MasterLayout.vue'
import {
  fetchLatestYoutubeVideos,
  formatVideoDate,
  getThumbnail,
  getVideoChannel,
  getVideoDescription,
  getVideoUrl,
  type YoutubeVideo,
} from '../services/youtubeService'

const youtubeVideos = ref<YoutubeVideo[]>([])
const isVideosLoading = ref(true)
const videoError = ref('')

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

onMounted(loadYoutubeVideos)

const sectionOneHero = {
  title: 'LIXIL Experience Center – Không gian tôn vinh những sắc thái của nước',
  category: 'Tin trong nước',
  excerpt: 'Trung tâm trải nghiệm tương tác mang lại góc nhìn mới về vật liệu và giải pháp kiến trúc hiện đại.',
  image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80',
}

const sectionOneLeftPosts = [
  {
    tag: 'Công nghệ - Vật liệu',
    title: 'Thiết kế tham số: Ba quy tắc tạo nên mặt tiền độc đáo',
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
    title: 'Jo Garden Coffee – Quán cà phê với tầng thượng mở',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=60',
  },
]

const highlightNews = [
  {
    title: 'Khai mạc tuần lễ đồ án tốt nghiệp',
    date: '12/05/2025',
    excerpt: '35 đồ án tiêu biểu được sàng tuyển, tập trung vào các câu chuyện đô thị mới.',
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
  {
    title: 'Danh sách xưởng sáng tạo mùa hè',
    date: '20/04/2025',
    excerpt: '05 xưởng chuyên đề sẽ mở đăng ký trong tháng 6, ưu tiên nhóm nghiên cứu liên ngành.',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=60',
  },
    {
    title: 'Triển lãm chương trình trao đổi quốc tế',
    date: '28/04/2025',
    excerpt: 'Sinh viên Pháp – Việt cùng phát triển các giải pháp kiến trúc ứng phó biến đổi khí hậu.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60',
  },
]

const reviewTopics = [
  { title: 'Đồ án cải tạo nhà máy cũ', mentor: 'ThS. Nguyễn Trung Kiên', time: '09:00 - 10:30' },
  { title: 'Ngõ tuyến xanh – Tuyến metro 05', mentor: 'TS. Lê Khánh Linh', time: '10:45 - 12:00' },
  { title: 'Nhà triển lãm cộng đồng ven hồ', mentor: 'ThS. Ngô Minh Tâm', time: '13:30 - 15:00' },
  { title: 'Học viện Khí hậu miền Trung', mentor: 'KTS. Đinh Hữu Thành', time: '15:15 - 16:30' },
]

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

const referenceLibrary = [
  {
    title: 'Sổ tay brief & rubric đồ án tốt nghiệp',
    topic: 'Studio',
    format: 'PDF',
    description: 'Checklist nộp bài, tiêu chí chấm điểm và mốc thời gian cho đồ án tốt nghiệp.',
    link: '#',
  },
  {
    title: 'Hướng dẫn thiết kế kiến trúc thích ứng khí hậu',
    topic: 'Thiết kế bền vững',
    format: 'Ebook',
    description: 'Nguyên tắc thông gió, che nắng, sử dụng vật liệu địa phương và các case study nhiệt đới.',
    link: 'https://www.archdaily.com/search?query=climate%20design',
  },
  {
    title: 'Danh mục vật liệu & nhà cung cấp 2025',
    topic: 'Vật liệu',
    format: 'Catalog',
    description: 'Bảng dữ liệu vật liệu, chứng chỉ xanh và thông tin liên hệ đối tác trong nước.',
    link: '#',
  },
  {
    title: 'Playlist kết cấu cơ bản cho kiến trúc sư',
    topic: 'Kết cấu',
    format: 'Video',
    description: '10 video về tải trọng, kết cấu thép và bê tông dành cho sinh viên năm 3.',
    link: 'https://www.youtube.com/results?search_query=structural+design+architecture',
  },
]
</script>

<template>
  <MasterLayout>
    <section class="hero">
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
      <p>Sẽ tự động biến mất sau thời gian đóng bật</p>
      <div class="event-meta">
        <p>FESTIVAL 2025</p>
        <span>Ngày 18 - 24 / 06</span>
      </div>
    </section>

    <section id="section-3" class="news-section">
      <header class="section-header stacked">
        <div>
          <h2>Tin nổi bật</h2>
        </div>
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

    <section id="faculty-announcements" class="updates-section">
      <header class="section-header stacked">
        <div>
          <p class="section-tag">Thông báo</p>
        </div>
      </header>
      <div class="widget">
        <ul>
          <li v-for="topic in reviewTopics" :key="topic.title">
            <h4>{{ topic.title }}</h4>
            <p>{{ topic.mentor }}</p>
            <span>{{ topic.time }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section id="sandbox-updates" class="sandbox-section">
      <header class="section-header stacked">
        <div>
          <p class="section-tag">Sandbox</p>
        </div>
      </header>
      <div class="sandbox-grid">
        <article v-for="item in sandboxProjects" :key="item.title" class="sandbox-card">
          <div class="sandbox-card__media">
            <img :src="item.image" :alt="item.title" loading="lazy" />
          </div>
          <div class="sandbox-card__body">
            <p class="sandbox-card__category">{{ item.category }}</p>
            <h3>{{ item.title }}</h3>
            <p class="sandbox-card__summary">{{ item.summary }}</p>
          </div>
        </article>
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
            <h3>{{ video.title || 'Video mới' }}</h3>
            <div class="video-meta">
              <span>{{ formatVideoDate(video.publishedAt) }}</span>
              <a :href="getVideoUrl(video)" target="_blank" rel="noopener" class="video-link">Xem ngay</a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section id="reference-library" class="reference-section">
      <header class="section-header stacked">
        <div>
          <p class="section-tag">Thư viện</p>
        </div>
      </header>
      <div class="content-grid reference-grid">
        <article v-for="item in referenceLibrary" :key="item.title" class="content-card reference-card">
          <div class="reference-meta">
            <span class="pill">{{ item.format }}</span>
            <span class="reference-topic">{{ item.topic }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <a :href="item.link" target="_blank" rel="noopener" class="reference-link">Mở tài liệu</a>
        </article>
      </div>
    </section>
  </MasterLayout>
</template>
