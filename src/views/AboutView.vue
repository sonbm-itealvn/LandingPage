<script setup lang="ts">
import { ref } from 'vue'
import MasterLayout from '../components/MasterLayout.vue'

// Lịch sử Khoa Kiến trúc - Chi tiết theo ảnh
const historyEvents = [
  { 
    date: '8.6.1961', 
    description: 'CP Quyết định số 1972.CN cho phép Bộ Kiến trúc mở lớp đào tạo KTS, tiền thân của Khoa Kiến trúc ngày nay. Phó Bộ trưởng KTS Nguyễn Cao Luyện làm trưởng lớp, các giảng viên từ Trường Mỹ thuật Đông Dương.' 
  },
  { 
    date: '3.9.1961', 
    description: 'Khai giảng khóa 1, sau này trở thành Kiến trúc VI tại Trường Đại học Bách khoa Hà Nội.' 
  },
  { 
    date: '16.10.1963', 
    description: 'Chuyển đào tạo Kiến trúc về Phúc Xá, Ba Đình, Hà Nội.' 
  },
  { 
    date: '7.6.1967', 
    description: 'CP quyết định sáp nhập lớp Kiến trúc vào Trường Đại học Xây dựng thành Khoa Kiến trúc Đô thị. Học tại Quế Võ (Hà Bắc).' 
  },
  { 
    date: '17.9.1969', 
    description: 'CP Quyết định 181/CP tách Khoa Kiến trúc Đô thị khỏi Trường Đại học Xây dựng để thành lập Trường Đại học Kiến trúc Hà Nội. Kế thừa truyền thống đào tạo KTS từ 1961, có 4 Bộ môn: Mỹ thuật, Kiến trúc Dân dụng, Kiến trúc Công nghiệp, Quy hoạch Đô thị & Nông thôn.' 
  },
  { 
    date: '1969-1972', 
    description: 'Sơ tán tại Vĩnh Phú, Cao Bằng.' 
  },
  { 
    date: '1973-1981', 
    description: 'Chuyển về Xuân Hòa. Thành lập thêm các Bộ môn: Hình học Họa hình (từ 1971), Lịch sử Kiến trúc.' 
  },
  { 
    date: '6.1981', 
    description: 'Trường Đại học Kiến trúc Hà Nội trở về địa điểm gốc tại Km10 Nguyễn Trãi, Thanh Xuân, Hà Nội. Khoa Kiến trúc cũng định cư và phát triển tại đây. Thành lập BM Nhà ở, BM CTCC (tách từ BM Kiến trúc Dân dụng - 1981), BM Cấu tạo & trang thiết bị công trình (1997, nay là BM Công nghệ Kiến trúc), BM Lý luận & Bảo tồn (2001).' 
  },
  { 
    date: '1996', 
    description: 'Tách BM Quy hoạch thành lập Khoa Quy hoạch.' 
  },
  { 
    date: '2005', 
    description: 'Thành lập BM Nội thất, BM Đồ họa và bắt đầu đào tạo chuyên ngành MTCN.' 
  },
  { 
    date: '2016', 
    description: 'Tách BM Mỹ thuật và BM Nội ngoại thất thành lập Khoa NT & MTCN.' 
  },
  { 
    date: 'Từ 1996', 
    description: 'Bắt đầu áp dụng mô hình đào tạo KTS theo workshop. Mô hình này đã được cải tiến 2 lần và hiện đang phù hợp với xu hướng đào tạo KTS trên thế giới. Hiện đang chuẩn bị mở thêm các chuyên ngành: Công nghệ Kiến trúc và Bảo tồn Di sản.' 
  },
]

// Trưởng Khoa các thời kỳ - Cập nhật theo ảnh
const facultyHeads = [
  { name: 'Nguyễn Cao Luyện', title: 'KTS' },
  { name: 'Đoàn Văn Minh', title: 'KTS' },
  { name: 'Khổng Toàn', title: 'KTS' },
  { name: 'Cao Xuân Hưởng', title: 'KTS' },
  { name: 'Đặng Tố Tuấn', title: 'TS.KTS' },
  { name: 'Nguyễn Thế Bá', title: 'NGND.GS.TSKH.KTS' },
  { name: 'Nguyễn Hữu Tài', title: 'PGS.TS.KTS' },
  { name: 'Nguyễn Thị Hạnh', title: 'PGS.TS.KTS' },
  { name: 'Lê Quân', title: 'PGS.TS.KTS' },
  { name: 'Phạm Trọng Thuật', title: 'PGS.TS.KTS' },
  { name: 'Lê Anh Đức', title: 'PGS.TS.KTS' },
]

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}
</script>

<template>
  <MasterLayout>
    <div class="about-page">
      <!-- Header Section với Logo và Tên trường - Nền xanh đậm -->
      <section class="about-header">
        <div class="about-header__container">
          <div class="about-header__logo-section">
            <div class="about-header__logo-circle">
              <div class="about-header__logo">
                <img src="/LOGO KKT 2025.svg" alt="Logo Khoa Kiến trúc" />
              </div>
              <div class="about-header__logo-anniversary">
                <div class="about-header__years">1969 2019</div>
                <div class="about-header__anniversary-text">50 NĂM KIẾN TRÚC</div>
              </div>
            </div>
          </div>
          <div class="about-header__text">
            <h1 class="about-header__university">TRƯỜNG ĐH KIẾN TRÚC HÀ NỘI</h1>
            <h2 class="about-header__faculty">KHOA KIẾN TRÚC</h2>
          </div>
        </div>
      </section>

      <!-- Phần Giới thiệu Chính - Nền trắng -->
      <section class="about-intro">
        <div class="about-intro__container">
          <div class="about-intro__content">
            <p class="about-intro__paragraph">
              Trải qua gần 60 năm xây dựng và trưởng thành từ năm 1961 đến nay, Khoa Kiến trúc - Trường Đại học Kiến trúc Hà Nội đã đào tạo được hơn 8.000 kiến trúc sư, 660 thạc sĩ và 42 tiến sĩ kiến trúc. Nhiều cựu sinh viên đã trở thành những nhà khoa học GS, PGS, là lãnh đạo ở các cơ quan quản lý Nhà nước và quản lý các doanh nghiệp. Nhiều thế hệ kiến trúc sư có uy tín đã được ghi nhận qua các giải thưởng kiến trúc trong nước và quốc tế của UIA, ARCASIA, giải thưởng nhà nước và giải thưởng kiến trúc quốc gia. Sinh viên Khoa Kiến trúc tích cực tham gia các hoạt động: Văn nghệ, thể thao, các hoạt động tình nguyện, hoạt động xã hội,... với sự nhiệt huyết, đam mê sáng tạo và để lại ấn tượng sâu sắc với các giải thưởng Loa Thành, Futurarc, Insee, AYDA,... Tập thể Khoa, các Bộ môn và nhiều cá nhân đã được tặng thưởng Huân Chương lao động của Nhà nước, bằng khen của Chính phủ và Bộ Xây dựng. Nhờ sự kế thừa và phát huy từ các thế hệ đi trước, Khoa Kiến trúc - Trường Đại học Kiến trúc Hà Nội luôn khẳng định được vị thế là cơ sở đào tạo kiến trúc sư hàng đầu của cả nước.
            </p>

            <p class="about-intro__section-content">
              <strong>NGUỒN NHÂN LỰC</strong> đội ngũ giảng viên cơ hữu và kiêm nhiệm của Khoa bao gồm 78 giảng viên trong đó có 3 PGS, 18 TS và 60 ThS, KTS. Các giảng viên được biên chế tại 8 Bộ môn giảng dạy các môn lý thuyết, thực hành và đồ án chuyên ngành. Văn phòng Khoa gồm 2 giảng viên là trợ lý cho Ban chủ nhiệm khoa về công tác đào tạo, quản lý sinh viên và 3 thư ký Khoa.
            </p>

            <p class="about-intro__section-content">
              <strong>CƠ SỞ VẬT CHẤT</strong> Văn phòng Khoa Kiến trúc, 7 phòng ban, 7 xưởng thực hành kiến trúc, phòng tư liệu phục vụ nghiên cứu và học tập, phòng trưng bày kiến trúc và mỹ thuật.
            </p>
          </div>
        </div>
      </section>

      <!-- Lịch sử Khoa Kiến trúc -->
      <section class="about-history">
        <div class="about-history__container">
          <h2 class="about-history__title">LỊCH SỬ KHOA KIẾN TRÚC</h2>
          <div class="about-history__timeline">
            <div
              v-for="(event, index) in historyEvents"
              :key="index"
              class="about-history__event"
            >
              <div class="about-history__event-date">{{ event.date }}</div>
              <div class="about-history__event-description">{{ event.description }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trưởng Khoa các thời kỳ -->
      <section class="about-heads">
        <div class="about-heads__container">
          <h2 class="about-heads__title">TRƯỞNG KHOA KIẾN TRÚC CÁC THỜI KỲ</h2>
          <div class="about-heads__grid">
            <div
              v-for="(head, index) in facultyHeads"
              :key="index"
              class="about-heads__item"
            >
              <div class="about-heads__portrait">
                <img
                  :src="`/faculty-heads/${head.name.replace(/\s+/g, '-').toLowerCase()}.jpg`"
                  :alt="head.name"
                  loading="lazy"
                  @error="handleImageError"
                />
              </div>
              <div class="about-heads__info">
                <div class="about-heads__name">{{ head.name }}</div>
                <div class="about-heads__title-text">{{ head.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </MasterLayout>
</template>

<style scoped>
.about-page {
  width: 100%;
  background: #ffffff;
}

/* Header Section - Nền xanh đậm với thanh xanh bên trái */
.about-header {
  background: #ffffff;
  padding: 0;
  position: relative;
}

.about-header__container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  gap: 0;
  position: relative;
  min-height: 300px;
}

/* Thanh xanh đậm bên trái */
.about-header__container::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  background: #1e3a8a;
  z-index: 1;
}

.about-header__logo-section {
  position: relative;
  z-index: 2;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 200px;
  flex-shrink: 0;
}

.about-header__logo-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.about-header__logo {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 50%;
  padding: 1.5rem;
}

.about-header__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.about-header__logo-anniversary {
  text-align: center;
  color: #ffffff;
}

.about-header__years {
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.about-header__anniversary-text {
  font-size: clamp(0.85rem, 1vw, 1rem);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.about-header__text {
  flex: 1;
  padding: 3rem 3rem 3rem 4rem;
  position: relative;
  z-index: 1;
}

.about-header__university {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 700;
  color: #1e3a8a;
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.about-header__faculty {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 900;
  color: #1e3a8a;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Intro Section - Nền trắng */
.about-intro {
  background: #ffffff;
  padding: 3rem clamp(2rem, 5vw, 4rem);
  color: #1f2937;
}

.about-intro__container {
  max-width: 1280px;
  margin: 0 auto;
}

.about-intro__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-intro__paragraph {
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.8;
  color: #1f2937;
  margin: 0;
  text-align: justify;
}

.about-intro__section-content {
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.8;
  color: #1f2937;
  margin: 0;
  text-align: justify;
}

.about-intro__section-content strong {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #1e3a8a;
}

/* History Section */
.about-history {
  background: #f8fafc;
  padding: 4rem clamp(2rem, 5vw, 4rem);
}

.about-history__container {
  max-width: 1280px;
  margin: 0 auto;
}

.about-history__title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 900;
  color: #1e3a8a;
  margin: 0 0 3rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: left;
}

.about-history__timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-history__event {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #1e40af;
}

.about-history__event-date {
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  font-weight: 700;
  color: #1e40af;
  min-width: 120px;
  flex-shrink: 0;
}

.about-history__event-description {
  font-size: clamp(0.95rem, 1.3vw, 1.1rem);
  line-height: 1.7;
  color: #374151;
  flex: 1;
}

/* Faculty Heads Section */
.about-heads {
  background: #374151;
  padding: 4rem clamp(2rem, 5vw, 4rem);
  position: relative;
}

.about-heads::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
  pointer-events: none;
}

.about-heads__container {
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.about-heads__title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 900;
  color: #1e3a8a;
  margin: 0 0 3rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: left;
  background: #ffffff;
  padding: 1rem 2rem;
  display: inline-block;
}

.about-heads__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.about-heads__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.about-heads__portrait {
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: 8px;
  overflow: hidden;
  background: #4b5563;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-heads__portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-heads__info {
  text-align: center;
  color: #ffffff;
}

.about-heads__name {
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.about-heads__title-text {
  font-size: clamp(0.8rem, 1vw, 0.95rem);
  color: rgba(255, 255, 255, 0.8);
}

/* Responsive */
@media (max-width: 768px) {
  .about-header__container {
    flex-direction: column;
  }

  .about-header__container::before {
    width: 100%;
    height: 200px;
  }

  .about-header__logo-section {
    width: 100%;
    padding: 2rem;
  }

  .about-header__text {
    padding: 2rem 1.5rem;
  }

  .about-intro {
    padding: 2rem 1.5rem;
  }

  .about-history__event {
    flex-direction: column;
    gap: 0.75rem;
  }

  .about-history__event-date {
    min-width: auto;
  }

  .about-heads__title {
    padding: 0.75rem 1.5rem;
    font-size: clamp(1.3rem, 2.5vw, 1.8rem);
  }

  .about-heads__grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .about-header__container::before {
    height: 180px;
  }

  .about-header__logo {
    width: 100px;
    height: 100px;
  }

  .about-intro,
  .about-history,
  .about-heads {
    padding: 2.5rem 1rem;
  }

  .about-heads__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
</style>
