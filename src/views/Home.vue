<template>
  <div class="news-app-wrapper bg-light-subtle min-vh-100">
    <div class="container py-5 font-khmer">
      
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 pb-4 border-bottom">
        <div>
          <h2 class="fw-bold text-dark mb-1">ព័ត៌មានថ្មីៗបំផុត</h2>
          <p class="text-muted mb-0">អានព្រឹត្តិការណ៍ថ្មីៗដែលកំពុងកើតឡើងក្នុងប្រទេសកម្ពុជា</p>
        </div>

        <div class="d-flex gap-2 mt-4 mt-md-0">
          <button @click="activeFilter = 'all'" :class="['btn px-4 shadow-sm', activeFilter === 'all' ? 'btn-primary' : 'btn-white border']">ទាំងអស់</button>
          <button @click="activeFilter = 'image'" :class="['btn px-4 shadow-sm', activeFilter === 'image' ? 'btn-primary' : 'btn-white border']"><i class="bi bi-image me-1"></i> រូបភាព</button>
          <button @click="activeFilter = 'video'" :class="['btn px-4 shadow-sm', activeFilter === 'video' ? 'btn-primary' : 'btn-white border']"><i class="bi bi-play-circle me-1"></i> វីដេអូ</button>
        </div>
      </div>

      <div v-if="filteredNews.length > 0" class="row g-4">
        <div v-for="item in filteredNews" :key="item.id" class="col-12 col-md-6 col-lg-4">
          <div @click="goToDetail(item.id)" class="card h-100 shadow hover-up bg-white cursor-pointer border-0">
            <div class="position-relative overflow-hidden">
              <template v-if="item.mediaType === 'video'">
                <video :src="item.media" class="card-img-top" style="height: 220px; object-fit: cover;" muted></video>
                <div class="position-absolute top-50 start-50 translate-middle text-white opacity-75">
                  <i class="bi bi-play-circle-fill display-4"></i>
                </div>
              </template>
              <img v-else :src="item.media || item.image" class="card-img-top" style="height: 220px; object-fit: cover;">
              
              <div class="position-absolute top-0 start-0 p-3">
                <span class="badge bg-primary shadow px-3 border-0">{{ getKhmerCategory(item.category) }}</span>
              </div>
            </div>

            <div class="card-body p-4 d-flex flex-column">
              <h6 class="card-title fw-bold text-dark mb-3 line-clamp-2 lh-base">{{ item.title }}</h6>
              <div class="d-flex justify-content-between align-items-center mt-auto pt-3 text-muted small border-top">
                <span><i class="bi bi-calendar3 me-1"></i> {{ item.date }}</span>
                <span class="fw-bold text-primary">{{ item.author || 'NP News' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-3 text-muted">កំពុងផ្ទុកទិន្នន័យ...</p>
      </div>

      <div v-else class="text-center py-5">
        <i class="bi bi-newspaper display-1 text-secondary opacity-25"></i>
        <p class="mt-3 text-muted">មិនមានព័ត៌មានសម្រាប់បង្ហាញឡើយ</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import localforage from 'localforage';

const router = useRouter();
const newsList = ref([]);
const isLoading = ref(true);
const activeFilter = ref('all');

localforage.config({ name: 'NP_News_App', storeName: 'articles' });

const filteredNews = computed(() => {
  if (activeFilter.value === 'all') return newsList.value;
  return newsList.value.filter(item => activeFilter.value === 'video' ? item.mediaType === 'video' : item.mediaType !== 'video');
});

const goToDetail = (id) => { router.push(`/news/${id}`); };
const getKhmerCategory = (en) => {
  const map = { 'National': 'ជាតិ', 'Society': 'សង្គម', 'Sports': 'កីឡា', 'Tech': 'បច្ចេកវិទ្យា', 'Entertainment': 'កម្សាន្ត' };
  return map[en] || en;
};

const loadNewsData = async () => {
  isLoading.value = true;
  try {
    const saved = await localforage.getItem('news_list');
    if (saved) newsList.value = saved;
  } catch (error) { console.error(error); } finally { isLoading.value = false; }
};

onMounted(() => { loadNewsData(); });
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&display=swap');
.font-khmer { font-family: 'Battambang', sans-serif; }
.news-app-wrapper * { border-radius: 0 !important; }
.cursor-pointer { cursor: pointer; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hover-up { transition: all 0.3s ease; }
.hover-up:hover { transform: translateY(-8px); box-shadow: 0 15px 35px rgba(0,0,0,0.12) !important; }
.bg-light-subtle { background-color: #f8f9fa !important; }
.btn-white { background-color: #fff; color: #333; }
.card-img-top { transition: transform 0.5s ease; }
.card:hover .card-img-top { transform: scale(1.05); }
</style>