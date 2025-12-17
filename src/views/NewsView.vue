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
  fetchSpecialPostsAll,
  type Post,
} from '../services/postsService'

const posts = ref<Post[]>([])
const isLoading = ref(true)
const error = ref('')

const announcements = ref<Post[]>([])
const isAnnouncementsLoading = ref(true)
const announcementsError = ref('')

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

const loadAnnouncements = async () => {
  isAnnouncementsLoading.value = true
  announcementsError.value = ''
  try {
    announcements.value = await fetchSpecialPostsAll('thong-bao', 1, 20, 'published')
  } catch (err) {
    announcementsError.value = err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải thông báo.'
    announcements.value = []
  } finally {
    isAnnouncementsLoading.value = false
  }
}

const getPostLink = (post: Post) => post.link || (post.id ? `/posts/${post.id}` : post.slug ? `/posts/${post.slug}` : '#')
const getDescription = (post: Post) => getPostShortDescription(post, 180) || getPostExcerpt(post, 180)

onMounted(() => {
  loadPosts()
  loadAnnouncements()
})
</script>

<template>
  <MasterLayout>
    <section class="content-hero news-hero">
      <div class="news-hero__card">
        <p class="content-hero__eyebrow">TIN TỨC</p>
        <h1 class="content-hero__title">Cập nhật những thông tin mới nhất từ Khoa Kiến Trúc</h1>
        <p class="content-hero__lede">Nơi bạn có thể tìm thấy các bài viết, thông báo và sự kiện liên quan đến Khoa Kiến Trúc HAU.</p>
        <div class="content-hero__tags">
          <span class="pill">Tin mới</span>
          <span class="pill">Hoạt động</span>
          <span class="pill">Workshop</span>
        </div>
      </div>
    </section>

    <section class="news-listing">
      <div class="news-listing__header">
        <div>
          <p class="section-tag">Thông báo</p>
        </div>
      </div>

      <div v-if="announcementsError" class="section-one__state section-one__state--error">
        {{ announcementsError }}
      </div>
      <div v-else-if="isAnnouncementsLoading" class="section-one__state">Đang tải thông báo...</div>
      <div v-else-if="!announcements.length" class="section-one__state">Chưa có thông báo nào.</div>
      <ul v-else class="announcements-list">
        <li v-for="post in announcements" :key="post.id ?? post.slug ?? post.title">
          <RouterLink :to="getPostLink(post)">{{ post.title || 'Thông báo' }}</RouterLink>
        </li>
      </ul>
    </section>

    <section class="news-listing">
      <div class="news-listing__header">
        <div>
          <p class="section-tag">Bản tin</p>
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
          class="news-item-simple"
        >
          <RouterLink :to="getPostLink(post)" class="news-item-simple__thumb">
            <img :src="getPostImage(post)" :alt="post.title || getPostCategory(post)" loading="lazy" />
          </RouterLink>
          <div class="news-item-simple__body">
            <p class="news-item-simple__label">BÀI MỚI</p>
            <RouterLink :to="getPostLink(post)" class="news-item-simple__title">
              <h3>{{ post.title || 'Bài viết' }}</h3>
            </RouterLink>
            <RouterLink :to="getPostLink(post)" class="news-item-simple__cta">Đọc bài →</RouterLink>
          </div>
        </article>
      </div>
    </section>
  </MasterLayout>
</template>

