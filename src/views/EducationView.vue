<script setup lang="ts">
import MasterLayout from '../components/MasterLayout.vue'

const programs = [
  {
    name: 'Kiến trúc công trình',
    duration: '5 năm · 180 tín chỉ',
    focus: 'Studio 1-10, kỹ thuật kết cấu, công nghệ vật liệu, mô phỏng năng lượng.',
  },
  {
    name: 'Quy hoạch đô thị',
    duration: '5 năm · 170 tín chỉ',
    focus: 'Đô thị bền vững, hạ tầng xanh, phân tích dữ liệu không gian và GIS.',
  },
  {
    name: 'Thiết kế nội thất',
    duration: '4.5 năm · 150 tín chỉ',
    focus: 'Hệ thống chiếu sáng, vật liệu mới, trải nghiệm người dùng & âm học.',
  },
  {
    name: 'Chuyển đổi số & BIM',
    duration: 'Chứng chỉ 18 tháng',
    focus: 'Revit, Rhino, Grasshopper, quy trình BIM đa bộ môn và quản lý dữ liệu.',
  },
]

const studioRoadmap = [
  { title: 'Năm 1-2', note: 'Studio cơ sở, kỹ năng biểu đạt, nghiên cứu vật liệu, lịch sử kiến trúc.' },
  { title: 'Năm 3-4', note: 'Studio nâng cao, thiết kế công cộng, nhà ở phức hợp, mô hình thông số.' },
  { title: 'Năm 5', note: 'Đồ án tốt nghiệp, bảo vệ song ngữ, mentoring với doanh nghiệp & giảng viên khách mời.' },
]

const resources = [
  { label: 'Xưởng vật liệu & chế tác', desc: 'Máy CNC, in 3D, phòng mock-up 1:1 và thư viện vật liệu.' },
  { label: 'Digital Hub', desc: 'VR/AR, scan 3D, phòng render, phòng lab tính toán năng lượng.' },
  { label: 'Trao đổi quốc tế', desc: 'ENSA Paris-Val de Seine, TU Berlin, NUS Singapore với studio chung.' },
  { label: 'Học bổng - tài trợ', desc: 'LIXIL, VietCapital Partners, Quỹ Kickstart Innovation.' },
]
</script>

<template>
  <MasterLayout>
    <section class="content-hero">
      <p class="content-hero__eyebrow">Đào tạo</p>
      <h1>Chương trình đào tạo kiến trúc & đổi mới</h1>
      <p class="content-hero__lede">
        Lộ trình studio 5 năm kết hợp kỹ thuật, công nghệ và đổi mới sáng tạo. Sinh viên được mentor liên tục bởi giảng
        viên khoa, chuyên gia doanh nghiệp và mạng lưới alumni.
      </p>
      <div class="content-hero__tags">
        <span class="pill">Studio Based Learning</span>
        <span class="pill">BIM · Parametric</span>
        <span class="pill">Trao đổi quốc tế</span>
      </div>
    </section>

    <section class="content-section">
      <div class="content-section__header">
        <div>
          <p class="section-tag">Lộ trình</p>
          <h2>Các chương trình chính</h2>
        </div>
        <span class="pill">Tuyển sinh 2025</span>
      </div>
      <div class="content-grid">
        <article v-for="program in programs" :key="program.name" class="content-card">
          <small>{{ program.duration }}</small>
          <h3>{{ program.name }}</h3>
          <p>{{ program.focus }}</p>
        </article>
      </div>
    </section>

    <section class="content-section">
      <div class="content-section__header">
        <div>
          <p class="section-tag">Studio</p>
          <h2>Đường găng đào tạo</h2>
        </div>
        <span class="pill">Mentor 1:1</span>
      </div>
      <div class="stat-grid">
        <div v-for="item in studioRoadmap" :key="item.title" class="stat-card">
          <strong>{{ item.title }}</strong>
          <span>{{ item.note }}</span>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="content-section__header">
        <div>
          <p class="section-tag">Hạ tầng học tập</p>
          <h2>Tài nguyên cho từng đồ án</h2>
        </div>
      </div>
      <div class="content-grid">
        <article v-for="item in resources" :key="item.label" class="content-card">
          <h3>{{ item.label }}</h3>
          <p>{{ item.desc }}</p>
        </article>
      </div>
      <div class="cta-strip">
        <div>
          <p class="section-tag">Liên hệ</p>
          <strong>studio@hau.edu.vn</strong>
          <p>Đăng ký tư vấn chương trình & tham quan studio mỗi thứ 6 hàng tuần.</p>
        </div>
        <a href="mailto:studio@hau.edu.vn">Đặt lịch ngay ↗</a>
      </div>
    </section>
  </MasterLayout>
</template>

