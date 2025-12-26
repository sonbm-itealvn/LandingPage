<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import MasterLayout from '../components/MasterLayout.vue'
import { RouterLink } from 'vue-router'
import {
  fetchPostsByCategory,
  fetchAllPostsByCategory,
  getPostImage,
  getPostExcerpt,
  getPostDate,
  type Post,
} from '../services/postsService'

// Section 1: Thiết kế kiến trúc - Carousel
const designPosts = ref<Post[]>([])
const currentSlide = ref(0)
const isDesignLoading = ref(true)
const designError = ref('')

// Section 2: Lý thuyết chuyên ngành - Grid
const theoryPosts = ref<Post[]>([])
const isTheoryLoading = ref(true)
const theoryError = ref('')

// Section 3: Thực tập
const internshipPosts = ref<Post[]>([])
const isInternshipLoading = ref(true)
const internshipError = ref('')

// Section 4: Thực địa
const fieldworkPosts = ref<Post[]>([])
const isFieldworkLoading = ref(true)
const fieldworkError = ref('')

// Load Section 1: Thiết kế kiến trúc
const loadDesignPosts = async () => {
  isDesignLoading.value = true
  designError.value = ''
  try {
    designPosts.value = await fetchPostsByCategory('thiet-ke-kien-truc', 1, 10)
  } catch (error) {
    designError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải bài viết.'
    designPosts.value = []
  } finally {
    isDesignLoading.value = false
  }
}

// Load Section 2: Lý thuyết chuyên ngành
const loadTheoryPosts = async () => {
  isTheoryLoading.value = true
  theoryError.value = ''
  try {
    theoryPosts.value = await fetchPostsByCategory('ly-thuyet-chuyen-nganh', 1, 20, 'published')
  } catch (error) {
    theoryError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải bài viết.'
    theoryPosts.value = []
  } finally {
    isTheoryLoading.value = false
  }
}

// Load Section 3: Thực tập
const loadInternshipPosts = async () => {
  isInternshipLoading.value = true
  internshipError.value = ''
  try {
    internshipPosts.value = await fetchAllPostsByCategory('thuc-tap', 'published')
  } catch (error) {
    internshipError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải bài viết.'
    internshipPosts.value = []
  } finally {
    isInternshipLoading.value = false
  }
}

// Load Section 4: Thực địa
const loadFieldworkPosts = async () => {
  isFieldworkLoading.value = true
  fieldworkError.value = ''
  try {
    fieldworkPosts.value = await fetchAllPostsByCategory('thuc-dia')
  } catch (error) {
    fieldworkError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải bài viết.'
    fieldworkPosts.value = []
  } finally {
    isFieldworkLoading.value = false
  }
}

// Carousel functions
const nextSlide = () => {
  if (designPosts.value.length > 0) {
    currentSlide.value = (currentSlide.value + 1) % designPosts.value.length
  }
}

const prevSlide = () => {
  if (designPosts.value.length > 0) {
    currentSlide.value = currentSlide.value === 0 ? designPosts.value.length - 1 : currentSlide.value - 1
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

// Get post link
const getPostLink = (post: Post) => {
  if (post.slug) return `/posts/${post.slug}`
  if (post.id) return `/posts/${post.id}`
  return '#'
}

onMounted(() => {
  loadDesignPosts()
  loadTheoryPosts()
  loadInternshipPosts()
  loadFieldworkPosts()
})
</script>

<template>
  <MasterLayout>
    <div class="min-h-screen bg-gray-50">
      <!-- Section 1: Đào tạo ngành Kiến trúc - Thiết kế kiến trúc (Carousel) -->
      <section class="bg-white pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 lg:mb-10 uppercase tracking-tight text-left text-gray-900">
            ĐÀO TẠO NGÀNH KIẾN TRÚC
          </h1>
          <p class="text-base sm:text-lg lg:text-xl text-gray-700 mb-10 sm:mb-12 lg:mb-16 text-left font-bold">
            Hệ thống môn học đồ án kiến trúc
          </p>

          <!-- Carousel -->
          <div v-if="isDesignLoading" class="text-center py-20">
            <p class="text-gray-500">Đang tải...</p>
          </div>
          <div v-else-if="designError" class="text-center py-20">
            <p class="text-red-500">{{ designError }}</p>
          </div>
          <div v-else-if="designPosts.length === 0" class="text-center py-20">
            <p class="text-gray-500">Chưa có bài viết nào.</p>
          </div>
          <div v-else class="relative">
            <!-- Carousel Container -->
            <div class="relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg" style="min-height: 400px;">
              <div
                class="flex transition-transform duration-500 ease-in-out"
                :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
              >
                <div
                  v-for="(post, index) in designPosts"
                  :key="index"
                  class="min-w-full flex-shrink-0"
                >
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    <div class="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
                      <img
                        :src="getPostImage(post)"
                        :alt="post.title || 'Bài viết'"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="flex flex-col justify-center p-4 sm:p-6 lg:p-8">
                      <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">
                        {{ post.title || 'Bài viết' }}
                      </h3>
                      <p class="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 line-clamp-3">
                        {{ getPostExcerpt(post, 150) }}
                      </p>
                      <RouterLink
                        :to="getPostLink(post)"
                        class="inline-flex items-center text-sm sm:text-base font-semibold"
                        style="color: #1e3a8a;"
                      >
                        Xem chi tiết →
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Dots -->
            <div class="flex justify-center items-center gap-2 sm:gap-3 mt-6 sm:mt-8">
              <button
                v-for="(post, index) in designPosts"
                :key="index"
                @click="goToSlide(index)"
                class="w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300"
                :class="currentSlide === index ? 'bg-yellow-400 scale-125' : 'bg-gray-400'"
                :aria-label="`Chuyển đến slide ${index + 1}`"
              ></button>
            </div>

            <!-- Navigation Arrow -->
            <button
              @click="nextSlide"
              class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-all duration-300 shadow-lg z-10"
              aria-label="Slide tiếp theo"
            >
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Description Text -->
          <div class="mt-8 sm:mt-12 lg:mt-16">
            <p class="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
              Hệ thống đồ án kiến trúc đóng vai trò như sự kết nối, hiện thực hoá những kiến thức, nguyên lý học thuật đó với thực tế muôn màu ngoài cuộc sống. Đó cũng chính là sự khác biệt thú vị giữa học kiến trúc và học những ngành khác thuộc lĩnh vực xây dựng.
            </p>
            <ul class="space-y-2 sm:space-y-3">
              <li class="flex items-start">
                <span class="text-lg sm:text-xl mr-2" style="color: #3b82f6;">•</span>
                <span class="text-sm sm:text-base lg:text-lg" style="color: #3b82f6;">Công trình kiến trúc nhỏ</span>
              </li>
              <li class="flex items-start">
                <span class="text-lg sm:text-xl mr-2" style="color: #3b82f6;">•</span>
                <span class="text-sm sm:text-base lg:text-lg" style="color: #3b82f6;">Công trình kiến trúc nhà ở</span>
              </li>
              <li class="flex items-start">
                <span class="text-lg sm:text-xl mr-2" style="color: #3b82f6;">•</span>
                <span class="text-sm sm:text-base lg:text-lg" style="color: #3b82f6;">Công trình kiến trúc văn hoá</span>
              </li>
            </ul>
          </div>
      </div>
    </section>

      <!-- Section 2: Lý thuyết chuyên ngành - Grid 3x3 -->
      <section class="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-12 sm:mb-16 lg:mb-20 text-gray-900">
            Hệ thống môn học lý thuyết chuyên ngành
          </h2>

          <div v-if="isTheoryLoading" class="text-center py-20">
            <p class="text-gray-500">Đang tải...</p>
          </div>
          <div v-else-if="theoryError" class="text-center py-20">
            <p class="text-red-500">{{ theoryError }}</p>
          </div>
          <div v-else-if="theoryPosts.length === 0" class="text-center py-20">
            <p class="text-gray-500">Chưa có bài viết nào.</p>
          </div>
          <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            <!-- Image Grid (Left) -->
            <div class="grid grid-cols-3 gap-3 sm:gap-4">
              <div
                v-for="(post, index) in theoryPosts.slice(0, 9)"
                :key="index"
                class="aspect-square rounded-lg overflow-hidden bg-gray-200 relative group"
              >
                <img
                  v-if="getPostImage(post)"
                  :src="getPostImage(post)"
                  :alt="post.title || 'Bài viết'"
                  class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <div v-else class="w-full h-full flex items-center justify-center bg-gray-300">
                  <span class="text-xs text-gray-500 uppercase">Hình ảnh</span>
                </div>
              </div>
            </div>

            <!-- Content (Right) -->
            <div class="flex flex-col justify-center">
              <p class="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                Lý thuyết cơ bản, phương pháp thể hiện kiến trúc, Về ghi kiến trúc, Cơ sở tạo hình, Cơ sở kiến trúc và Nghệ thuật chữ. Đào tạo, nghiên cứu khoa học, chuyển giao công nghệ và hợp tác trong các lĩnh vực chuyên môn.
              </p>
            </div>
          </div>
      </div>
    </section>

      <!-- Section 3: Thực tập -->
      <section class="bg-white py-16 sm:py-20 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-black mb-12 sm:mb-16 lg:mb-20 uppercase tracking-tight" style="color: #1e3a8a;">
            THỰC TẬP
          </h2>

          <div v-if="isInternshipLoading" class="text-center py-20">
            <p class="text-gray-500">Đang tải...</p>
          </div>
          <div v-else-if="internshipError" class="text-center py-20">
            <p class="text-red-500">{{ internshipError }}</p>
          </div>
          <div v-else-if="internshipPosts.length === 0" class="text-center py-20">
            <p class="text-gray-500">Chưa có bài viết nào.</p>
          </div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <RouterLink
              v-for="(post, index) in internshipPosts"
              :key="index"
              :to="getPostLink(post)"
              class="group bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div class="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                <img
                  :src="getPostImage(post)"
                  :alt="post.title || 'Bài viết'"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div class="p-4 sm:p-6">
                <h3 class="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {{ post.title || 'Bài viết' }}
                </h3>
                <p class="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                  {{ getPostExcerpt(post, 100) }}
                </p>
                <p class="text-xs sm:text-sm text-gray-400">{{ getPostDate(post) }}</p>
        </div>
            </RouterLink>
        </div>
      </div>
    </section>

      <!-- Section 4: Thực địa -->
      <section class="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-black mb-12 sm:mb-16 lg:mb-20 uppercase tracking-tight" style="color: #1e3a8a;">
            THỰC ĐỊA
          </h2>

          <div v-if="isFieldworkLoading" class="text-center py-20">
            <p class="text-gray-500">Đang tải...</p>
          </div>
          <div v-else-if="fieldworkError" class="text-center py-20">
            <p class="text-red-500">{{ fieldworkError }}</p>
          </div>
          <div v-else-if="fieldworkPosts.length === 0" class="text-center py-20">
            <p class="text-gray-500">Chưa có bài viết nào.</p>
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            <RouterLink
              v-for="(post, index) in fieldworkPosts"
              :key="index"
              :to="getPostLink(post)"
              class="group flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div class="relative w-full sm:w-64 lg:w-80 h-48 sm:h-64 flex-shrink-0 overflow-hidden">
                <img
                  :src="getPostImage(post)"
                  :alt="post.title || 'Bài viết'"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
        </div>
              <div class="flex-1 p-4 sm:p-6 flex flex-col justify-center">
                <h3 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {{ post.title || 'Bài viết' }}
                </h3>
                <p class="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                  {{ getPostExcerpt(post, 120) }}
                </p>
                <p class="text-xs sm:text-sm text-gray-400">{{ getPostDate(post) }}</p>
      </div>
            </RouterLink>
      </div>
        </div>
      </section>
      </div>
  </MasterLayout>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
