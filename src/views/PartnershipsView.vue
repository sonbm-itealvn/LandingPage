<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import MasterLayout from '../components/MasterLayout.vue'
import {
  fetchSpecialPostsLatest,
  fetchPostsByCategory,
  getPostCategory,
  getPostExcerpt,
  getPostDate,
  getPostImage,
  type Post,
} from '../services/postsService'

const collaborationPosts = ref<Post[]>([])
const isCollaborationLoading = ref(true)
const collaborationError = ref('')

const productPosts = ref<Post[]>([])
const isProductLoading = ref(true)
const productError = ref('')

const loadCollaborationPosts = async () => {
  isCollaborationLoading.value = true
  collaborationError.value = ''
  try {
    collaborationPosts.value = await fetchSpecialPostsLatest('hop-tac', 12)
  } catch (error) {
    collaborationError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải hợp tác kết nối.'
    collaborationPosts.value = []
  } finally {
    isCollaborationLoading.value = false
  }
}

const loadProductPosts = async () => {
  isProductLoading.value = true
  productError.value = ''
  try {
    productPosts.value = await fetchPostsByCategory('san-pham', 1, 12)
  } catch (error) {
    productError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải sản phẩm.'
    productPosts.value = []
  } finally {
    isProductLoading.value = false
  }
}

const getPostLink = (post: Post) => post.link || (post.id ? `/posts/${post.id}` : post.slug ? `/posts/${post.slug}` : '#')

onMounted(() => {
  loadCollaborationPosts()
  loadProductPosts()
})
</script>

<template>
  <MasterLayout>
    <!-- Hero Section -->
    <section class="partnerships-hero">
      <div class="partnerships-hero__container">
        <div class="partnerships-hero__badge">
          <span>Hợp tác - Kết nối</span>
        </div>
        <h1 class="partnerships-hero__title">Kết nối doanh nghiệp, viện nghiên cứu và cộng đồng</h1>
        <p class="partnerships-hero__lede">
          Chúng tôi mở rộng hợp tác cho studio, tài trợ lab, học bổng và dự án nghiên cứu ứng dụng. Cùng xây dựng thế hệ
          kiến trúc sư sẵn sàng cho các thách thức mới.
        </p>
        <div class="partnerships-hero__tags">
          <span class="partnerships-hero__tag">Studio liên kết</span>
          <span class="partnerships-hero__tag">Học bổng</span>
          <span class="partnerships-hero__tag">R&D</span>
        </div>
      </div>
    </section>

    <!-- Hợp tác kết nối Section -->
    <section class="partnerships-section">
      <div class="partnerships-section__header">
        <div>
          <p class="partnerships-section__tag">Hợp tác kết nối</p>
          <h2 class="partnerships-section__title">Đối tác và chương trình hợp tác</h2>
        </div>
      </div>

      <div v-if="collaborationError" class="partnerships-section__state partnerships-section__state--error">
        {{ collaborationError }}
      </div>
      <div v-else-if="isCollaborationLoading" class="partnerships-section__state">Đang tải...</div>
      <div v-else-if="!collaborationPosts.length" class="partnerships-section__state">Chưa có bài viết.</div>
      <div v-else class="partnerships-grid">
        <article
          v-for="post in collaborationPosts"
          :key="post.id ?? post.slug ?? post.title"
          class="partnership-card"
        >
          <RouterLink :to="getPostLink(post)" class="partnership-card__link">
            <div class="partnership-card__thumb">
              <img :src="getPostImage(post)" :alt="post.title || 'Hợp tác kết nối'" loading="lazy" />
              <div class="partnership-card__overlay">
                <span class="partnership-card__category">{{ getPostCategory(post) }}</span>
              </div>
            </div>
            <div class="partnership-card__body">
              <div class="partnership-card__meta">
                <span class="partnership-card__date" v-if="getPostDate(post)">
                  {{ getPostDate(post) }}
                </span>
              </div>
              <h3 class="partnership-card__title">{{ post.title || 'Hợp tác kết nối' }}</h3>
              <p class="partnership-card__excerpt" v-if="getPostExcerpt(post, 120)">
                {{ getPostExcerpt(post, 120) }}
              </p>
            </div>
          </RouterLink>
        </article>
      </div>
    </section>

    <!-- Sản phẩm Section -->
    <section class="partnerships-section partnerships-section--products">
      <div class="partnerships-section__header">
        <div>
          <p class="partnerships-section__tag">Sản phẩm</p>
          <h2 class="partnerships-section__title">Sản phẩm và giải pháp</h2>
        </div>
      </div>

      <div v-if="productError" class="partnerships-section__state partnerships-section__state--error">
        {{ productError }}
      </div>
      <div v-else-if="isProductLoading" class="partnerships-section__state">Đang tải...</div>
      <div v-else-if="!productPosts.length" class="partnerships-section__state">Chưa có sản phẩm.</div>
      <div v-else class="partnerships-grid partnerships-grid--products">
        <article
          v-for="post in productPosts"
          :key="post.id ?? post.slug ?? post.title"
          class="partnership-card partnership-card--product"
        >
          <RouterLink :to="getPostLink(post)" class="partnership-card__link">
            <div class="partnership-card__thumb">
              <img :src="getPostImage(post)" :alt="post.title || 'Sản phẩm'" loading="lazy" />
              <div class="partnership-card__overlay">
                <span class="partnership-card__category">Sản phẩm</span>
              </div>
            </div>
            <div class="partnership-card__body">
              <div class="partnership-card__meta">
                <span class="partnership-card__date" v-if="getPostDate(post)">
                  {{ getPostDate(post) }}
                </span>
              </div>
              <h3 class="partnership-card__title">{{ post.title || 'Sản phẩm' }}</h3>
              <p class="partnership-card__excerpt" v-if="getPostExcerpt(post, 120)">
                {{ getPostExcerpt(post, 120) }}
              </p>
            </div>
          </RouterLink>
        </article>
      </div>
    </section>
  </MasterLayout>
</template>
