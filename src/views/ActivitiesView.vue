<script setup lang="ts">
import MasterLayout from '../components/MasterLayout.vue'

const activities = [
  { title: 'Workshop vật liệu xanh', time: 'Thứ 3 · 14:00', detail: 'Trải nghiệm vật liệu tái chế, thử nghiệm panel facade.' },
  { title: 'Design Talk - Urban Resilience', time: 'Thứ 5 · 18:30', detail: 'Diễn giả từ TU Berlin, chia sẻ case study quy hoạch thích ứng.' },
  { title: 'Open Studio Night', time: 'Thứ 6 · 19:00', detail: 'Pin-up mở, phản biện chéo giữa các nhóm studio và alumni.' },
]

const labs = [
  { name: 'Digital Fabrication Lab', desc: 'CNC, in 3D, mô hình robot arm, phòng scan & render.' },
  { name: 'Material Library', desc: 'Thư viện vật liệu, khu thử nghiệm hoàn thiện bề mặt & ánh sáng.' },
  { name: 'Urban Data Lab', desc: 'Phân tích dữ liệu đô thị, GIS, mô phỏng giao thông & khí hậu.' },
]

const highlights = [
  { label: 'Festival 2025', note: 'Triển lãm đồ án tiêu biểu, trao giải và tuyển dụng tại chỗ.' },
  { label: 'Study Trip', note: 'Chuyến đi Singapore và Paris-Val de Seine cho nhóm studio liên kết.' },
  { label: 'Community Project', note: 'Thiết kế cải tạo không gian công cộng với phường Dịch Vọng.' },
]
</script>

<template>
  <MasterLayout>
    <section class="content-hero">
      <p class="content-hero__eyebrow">Hoạt động khoa</p>
      <h1>Lịch workshop, talk và học phần mở</h1>
      <p class="content-hero__lede">
        Lịch hoạt động cập nhật hàng tuần: workshop vật liệu, talk chuyên môn, pin-up mở và chuyến đi thực địa cho sinh
        viên toàn khoa.
      </p>
      <div class="content-hero__tags">
        <span class="pill">Workshop</span>
        <span class="pill">Talk</span>
        <span class="pill">Study Trip</span>
      </div>
    </section>

    <section class="content-section">
      <div class="content-section__header">
        <div>
          <p class="section-tag">Tuần này</p>
          <h2>Workshop & talk</h2>
        </div>
        <span class="pill">Đăng ký trước 24h</span>
      </div>
      <div class="content-grid">
        <article v-for="item in activities" :key="item.title" class="content-card">
          <small>{{ item.time }}</small>
          <h3>{{ item.title }}</h3>
          <p>{{ item.detail }}</p>
        </article>
      </div>
    </section>

    <section class="content-section">
      <div class="content-section__header">
        <div>
          <p class="section-tag">Hạ tầng</p>
          <h2>Các phòng lab & xưởng</h2>
        </div>
      </div>
      <div class="split-panel">
        <div class="panel">
          <ul class="list-stack">
            <li v-for="lab in labs" :key="lab.name">
              <h3>{{ lab.name }}</h3>
              <p>{{ lab.desc }}</p>
            </li>
          </ul>
        </div>
        <div class="panel">
          <p class="section-tag">Điểm nhấn</p>
          <ul class="list-stack news-list">
            <li v-for="item in highlights" :key="item.label">
              <h4>{{ item.label }}</h4>
              <span>{{ item.note }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="cta-strip">
        <div>
          <p class="section-tag">Đăng ký tham gia</p>
          <strong>activities@hau.edu.vn</strong>
          <p>Gửi email để nhận link đăng ký workshop, talk và tour lab.</p>
        </div>
        <a href="mailto:activities@hau.edu.vn">Nhận lịch tuần ↗</a>
      </div>
    </section>
  </MasterLayout>
</template>

