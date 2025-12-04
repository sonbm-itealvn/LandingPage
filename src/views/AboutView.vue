<script setup lang="ts">
import MasterLayout from '../components/MasterLayout.vue'
</script>

<template>
  <MasterLayout>
    <section class="about-page">
      <h1>About the Faculty</h1>
      <p>
        Day la trang thong tin ngan gon ve chuong trinh va nhung hoat dong cua khoa. Bo cuc su dung chung master layout
        voi trang chu de giu trai nghiem dong nhat.
      </p>
    </section>
  </MasterLayout>
</template>

<style scoped>
.about-page {
  padding: 4rem 0;
  min-height: 60vh;
}

.about-page h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.about-page p {
  max-width: 640px;
  color: #475569;
}
</style>
