<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import MasterLayout from '../components/MasterLayout.vue'
import { fetchPostById, getPostDate, getPostAuthor, getPostAvatar, type Post, fetchSpecialPostsLatest } from '../services/postsService'

const route = useRoute()
const post = ref<Post | null>(null)
const isLoading = ref(true)
const errorMsg = ref('')

const collaborationPosts = ref<Post[]>([])
const isCollaborationLoading = ref(true)
const collaborationError = ref('')

const announcementPosts = ref<Post[]>([])
const isAnnouncementsLoading = ref(true)
const announcementsError = ref('')

const loadPost = async (id: string | number) => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    post.value = await fetchPostById(id)
  } catch (error) {
    errorMsg.value = error instanceof Error ? error.message : 'Không thể tải bài viết.'
    post.value = null
  } finally {
    isLoading.value = false
  }
}

const loadCollaborationPosts = async () => {
  isCollaborationLoading.value = true
  collaborationError.value = ''
  try {
    collaborationPosts.value = await fetchSpecialPostsLatest('hop-tac', 10)
  } catch (error) {
    collaborationError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải hợp tác kết nối.'
    collaborationPosts.value = []
  } finally {
    isCollaborationLoading.value = false
  }
}

const loadAnnouncements = async () => {
  isAnnouncementsLoading.value = true
  announcementsError.value = ''
  try {
    announcementPosts.value = await fetchSpecialPostsLatest('thong-bao', 5)
  } catch (error) {
    announcementsError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải thông báo.'
    announcementPosts.value = []
  } finally {
    isAnnouncementsLoading.value = false
  }
}

const getPostLink = (post: Post) => post.link || (post.id ? `/posts/${post.id}` : post.slug ? `/posts/${post.slug}` : '#')

onMounted(() => {
  if (route.params.id) {
    loadPost(route.params.id as string)
  }
  loadCollaborationPosts()
  loadAnnouncements()
})

watch(
  () => route.params.id,
  (id) => {
    if (id) loadPost(id as string)
  },
)

const renderBody = (value?: string) => value ?? ''
</script>

<template>
  <MasterLayout>
    <section class="post-hero">
      <div class="post-hero__container">
        <div class="post-hero__badge">
          <span>Bài viết</span>
        </div>
        <h1 class="post-detail__title">{{ post?.title || 'Đang tải bài viết' }}</h1>
        <p class="post-hero__lede" v-if="post?.excerpt || post?.short_description">
          {{ post?.excerpt || post?.short_description }}
        </p>
        <div class="post-hero__meta" v-if="post">
          <div class="post-hero__author" v-if="getPostAvatar(post)">
            <div class="post-hero__avatar">
              <img :src="getPostAvatar(post)" :alt="getPostAuthor(post)" />
            </div>
            <div class="post-hero__author-info">
              <div class="post-hero__author-name">{{ getPostAuthor(post) }}</div>
              <div class="post-hero__date">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6667 2.66667H12V2C12 1.63181 11.7015 1.33333 11.3333 1.33333C10.9651 1.33333 10.6667 1.63181 10.6667 2V2.66667H5.33333V2C5.33333 1.63181 5.03486 1.33333 4.66667 1.33333C4.29848 1.33333 4 1.63181 4 2V2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667ZM12.6667 13.3333H3.33333V6.66667H12.6667V13.3333Z" fill="currentColor"/>
                </svg>
                <span>{{ getPostDate(post) || '---' }}</span>
              </div>
            </div>
          </div>
          <div class="post-hero__date" v-else>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.6667 2.66667H12V2C12 1.63181 11.7015 1.33333 11.3333 1.33333C10.9651 1.33333 10.6667 1.63181 10.6667 2V2.66667H5.33333V2C5.33333 1.63181 5.03486 1.33333 4.66667 1.33333C4.29848 1.33333 4 1.63181 4 2V2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667ZM12.6667 13.3333H3.33333V6.66667H12.6667V13.3333Z" fill="currentColor"/>
            </svg>
            <span>Đăng ngày {{ getPostDate(post) || '---' }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="post-detail-wrapper">
        <div class="post-detail-main">
          <div v-if="errorMsg" class="section-one__state section-one__state--error">
            {{ errorMsg }}
          </div>
          <div v-else-if="isLoading" class="section-one__state">Đang tải bài viết...</div>
          <div v-else-if="!post" class="section-one__state">Không tìm thấy bài viết.</div>
          <article v-else class="post-detail">
            <div class="post-detail__body" v-html="renderBody(post.content || post.description || post.summary)"></div>
          </article>
        </div>
        <aside class="post-detail-sidebar">
          <div class="widget">
            <p class="widget-title">Hợp tác kết nối</p>
            <div v-if="collaborationError" class="section-one__state section-one__state--error">
              {{ collaborationError }}
            </div>
            <div v-else-if="isCollaborationLoading" class="section-one__state">Đang tải...</div>
            <div v-else-if="!collaborationPosts.length" class="section-one__state">Chưa có dữ liệu.</div>
            <ul v-else class="collaboration-list">
              <li v-for="item in collaborationPosts" :key="item.id ?? item.slug ?? item.title">
                <RouterLink :to="getPostLink(item)" class="collaboration-item">
                  <img 
                    v-if="item.thumbnail_url" 
                    :src="item.thumbnail_url" 
                    :alt="item.title || 'Hợp tác kết nối'" 
                    class="collaboration-item__thumb"
                    loading="lazy"
                  />
                  <h4 class="collaboration-item__title">{{ item.title || 'Hợp tác kết nối' }}</h4>
                </RouterLink>
              </li>
            </ul>
          </div>
          <div class="widget">
            <p class="widget-title">Thông báo khoa</p>
            <div v-if="announcementsError" class="section-one__state section-one__state--error">
              {{ announcementsError }}
            </div>
            <div v-else-if="isAnnouncementsLoading" class="section-one__state">Đang tải thông báo...</div>
            <div v-else-if="!announcementPosts.length" class="section-one__state">Chưa có thông báo.</div>
            <ul v-else>
              <li v-for="item in announcementPosts" :key="item.id ?? item.slug ?? item.title">
                <RouterLink :to="getPostLink(item)" class="announcement-item">
                  <h4>{{ item.title || 'Thông báo mới' }}</h4>
                </RouterLink>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  </MasterLayout>
</template>

