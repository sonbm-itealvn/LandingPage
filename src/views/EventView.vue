<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MasterLayout from '../components/MasterLayout.vue'
import {
  fetchEventById,
  formatEventDateRange,
  formatEventTimeRange,
  getEventTitle,
  type EventItem,
} from '../services/eventsService'

const route = useRoute()
const event = ref<EventItem | null>(null)
const isLoading = ref(true)
const errorMsg = ref('')

const loadEvent = async (id: string | number) => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    event.value = await fetchEventById(id)
  } catch (error) {
    errorMsg.value = error instanceof Error ? error.message : 'Không thể tải chi tiết sự kiện.'
    event.value = null
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (route.params.id) {
    loadEvent(route.params.id as string)
  }
})

watch(
  () => route.params.id,
  (id) => {
    if (id) loadEvent(id as string)
  },
)

const eventBannerStyle = computed(() => {
  if (!event.value?.banner_url) return {}
  return {
    backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('${event.value.banner_url}')`,
  }
})
</script>

<template>
  <MasterLayout>
    <div v-if="isLoading" class="event-detail-loading">Đang tải chi tiết sự kiện...</div>
    <div v-else-if="errorMsg" class="event-detail-error">{{ errorMsg }}</div>
    <div v-else-if="!event" class="event-detail-error">Không tìm thấy sự kiện.</div>
    <section v-else class="event-detail">
      <article class="event-detail__banner" :style="eventBannerStyle">
        <div class="event-detail__content">
          <div class="event-chip">Sự kiện</div>
          <h1 class="event-detail__title">{{ getEventTitle(event) }}</h1>
          <p class="event-detail__description">{{ event.content || event.description || '' }}</p>
          <div class="event-detail__meta">
            <div class="event-meta-item">
              <span class="event-meta-icon">🕐</span>
              <div>
                <div class="event-meta-label">Thời gian</div>
                <div class="event-meta-value">{{ formatEventDateRange(event) }}</div>
                <div class="event-meta-value event-meta-value--time">{{ formatEventTimeRange(event) }}</div>
              </div>
            </div>
            <div class="event-meta-item">
              <span class="event-meta-icon">📍</span>
              <div>
                <div class="event-meta-label">Địa điểm</div>
                <div class="event-meta-value">{{ event.location || 'Đang cập nhật' }}</div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  </MasterLayout>
</template>

<style scoped>
.event-detail-loading,
.event-detail-error {
  padding: 3rem 1rem;
  text-align: center;
  color: var(--hau-muted);
}

.event-detail-error {
  color: #c0392b;
}

.event-detail__banner {
  min-height: 500px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 18px;
  overflow: hidden;
  padding: 3rem;
  color: #fff;
  display: flex;
  align-items: center;
}

.event-detail__content {
  max-width: 800px;
}

.event-detail__title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 1rem 0 1rem;
  color: #fff;
}

.event-detail__description {
  font-size: 1.2rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 2rem;
}

.event-detail__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1.5rem;
}

.event-meta-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.event-meta-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.event-meta-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.event-meta-value {
  font-size: 1.1rem;
  color: #fff;
  font-weight: 500;
  line-height: 1.4;
}

.event-meta-value--time {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .event-detail__banner {
    padding: 2rem 1.5rem;
    min-height: 400px;
  }

  .event-detail__title {
    font-size: 1.8rem;
  }

  .event-detail__description {
    font-size: 1.1rem;
  }

  .event-detail__meta {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>

