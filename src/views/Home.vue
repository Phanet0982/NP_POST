<template>
  <div class="news-app-wrapper bg-light-subtle min-vh-100">
    <div class="container py-5 font-khmer">
      
      <div v-if="!selectedNews">
        <div class="d-flex justify-content-between align-items-end mb-5 pb-4">
          <div>
            <h2 class="fw-bold text-dark mb-1 border-start border-primary border-4 ps-3">ព័ត៌មានថ្មីៗបំផុត</h2>
            <p class="text-muted mb-0 ps-3">អានព្រឹត្តិការណ៍ថ្មីៗដែលកំពុងកើតឡើងក្នុងប្រទេសកម្ពុជា</p>
          </div>
        </div>

        <div v-if="newsList.length > 0" class="row g-4">
          <div v-for="item in newsList" :key="item.id" class="col-12 col-md-6 col-lg-4">
            <div @click="viewDetail(item)" class="card h-100 shadow hover-up bg-white">
              <div class="position-relative overflow-hidden">
                <img :src="item.image" class="card-img-top" style="height: 220px; object-fit: cover;">
                <div class="position-absolute top-0 start-0 p-3">
                  <span class="badge bg-primary shadow px-3">{{ getKhmerCategory(item.category) }}</span>
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
    <h6 class="fw-bold mb-0 text-uppercase">ប្រធានបទ</h6>
  </div>

          <h5 class="fw-bold text-dark mb-4 lh-base">{{ selectedNews.title }}</h5>

          <img :src="selectedNews.image" class="img-fluid mb-5 w-100 shadow" style="max-height: 500px; object-fit: cover;">

            <div class="mb-4 py-3 d-flex align-items-center justify-content-between px-3 shadow ">
            <div class="d-flex align-items-center gap-2">
              <img :src="`https://ui-avatars.com/api/?name=${selectedNews.author}&background=0d6efd&color=fff`" class="shadow-sm" width="35" height="35">
              <span class="small text-muted">ដោយ៖ <strong class="text-dark">{{ selectedNews.author }}</strong></span>
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
                      
                      <div class="dropdown">
                        <button class="btn btn-link text-dark p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i class="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow border-0 p-0">
                          <li v-if="isMyComment(c)">
                            <button class="dropdown-item py-2 text-danger small" @click="deleteComment(id)">
                              <i class="bi bi-trash3 me-2"></i>លុបមតិយោបល់
                            </button>
                          </li>
                          <li v-else>
                            <span class="dropdown-item disabled small text-muted">មិនអាចលុបបាន</span>
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
          <div class="card  p-4" style="top: 20px;">
            <h5 class="fw-bold mb-4 border-start border-primary border-4 ps-2">ព័ត៌មានពេញនិយម</h5>
            <div v-for="pop in newsList" :key="pop.id" class="d-flex mb-3 gap-3 cursor-pointer news-sidebar-item" @click="viewDetail(pop)">
              <img :src="pop.image" class="shadow-sm" style="width: 120px; height: 80px; object-fit: cover;">
              <h6 class="small fw-bold line-clamp-2  m-0 lh-base text-dark">{{ pop.title }}</h6>
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
const newCommentText = ref('');

// Save to LocalStorage
const saveAll = () => {
  localStorage.setItem('app_news_data', JSON.stringify(newsList.value));
};

const viewDetail = (item) => {
  selectedNews.value = item;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Check if user has permission to delete
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
    userEmail: currentUser ? currentUser.email : 'guest@test.com', // Assigned email for deletion testing
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

const getKhmerCategory = (en) => {
  const map = { 'National': 'ជាតិ', 'Society': 'សង្គម' };
  return map[en] || en;
};

onMounted(() => {
  // Set a default user session so "Delete" works for your comments
  if (!localStorage.getItem('np_news_user')) {
    localStorage.setItem('np_news_user', JSON.stringify({
      name: "អ្នកប្រើប្រាស់",
      email: "guest@test.com",
      avatar: "https://ui-avatars.com/api/?name=User&background=random"
    }));
  }

  const saved = localStorage.getItem('app_news_data');
  if (saved) {
    newsList.value = JSON.parse(saved);
  } else {
    // Content from images
    newsList.value = [
      { 
        id: 1, 
        title: "Kandal Governor launches emergency pumping to save drought-hit rice crops", 
        content: "<p>Kandal Governor Kuoch Chamroeun ordered emergency irrigation measures yesterday to save more than 400 hectares of rice crops currently suffering from a severe water shortage.</p>", 
        category: "National", 
        date: "January 16, 2026", 
        image: "https://www.khmertimeskh.com/wp-content/uploads/2026/01/Kandal-Governor-launches-emergency-pumping-to-save-drought-hit-rice-crops.jpg", 
        author: "Tom Vibol",
        likes: 0, isLiked: false, comments: []
      },
      { 
        id: 2, 
        title: "Prime Minister inspects intervention in pumping water to people's rice fields in Bati district", 
        content: "Details about the Prime Minister's visit to Bati district.", 
        category: "National", 
        date: "January 29, 2025", 
        image: "https://picsum.photos/id/11/800/500", 
        author: "Khmer Times",
        likes: 0, isLiked: false, comments: []
      }
    ];
    saveAll();
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;700&display=swap');

/* RESET: NO BORDERS, NO ROUNDED CORNERS */
* { border-radius: 0 !important; border: none !important; }

.font-khmer { font-family: 'Khmer OS Battambang', sans-serif; }
.cursor-pointer { cursor: pointer; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* SHADOW STYLING */
.shadow-sm { box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important; }
.shadow { box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; }
.shadow-top { box-shadow: 0 -1px 0 rgba(0,0,0,0.05); }
.shadow-bottom { box-shadow: 0 1px 0 rgba(0,0,0,0.05); }
.shadow-inner { box-shadow: inset 0 2px 4px rgba(0,0,0,0.06) !important; }

.hover-up:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(0,0,0,0.15) !important; transition: 0.3s; }
.news-sidebar-item:hover { background-color: #f8f9fa; transition: 0.2s; }

.bg-light-subtle { background-color: #f2f4f7 !important; }
.bg-white { background-color: #ffffff !important; }

/* Ensure the dropdown menu actually looks like a menu since borders are disabled */
.dropdown-menu { border: 1px solid #eee !important; box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important; }
</style>