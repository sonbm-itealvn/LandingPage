<script setup lang="ts">
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
    <div class="min-h-screen bg-white">
      <!-- Header Section với Logo và Tên trường - Thanh xanh bên trái -->
      <section class="relative bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto relative min-h-[280px] sm:min-h-[320px] lg:min-h-[380px] flex flex-col lg:flex-row">
          <!-- Thanh xanh đậm bên trái -->
          <div class="absolute left-0 top-0 bottom-0 w-40 sm:w-48 lg:w-56 xl:w-64 bg-hau-blue z-10"></div>
          
          <!-- Logo Section -->
          <div class="relative z-20 w-40 sm:w-48 lg:w-56 xl:w-64 flex-shrink-0 py-10 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-4 sm:gap-5 lg:gap-6">
            <div class="flex flex-col items-center gap-3 sm:gap-4">
              <div class="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full bg-white flex items-center justify-center p-3 sm:p-4 lg:p-5 xl:p-6 shadow-strong transition-transform duration-300 hover:scale-105">
                <img 
                  src="/LOGO KKT 2025.svg" 
                  alt="Logo Khoa Kiến trúc" 
                  class="w-full h-full object-contain" 
                />
              </div>
              <div class="text-center text-white space-y-0.5">
                <div class="text-xs sm:text-sm lg:text-base font-semibold leading-tight">1969 2019</div>
                <div class="text-[10px] sm:text-xs lg:text-sm font-medium uppercase tracking-widest leading-tight">50 NĂM KIẾN TRÚC</div>
              </div>
            </div>
          </div>

          <!-- Text Section -->
          <div class="relative z-10 flex-1 py-10 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-10 xl:px-16 flex flex-col justify-center">
            <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold text-hau-blue mb-2 sm:mb-3 uppercase tracking-wide leading-tight">
              TRƯỜNG ĐH KIẾN TRÚC HÀ NỘI
            </h1>
            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-black text-hau-blue uppercase tracking-wider leading-tight">
              KHOA KIẾN TRÚC
            </h2>
          </div>
        </div>
      </section>

      <!-- Phần Giới thiệu Chính - Nền trắng -->
      <section class="bg-white py-10 sm:py-12 lg:py-16 xl:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div class="space-y-5 sm:space-y-6 lg:space-y-8">
            <p class="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-gray-800 text-justify">
              Trải qua gần 60 năm xây dựng và trưởng thành từ năm 1961 đến nay, Khoa Kiến trúc - Trường Đại học Kiến trúc Hà Nội đã đào tạo được hơn 8.000 kiến trúc sư, 660 thạc sĩ và 42 tiến sĩ kiến trúc. Nhiều cựu sinh viên đã trở thành những nhà khoa học GS, PGS, là lãnh đạo ở các cơ quan quản lý Nhà nước và quản lý các doanh nghiệp. Nhiều thế hệ kiến trúc sư có uy tín đã được ghi nhận qua các giải thưởng kiến trúc trong nước và quốc tế của UIA, ARCASIA, giải thưởng nhà nước và giải thưởng kiến trúc quốc gia. Sinh viên Khoa Kiến trúc tích cực tham gia các hoạt động: Văn nghệ, thể thao, các hoạt động tình nguyện, hoạt động xã hội,... với sự nhiệt huyết, đam mê sáng tạo và để lại ấn tượng sâu sắc với các giải thưởng Loa Thành, Futurarc, Insee, AYDA,... Tập thể Khoa, các Bộ môn và nhiều cá nhân đã được tặng thưởng Huân Chương lao động của Nhà nước, bằng khen của Chính phủ và Bộ Xây dựng. Nhờ sự kế thừa và phát huy từ các thế hệ đi trước, Khoa Kiến trúc - Trường Đại học Kiến trúc Hà Nội luôn khẳng định được vị thế là cơ sở đào tạo kiến trúc sư hàng đầu của cả nước.
            </p>

            <div class="pt-2 sm:pt-3">
              <p class="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-gray-800 text-justify">
                <strong class="font-bold uppercase tracking-wide text-hau-blue block mb-1 sm:mb-2">NGUỒN NHÂN LỰC</strong>
                <span class="block">Đội ngũ giảng viên cơ hữu và kiêm nhiệm của Khoa bao gồm 78 giảng viên trong đó có 3 PGS, 18 TS và 60 ThS, KTS. Các giảng viên được biên chế tại 8 Bộ môn giảng dạy các môn lý thuyết, thực hành và đồ án chuyên ngành. Văn phòng Khoa gồm 2 giảng viên là trợ lý cho Ban chủ nhiệm khoa về công tác đào tạo, quản lý sinh viên và 3 thư ký Khoa.</span>
              </p>
            </div>

            <div class="pt-2 sm:pt-3">
              <p class="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-gray-800 text-justify">
                <strong class="font-bold uppercase tracking-wide text-hau-blue block mb-1 sm:mb-2">CƠ SỞ VẬT CHẤT</strong>
                <span class="block">Văn phòng Khoa Kiến trúc, 7 phòng ban, 7 xưởng thực hành kiến trúc, phòng tư liệu phục vụ nghiên cứu và học tập, phòng trưng bày kiến trúc và mỹ thuật.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Lịch sử Khoa Kiến trúc -->
      <section class="bg-gradient-to-b from-gray-50 to-white py-10 sm:py-12 lg:py-16 xl:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-hau-blue mb-8 sm:mb-10 lg:mb-12 xl:mb-16 uppercase tracking-wide text-left">
            LỊCH SỬ KHOA KIẾN TRÚC
          </h2>
          <div class="space-y-3 sm:space-y-4 lg:space-y-5">
            <div
              v-for="(event, index) in historyEvents"
              :key="index"
              class="group flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 xl:gap-8 p-4 sm:p-5 lg:p-6 xl:p-8 bg-white rounded-lg sm:rounded-xl shadow-soft border-l-4 border-hau-blue-dark hover:shadow-medium hover:border-hau-blue transition-all duration-300"
            >
              <div class="text-sm sm:text-base lg:text-lg font-bold text-hau-blue-dark flex-shrink-0 sm:min-w-[120px] lg:min-w-[140px] xl:min-w-[160px] leading-tight">
                {{ event.date }}
              </div>
              <div class="text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed text-gray-700 flex-1">
                {{ event.description }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trưởng Khoa các thời kỳ -->
      <section class="relative bg-gradient-to-b from-gray-700 to-gray-800 py-10 sm:py-12 lg:py-16 xl:py-20 overflow-hidden">
        <!-- Grid Pattern Background -->
        <div 
          class="absolute inset-0 opacity-20 pointer-events-none"
          style="background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 24px 24px;"
        ></div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-hau-blue mb-8 sm:mb-10 lg:mb-12 xl:mb-16 uppercase tracking-wide inline-block bg-white px-5 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 rounded-lg sm:rounded-xl shadow-strong">
            TRƯỞNG KHOA KIẾN TRÚC CÁC THỜI KỲ
          </h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
            <div
              v-for="(head, index) in facultyHeads"
              :key="index"
              class="flex flex-col items-center gap-3 sm:gap-4 group"
            >
              <div class="w-full aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden bg-gray-600 shadow-medium group-hover:shadow-strong group-hover:scale-[1.02] transition-all duration-300">
                <img
                  :src="`/faculty-heads/${head.name.replace(/\s+/g, '-').toLowerCase()}.jpg`"
                  :alt="head.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  loading="lazy"
                  @error="handleImageError"
                />
              </div>
              <div class="text-center text-white space-y-1">
                <div class="text-xs sm:text-sm lg:text-base font-semibold leading-tight">{{ head.name }}</div>
                <div class="text-[10px] sm:text-xs lg:text-sm text-gray-300 leading-tight">{{ head.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </MasterLayout>
</template>
