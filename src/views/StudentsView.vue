<script setup lang="ts">
import MasterLayout from '../components/MasterLayout.vue'

const studentServices = [
  { title: 'Support Desk', detail: 'Tư vấn học thuật, gia hạn đồ án, hỗ trợ học bổng và thủ tục trao đổi.' },
  { title: 'Career Center', detail: 'Kết nối thực tập, talk nghề nghiệp, portfolio review cùng alumni & doanh nghiệp.' },
  { title: 'Learning Hub', detail: 'Kho thư viện số, workshop kỹ năng mềm, lớp bổ trợ phần mềm kiến trúc.' },
]

const studentClubs = [
  { name: 'Architecture Society', focus: 'Tổ chức review mở, cuộc thi ý tưởng nhanh, night sketching.' },
  { name: 'Digital Fabrication Lab', focus: 'CNC, in 3D, robot arm; thực hành từ ý tưởng đến prototype.' },
  { name: 'Urban Sketchers', focus: 'Sketch on-site hằng tuần, lưu trữ bản vẽ và xuất bản zine định kỳ.' },
  { name: 'Community Design', focus: 'Dự án cải tạo không gian công cộng, làm việc với địa phương & doanh nghiệp.' },
]

const studentTimeline = [
  { label: 'Tuần 01-02', note: 'Khởi động studio, định hướng đề tài, nhận mentor nhóm.' },
  { label: 'Tuần 05', note: 'Mid-review cùng giảng viên khách mời, cập nhật mô hình 3D.' },
  { label: 'Tuần 09', note: 'Pin-up mở, nhận phản hồi từ doanh nghiệp/đối tác dự án.' },
  { label: 'Tuần 12', note: 'Final review song ngữ, chuẩn bị hồ sơ portfolio & triển lãm.' },
]
</script>

<template>
  <MasterLayout>
    <section class="content-hero">
      <p class="content-hero__eyebrow">Sinh viên</p>
      <h1>Hỗ trợ toàn diện cho hành trình studio</h1>
      <p class="content-hero__lede">
        Mọi sinh viên đều có mentor, cộng đồng câu lạc bộ và nguồn tài nguyên để phát triển đồ án, nghiên cứu và con
        đường nghề nghiệp.
      </p>
      <div class="content-hero__tags">
        <span class="pill">Mentoring</span>
        <span class="pill">Career Support</span>
        <span class="pill">Clubs & Community</span>
      </div>
    </section>

    <section class="content-section">
      <div class="content-section__header">
        <div>
          <p class="section-tag">Dịch vụ</p>
          <h2>Trung tâm hỗ trợ sinh viên</h2>
        </div>
        <span class="pill">9:00 - 17:30 · Thứ 2 - Thứ 6</span>
      </div>
      <div class="content-grid">
        <article v-for="service in studentServices" :key="service.title" class="content-card">
          <h3>{{ service.title }}</h3>
          <p>{{ service.detail }}</p>
        </article>
      </div>
    </section>

    <section class="content-section">
      <div class="content-section__header">
        <div>
          <p class="section-tag">Cộng đồng</p>
          <h2>Câu lạc bộ & hoạt động</h2>
        </div>
      </div>
      <div class="content-grid">
        <article v-for="club in studentClubs" :key="club.name" class="content-card">
          <small>CLB</small>
          <h3>{{ club.name }}</h3>
          <p>{{ club.focus }}</p>
        </article>
      </div>
    </section>

    <section class="content-section">
      <div class="content-section__header">
        <div>
          <p class="section-tag">Lịch studio</p>
          <h2>Các mốc quan trọng</h2>
        </div>
      </div>
      <div class="stat-grid">
        <div v-for="item in studentTimeline" :key="item.label" class="stat-card">
          <strong>{{ item.label }}</strong>
          <span>{{ item.note }}</span>
        </div>
      </div>
      <div class="cta-strip">
        <div>
          <p class="section-tag">Liên hệ</p>
          <strong>students@hau.edu.vn</strong>
          <p>Đăng ký mentor cá nhân hoặc gửi câu hỏi hỗ trợ.</p>
        </div>
        <a href="mailto:students@hau.edu.vn">Đặt lịch tư vấn ↗</a>
      </div>
    </section>
  </MasterLayout>
</template>

