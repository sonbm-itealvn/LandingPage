<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import MasterLayout from '../components/MasterLayout.vue'
import { RouterLink } from 'vue-router'
import {
  fetchEvents,
  formatEventDateRange,
  formatEventTimeRange,
  type EventItem,
} from '../services/eventsService'

const events = ref<EventItem[]>([])
const isEventsLoading = ref(true)
const eventsError = ref('')

const loadEvents = async () => {
  isEventsLoading.value = true
  eventsError.value = ''
  try {
    events.value = await fetchEvents(5)
  } catch (error) {
    eventsError.value = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải sự kiện.'
    events.value = []
  } finally {
    isEventsLoading.value = false
  }
}

onMounted(() => {
  loadEvents()
})

const eventHero = computed(() => events.value[0])
const showEventSection = computed(() => isEventsLoading.value || events.value.length > 0)

const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let countdownInterval: ReturnType<typeof setInterval> | null = null

const updateCountdown = () => {
  if (!eventHero.value?.end_time) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return
  }

  const now = new Date().getTime()
  const endTime = new Date(eventHero.value.end_time).getTime()
  const distance = endTime - now

  if (distance < 0) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return
  }

  countdown.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  }
}

const startCountdown = () => {
  if (countdownInterval) clearInterval(countdownInterval)
  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
}

const stopCountdown = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
    countdownInterval = null
  }
}

const eventBannerStyle = computed(() => {
  if (!eventHero.value?.banner_url) return {}
  return {
    backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('${eventHero.value.banner_url}')`,
  }
})

watch(
  () => events.value.length,
  () => {
    startCountdown()
  },
)

watch(
  () => eventHero.value?.end_time,
  () => {
    startCountdown()
  },
)

onBeforeUnmount(() => {
  stopCountdown()
})
</script>

<template>
  <MasterLayout>
    <section v-if="showEventSection" id="section-2" class="event-banner">
      <div v-if="eventsError" class="event-state event-state--error">
        {{ eventsError }}
      </div>
      <div v-else-if="isEventsLoading" class="event-state">Đang tải sự kiện...</div>
      <div v-else-if="!events.length" class="event-state">Chưa có sự kiện nào.</div>
      <template v-else>
        <RouterLink
          v-if="eventHero"
          :to="eventHero.id ? `/events/${eventHero.id}` : '/hoat-dong-khoa'"
          class="event-banner-full-link"
        >
          <article class="event-banner-full" :style="eventBannerStyle">
          <div class="event-banner-full__wrapper">
            <div class="event-banner-full__right">
              <div class="event-countdown">
                <div class="countdown-label">Còn lại</div>
                <div class="countdown-grid">
                  <div class="countdown-item">
                    <span class="countdown-value">{{ String(countdown.days).padStart(2, '0') }}</span>
                    <span class="countdown-unit">Ngày</span>
                  </div>
                  <div class="countdown-separator">:</div>
                  <div class="countdown-item">
                    <span class="countdown-value">{{ String(countdown.hours).padStart(2, '0') }}</span>
                    <span class="countdown-unit">Giờ</span>
                  </div>
                  <div class="countdown-separator">:</div>
                  <div class="countdown-item">
                    <span class="countdown-value">{{ String(countdown.minutes).padStart(2, '0') }}</span>
                    <span class="countdown-unit">Phút</span>
                  </div>
                  <div class="countdown-separator">:</div>
                  <div class="countdown-item">
                    <span class="countdown-value">{{ String(countdown.seconds).padStart(2, '0') }}</span>
                    <span class="countdown-unit">Giây</span>
                  </div>
                </div>
              </div>
              <div class="event-info-panel">
                <div class="event-info-item">
                  <div class="event-info-icon">🕐</div>
                  <div class="event-info-content">
                    <div class="event-info-label">Thời gian</div>
                    <div class="event-info-value">{{ formatEventDateRange(eventHero) }}</div>
                    <div class="event-info-value event-info-value--time">{{ formatEventTimeRange(eventHero) }}</div>
                  </div>
                </div>
                <div class="event-info-divider"></div>
                <div class="event-info-item">
                  <div class="event-info-icon">📍</div>
                  <div class="event-info-content">
                    <div class="event-info-label">Địa điểm</div>
                    <div class="event-info-value">{{ eventHero.location || 'Đang cập nhật' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        </RouterLink>
      </template>
    </section>
  </MasterLayout>
</template>
