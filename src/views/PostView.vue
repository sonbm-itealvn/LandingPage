<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MasterLayout from '../components/MasterLayout.vue'
import { fetchPostById, getPostDate, type Post } from '../services/postsService'

const route = useRoute()
const post = ref<Post | null>(null)
const isLoading = ref(true)
const errorMsg = ref('')

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

onMounted(() => {
  if (route.params.id) {
    loadPost(route.params.id as string)
  }
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
      <div class="post-hero__eyebrow">
        <span>Bài viết</span>
      </div>
      <h1 class="post-detail__title">{{ post?.title || 'Đang tải bài viết' }}</h1>
      <p class="post-hero__lede">{{ post?.excerpt || post?.short_description || '' }}</p>
      <div class="post-hero__meta" v-if="post">
        <span class="post-pill">Đăng ngày {{ getPostDate(post) || '---' }}</span>
      </div>
    </section>

    <section class="content-section">
      <div v-if="errorMsg" class="section-one__state section-one__state--error">
        {{ errorMsg }}
      </div>
      <div v-else-if="isLoading" class="section-one__state">Đang tải bài viết...</div>
      <div v-else-if="!post" class="section-one__state">Không tìm thấy bài viết.</div>
      <article v-else class="post-detail">
        <div class="post-detail__body" v-html="renderBody(post.content || post.description || post.summary)"></div>
      </article>
    </section>
  </MasterLayout>
</template>

