<template>
  <div class="container py-4 font-khmer">
    
    <div v-if="!selectedNews">
      <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h2 class="fw-black text-dark mb-0">ព័ត៌មានថ្មីៗបំផុត</h2>
        <span class="badge bg-primary rounded-pill px-3 shadow-sm">Update Real-time</span>
      </div>

      <div v-if="newsList.length > 0" class="row g-4">
        <div v-for="item in newsList" :key="item.id" class="col-12 col-md-6 col-lg-4">
          <div @click="viewDetail(item)" class="card h-100 border-0 shadow-sm hover-up rounded-4 overflow-hidden">
            <div class="position-relative overflow-hidden">
               <img :src="item.image" class="card-img-top clickable-img" style="height: 220px; object-fit: cover;">
               <div class="position-absolute top-0 start-0 p-2">
                 <span class="badge bg-dark bg-opacity-75 rounded-pill small">{{ item.category }}</span>
               </div>
            </div>
            <div class="card-body p-4">
              <h5 class="card-title fw-bold text-dark mb-3 line-clamp-2 lh-base">{{ item.title }}</h5>
              <p class="text-muted small mb-0"><i class="bi bi-clock me-1"></i> {{ item.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="row g-5">
      <div class="col-lg-8">
        <nav aria-label="breadcrumb" class="mb-4">
          <div class="d-flex align-items-center gap-3">
            <button @click="selectedNews = null" class="btn btn-outline-primary btn-sm rounded-pill px-3">
              <i class="bi bi-arrow-left"></i> ត្រឡប់ក្រោយ
            </button>
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#" class="text-decoration-none" @click.prevent="selectedNews = null">Home</a></li>
              <li class="breadcrumb-item active text-primary fw-bold">{{ selectedNews.category }}</li>
            </ol>
          </div>
        </nav>

        <h3 class="fw-bold text-dark mb-3 lh-base">{{ selectedNews.title }}</h3>
        
        <div class="mb-4 border-bottom pb-3 text-muted small d-flex justify-content-between">
          <span>By <span class="fw-bold text-dark text-uppercase">Editorial Team</span> • {{ selectedNews.date }}</span>
          <span class="text-primary"><i class="bi bi-eye me-1"></i> 1.2k views</span>
        </div>

        <img :src="selectedNews.image" class="img-fluid rounded-4 mb-3 shadow-sm w-100" style="max-height: 500px; object-fit: cover;">
        <p class="text-muted fst-italic mb-4 ps-3">រូបភាពតំណាង៖ {{ selectedNews.title }}</p>

        <div class="article-body fs-5 lh-lg mb-5 text-dark">
          <div v-if="selectedNews.content" v-html="selectedNews.content"></div>
          <p v-else>ខ្លឹមសារនៃព័ត៌មាននេះ កំពុងត្រូវបានបញ្ចូលទៅក្នុងប្រព័ន្ធ។ សូមរង់ចាំអានក្នុងពេលឆាប់ៗនេះ។</p>
        </div>

        <hr>

        <h4 class="fw-bold mb-4 mt-5">ព័ត៌មានទាក់ទង</h4>
        <div class="row g-3">
          <div v-for="related in getRelated()" :key="'rel-'+related.id" class="col-md-4">
            <div @click="viewDetail(related)" class="cursor-pointer group">
              <img :src="related.image" class="img-fluid rounded-3 mb-2 clickable-img shadow-sm" style="height: 120px; width: 100%; object-fit: cover;">
              <h6 class="fw-bold small line-clamp-2 text-dark">{{ related.title }}</h6>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="sticky-top" style="top: 20px;">
          <div class="card border-0 shadow-sm rounded-4 p-4">
             <h5 class="fw-bold pb-2 mb-4 border-bottom border-primary">អត្ថបទពេញនិយម</h5>
             <div v-for="pop in newsList.slice(0, 6)" :key="'pop-'+pop.id" class="d-flex mb-4 gap-3 cursor-pointer align-items-start" @click="viewDetail(pop)">
               <img :src="pop.image" class="rounded-3 shadow-sm" style="width: 80px; height: 60px; object-fit: cover; flex-shrink: 0;">
               <div>
                 <h6 class="mb-1 fw-bold small line-clamp-2" style="line-height: 1.3;">{{ pop.title }}</h6>
                 <span class="text-primary fw-bold" style="font-size: 0.7rem;">{{ pop.date }}</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const newsList = ref([]);
const selectedNews = ref(null);

const viewDetail = (item) => {
  selectedNews.value = item;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const getRelated = () => {
  return newsList.value.filter(item => item.id !== selectedNews.value?.id).slice(0, 3);
};

onMounted(() => {
  const data = localStorage.getItem('app_news_data');
  if (data) {
    newsList.value = JSON.parse(data);
  } else {
    // Default placeholder data if localStorage is empty
    newsList.value = [
      { id: 1, title: "Primary Schools to Become Climate-Resilient", category: "Society", date: "Jan 15, 2026", image: "https://picsum.photos/id/10/800/500" },
      { id: 2, title: "Cambodia's Rice Exports Jump Nearly 46 Percent", category: "Economy", date: "Jan 14, 2026", image: "https://picsum.photos/id/20/800/500" },
      { id: 3, title: "Thailand-Cambodia Ceasefire and ASEAN Limits", category: "Politics", date: "Jan 13, 2026", image: "https://picsum.photos/id/30/800/500" },
      { id: 4, title: "Remote Provinces Gain $10 Billion Investment", category: "Business", date: "Jan 12, 2026", image: "https://picsum.photos/id/40/800/500" }
    ];
  }
});
</script>

<style scoped>
.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }
.cursor-pointer { cursor: pointer; }

.clickable-img { 
  transition: all 0.3s ease; 
}
.clickable-img:hover { 
  opacity: 0.9; 
  transform: scale(1.05);
}

.line-clamp-2 { 
  display: -webkit-box; 
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical; 
  overflow: hidden; 
}

.hover-up { transition: all 0.3s ease; }
.hover-up:hover { 
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

.sticky-top { z-index: 10; }
.fw-black { font-weight: 900; }
</style>