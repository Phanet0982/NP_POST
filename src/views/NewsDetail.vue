<template>
  <div class="news-app-wrapper bg-light-subtle min-vh-100 font-khmer">
    <div class="container py-5" v-if="article">
      
      <div class="row g-5">
        <div class="col-lg-8">
          <button @click="router.back()" class="btn btn-white shadow-sm px-4 mb-4 text-secondary border-0">
            <i class="bi bi-arrow-left me-1"></i> ត្រឡប់ក្រោយ
          </button>

          <div class="d-flex align-items-center mb-3 border-bottom pb-2">
            <i class="bi bi-bookmark-fill text-primary me-2"></i>
            <h6 class="fw-bold mb-0 text-uppercase">ប្រធានបទ: {{ getKhmerCategory(article.category) }}</h6>
          </div>

          <h3 class="fw-bold text-dark mb-4 lh-base">{{ article.title }}</h3>

          <div class="media-container mb-5 shadow">
            <img v-if="article.mediaType !== 'video'" :src="article.media" class="img-fluid w-100" style="max-height: 500px; object-fit: cover;">
            <video v-else :src="article.media" class="w-100" controls style="max-height: 500px; background: #000;"></video>
          </div>

          <div class="mb-4 py-3 d-flex align-items-center justify-content-between px-3 shadow bg-white">
            <div class="d-flex align-items-center gap-2">
              <img :src="`https://ui-avatars.com/api/?name=${article.author || 'Admin'}&background=0d6efd&color=fff`" class="shadow-sm" width="35" height="35">
              <span class="small text-muted">ដោយ៖ <strong class="text-dark">{{ article.author || 'NP News Admin' }}</strong></span>
            </div>
            
            <div class="d-flex align-items-center gap-2">
              <span class="small text-muted me-2"><i class="bi bi-calendar3 me-1"></i> {{ article.date }}</span>
              <button @click="handleLike" class="btn btn-sm shadow-sm border-0 transition-btn" :class="article.isLiked ? 'btn-danger' : 'btn-light'">
                <i class="bi" :class="article.isLiked ? 'bi-heart-fill' : 'bi-heart'"></i> 
                {{ article.likes || 0 }}
              </button>
            </div>
          </div>

          <div class="article-body mb-5 text-dark fs-5 lh-lg px-2" style="white-space: pre-line;">
            {{ article.content }}
          </div>

          <div class="p-4 bg-white shadow mb-5">
            <h4 class="fw-bold mb-4 border-bottom pb-2">មតិយោបល់ ({{ article.comments?.length || 0 }})</h4>
            
            <div class="mb-5">
              <textarea v-model="newCommentText" class="form-control bg-light p-3 shadow-inner border-0" rows="3" placeholder="សរសេរមតិរបស់អ្នក..."></textarea>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <small class="text-muted fst-italic">* សូមរក្សាសីលធម៌ក្នុងការបញ្ចេញមតិ</small>
                <button @click="submitComment" class="btn btn-primary px-4 shadow border-0" :class="{ 'opacity-50': !newCommentText.trim() }">
                  <i class="bi bi-send-fill me-2"></i>បញ្ជូនមតិ
                </button>
              </div>
            </div>

            <div v-if="article.comments?.length > 0">
              <div v-for="(c, idx) in article.comments" :key="idx" class="d-flex gap-3 mb-4 p-3 bg-white shadow-sm border-0 comment-item">
                <img :src="c.userAvatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'" class="shadow-sm" style="width: 45px; height: 45px; object-fit: cover;">
                
                <div class="w-100">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="fw-bold text-primary">{{ c.userName }}</span>
                    <div class="d-flex align-items-center gap-2">
                      <span class="text-muted small">{{ c.time }}</span>
                      <button v-if="isMyComment(c)" class="btn btn-link text-danger p-0 border-0" @click="deleteComment(idx)">
                        <i class="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                  <div class="text-dark small lh-base">{{ c.text }}</div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-5 text-muted shadow-inner bg-light-subtle">
              <i class="bi bi-chat-quote fs-1 d-block mb-2 opacity-50"></i>
              មិនទាន់មានមតិយោបល់នៅឡើយទេ
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card p-4 shadow-sm bg-white border-0" style="position: sticky; top: 20px;">
            <h5 class="fw-bold mb-4 ps-2">ព័ត៌មានថ្មីៗ</h5>
            <div v-for="pop in recentNews" :key="pop.id" class="d-flex mb-3 gap-3 cursor-pointer news-sidebar-item" @click="goToNews(pop.id)">
              <div class="flex-shrink-0" style="width: 100px; height: 70px;">
                <img v-if="pop.mediaType !== 'video'" :src="pop.media" class="w-100 h-100 shadow-sm" style="object-fit: cover;">
                <video v-else :src="pop.media" class="w-100 h-100 shadow-sm" style="object-fit: cover;" muted></video>
              </div>
              <h6 class="small fw-bold line-clamp-2 m-0 lh-base text-dark">{{ pop.title }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container py-5 text-center min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div v-if="isLoading" class="spinner-border text-primary mb-3" role="status"></div>
      <div v-else>
        <h3 class="mb-4">រកមិនឃើញអត្ថបទព័ត៌មាននេះទេ</h3>
        <router-link to="/" class="btn btn-primary shadow px-5 border-0">ត្រឡប់ទៅទំព័រដើម</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import localforage from 'localforage';

const route = useRoute();
const router = useRouter();
const article = ref(null);
const recentNews = ref([]);
const newCommentText = ref('');
const allNewsData = ref([]);
const isLoading = ref(true);

localforage.config({ name: 'NP_News_App', storeName: 'articles' });

// --- Helper: Enhanced Auth Check ---
const getSessionUser = () => {
  const sessionData = localStorage.getItem('np_news_user');
  if (!sessionData) return null;
  
  const currentUser = JSON.parse(sessionData);
  
  // Explicitly block the guest account from being recognized as "logged in"
  if (currentUser.email === 'guest@test.com') {
    localStorage.removeItem('np_news_user'); // Clean it up
    return null;
  }
  
  return currentUser;
};

// --- Data Loading ---
const loadData = async () => {
  isLoading.value = true;
  try {
    const saved = await localforage.getItem('news_list');
    if (saved) {
      allNewsData.value = saved;
      const found = allNewsData.value.find(item => item.id == route.params.id);
      article.value = found;
      
      recentNews.value = allNewsData.value
        .filter(item => item.id != route.params.id)
        .slice(0, 6);
    }
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const saveToDB = async () => {
  await localforage.setItem('news_list', JSON.parse(JSON.stringify(allNewsData.value)));
};

// --- Interactions ---

const handleLike = () => {
  const currentUser = getSessionUser();
  if (!currentUser) {
    alert("សូមចូលប្រើប្រាស់គណនីរបស់អ្នក ដើម្បីចូលចិត្តអត្ថបទនេះ!");
    return;
  }

  if (!article.value.isLiked) {
    article.value.likes = (article.value.likes || 0) + 1;
    article.value.isLiked = true;
  } else {
    article.value.likes = Math.max(0, (article.value.likes || 0) - 1);
    article.value.isLiked = false;
  }
  saveToDB();
};

const submitComment = () => {
  const currentUser = getSessionUser();
  if (!currentUser) {
    alert("សូមចូលប្រើប្រាស់គណនីរបស់អ្នក ដើម្បីបញ្ចេញមតិយោបល់!");
    return;
  }

  if (!newCommentText.value.trim()) return;
  
  const newComment = {
    text: newCommentText.value,
    userName: currentUser.name,
    userAvatar: currentUser.avatar,
    userEmail: currentUser.email,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ថ្ងៃនេះ'
  };

  if (!article.value.comments) article.value.comments = [];
  article.value.comments.unshift(newComment);
  newCommentText.value = ''; 
  saveToDB();
};

const deleteComment = (index) => {
  if (confirm('តើអ្នកពិតជាចង់លុបមតិយោបល់នេះមែនទេ?')) {
    article.value.comments.splice(index, 1);
    saveToDB();
  }
};

const isMyComment = (comment) => {
  const currentUser = getSessionUser();
  if (!currentUser) return false;
  return comment.userEmail === currentUser.email;
};

const goToNews = (id) => {
  router.push(`/news/${id}`);
};

const getKhmerCategory = (en) => {
  const map = { 
    'Popular': 'ពេញនិយម', 
    'Entertainment': 'កម្សាន្ត', 
    'Sports': 'កីឡា', 
    'Tech': 'បច្ចេកវិទ្យា', 
    'Society': 'សង្គម' 
  };
  return map[en] || en;
};

onMounted(() => {
  // Clear any existing "Guest" data on entry
  getSessionUser(); 
  loadData();
});

watch(() => route.params.id, loadData);
</script>

<style scoped>
/* Sharp Edges Design System */
* { border-radius: 0 !important; }

.font-khmer { font-family: 'Battambang', sans-serif; }
.cursor-pointer { cursor: pointer; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* Shadows & Transitions */
.shadow-sm { box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important; }
.shadow { box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; }
.shadow-inner { box-shadow: inset 0 2px 4px rgba(0,0,0,0.06) !important; }

.news-sidebar-item:hover { background-color: #f8f9fa; transition: 0.2s; }
.bg-light-subtle { background-color: #f2f4f7 !important; }

/* Custom Borders & Layout */
.border-primary { border-left: 4px solid #0d6efd !important; }

.transition-btn { transition: all 0.2s ease; transform: scale(1); }
.transition-btn:active { transform: scale(0.95); }

.comment-item { transition: background 0.3s; }
.comment-item:hover { background-color: #fafafa !important; }
</style>