<template>
  <header class="top-nav border-bottom bg-white sticky-top shadow-sm">
    <div class="ticker-bar bg-primary text-white py-1 overflow-hidden d-none d-md-block">
      <div class="container-fluid px-4 d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center flex-grow-1 overflow-hidden">
          <span class="badge bg-danger me-3">BREAKING</span>
          <div class="ticker-content">
            <div class="ticker-track">
              <span class="me-5">ព័ត៌មានថ្មីៗ៖ កិច្ចព្រមព្រៀងប្រវត្តិសាស្ត្រស្តីពីការប្រែប្រួលអាកាសធាតុត្រូវបានចុះហត្ថលេខា</span>
              <span class="me-5">សេដ្ឋកិច្ច៖ ទីផ្សារភាគហ៊ុនកើនឡើងខ្ពស់បំផុតក្នុងឆ្នាំ ២០២៦</span>
              <span class="me-5">បច្ចេកវិទ្យា៖ ក្រុមហ៊ុនយក្សប្រកាសចេញ AI ជំនាន់ថ្មីដ៏ឆ្លាតវៃ</span>
            </div>
          </div>
        </div>
        
        <div class="date-display ms-3 small fw-light text-nowrap">
          <i class="bi bi-calendar3 me-1"></i> {{ currentDate }}
        </div>
      </div>
    </div>

    <div class="header-main px-4 d-flex align-items-center justify-content-between">
      <button class="btn d-lg-none border-0" @click="$emit('toggle-menu')">
        <i class="bi bi-list fs-3"></i>
      </button>

      <div class="search-wrapper d-none d-lg-block">
        <div class="input-group">
          <span class="input-group-text bg-light border-0"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control bg-light border-0 shadow-none" placeholder="ស្វែងរកព័ត៌មាន..." style="width: 300px;">
        </div>
      </div>

      <div class="d-lg-none fw-bold text-primary">NP NEWS</div>

      <div class="d-flex align-items-center gap-3">
        <button class="btn btn-link text-dark p-0 d-none d-sm-block">
          <i class="bi bi-bell fs-5"></i>
        </button>
        <button class="btn btn-link text-dark p-0 d-none d-sm-block">
          <i class="bi bi-bookmark fs-5"></i>
        </button>
        <button class="btn btn-primary btn-sm px-4 rounded-pill fw-bold">Subscribe</button>
        <div class="avatar-circle bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 35px; height: 35px;">
          <i class="bi bi-person"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  currentDate: String
});
defineEmits(['toggle-menu']);
</script>

<style scoped>
.top-nav {
  position: sticky;
  top: 0;
  z-index: 999;
}

.header-main {
  height: 65px;
}

.date-display {
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  padding-left: 15px;
}

/* Ticker Animation */
.ticker-content {
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.ticker-track {
  display: inline-block;
  padding-left: 100%;
  animation: ticker-scroll 30s linear infinite;
  font-size: 0.9rem;
}

@keyframes ticker-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.ticker-track:hover {
  animation-play-state: paused;
}
</style>