<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import MasterLayout from "../components/MasterLayout.vue";
import {
  fetchAllPosts,
  getPostCategory,
  getPostDate,
  getPostExcerpt,
  getPostImage,
  getPostShortDescription,
  fetchSpecialPostsAll,
  type Post,
} from "../services/postsService";

const posts = ref<Post[]>([]);
const isLoading = ref(true);
const error = ref("");

const announcements = ref<Post[]>([]);
const isAnnouncementsLoading = ref(true);
const announcementsError = ref("");

const loadPosts = async () => {
  isLoading.value = true;
  error.value = "";
  try {
    posts.value = await fetchAllPosts();
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải danh sách bài viết.";
    posts.value = [];
  } finally {
    isLoading.value = false;
  }
};

const loadAnnouncements = async () => {
  isAnnouncementsLoading.value = true;
  announcementsError.value = "";
  try {
    announcements.value = await fetchSpecialPostsAll("thong-bao", 1, 20, "published");
  } catch (err) {
    announcementsError.value =
      err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải thông báo.";
    announcements.value = [];
  } finally {
    isAnnouncementsLoading.value = false;
  }
};

const getPostLink = (post: Post) =>
  post.link || (post.id ? `/posts/${post.id}` : post.slug ? `/posts/${post.slug}` : "#");
const getDescription = (post: Post) =>
  getPostShortDescription(post, 180) || getPostExcerpt(post, 180);

const formatAnnouncementDate = (post: Post) => {
  const dateStr = (post as any).created_at || post.date || post.publishedAt || post.createdAt
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    }).format(date)
  } catch {
    return getPostDate(post) || ''
  }
}

onMounted(() => {
  loadPosts();
  loadAnnouncements();
});
</script>

<template>
  <MasterLayout>
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
          <RouterLink :to="getPostLink(post)">
            <span class="announcement-title">{{ post.title || "Thông báo" }}</span>
            <span v-if="formatAnnouncementDate(post)" class="announcement-date">{{ formatAnnouncementDate(post) }}</span>
          </RouterLink>
        </li>
      </ul>
    </section>
  </MasterLayout>
</template>
