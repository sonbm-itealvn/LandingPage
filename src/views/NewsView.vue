<script setup lang="ts">
import MasterLayout from '../components/MasterLayout.vue'

const newsHighlights = [
  {
    title: 'Khai mạc Festival Đồ án 2025',
    date: '12/05/2025',
    summary: '35 đồ án được tuyển chọn, triển lãm tại sảnh chính và khu studio.',
  },
  {
    title: 'Workshop: Vỏ công trình thích ứng khí hậu',
    date: '08/05/2025',
    summary: 'Chuyên gia TU Berlin trình bày case study và thực hành mô phỏng năng lượng.',
  },
  {
    title: 'Trao học bổng LIXIL mùa xuân',
    date: '02/05/2025',
    summary: '12 suất học bổng cho đồ án nghiên cứu vật liệu xanh và nhà ở bền vững.',
  },
  {
    title: 'Công bố đề tài studio liên kết 2025-2',
    date: '25/04/2025',
    summary: '05 đề tài liên kết với doanh nghiệp, mở đăng ký cho sinh viên năm 3-5.',
  },
]

const quickLinks = [
  { label: 'Thông báo tuyển sinh', note: 'Điều kiện, mốc thời gian và hình thức xét tuyển.' },
  { label: 'Lịch workshop tháng', note: 'Cập nhật mỗi thứ Hai, đăng ký online trước 24h.' },
  { label: 'Kết quả cuộc thi nội bộ', note: 'Top 10 bài đoạt giải, thư viện poster và mô hình.' },
]
</script>

<template>
  <MasterLayout>
    <section class="content-hero">
      <p class="content-hero__eyebrow">Tin tức</p>
      <h1>Điểm tin nổi bật của khoa</h1>
      <p class="content-hero__lede">
        Cập nhật hoạt động, workshop, học bổng và các cuộc thi dành cho sinh viên, giảng viên và cộng đồng kiến trúc.
      </p>
      <div class="content-hero__tags">
        <span class="pill">Tin chính</span>
        <span class="pill">Workshop</span>
        <span class="pill">Học bổng</span>
      </div>
    </section>

    <section class="content-section">
      <div class="content-section__header">
        <div>
          <p class="section-tag">Bản tin</p>
          <h2>Tin mới</h2>
        </div>
      </div>
      <div class="split-panel">
        <div class="panel">
          <ul class="list-stack news-list">
            <li v-for="item in newsHighlights" :key="item.title">
              <h3>{{ item.title }}</h3>
              <p>{{ item.summary }}</p>
              <span>{{ item.date }}</span>
            </li>
          </ul>
        </div>
        <div class="panel">
          <p class="section-tag">Truy cập nhanh</p>
          <ul class="list-stack">
            <li v-for="link in quickLinks" :key="link.label">
              <h4>{{ link.label }}</h4>
              <p>{{ link.note }}</p>
            </li>
          </ul>
          <div class="cta-strip" style="margin-top: 1rem">
            <div>
              <p class="section-tag">Theo dõi</p>
              <strong>news@hau.edu.vn</strong>
              <p>Nhận bản tin hàng tuần qua email.</p>
            </div>
            <a href="mailto:news@hau.edu.vn">Đăng ký nhận tin ↗</a>
          </div>
        </div>
      </div>
    </section>
  </MasterLayout>
</template>

