<script setup lang="ts">
import MasterLayout from '../components/MasterLayout.vue'

const sectionOneHero = {
  title: 'LIXIL Experience Center - Khong gian ton vinh nhung sac thai cua nuoc',
  category: 'Tin trong nuoc',
  excerpt: 'Trung tam trai nghiem tuong tac mang lai goc nhin moi ve vat lieu va giai phap kien truc hien dai.',
  image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80',
}

const sectionOneLeftPosts = [
  {
    tag: 'Cong nghe - Vat lieu',
    title: 'Thiet ke tham so: Bi quyet tao nen mat tien doc dao',
    image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=600&q=60',
  },
  {
    tag: 'Nha o',
    title: 'Zen Art Sky Villa mang ve dep tinh te voi phong cach Zen Art',
    image: 'https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?auto=format&fit=crop&w=600&q=60',
  },
]

const sectionOneRightPosts = [
  {
    tag: 'Nha o',
    title: 'Terra Villa - Biet thu lay cam hung tu dat nung',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=60',
  },
  {
    tag: 'Noi that',
    title: 'Jo Garden Coffee - Quan cafe voi tong the "bay"',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=60',
  },
]
const highlightNews = [
  {
    title: 'Khai mac tuan le do an tot nghiep',
    date: '12/05/2025',
    excerpt: '35 do an tieu bieu duoc san tuyen chon, tap trung vao cac cau chuyen do thi moi.',
    image: 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Thanh lap cau lac bo Studio Lab',
    date: '06/05/2025',
    excerpt: 'Khong gian mo cho sinh vien nghien cuu vat lieu, mo hinh va chuyen giao cong nghe.',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Trien lam chuong trinh trao doi quoc te',
    date: '28/04/2025',
    excerpt: 'Sinh vien Phap - Viet cung phat trien giai phap kien truc ung pho bien doi khi hau.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Danh sach xuong sang tao mua he',
    date: '20/04/2025',
    excerpt: '05 xuong chuyen de se mo dang ky trong thang 6, uu tien nhom nghien cuu lien nganh.',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=60',
  },
]

const reviewTopics = [
  { title: 'Do an cai tao nha may cu', mentor: 'ThS. Nguyen Trung Kien', time: '09:00 - 10:30' },
  { title: 'Nga tu xanh - tuyen metro 05', mentor: 'TS. Le Khanh Linh', time: '10:45 - 12:00' },
  { title: 'Nha trien lam cong dong Ven Ho', mentor: 'ThS. Ngo Minh Tam', time: '13:30 - 15:00' },
  { title: 'Hoc vien Khi hau mien Trung', mentor: 'KTS. Dinh Huu Thanh', time: '15:15 - 16:30' },
]

const sandboxPosts = [
  { label: 'Studio Update', value: 'Section 1 da cap nhat rubric 2025.' },
  { label: 'Scholarship', value: 'Quy LIXIL chinh thuc mo cho SV nam cuoi.' },
  { label: 'Digital Hub', value: 'Dich vu in 3D mo cua den 22:00 moi ngay.' },
  { label: 'Thuc tap', value: 'Hop tac cung 12 van phong kien truc tai Ha Noi.' },
]

const workshopSeries = [
  {
    title: 'Spatial Contrast Training',
    desc: 'Ung dung AI de tao mo hinh anh sang cho studio.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=60',
  },
  {
    title: 'City Forest',
    desc: 'Workshop phuc hoi mang xanh khu pho cu.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=60',
  },
  {
    title: 'Sound, People & Forms',
    desc: 'Tim hieu tuong tac am hoc va cau truc phu.',
    image: 'https://images.unsplash.com/photo-1451471016731-e963a8588be8?auto=format&fit=crop&w=600&q=60',
  },
  {
    title: 'Bamboo Design Lab',
    desc: 'Thiet ke pavilion su dung tre ban dia.',
    image: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=600&q=60',
  },
  {
    title: 'RetroFuture Campus',
    desc: 'Cai tao khong gian truong hoc theo huong linh hoat.',
    image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=600&q=60',
  },
  {
    title: 'Material Play Ground',
    desc: 'Laboratory kham pha vat lieu tai che.',
    image: 'https://images.unsplash.com/photo-1482731910308-31c1c8da8fc7?auto=format&fit=crop&w=600&q=60',
  },
]

const aboutCards = [
  { title: 'Giang vien huong dan', body: '45+ giang vien, kien truc su, nghe si cong tac hang ky', color: '#f8b72b' },
  { title: 'Sinh vien tham gia', body: 'Hon 1.200 sinh vien cac khoa voi mang luoi alumni rong khap', color: '#ff7ca3' },
  { title: 'Chuong trinh trao doi', body: '09 doi tac quoc te voi hoc phan thiet ke chung', color: '#20c997' },
  { title: 'Hoc bong ho tro', body: '12 quy tai tro danh rieng cho du an nghien cuu', color: '#8b5cf6' },
]

const activityCards = [
  { title: 'Khong gian mo', body: 'Cac xuong sang tao hoat dong 24/7 voi su ho tro ky thuat', color: '#fbff62' },
  { title: 'Hoat dong cong dong', body: 'Chuoi talk & workshop moi thang voi khach moi chuyen gia', color: '#4ade80' },
  { title: 'Festival 2025', body: 'Trinh dien do an noi bat va trao giai thuong hang nam', color: '#38bdf8' },
  { title: 'Studio Tour', body: 'Dang ky tham quan danh cho hoc sinh THPT', color: '#f87171' },
]
</script>

<template>
  <MasterLayout>
    <section class="hero">
      <p class="eyebrow">2025 Studio Showcase</p>
      <h1>KHOA KIEN TRUC</h1>
      <p class="hero-lede">
        Cap nhat do an, workshop va su kien noi bat cua khoa. Kham pha nhung cau chuyen kien truc moi nhat ngay tai
        campus Ha Noi.
      </p>
      <div class="hero-actions">
        <button class="primary-btn">Truy cap ngay</button>
        <button class="ghost-btn">Lich su kien</button>
      </div>
      <div class="hero-meta">
        <div>
          <p>05</p>
          <span>Workshop tuan nay</span>
        </div>
        <div>
          <p>24</p>
          <span>Do an trung bay</span>
        </div>
        <div>
          <p>08</p>
          <span>Doi tac quoc te</span>
        </div>
      </div>
    </section>

    <section id="section-1" class="section-one">
      <div class="section-one__frame">
        <div class="section-one__col">
          <article v-for="post in sectionOneLeftPosts" :key="post.title" class="section-one__card">
            <img :src="post.image" :alt="post.title" loading="lazy" />
            <div>
              <p class="section-one__tag">{{ post.tag }}</p>
              <h3>{{ post.title }}</h3>
            </div>
          </article>
        </div>

        <article class="section-one__hero">
          <img :src="sectionOneHero.image" :alt="sectionOneHero.title" loading="lazy" />
          <div>
            <p class="section-one__tag">{{ sectionOneHero.category }}</p>
            <h3>{{ sectionOneHero.title }}</h3>
            <p>{{ sectionOneHero.excerpt }}</p>
          </div>
        </article>
        <div class="section-one__col section-one__col--right">
          <article v-for="post in sectionOneRightPosts" :key="post.title" class="section-one__card">
            <img :src="post.image" :alt="post.title" loading="lazy" />
            <div>
              <p class="section-one__tag">{{ post.tag }}</p>
              <h3>{{ post.title }}</h3>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="section-2" class="event-banner">
      <p class="section-tag">Section 2</p>
      <h3>Post Event nao do co thoi gian cu the</h3>
      <p>Se tu bien mat sau thoi gian dang bai</p>
      <div class="event-meta">
        <p>FESTIVAL 2025</p>
        <span>Ngay 18 - 24 / 06</span>
      </div>
    </section>

    <section id="section-3" class="news-section">
      <header class="section-header stacked">
        <div>
          <p class="section-tag">Section 3</p>
          <h2>Tin noi bat &amp; San phan bien</h2>
        </div>
        <p>Ban tin cap nhat moi tuan tu phong truyen thong khoa.</p>
      </header>
      <div class="news-columns">
        <div class="news-stream">
          <article v-for="post in highlightNews" :key="post.title" class="news-card">
            <img :src="post.image" :alt="post.title" loading="lazy" />
            <div>
              <p class="news-date">{{ post.date }}</p>
              <h3>{{ post.title }}</h3>
              <p>{{ post.excerpt }}</p>
            </div>
          </article>
        </div>
        <aside class="news-side">
          <div class="widget">
            <p class="widget-title">San phan bien</p>
            <ul>
              <li v-for="topic in reviewTopics" :key="topic.title">
                <h4>{{ topic.title }}</h4>
                <p>{{ topic.mentor }}</p>
                <span>{{ topic.time }}</span>
              </li>
            </ul>
          </div>
          <div class="widget">
            <p class="widget-title">Sandbox</p>
            <ul>
              <li v-for="item in sandboxPosts" :key="item.label">
                <strong>{{ item.label }}</strong>
                <p>{{ item.value }}</p>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>

    <section id="workshop" class="workshop-section">
      <header class="section-header">
        <div>
          <p class="section-tag">Workshop</p>
          <h2>Chuoi hoc phan trai nghiem</h2>
        </div>
        <a href="#workshop">Lich workshop</a>
      </header>
      <div class="workshop-grid">
        <article v-for="item in workshopSeries" :key="item.title" class="workshop-card">
          <img :src="item.image" :alt="item.title" loading="lazy" />
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </article>
      </div>
    </section>

    <section id="about" class="info-grid-section">
      <div>
        <p class="section-tag">About</p>
        <h2>Cac khoi noi dung chinh</h2>
      </div>
      <div class="info-grid">
        <article v-for="card in aboutCards" :key="card.title" class="info-card" :style="{ backgroundColor: card.color }">
          <h3>{{ card.title }}</h3>
          <p>{{ card.body }}</p>
        </article>
      </div>
    </section>

    <section class="info-grid-section">
      <div>
        <p class="section-tag">Hoat dong</p>
        <h2>Ket noi cung cong dong</h2>
      </div>
      <div class="info-grid">
        <article
          v-for="card in activityCards"
          :key="card.title"
          class="info-card"
          :style="{ backgroundColor: card.color }"
        >
          <h3>{{ card.title }}</h3>
          <p>{{ card.body }}</p>
        </article>
      </div>
    </section>
  </MasterLayout>
</template>
