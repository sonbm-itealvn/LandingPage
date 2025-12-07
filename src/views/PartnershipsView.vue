<script setup lang="ts">
import MasterLayout from '../components/MasterLayout.vue'

const partners = [
  { name: 'LIXIL Việt Nam', type: 'Doanh nghiệp', focus: 'Tài trợ phòng lab vật liệu xanh và học bổng đồ án.' },
  { name: 'VietCapital Partners', type: 'Đầu tư', focus: 'Đồng hành Digital Hub, hỗ trợ startup từ đồ án.' },
  { name: 'ENSA Paris-Val de Seine', type: 'Học thuật', focus: 'Studio liên kết, trao đổi sinh viên & giảng viên.' },
  { name: 'TU Berlin – Habitat Lab', type: 'Nghiên cứu', focus: 'Dự án đô thị thích ứng khí hậu, seminar định kỳ.' },
]

const collaborationFlows = [
  { title: 'Studio hợp tác', note: 'Đồng thiết kế đề bài, mentor song song, review chung với chuyên gia.' },
  { title: 'Tài trợ & học bổng', note: 'Gói tài trợ lab, học bổng đồ án và giải thưởng triển lãm cuối kỳ.' },
  { title: 'Nghiên cứu & tư vấn', note: 'Cung cấp dữ liệu, đồng phát triển báo cáo, triển khai thử nghiệm.' },
]

const contact = {
  email: 'partnerships@hau.edu.vn',
  phone: '024 1234 5678',
  address: '144 Xuân Thuỷ, Cầu Giấy, Hà Nội',
}
</script>

<template>
  <MasterLayout>
    <section class="content-hero">
      <p class="content-hero__eyebrow">Hợp tác - Kết nối</p>
      <h1>Kết nối doanh nghiệp, viện nghiên cứu và cộng đồng</h1>
      <p class="content-hero__lede">
        Chúng tôi mở rộng hợp tác cho studio, tài trợ lab, học bổng và dự án nghiên cứu ứng dụng. Cùng xây dựng thế hệ
        kiến trúc sư sẵn sàng cho các thách thức mới.
      </p>
      <div class="content-hero__tags">
        <span class="pill">Studio liên kết</span>
        <span class="pill">Học bổng</span>
        <span class="pill">R&D</span>
      </div>
    </section>

    <section class="content-section">
      <div class="content-section__header">
        <div>
          <p class="section-tag">Đối tác</p>
          <h2>Đang đồng hành</h2>
        </div>
        <span class="pill">Cập nhật 05/2025</span>
      </div>
      <div class="content-grid">
        <article v-for="partner in partners" :key="partner.name" class="content-card">
          <small>{{ partner.type }}</small>
          <h3>{{ partner.name }}</h3>
          <p>{{ partner.focus }}</p>
        </article>
      </div>
    </section>

    <section class="content-section">
      <div class="content-section__header">
        <div>
          <p class="section-tag">Hình thức</p>
          <h2>Ba cách để hợp tác</h2>
        </div>
      </div>
      <div class="stat-grid">
        <div v-for="flow in collaborationFlows" :key="flow.title" class="stat-card">
          <strong>{{ flow.title }}</strong>
          <span>{{ flow.note }}</span>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="cta-strip">
        <div>
          <p class="section-tag">Liên hệ</p>
          <strong>{{ contact.email }}</strong>
          <p>{{ contact.phone }} · {{ contact.address }}</p>
        </div>
        <a :href="`mailto:${contact.email}`">Đặt cuộc hẹn ↗</a>
      </div>
    </section>
  </MasterLayout>
</template>

