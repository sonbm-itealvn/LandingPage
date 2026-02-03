<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import MasterLayout from '../components/MasterLayout.vue'
import {
  fetchPostsByGroup,
  getPostCategory,
  getPostDate,
  getPostExcerpt,
  getPostImage,
  type Post,
} from '../services/postsService'

const route = useRoute()

const allActivityPosts = ref<Post[]>([])
const isLoading = ref(true)
const error = ref('')

const categorySlug = computed(() => String(route.params.categorySlug || ''))

// Helper giống ActivitiesView: lấy tên danh mục từ dữ liệu postCategories
const getPostCategoryFromData = (post: Post) => {
  if ((post as any).postCategories && Array.isArray((post as any).postCategories) && (post as any).postCategories.length > 0) {
    const primaryCategory =
      (post as any).postCategories.find((pc: any) => pc.is_primary) ||
      (post as any).postCategories[0]

    if (primaryCategory?.category?.name) {
      return primaryCategory.category.name
    }
  }
  return getPostCategory(post)
}

const getPostCategorySlugFromData = (post: Post) => {
  if ((post as any).postCategories && Array.isArray((post as any).postCategories) && (post as any).postCategories.length > 0) {
    const primaryCategory =
      (post as any).postCategories.find((pc: any) => pc.is_primary) ||
      (post as any).postCategories[0]

    if (primaryCategory?.category?.slug) {
      return primaryCategory.category.slug
    }
  }
  return null
}

const loadAllActivityPosts = async () => {
  isLoading.value = true
  error.value = ''
  try {
    allActivityPosts.value = await fetchPostsByGroup('hoat-dong-su-kien', 'published')
  } catch (err) {
    error.value =
      err instanceof Error
        ? err.message
        : 'Đã xảy ra lỗi khi tải hoạt động khoa.'
    allActivityPosts.value = []
  } finally {
    isLoading.value = false
  }
}

const postsInCategory = computed(() =>
  allActivityPosts.value.filter(
    (post) => getPostCategorySlugFromData(post) === categorySlug.value,
  ),
)

const categoryName = computed(() => {
  const anyPost = postsInCategory.value[0]
  if (!anyPost) return 'Hoạt động khoa'
  return getPostCategoryFromData(anyPost) || 'Hoạt động khoa'
})

const getPostLink = (post: Post) =>
  post.link || (post.id ? `/posts/${post.id}` : post.slug ? `/posts/${post.slug}` : '#')

onMounted(() => {
  loadAllActivityPosts()
})
</script>

<template>
  <MasterLayout>
    <section class="content-hero">
      <div class="content-hero__header">
        <h1 class="content-hero__title">
          {{ categoryName }}
        </h1>
      </div>
    </section>

    <section class="updates-section">
      <div v-if="error" class="section-one__state section-one__state--error">
        {{ error }}
      </div>
      <div v-else-if="isLoading" class="section-one__state">
        Đang tải bài viết...
      </div>
      <div v-else-if="!postsInCategory.length" class="section-one__state">
        Chưa có bài viết trong danh mục này.
      </div>
      <div v-else class="activity-grid">
        <article
          v-for="post in postsInCategory"
          :key="post.id ?? post.slug ?? post.title"
          class="activity-card"
        >
          <RouterLink :to="getPostLink(post)" class="activity-card__link">
            <div class="activity-card__thumb">
              <img
                :src="getPostImage(post)"
                :alt="post.title || categoryName"
                loading="lazy"
              />
            </div>
            <div class="activity-card__body">
              <p class="activity-card__meta">
                {{ getPostCategoryFromData(post) }}
                <span v-if="getPostDate(post)"> · {{ getPostDate(post) }}</span>
              </p>
              <h3 class="activity-card__title clamp-2">
                {{ post.title || categoryName }}
              </h3>
              <p v-if="getPostExcerpt(post, 120)" class="activity-card__excerpt">
                {{ getPostExcerpt(post, 120) }}
              </p>
            </div>
          </RouterLink>
        </article>
      </div>
    </section>
  </MasterLayout>
</template>


