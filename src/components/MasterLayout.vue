<template>
  <div class="page">
    <header class="main-header">
      <div class="nav-line">
        <div class="brand">
          <div class="brand-mark">HAU</div>
          <div>
            <p class="brand-title">Khoa Kien Truc</p>
            <small>Faculty of Architecture</small>
          </div>
        </div>
        <nav class="nav-links">
          <a href="#section-1">Tin tuc</a>
          <a href="#section-2">Su kien</a>
          <a href="#section-3">Studio</a>
          <a href="#workshop">Workshop</a>
          <a href="#about">About</a>
        </nav>
        <button class="primary-btn">Dang ky trai nghiem</button>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer class="page-footer">
      <p>(c) 2025 Hanoi Architectural University - Faculty of Architecture.</p>
      <p>144 Xuan Thuy, Cau Giay, Ha Noi - Email: studio@hau.edu.vn</p>
    </footer>
  </div>
</template>
