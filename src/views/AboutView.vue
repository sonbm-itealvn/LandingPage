<script setup lang="ts">
import MasterLayout from '../components/MasterLayout.vue'

// Lịch sử Khoa Kiến trúc - Chi tiết theo PDF
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
    description: 'CP Quyết định 181/CP tách Khoa Kiến trúc Đô thị khỏi Trường Đại học Xây dựng để thành lập Trường Đại học Kiến trúc Hà Nội, tiếp quản cơ sở của Trường Trung cấp Kiến trúc tại Hà Đông. Khoa Kiến trúc chính thức được thành lập, kế thừa và tiếp nối truyền thống đào tạo KTS từ 1961, có 4 Bộ môn: Mỹ thuật, Kiến trúc Dân dụng, Kiến trúc Công nghiệp, Quy hoạch Đô thị & Nông thôn.'
  },
  {
    date: '1969-1972',
    description: 'Sơ tán tại Vĩnh Phú, Cao Bằng,...'
  },
  {
    date: '1973-1981',
    description: 'Chuyển về Xuân Hòa. Thành lập thêm các Bộ môn: Hình học Họa hình (từ 1971) và Cơ bản - Lịch sử Kiến trúc.'
  },
  {
    date: '6,1981',
    description: 'Trường Đại học Kiến trúc Hà Nội trở về địa điểm gốc tại Km10 Nguyễn Trãi, Thanh Xuân, Hà Nội. Khoa Kiến trúc cũng "định cư" tại địa điểm này và liên tục phát triển. Thành lập BM Nhà ở, BM CTCC (tách từ BM Dân dụng - 1981), BM Cấu tạo & trang thiết bị công trình (1997), nay là BM Công nghệ Kiến trúc, BM Lý luận & Bảo tồn (2001).'
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
    description: 'Bắt đầu áp dụng mô hình đào tạo KTS theo workshop. Mô hình này đã được cải tiến 2 lần để phù hợp hơn với xu hướng đào tạo KTS trên thế giới. Hiện đang chuẩn bị mở thêm các chuyên ngành: Công nghệ Kiến trúc và Bảo tồn Di sản.'
  },
]

// Danh sách Trưởng khoa các thời kỳ
const deans = [
  { name: 'KTS Đoàn Văn Minh', period: '' },
  { name: 'KTS Khổng Toán', period: '' },
  { name: 'KTS Cao Xuân Hưởng', period: '' },
  { name: 'TS.KTS Đặng Tố Tuấn', period: '' },
  { name: 'NGND.GS.TSKH.KTS Nguyễn Thế Bá', period: '' },
  { name: 'PGS.TS.KTS Nguyễn Hữu Tài', period: '' },
  { name: 'GS.TS.KTS Nguyễn Việt Châu', period: '' },
  { name: 'PGS.TS.KTS Trịnh Hồng Đoàn', period: '' },
  { name: 'PGS.TS.KTS Trần Xuân Đỉnh', period: '' },
  { name: 'PGS.TS.KTS Lê Quân', period: '' },
  { name: 'PGS.TS.KTS Nguyễn Vũ Phương', period: '' },
  { name: 'TS.KTS Vương Hải Long', period: '' },
]
</script>

<template>
  <MasterLayout>
    <div class="min-h-screen bg-white">
      <!-- Logo Section - Chỉ có logo bên trái -->
      <!-- <section class="bg-white py-8 sm:py-10 lg:py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div class="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64">
            <img
              src="/logoTruongDHKienTruc.png"
              alt="Logo Trường ĐH Kiến trúc Hà Nội"
              class="w-full h-full object-contain"
            />
          </div>
        </div>
      </section> -->

      <!-- Phần Giới thiệu Chính - Nền trắng, chữ đen -->
      <section class="relative bg-white text-gray-800 py-10 sm:py-12 lg:py-16 xl:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div class="space-y-6 sm:space-y-8 lg:space-y-10">
            <!-- Đoạn giới thiệu chính -->
            <p class="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-gray-700 text-justify">
              Trải qua gần 60 năm xây dựng và trưởng thành từ năm 1961 đến nay, Khoa Kiến trúc - Trường Đại học Kiến trúc Hà Nội đã đào tạo được hơn 8.000 kiến trúc sư, 660 thạc sĩ và 42 tiến sĩ kiến trúc. Nhiều cựu sinh viên đã trở thành những nhà khoa học GS, PGS, là lãnh đạo ở các cơ quan quản lý Nhà nước và quản lý các doanh nghiệp. Nhiều thế hệ kiến trúc sư có uy tín đã được ghi nhận qua các giải thưởng kiến trúc trong nước và quốc tế của UIA, ARCASIA, giải thưởng nhà nước và giải thưởng kiến trúc quốc gia. Sinh viên Khoa Kiến trúc tích cực tham gia các hoạt động: Văn nghệ, thể thao, các hoạt động tình nguyện, hoạt động xã hội,... với sự nhiệt huyết, đam mê sáng tạo và để lại ấn tượng sâu sắc với các giải thưởng Loa Thành, Futurarc, Insee, AYDA,... Tập thể Khoa, các Bộ môn và nhiều cá nhân đã được tặng thưởng Huân Chương lao động của Nhà nước, bằng khen của Chính phủ và Bộ Xây dựng. Nhờ sự kế thừa và phát huy từ các thế hệ đi trước, Khoa Kiến trúc - Trường Đại học Kiến trúc Hà Nội luôn khẳng định được vị thế là cơ sở đào tạo kiến trúc sư hàng đầu của cả nước.
            </p>

            <!-- Đường phân cách -->
            <div class="border-t border-gray-300"></div>

            <!-- NGUỒN NHÂN LỰC -->
            <div class="pt-2 sm:pt-3">
              <p class="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-gray-700 text-justify">
                <strong class="font-bold uppercase tracking-wide text-gray-900 block mb-2 sm:mb-3">NGUỒN NHÂN LỰC</strong>
                <span class="block">Đội ngũ giảng viên cơ hữu và kiêm nhiệm của Khoa bao gồm 78 giảng viên trong đó có 3 PGS, 18 TS và 60 ThS, KTS. Các giảng viên được biên chế tại 8 Bộ môn giảng dạy các môn lý thuyết, thực hành và đồ án chuyên ngành. Văn phòng Khoa gồm 2 giảng viên là trợ lý cho Ban chủ nhiệm khoa về công tác đào tạo, quản lý sinh viên và 3 thư ký Khoa.</span>
              </p>
            </div>

            <!-- Đường phân cách -->
            <div class="border-t border-gray-300"></div>

            <!-- CƠ SỞ VẬT CHẤT -->
            <div class="pt-2 sm:pt-3">
              <p class="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-gray-700 text-justify">
                <strong class="font-bold uppercase tracking-wide text-gray-900 block mb-2 sm:mb-3">CƠ SỞ VẬT CHẤT</strong>
                <span class="block">Văn phòng Khoa Kiến trúc, 7 phòng ban kết hợp với 7 xưởng thực hành kiến trúc, phòng tư liệu phục vụ nghiên cứu và học tập, phòng trưng bày kiến trúc và mỹ thuật.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Lịch sử Khoa Kiến trúc - Nền trắng -->
      <section class="bg-white py-10 sm:py-12 lg:py-16 xl:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-8 sm:mb-10 lg:mb-12 xl:mb-16 uppercase tracking-wide text-left" style="color: #1e3a8a;">
            LỊCH SỬ KHOA KIẾN TRÚC
          </h2>
          <div class="space-y-3 sm:space-y-4 lg:space-y-5">
            <div
              v-for="(event, index) in historyEvents"
              :key="index"
              class="group flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 xl:gap-8 p-4 sm:p-5 lg:p-6 xl:p-8 bg-white rounded-lg sm:rounded-xl shadow-soft border-l-4 transition-all duration-300 hover:shadow-medium"
              style="border-color: #1e40af;"
            >
              <div class="text-sm sm:text-base lg:text-lg font-bold flex-shrink-0 sm:min-w-[120px] lg:min-w-[140px] xl:min-w-[160px] leading-tight" style="color: #1e40af;">
                {{ event.date }}
              </div>
              <div class="text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed text-gray-700 flex-1">
                {{ event.description }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trưởng Khoa các thời kỳ - Nền xanh đậm -->
      <section class="relative text-white py-12 sm:py-16 lg:py-20 xl:py-24" style="background-color: #1e3a8a;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 uppercase tracking-wide text-center text-white">
            TRƯỞNG KHOA KIẾN TRÚC
          </h2>
          <p class="text-base sm:text-lg lg:text-xl font-medium text-white/80 text-center mb-10 sm:mb-12 lg:mb-16 uppercase tracking-widest">
            CÁC THỜI KỲ
          </p>

          <!-- Grid các Trưởng khoa -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            <div
              v-for="(dean, index) in deans"
              :key="index"
              class="group flex flex-col items-center text-center"
            >
              <div class="w-full aspect-[3/4] bg-slate-600/50 mb-4 rounded-sm overflow-hidden relative">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute inset-0 flex items-center justify-center text-white/40 text-xs uppercase tracking-wider">
                  Ảnh chân dung
                </div>
              </div>
              <p class="font-bold text-sm sm:text-base lg:text-lg text-white leading-tight">{{ dean.name }}</p>
              <p v-if="dean.period" class="text-xs sm:text-sm text-white/70 mt-1">{{ dean.period }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Theo dòng ký ức - Nền trắng -->
      <section class="bg-white py-12 sm:py-16 lg:py-20 xl:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <h2 class="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-10 sm:mb-12 lg:mb-16 uppercase tracking-wide px-4 py-2" style="background-color: #e5e5e5; color: #1e3a8a;">
            THEO DÒNG KÝ ỨC
          </h2>

          <div class="space-y-12 sm:space-y-16 lg:space-y-20">
            <!-- 1969 -->
            <div class="flex flex-col items-start">
              <div class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4" style="color: transparent; -webkit-text-stroke: 2px #334155;">
                1969
              </div>
              <div class="w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-slate-200 rounded-sm relative overflow-hidden group">
                <div class="absolute inset-0 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest group-hover:scale-105 transition-transform duration-500">
                  Hình ảnh tư liệu 1969
                </div>
              </div>
            </div>

            <!-- 1981 -->
            <div class="flex flex-col items-end">
              <div class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4" style="color: transparent; -webkit-text-stroke: 2px #334155;">
                1981
              </div>
              <div class="w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-slate-200 rounded-sm relative overflow-hidden group">
                <div class="absolute inset-0 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest group-hover:scale-105 transition-transform duration-500">
                  Hình ảnh tư liệu 1981
                </div>
              </div>
            </div>

            <!-- 2019 -->
            <div class="flex flex-col items-start">
              <div class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4" style="color: transparent; -webkit-text-stroke: 2px #334155;">
                2019
              </div>
              <div class="w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-slate-200 rounded-sm relative overflow-hidden group">
                <div class="absolute inset-0 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest group-hover:scale-105 transition-transform duration-500">
                  Hình ảnh tư liệu 2019
                </div>
              </div>
            </div>

            <!-- 1991 -->
            <div class="flex flex-col items-end">
              <div class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4" style="color: transparent; -webkit-text-stroke: 2px #334155;">
                1991
              </div>
              <div class="w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-slate-200 rounded-sm relative overflow-hidden group">
                <div class="absolute inset-0 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest group-hover:scale-105 transition-transform duration-500">
                  Hình ảnh tư liệu 1991
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </MasterLayout>
</template>
