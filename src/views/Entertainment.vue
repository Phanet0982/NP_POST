<template>
  <div class="news-app-wrapper bg-light-subtle min-vh-100">
    <div class="container py-5 font-khmer">
      
      <div v-if="!selectedNews">
        <div class="d-flex justify-content-between align-items-end mb-5 pb-4 border-bottom-news">
          <div>
            <h2 class="fw-bold text-dark mb-1 border-start border-primary border-4 ps-3">ព័ត៌មានកម្សាន្ត</h2>
            <p class="text-muted mb-0 ps-3">អានព្រឹត្តិការណ៍សិល្បៈ និងកម្សាន្តថ្មីៗបំផុត</p>
          </div>
        </div>

        <div v-if="filteredNews.length > 0" class="row g-4">
          <div v-for="item in filteredNews" :key="item.id" class="col-12 col-md-6 col-lg-4">
            <div @click="viewDetail(item)" class="card h-100 shadow hover-up bg-white">
              <div class="position-relative overflow-hidden">
                <img :src="item.image" class="card-img-top" style="height: 220px; object-fit: cover;">
                <div class="position-absolute top-0 start-0 p-3">
                  <span class="badge bg-primary shadow px-3">កម្សាន្ត</span>
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
      </div>

      <div v-else class="row g-5 animate-fade-in">
        <div class="col-lg-8">
          <button @click="selectedNews = null" class="btn btn-white shadow-sm px-4 mb-4 text-secondary">
            <i class="bi bi-arrow-left me-1"></i> ត្រឡប់ក្រោយ
          </button>

          <div class="d-flex align-items-center mb-3 border-bottom pb-2">
            <i class="bi bi-grid-fill text-primary me-2"></i>
            <h6 class="fw-bold mb-0 text-uppercase">ប្រធានបទ៖ កម្សាន្ត</h6>
          </div>

          <h5 class="fw-bold text-dark mb-4 lh-base">{{ selectedNews.title }}</h5>

          <img :src="selectedNews.image" class="img-fluid mb-5 w-100 shadow" style="max-height: 500px; object-fit: cover;">

          <div class="mb-4 py-3 d-flex align-items-center justify-content-between px-3 shadow bg-white">
            <div class="d-flex align-items-center gap-2">
              <img :src="`https://ui-avatars.com/api/?name=${selectedNews.author || 'Author'}&background=0d6efd&color=fff`" width="35" height="35">
              <span class="small text-muted">ដោយ៖ <strong class="text-dark">{{ selectedNews.author || 'អ្នកសារព័ត៌មាន' }}</strong></span>
            </div>
            <button @click="handleLike" class="btn btn-sm shadow-sm" :class="selectedNews.isLiked ? 'btn-danger' : 'btn-light'">
              <i class="bi" :class="selectedNews.isLiked ? 'bi-heart-fill' : 'bi-heart'"></i> 
              {{ selectedNews.likes || 0 }} ចូលចិត្ត
            </button>
          </div>

          <div class="article-body mb-5 text-dark fs-5 lh-lg px-2" v-html="selectedNews.content"></div>

          <div class="p-4 bg-white shadow mb-5">
            <h4 class="fw-bold mb-4 shadow-bottom pb-2">មតិយោបល់ ({{ selectedNews.comments?.length || 0 }})</h4>
            
            <div class="mb-5">
              <textarea v-model="newCommentText" class="form-control bg-light p-3 shadow-inner" rows="3" placeholder="សរសេរមតិរបស់អ្នក..."></textarea>
              <div class="d-flex justify-content-end mt-2">
                <button @click="submitComment" class="btn btn-primary px-4 shadow" :disabled="!newCommentText.trim()">
                  <i class="bi bi-send-fill me-2"></i>បញ្ជូនមតិ
                </button>
              </div>
            </div>

            <div v-if="selectedNews.comments?.length > 0">
              <div v-for="(c, idx) in selectedNews.comments" :key="idx" class="d-flex gap-3 mb-4 p-3 bg-white shadow-sm animate-slide-up">
                <img :src="c.userAvatar" class="shadow-sm" style="width: 45px; height: 45px; object-fit: cover; flex-shrink: 0;">
                <div class="w-100">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="fw-bold text-primary">{{ c.userName }}</span>
                    <div class="d-flex align-items-center gap-2">
                      <span class="text-muted" style="font-size: 0.75rem;">{{ c.time }}</span>
                      <div class="dropdown" v-if="isMyComment(c)">
                        <button class="btn btn-link text-dark p-0 border-0" type="button" data-bs-toggle="dropdown">
                          <i class="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow border-0 p-0">
                          <li>
                            <button class="dropdown-item py-2 text-danger small" @click="deleteComment(idx)">
                              <i class="bi bi-trash3 me-2"></i>លុបមតិយោបល់
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="text-dark small lh-base">{{ c.text }}</div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-5 text-muted shadow-inner">មិនទាន់មានមតិយោបល់នៅឡើយទេ</div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card p-4 border-0 shadow" style="position: sticky; top: 20px;">
            <h5 class="fw-bold mb-4 border-start border-primary border-4 ps-2">ព័ត៌មានកម្សាន្តពេញនិយម</h5>
            <div v-for="pop in filteredNews.slice(0, 5)" :key="'side-'+pop.id" class="d-flex mb-3 gap-3 cursor-pointer news-sidebar-item" @click="viewDetail(pop)">
              <img :src="pop.image" class="shadow-sm" style="width: 110px; height: 75px; object-fit: cover; flex-shrink: 0;">
              <h6 class="small fw-bold line-clamp-2 m-0 lh-base text-dark">{{ pop.title }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const allNews = ref([]);
const filteredNews = ref([]);
const selectedNews = ref(null);
const newCommentText = ref('');

// Save to LocalStorage
const saveAll = () => {
  localStorage.setItem('app_news_data', JSON.stringify(allNews.value));
};

const viewDetail = (item) => {
  selectedNews.value = item;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// --- Comment Logic ---
const isMyComment = (comment) => {
  const sessionData = localStorage.getItem('np_news_user');
  if (!sessionData) return false;
  const currentUser = JSON.parse(sessionData);
  return comment.userEmail === currentUser.email;
};

const submitComment = () => {
  if (!newCommentText.value.trim()) return;
  const sessionData = localStorage.getItem('np_news_user');
  const currentUser = sessionData ? JSON.parse(sessionData) : null;
  
  const newComment = {
    text: newCommentText.value,
    userName: currentUser ? currentUser.name : 'អ្នកអាន',
    userAvatar: currentUser ? currentUser.avatar : `https://ui-avatars.com/api/?name=Guest&background=6c757d&color=fff`,
    userEmail: currentUser ? currentUser.email : 'guest@test.com',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ថ្ងៃនេះ'
  };

  if (!selectedNews.value.comments) selectedNews.value.comments = [];
  selectedNews.value.comments.unshift(newComment);
  newCommentText.value = ''; 
  saveAll();
};

const deleteComment = (index) => {
  if (confirm('តើអ្នកពិតជាចង់លុបមតិយោបល់នេះមែនទេ?')) {
    selectedNews.value.comments.splice(index, 1);
    saveAll();
  }
};

const handleLike = () => {
  if (!selectedNews.value.isLiked) {
    selectedNews.value.likes = (selectedNews.value.likes || 0) + 1;
    selectedNews.value.isLiked = true;
  } else {
    if (selectedNews.value.likes > 0) selectedNews.value.likes -= 1;
    selectedNews.value.isLiked = false;
  }
  saveAll();
};

onMounted(() => {
  const data = localStorage.getItem('app_news_data');
  if (data) {
    allNews.value = JSON.parse(data);
    filteredNews.value = allNews.value.filter(n => n.category === 'Entertainment');
  }
});
</script>

<style scoped>
/* EXACT STYLE FROM HOME.VUE */
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;700&display=swap');

* { border-radius: 0 !important; border: none !important; }

.font-khmer { font-family: 'Khmer OS Battambang', sans-serif; }
.cursor-pointer { cursor: pointer; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.shadow-sm { box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important; }
.shadow { box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; }
.shadow-top { border-top: 1px solid #eee !important; }
.shadow-bottom { border-bottom: 1px solid #eee !important; }
.shadow-inner { box-shadow: inset 0 2px 4px rgba(0,0,0,0.06) !important; }

.hover-up:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(0,0,0,0.15) !important; transition: 0.3s; }
.news-sidebar-item:hover { background-color: #f8f9fa; transition: 0.2s; }

.bg-light-subtle { background-color: #f2f4f7 !important; }
.bg-white { background-color: #ffffff !important; }
.border-bottom-news { border-bottom: 1px solid #dee2e6 !important; }

.dropdown-menu { border: 1px solid #eee !important; box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important; }

.animate-fade-in { animation: fadeIn 0.4s ease-in; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.animate-slide-up { animation: slideUp 0.4s ease-out; }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
</style>