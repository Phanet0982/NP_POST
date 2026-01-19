<template>
  <div class="news-app-wrapper bg-light-subtle min-vh-100">
    <div class="container py-5 font-khmer">
      
      <div class="d-flex justify-content-between align-items-end mb-5 pb-4">
        <div>
          <h2 class="fw-bold text-dark mb-1">ព័ត៌មានពេញនិយម</h2>
          <p class="text-muted mb-0">អានព្រឹត្តិការណ៍ដែលកំពុងមានការចាប់អារម្មណ៍ខ្លាំងបំផុត</p>
        </div>
      </div>

      <div v-if="popularList.length > 0" class="row g-4">
        <div v-for="item in popularList" :key="item.id" class="col-12 col-md-6 col-lg-4">
          <div @click="goToDetail(item.id)" class="card h-100 shadow hover-up bg-white cursor-pointer border-0">
            <div class="position-relative overflow-hidden">
              
              <template v-if="item.mediaType === 'video'">
                <video :src="item.media" class="card-img-top" style="height: 220px; object-fit: cover;" muted></video>
                <div class="position-absolute top-50 start-50 translate-middle text-white">
                  <i class="bi bi-play-circle-fill display-5 opacity-75"></i>
                </div>
              </template>
              <img v-else :src="item.media || item.image" class="card-img-top" style="height: 220px; object-fit: cover;">
              
              <div class="position-absolute top-0 start-0 p-3">
                <span class="badge bg-danger shadow px-3 border-0">
                  <i class="bi bi-fire me-1"></i> ពេញនិយម
                </span>
              </div>
            </div>

            <div class="card-body p-4 d-flex flex-column">
              <h6 class="card-title fw-bold text-dark mb-3 line-clamp-2 lh-base">{{ item.title }}</h6>
              
              <div class="d-flex justify-content-between align-items-center mt-auto pt-3 text-muted small border-top">
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

      <div v-else-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-3 text-muted">កំពុងស្វែងរកព័ត៌មានពេញនិយម...</p>
      </div>

      <div v-else class="text-center py-5">
        <i class="bi bi-star text-secondary opacity-25 display-1"></i>
        <p class="mt-3 text-muted">មិនទាន់មានព័ត៌មានពេញនិយមនៅឡើយទេ</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import localforage from 'localforage';

const router = useRouter();
const popularList = ref([]);
const isLoading = ref(true);

// កំណត់ Database ឱ្យដូច Admin Page
localforage.config({
  name: 'NP_News_App',
  storeName: 'articles'
});

const goToDetail = (id) => {
  router.push(`/news/${id}`);
};

const loadPopularData = async () => {
  isLoading.value = true;
  try {
    const saved = await localforage.getItem('news_list');
    if (saved) {
      // Logic សម្រាប់ព័ត៌មានពេញនិយម៖
      // ១. ប្រភេទ (Category) ជា 'Popular'
      // ២. ឬ មានចំនួន Like ចាប់ពី ៥ ឡើងទៅ
      popularList.value = saved.filter(item => 
        item.category === 'Popular' || (item.likes && item.likes >= 5)
      );
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadPopularData();
});
</script>

<style scoped>
.font-khmer { font-family: 'Khmer OS Battambang', sans-serif; }
.cursor-pointer { cursor: pointer; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* Global Sharp Edge Constraint */
.news-app-wrapper * { border-radius: 0 !important; }

/* SHADOWS & HOVER */
.shadow { box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; }
.hover-up { transition: all 0.3s ease; }
.hover-up:hover { 
  transform: translateY(-8px); 
  box-shadow: 0 15px 35px rgba(0,0,0,0.15) !important; 
}

.bg-light-subtle { background-color: #f2f4f7 !important; }
.card-img-top { transition: transform 0.5s ease; }
.card:hover .card-img-top { transform: scale(1.05); }
</style>