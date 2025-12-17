<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import headerLogo from '../../logo_khoa-kien-truc-edit2024.png'
const utilityLinks = [
  { label: 'Quảng Cáo', href: '#' },
  { label: 'Gửi Bài', href: '#' },
  { label: 'Danh Bạ', href: '#' },
]

const socialLinks = [
  { label: 'Facebook', href: '#', modifier: 'facebook' },
  { label: 'YouTube', href: 'https://www.youtube.com/@doithoaikientruc', modifier: 'youtube' },
  { label: 'TikTok', href: '#', modifier: 'tiktok' },
]

const siteNavLinks = [
  { label: 'Trang Chủ', to: '/' },
  { label: 'Giới thiệu', to: '/about', locked: true },
  { label: 'Đào tạo', to: '/dao-tao', locked: true },
  { label: 'Hoạt động khoa', to: '/hoat-dong-khoa' },
  { label: 'Hợp tác - Kết nối', to: '/hop-tac-ket-noi', locked: true },
  { label: 'Tin tức', to: '/tin-tuc' },
  { label: 'Tạp chí kiến trúc', href: 'https://www.tapchikientruc.com.vn/' },
]

const isNavOpen = ref(false)
const route = useRoute()

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

const closeNav = () => {
  isNavOpen.value = false
}

watch(
  () => route.fullPath,
  () => {
    closeNav()
  },
)

const aboutCards = [
  { title: 'Giảng viên hướng dẫn', body: '45+ giảng viên, kiến trúc sư, nghệ sĩ cộng tác hướng dẫn khóa đồ án', color: '#f8b72b' },
  { title: 'Sinh viên tham gia', body: 'Hơn 1.200 sinh viên các khóa với mạng lưới alumni rộng khắp', color: '#ff7ca3' },
  { title: 'Chương trình trao đổi', body: '09 đối tác quốc tế với học phần thiết kế chung', color: '#20c997' },
  { title: 'Học bổng hỗ trợ', body: '12 quỹ tài trợ dành riêng cho đồ án nghiên cứu', color: '#8b5cf6' },
]

const activityCards = [
  { title: 'Không gian mở', body: 'Các xưởng sáng tạo hoạt động 24/7 với sự hỗ trợ kỹ thuật', color: '#fbff62' },
  { title: 'Hoạt động cộng đồng', body: 'Chuỗi talk & workshop mỗi tháng với khách mời chuyên gia', color: '#4ade80' },
  { title: 'Festival 2025', body: 'Trình diễn đồ án nổi bật và trao giải thưởng hằng năm', color: '#38bdf8' },
  { title: 'Studio Tour', body: 'Đăng ký tham quan dành cho học sinh THPT', color: '#f87171' },
]
</script>

<template>
  <div class="page">
    <header class="main-header">
      <div class="utility-bar">
        <nav class="utility-nav">
          <a v-for="link in utilityLinks" :key="link.label" :href="link.href">{{ link.label }}</a>
        </nav>
        <div class="social-icons">
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.href"
            class="social-icon"
            :class="`social-icon--${social.modifier}`"
            :aria-label="social.label"
          >
            <span class="sr-only">{{ social.label }}</span>
            <svg v-if="social.modifier === 'facebook'" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22 12.07C22 6.56 17.52 2 12 2S2 6.56 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H8.08v-2.9h2.36V9.77c0-2.33 1.38-3.62 3.5-3.62.7 0 1.43.12 2.1.23v2.32h-1.18c-1.15 0-1.52.72-1.52 1.46v1.75h2.59l-.41 2.9h-2.18V22c4.78-.8 8.44-4.94 8.44-9.93Z"
              />
            </svg>
            <svg v-else-if="social.modifier === 'youtube'" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M21 8.5c-.1-1.4-1.2-2.5-2.6-2.6C16.47 5.67 12 5.67 12 5.67s-4.47 0-6.4.23C4.2 6.01 3.1 7.1 3 8.5c-.23 1.94-.23 4.5-.23 4.5s0 2.56.23 4.5c.1 1.4 1.2 2.5 2.6 2.6 1.93.23 6.4.23 6.4.23s4.47 0 6.4-.23c1.4-.1 2.5-1.2 2.6-2.6.23-1.94.23-4.5.23-4.5s0-2.56-.23-4.5ZM10 15.25v-5.5L15.2 12 10 15.25Z"
              />
            </svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M21.75 8.59a5.65 5.65 0 0 1-4.67-2.4v8.44a4.65 4.65 0 1 1-4.63-4.63c.2 0 .4.01.6.03v2.5a2.12 2.12 0 1 0 1.5 2.02V2.75h3.04a5.62 5.62 0 0 0 4.16 2.1Z"
              />
            </svg>
          </a>
        </div>
      </div>

      <div class="brand-band" id="top">
        <div class="brand-identity">
          <div class="logo-panel">
            <img :src="headerLogo" alt="Khoa Kiến Trúc logo" loading="lazy" />
          </div>
          <div class="brand-copy">
            <p class="brand-label">Faculty of Architecture</p>
            <p class="brand-subline">Khoa Kiến Trúc · Hanoi Architectural University</p>
          </div>
        </div>
        <form class="header-search" role="search" @submit.prevent>
          <input type="search" placeholder="Search ...." aria-label="Tìm kiếm" />
          <button type="submit" aria-label="Tìm kiếm">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27a6 6 0 1 0-.71.71l.27.28v.79L20 20.5 21.5 19zM10 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
            </svg>
          </button>
        </form>
        <button class="nav-toggle" type="button" :aria-expanded="isNavOpen" aria-controls="site-nav" @click="toggleNav">
          <span class="sr-only">Mở/đóng menu</span>
          <svg v-if="!isNavOpen" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      </div>

      <nav id="site-nav" class="site-nav" :class="{ 'site-nav--open': isNavOpen }">
        <template v-for="link in siteNavLinks" :key="link.label">
          <button
            v-if="link.locked"
            type="button"
            class="nav-link nav-link--disabled"
            title="Tính năng đang khóa"
            disabled
          >
            {{ link.label }}
          </button>
          <RouterLink v-else-if="link.to" :to="link.to" @click="closeNav">
            {{ link.label }}
          </RouterLink>
          <a v-else :href="link.href" target="_blank" rel="noopener" @click="closeNav">
            {{ link.label }}
          </a>
        </template>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer class="page-footer">
      <div class="footer-info-sections">
        <section id="about" class="info-grid-section">
          <div>
            <p class="section-tag">About</p>
          </div>
          <div class="info-grid">
            <article v-for="card in aboutCards" :key="card.title" class="info-card" :style="{ backgroundColor: card.color }">
              <h3>{{ card.title }}</h3>
              <p>{{ card.body }}</p>
            </article>
          </div>
        </section>

        <section class="info-grid-section">
          <div>
            <p class="section-tag">Hoạt động</p>
          </div>
          <div class="info-grid">
            <article v-for="card in activityCards" :key="card.title" class="info-card" :style="{ backgroundColor: card.color }">
              <h3>{{ card.title }}</h3>
              <p>{{ card.body }}</p>
            </article>
          </div>
        </section>
      </div>

      <div class="footer-meta">
        <p>© 2025 Hanoi Architectural University - Faculty of Architecture.</p>
        <p>144 Xuân Thuỷ, Cầu Giấy, Hà Nội - Email: studio@hau.edu.vn</p>
      </div>
    </footer>
  </div>
</template>
