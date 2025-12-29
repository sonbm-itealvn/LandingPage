<script setup lang="ts">
import MasterLayout from '../components/MasterLayout.vue'

// Lịch sử Khoa Kiến trúc - Chi tiết theo ảnh
const historyEvents = [
  {
    date: '8.6.1961',
    description: 'CP có Quyết định số 1972.CN, cho phép Bộ Kiến Trúc mở lớp đào tạo KTS - tiền thân của khoa Kiến Trúc ngày nay. Thứ trưởng KTS Nguyễn Cao Luyên kiêm Trưởng ban lãnh đạo lớp và trực tiếp tham gia giảng dạy cùng nhiều KTS, họa sĩ đầu ngành xuất thân từ trường Mỹ thuật Đông Dương.'
  },
  {
    date: '3.9.1961',
    description: 'Khai giảng khóa 1, sau đó được phiên chế thành ngành Kiến trúc khóa VI Trường Đại Học Bách khoa Hà Nội.'
  },
  {
    date: '16.10.1963',
    description: 'lớp đào tạo Kiến trúc sư chuyển về cơ sở Phúc Xá, Ba Đình, Hà Nội.'
  },
  {
    date: '7.6.1967',
    description: 'CP quyết định sáp nhập lớp Kiến trúc sư vào Trường Đại học Xây dựng thành Khoa Kiến trúc Đô thị. Học tập tại Quế Võ (Hà Bắc).'
  },
  {
    date: '17.9.1969',
    description: 'CP có Quyết định 181/CP, tách khoa Kiến trúc Đô thị từ Đại học Xây dựng để thành lập Đại học Kiến trúc, tiếp nhận cơ sở của trường Trung cấp Kiến trúc tại Hà Đồng. Khoa Kiến trúc chính thức được thành lập, kế thừa và tiếp nối truyền thống của các lớp Đào tạo KTS từ 1961, với 4 bộ môn: Mỹ thuật, Kiến trúc dân dụng, Kiến trúc Công nghiệp, Quy hoạch Đô thị & Nông thôn.'
  },
  {
    date: '1969-1972',
    description: 'Sơ tán tại Vĩnh Phú, Cao Bằng....'
  },
  {
    date: '1973-1981',
    description: 'Chuyển về cơ sở Xuân Hòa. Thành lập thêm các bộ môn Hình học Họa hình (từ 1971) và Cơ sở - Lịch sử Kiến trúc.'
  },
  {
    date: '6,1981',
    description: 'Trường Đại học Kiến trúc trở về cơ sở ban đầu tại Km10 đường Nguyễn Trãi, Thanh Xuân, Hà Nội. Khoa Kiến trúc cũng "an cư lạc nghiệp" tại địa điểm này và không ngừng phát triển. Thành lập BM Nhà ở và BM CTCC (tách ra từ BM Dân dụng - 1981), BM Cầu tạo & trang thiết bị công trình (1997) nay là BM Công nghệ Kiến trúc, BM Lý luận & Bảo tồn (2001).'
  },
  {
    date: '1996',
    description: 'tách BM Quy hoạch để thành lập Khoa Quy hoạch.'
  },
  {
    date: '2005',
    description: 'thành lập các BM Nội thất, Đồ họa và bắt đầu đào tạo các chuyên ngành MTCN.'
  },
  {
    date: '2016',
    description: 'tách các BM Mỹ thuật và BM Nội ngoại thất để thành lập Khoa NT & MTCN.'
  },
  {
    date: 'Từ 1996',
    description: 'Bắt đầu áp dụng mô hình đào tạo KTS theo xưởng. Đến nay mô hình này đã qua 2 lần cải tiến để ngày càng phù hợp với xu thế đào tạo KTS trên thế giới. Hiện nay đang chuẩn bị mở thêm các chuyên ngành Công nghệ Kiến trúc và Bảo tồn Di sản.'
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
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-12 sm:mb-14 lg:mb-16 xl:mb-20 uppercase tracking-wide text-left" style="color: #1e3a8a; margin-bottom: 30px;">
            LỊCH SỬ KHOA KIẾN TRÚC
          </h2>
          
          <!-- Timeline -->
          <div class="relative pl-8 sm:pl-12 md:pl-16 mt-4 sm:mt-6">
            <!-- Đường thẳng dọc màu xanh -->
            <div class="absolute left-0 top-0 bottom-0 w-0.5" style="background-color: #1e40af;"></div>
            
            <div class="space-y-8 sm:space-y-10 lg:space-y-12">
              <div
                v-for="(event, index) in historyEvents"
                :key="index"
                class="relative flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 items-start"
              >
                <!-- Điểm nối trên timeline và đường ngang -->
                <div class="absolute left-0 transform -translate-x-1/2 flex items-center" style="top: 0.25rem;">
                  <div class="w-3 h-3 rounded-full border-2 border-white" style="background-color: #1e40af;"></div>
                  <div class="w-4 h-0.5" style="background-color: #1e40af;"></div>
                </div>
                
                <!-- Ngày tháng -->
                <div class="pl-6 sm:pl-8 sm:w-36 lg:w-44 xl:w-48 flex-shrink-0">
                  <div class="text-sm sm:text-base lg:text-lg font-bold leading-tight" style="color: #1e40af;">
                    {{ event.date }}
                  </div>
                </div>
                
                <!-- Mô tả -->
                <div class="pl-6 sm:pl-0 flex-1 pb-4 sm:pb-6">
                  <div class="text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed text-gray-700">
                    {{ event.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trưởng Khoa các thời kỳ -->
      <section class="relative w-full">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-12 lg:py-16 xl:py-20">
          <h3 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-8 sm:mb-10 lg:mb-12 xl:mb-16 uppercase tracking-wide text-left" style="color: #1e3a8a;">
            TRƯỞNG KHOA CÁC THỜI KỲ
          </h3>
          </div>
        <img
          src="/z7377350995324_5b0c191f44a7446f4e65ffd29b4b8695.jpg"
          alt=""
          class="w-full h-auto object-cover"
        />
      </section>

      <!-- Theo dòng ký ức - Nền trắng -->
      <section class="bg-white py-12 sm:py-16 lg:py-20 xl:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <h2 class="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-10 sm:mb-12 lg:mb-16 uppercase tracking-wide px-4 py-2" style="background-color: #e5e5e5; color: #1e3a8a;">
            THEO DÒNG KÝ ỨC
          </h2>

          <div class="space-y-8 sm:space-y-10 lg:space-y-12">
            <!-- Ảnh 1 -->
            <div class="w-full rounded-sm overflow-hidden group">
              <img
                src="/012.jpg"
                alt=""
                class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <!-- Ảnh 2 -->
            <div class="w-full rounded-sm overflow-hidden group">
              <img
                src="/013.jpg"
                alt=""
                class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </MasterLayout>
</template>
