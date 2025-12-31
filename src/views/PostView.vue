<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import MasterLayout from '../components/MasterLayout.vue'
import { fetchPostById, getPostDate, getPostAuthor, getPostAvatar, getPostImage, getPostCategory, type Post, fetchSpecialPostsLatest, fetchLatestPosts, fetchAllPosts, fetchSpecialPostsRandom } from '../services/postsService'

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

const relatedPosts = ref<Post[]>([])
const isRelatedLoading = ref(true)
const relatedError = ref('')

const prevPost = ref<Post | null>(null)
const nextPost = ref<Post | null>(null)
const isNavLoading = ref(true)

const sidebarRelatedPosts = ref<Post[]>([])
const isSidebarRelatedLoading = ref(true)
const sidebarRelatedError = ref('')

const loadPost = async (id: string | number) => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    post.value = await fetchPostById(id)
    // Load related posts and navigation after post is loaded
    if (post.value) {
      loadRelatedPosts()
      loadPrevNextPosts()
      loadSidebarRelatedPosts()
    }
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

const loadRelatedPosts = async () => {
  isRelatedLoading.value = true
  relatedError.value = ''
  try {
    // Fetch random posts from hoat-dong-su-kien category
    const randomPosts = await fetchSpecialPostsRandom('hoat-dong-su-kien', 4)
    // Filter out current post if it exists in the results
    const currentPostId = post.value?.id
    const currentPostSlug = post.value?.slug
    relatedPosts.value = randomPosts
      .filter((p) => p.id !== currentPostId && p.slug !== currentPostSlug)
      .slice(0, 4) // Take 4 posts for horizontal layout
  } catch (error) {
    relatedError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải bài viết liên quan.'
    relatedPosts.value = []
  } finally {
    isRelatedLoading.value = false
  }
}

const loadPrevNextPosts = async () => {
  isNavLoading.value = true
  try {
    const allPosts = await fetchAllPosts()
    const currentPostId = post.value?.id
    const currentPostSlug = post.value?.slug
    
    // Find current post index
    const currentIndex = allPosts.findIndex(
      (p) => p.id === currentPostId || p.slug === currentPostSlug
    )
    
    if (currentIndex !== -1) {
      prevPost.value = currentIndex > 0 ? (allPosts[currentIndex - 1] ?? null) : null
      nextPost.value = currentIndex < allPosts.length - 1 ? (allPosts[currentIndex + 1] ?? null) : null
    } else {
      prevPost.value = null
      nextPost.value = null
    }
  } catch (error) {
    prevPost.value = null
    nextPost.value = null
  } finally {
    isNavLoading.value = false
  }
}

const loadSidebarRelatedPosts = async () => {
  isSidebarRelatedLoading.value = true
  sidebarRelatedError.value = ''
  try {
    // Fetch random posts from hoat-dong-su-kien category
    const randomPosts = await fetchSpecialPostsRandom('hoat-dong-su-kien', 5)
    // Filter out current post if it exists in the results
    const currentPostId = post.value?.id
    const currentPostSlug = post.value?.slug
    sidebarRelatedPosts.value = randomPosts
      .filter((p) => p.id !== currentPostId && p.slug !== currentPostSlug)
      .slice(0, 5) // Take 5 posts for sidebar
  } catch (error) {
    sidebarRelatedError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải bài viết liên quan.'
    sidebarRelatedPosts.value = []
  } finally {
    isSidebarRelatedLoading.value = false
  }
}

const getPostLink = (post: Post) => post.link || (post.id ? `/posts/${post.id}` : post.slug ? `/posts/${post.slug}` : '#')

// Get category from postCategories array
const getPostCategoryFromData = (post: Post) => {
  if ((post as any).postCategories && Array.isArray((post as any).postCategories) && (post as any).postCategories.length > 0) {
    const primaryCategory = (post as any).postCategories.find((pc: any) => pc.is_primary) || (post as any).postCategories[0]
    if (primaryCategory?.category?.name) {
      return primaryCategory.category.name
    }
  }
  return getPostCategory(post)
}

// Get author from author object
const getPostAuthorFromData = (post: Post) => {
  if ((post as any).author && typeof (post as any).author === 'object' && (post as any).author.full_name) {
    return (post as any).author.full_name
  }
  return getPostAuthor(post)
}

// Get author avatar from author object
const getPostAvatarFromData = (post: Post) => {
  if ((post as any).author && typeof (post as any).author === 'object' && (post as any).author.avatar_url) {
    return (post as any).author.avatar_url
  }
  return getPostAvatar(post)
}

// Format date from created_at
const formatPostDate = (post: Post) => {
  const dateStr = (post as any).created_at || (post as any).published_at || post.date || post.publishedAt || post.createdAt
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    }).format(date)
  } catch {
    return getPostDate(post)
  }
}

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

// Function to convert video URLs to embed code
const convertVideoLinksToEmbed = (html: string): string => {
  if (!html) return ''
  
  let processedHtml = html
  
  // Don't skip - we need to process even if there are existing embeds
  // This allows processing of new links that haven't been converted yet
  
  // Extract YouTube video ID from various URL formats
  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/.*[?&]v=([a-zA-Z0-9_-]{11})/
    ]
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) return match[1]
    }
    return null
  }
  
  // Extract Vimeo video ID
  const extractVimeoId = (url: string): string | null => {
    const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/)
    return match && match[1] ? match[1] : null
  }
  
  // Helper function to create YouTube embed iframe
  const createYouTubeEmbed = (videoId: string) => {
    return `<div class="video-embed"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe></div>`
  }
  
  // Helper function to create Vimeo embed iframe
  const createVimeoEmbed = (videoId: string) => {
    return `<div class="video-embed"><iframe src="https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0" width="560" height="315" title="Vimeo video player" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
  }
  
  // First, handle links in <a> tags (YouTube)
  processedHtml = processedHtml.replace(/<a[^>]*href=["']([^"']*youtube[^"']*)["'][^>]*>.*?<\/a>/gi, (match, url) => {
    const videoId = extractYouTubeId(url)
    if (videoId) {
      return createYouTubeEmbed(videoId)
    }
    return match
  })
  
  // Handle links in <a> tags (Vimeo)
  processedHtml = processedHtml.replace(/<a[^>]*href=["']([^"']*vimeo[^"']*)["'][^>]*>.*?<\/a>/gi, (match, url) => {
    const videoId = extractVimeoId(url)
    if (videoId) {
      return createVimeoEmbed(videoId)
    }
    return match
  })
  
  // Handle standalone YouTube URLs (not in <a> tags, not in attributes)
  processedHtml = processedHtml.replace(/(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11}))/g, (match, url, videoId, offset) => {
    // Check if URL is inside an HTML attribute (href, src, etc.)
    const beforeMatch = processedHtml.substring(Math.max(0, offset - 20), offset)
    const afterMatch = processedHtml.substring(offset, offset + match.length + 20)
    
    // Skip if inside href=", src=", or other attributes
    if (beforeMatch.match(/href\s*=\s*["']?$/) || beforeMatch.match(/src\s*=\s*["']?$/)) {
      return match
    }
    
    // Skip if already processed
    if (afterMatch.includes('video-embed') || beforeMatch.includes('video-embed')) {
      return match
    }
    
    return createYouTubeEmbed(videoId)
  })
  
  // Handle standalone Vimeo URLs (not in <a> tags, not in attributes)
  processedHtml = processedHtml.replace(/(https?:\/\/(?:www\.)?vimeo\.com\/(\d+))/g, (match, url, videoId, offset) => {
    // Check if URL is inside an HTML attribute (href, src, etc.)
    const beforeMatch = processedHtml.substring(Math.max(0, offset - 20), offset)
    const afterMatch = processedHtml.substring(offset, offset + match.length + 20)
    
    // Skip if inside href=", src=", or other attributes
    if (beforeMatch.match(/href\s*=\s*["']?$/) || beforeMatch.match(/src\s*=\s*["']?$/)) {
      return match
    }
    
    // Skip if already processed
    if (afterMatch.includes('video-embed') || beforeMatch.includes('video-embed')) {
      return match
    }
    
    return createVimeoEmbed(videoId)
  })
  
  // Handle existing <video> tags that might have YouTube/Vimeo URLs in src
  processedHtml = processedHtml.replace(/<video[^>]*src=["']([^"']*(?:youtube|vimeo)[^"']*)["'][^>]*>.*?<\/video>/gi, (match, url) => {
    const youtubeId = extractYouTubeId(url)
    if (youtubeId) {
      return createYouTubeEmbed(youtubeId)
    }
    const vimeoId = extractVimeoId(url)
    if (vimeoId) {
      return createVimeoEmbed(vimeoId)
    }
    return match
  })
  
  // Also check for video tags with source tags inside
  processedHtml = processedHtml.replace(/<video[^>]*>.*?<source[^>]*src=["']([^"']*(?:youtube|vimeo)[^"']*)["'][^>]*>.*?<\/video>/gi, (match, url) => {
    const youtubeId = extractYouTubeId(url)
    if (youtubeId) {
      return createYouTubeEmbed(youtubeId)
    }
    const vimeoId = extractVimeoId(url)
    if (vimeoId) {
      return createVimeoEmbed(vimeoId)
    }
    return match
  })
  
  // Ensure we don't process URLs that are already in iframe src attributes
  // This prevents double processing
  processedHtml = processedHtml.replace(/<iframe[^>]*src=["']([^"']*(?:youtube|vimeo)[^"']*)["'][^>]*>/gi, (match) => {
    // If iframe already exists and has proper src, keep it as is
    if (match.includes('youtube.com/embed') || match.includes('player.vimeo.com')) {
      // Wrap in video-embed div if not already wrapped
      return match
    }
    return match
  })
  
  return processedHtml
}

const renderBody = (value?: string) => {
  if (!value) return ''
  let processedHtml = convertVideoLinksToEmbed(value)
  
  // Enhance image styling in figure tags
  processedHtml = processedHtml.replace(
    /<figure class="image">(.*?)<\/figure>/gis,
    '<figure class="post-content-image">$1</figure>'
  )
  
  // Make images responsive and add styling
  processedHtml = processedHtml.replace(
    /<img([^>]*)>/gi,
    '<img$1 class="post-content-img" loading="lazy">'
  )
  
  return processedHtml
}
</script>

<template>
  <MasterLayout>
    <!-- Breadcrumb -->
    <nav class="post-breadcrumb" v-if="post">
      <div class="post-breadcrumb__container">
        <RouterLink to="/" class="post-breadcrumb__link">Trang chủ</RouterLink>
        <span class="post-breadcrumb__separator">/</span>
        <span class="post-breadcrumb__category">{{ getPostCategoryFromData(post) }}</span>
        <span class="post-breadcrumb__separator">/</span>
        <span class="post-breadcrumb__current">{{ post.title }}</span>
      </div>
    </nav>

    <!-- Featured Image with Overlay Content -->
    <section class="post-hero-overlay" v-if="post">
      <div class="post-hero-overlay__image" v-if="post.thumbnail_url || (post as any).thumbnail_url">
        <img 
          :src="post.thumbnail_url || (post as any).thumbnail_url" 
          :alt="post.title || 'Featured image'"
          loading="eager"
        />
      </div>
      <div class="post-hero-overlay__gradient"></div>
      <div class="post-hero-overlay__content">
        <div class="post-hero-overlay__container">
          <div class="post-hero-overlay__badge">
            <span>{{ getPostCategoryFromData(post) }}</span>
          </div>
          <h1 class="post-hero-overlay__title">{{ post.title || 'Đang tải bài viết' }}</h1>
          <div class="post-hero-overlay__accent"></div>
          <p class="post-hero-overlay__lede" v-if="post.excerpt || post.short_description">
            {{ post.excerpt || post.short_description }}
          </p>
          <div class="post-hero-overlay__meta" v-if="post">
            <div class="post-hero-overlay__date">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6667 2.66667H12V2C12 1.63181 11.7015 1.33333 11.3333 1.33333C10.9651 1.33333 10.6667 1.63181 10.6667 2V2.66667H5.33333V2C5.33333 1.63181 5.03486 1.33333 4.66667 1.33333C4.29848 1.33333 4 1.63181 4 2V2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667ZM12.6667 13.3333H3.33333V6.66667H12.6667V13.3333Z" fill="currentColor"/>
              </svg>
              <span>Đăng ngày {{ formatPostDate(post) || getPostDate(post) || '---' }}</span>
            </div>
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

          <!-- Related Posts Section -->
          <section class="related-posts-section">
            <h2 class="related-posts-section__title">Xem thêm</h2>
            <div v-if="relatedError" class="section-one__state section-one__state--error">
              {{ relatedError }}
            </div>
            <div v-else-if="isRelatedLoading" class="section-one__state">Đang tải bài viết...</div>
            <div v-else-if="!relatedPosts.length" class="section-one__state">Chưa có bài viết liên quan.</div>
            <div v-else class="related-posts-grid">
              <article
                v-for="relatedPost in relatedPosts"
                :key="relatedPost.id ?? relatedPost.slug ?? relatedPost.title"
                class="related-post-card"
              >
                <RouterLink :to="getPostLink(relatedPost)" class="related-post-card__link">
                  <div class="related-post-card__thumb">
                    <img :src="getPostImage(relatedPost)" :alt="relatedPost.title || 'Bài viết'" loading="lazy" />
                  </div>
                  <h3 class="related-post-card__title">{{ relatedPost.title || 'Bài viết' }}</h3>
                </RouterLink>
              </article>
            </div>
          </section>

          <!-- Post Navigation Section -->
          <section class="post-navigation-section">
            <div class="post-navigation">
              <RouterLink
                v-if="prevPost"
                :to="getPostLink(prevPost)"
                class="post-nav-item post-nav-item--prev"
              >
                <div class="post-nav-item__arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="post-nav-item__content">
                  <span class="post-nav-item__label">Bài viết trước</span>
                  <h4 class="post-nav-item__title">{{ prevPost.title || 'Bài viết trước' }}</h4>
                </div>
              </RouterLink>
              <div v-else class="post-nav-item post-nav-item--prev post-nav-item--disabled">
                <div class="post-nav-item__arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="post-nav-item__content">
                  <span class="post-nav-item__label">Bài viết trước</span>
                  <h4 class="post-nav-item__title">Không có bài viết trước</h4>
                </div>
              </div>

              <RouterLink
                v-if="nextPost"
                :to="getPostLink(nextPost)"
                class="post-nav-item post-nav-item--next"
              >
                <div class="post-nav-item__content">
                  <span class="post-nav-item__label">Bài viết tiếp theo</span>
                  <h4 class="post-nav-item__title">{{ nextPost.title || 'Bài viết tiếp theo' }}</h4>
                </div>
                <div class="post-nav-item__arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </RouterLink>
              <div v-else class="post-nav-item post-nav-item--next post-nav-item--disabled">
                <div class="post-nav-item__content">
                  <span class="post-nav-item__label">Bài viết tiếp theo</span>
                  <h4 class="post-nav-item__title">Không có bài viết tiếp theo</h4>
                </div>
                <div class="post-nav-item__arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </div>
        <aside class="post-detail-sidebar">
          <div class="widget">
            <p class="widget-title">Bài viết liên quan</p>
            <div v-if="sidebarRelatedError" class="section-one__state section-one__state--error">
              {{ sidebarRelatedError }}
            </div>
            <div v-else-if="isSidebarRelatedLoading" class="section-one__state">Đang tải...</div>
            <div v-else-if="!sidebarRelatedPosts.length" class="section-one__state">Chưa có bài viết liên quan.</div>
            <ul v-else class="sidebar-related-list">
              <li v-for="item in sidebarRelatedPosts" :key="item.id ?? item.slug ?? item.title">
                <RouterLink :to="getPostLink(item)" class="sidebar-related-item">
                  <div class="sidebar-related-item__thumb">
                    <img 
                      :src="getPostImage(item)" 
                      :alt="item.title || 'Bài viết'" 
                      loading="lazy"
                    />
                  </div>
                  <h4 class="sidebar-related-item__title">{{ item.title || 'Bài viết' }}</h4>
                </RouterLink>
              </li>
            </ul>
          </div>
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

