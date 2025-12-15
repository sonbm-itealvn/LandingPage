<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import MasterLayout from '../components/MasterLayout.vue'
import {
  fetchAllPosts,
  getPostCategory,
  getPostDate,
  getPostExcerpt,
  getPostImage,
  getPostShortDescription,
  type Post,
} from '../services/postsService'

const posts = ref<Post[]>([])
const isLoading = ref(true)
const error = ref('')

const loadPosts = async () => {
  isLoading.value = true
  error.value = ''
  try {
    posts.value = await fetchAllPosts()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải danh sách bài viết.'
    posts.value = []
  } finally {
    isLoading.value = false
  }
}

const getPostLink = (post: Post) => post.link || (post.id ? `/posts/${post.id}` : post.slug ? `/posts/${post.slug}` : '#')
const getDescription = (post: Post) => getPostShortDescription(post, 180) || getPostExcerpt(post, 180)

onMounted(() => {
  loadPosts()
})
</script>

<template>
  <MasterLayout>
    <section class="content-hero news-hero">
      <p class="content-hero__eyebrow">Tin tức</p>
      <h1>Toàn bộ tin tức của khoa</h1>
      <p class="content-hero__lede">
        Danh sách đầy đủ các bài viết, sự kiện, workshop, học bổng và hoạt động nội bộ. Nội dung được cập nhật trực tiếp
        từ API.
      </p>
      <div class="content-hero__tags">
        <span class="pill">Tin mới</span>
        <span class="pill">Hoạt động</span>
        <span class="pill">Workshop</span>
      </div>
    </section>

    <section class="news-listing">
      <div class="news-listing__header">
        <div>
          <p class="section-tag">Bản tin</p>
          <h2>Tất cả bài viết</h2>
        </div>
      </div>

      <div v-if="error" class="section-one__state section-one__state--error">
        {{ error }}
      </div>
      <div v-else-if="isLoading" class="section-one__state">Đang tải tin tức...</div>
      <div v-else-if="!posts.length" class="section-one__state">Chưa có bài viết nào.</div>
      <div v-else class="news-listing__grid">
        <article
          v-for="post in posts"
          :key="post.id ?? post.slug ?? post.title"
          class="news-item"
        >
          <RouterLink :to="getPostLink(post)" class="news-item__thumb">
            <img :src="getPostImage(post)" :alt="post.title || getPostCategory(post)" loading="lazy" />
          </RouterLink>
          <div class="news-item__body">
            <p class="news-item__meta">
              {{ getPostCategory(post) }}<span v-if="getPostDate(post)"> · {{ getPostDate(post) }}</span>
            </p>
            <RouterLink :to="getPostLink(post)" class="news-item__title">
              <h3 class="clamp-2">{{ post.title || 'Bài viết' }}</h3>
            </RouterLink>
            <p class="news-item__excerpt">{{ getDescription(post) }}</p>
            <RouterLink :to="getPostLink(post)" class="news-item__cta">Xem chi tiết →</RouterLink>
          </div>
        </article>
      </div>
    </section>
  </MasterLayout>
</template>

