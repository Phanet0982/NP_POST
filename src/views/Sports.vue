<template>
  <div class="news-app-wrapper bg-light-subtle min-vh-100">
    <div class="container py-5 font-khmer">
      
      <div class="d-flex justify-content-between align-items-end mb-5 pb-4">
        <div>
          <h2 class="fw-bold text-dark mb-1 ps-3">ព័ត៌មានកីឡា</h2>
          <p class="text-muted mb-0 ps-3">តាមដានព្រឹត្តិការណ៍កីឡាជាតិ និងអន្តរជាតិថ្មីៗបំផុត</p>
        </div>
      </div>

      <div v-if="sportsList.length > 0" class="row g-4">
        <div v-for="item in sportsList" :key="item.id" class="col-12 col-md-6 col-lg-4">
          <div @click="goToDetail(item.id)" class="card h-100 shadow hover-up bg-white cursor-pointer border-0">
            <div class="position-relative overflow-hidden">
              <img :src="item.image" class="card-img-top" style="height: 220px; object-fit: cover;">
              <div class="position-absolute top-0 start-0 p-3">
                <span class="badge bg-primary shadow px-3 border-0">កីឡា</span>
              </div>
            </div>

            <div class="card-body p-4">
              <h6 class="card-title fw-bold text-dark mb-3 line-clamp-2 lh-base">{{ item.title }}</h6>
              
              <div class="d-flex justify-content-between align-items-center mt-auto pt-3 text-muted small shadow-top">
                <span><i class="bi bi-calendar3 me-1"></i> {{ item.date }}</span>
                <div class="d-flex gap-3">
                  <span><i class="bi bi-heart-fill text-danger me-1"></i> {{ item.likes || 0 }}</span>
                  <span><i class="bi bi-chat-fill text-primary me-1"></i> {{ item.comments?.length || 0 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">កំពុងផ្ទុក...</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const sportsList = ref([]);

// Navigation function matching Home and Popular logic
const goToDetail = (id) => {
  router.push(`/news/${id}`);
};

const loadSportsData = () => {
  const saved = localStorage.getItem('app_news_data');
  if (saved) {
    const allNews = JSON.parse(saved);
    // Filter specifically for the Sports category
    sportsList.value = allNews.filter(item => item.category === 'Sports');
  }
};

onMounted(() => {
  loadSportsData();
});
</script>

<style scoped>
/* Identical styling logic to Home.vue and Popular.vue */
.font-khmer { font-family: 'Khmer OS Battambang', sans-serif; }
.cursor-pointer { cursor: pointer; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* The Global Sharp Edge Constraint */
.news-app-wrapper * { border-radius: 0 !important; }

/* SHADOWS & HOVER - Consistent with your existing design */
.shadow-sm { box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important; }
.shadow { box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; }
.shadow-top { box-shadow: 0 -1px 0 rgba(0,0,0,0.05); }

.hover-up { transition: all 0.3s ease; }
.hover-up:hover { 
  transform: translateY(-8px); 
  box-shadow: 0 15px 35px rgba(0,0,0,0.15) !important; 
}

.bg-light-subtle { background-color: #f2f4f7 !important; }
</style>