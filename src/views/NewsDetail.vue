<template>
  <div class="news-app-wrapper bg-light-subtle min-vh-100">
    <div class="container py-5 font-khmer" v-if="article">
      
      <div class="row g-5 animate-fade-in">
        <div class="col-lg-8">
          <router-link to="/" class="btn btn-white shadow-sm px-4 mb-4 text-secondary text-decoration-none">
            <i class="bi bi-arrow-left me-1"></i> ត្រឡប់ក្រោយ
          </router-link>

          <div class="d-flex align-items-center mb-3 border-bottom pb-2">
            <i class="bi bi-grid-fill text-primary me-2"></i>
            <h6 class="fw-bold mb-0 text-uppercase">ប្រធានបទ: {{ getKhmerCategory(article.category) }}</h6>
          </div>

          <h5 class="fw-bold text-dark mb-4 lh-base">{{ article.title }}</h5>

          <img :src="article.image" class="img-fluid mb-5 w-100 shadow" style="max-height: 500px; object-fit: cover;">

          <div class="mb-4 py-3 d-flex align-items-center justify-content-between px-3 shadow bg-white">
            <div class="d-flex align-items-center gap-2">
              <img :src="`https://ui-avatars.com/api/?name=${article.author}&background=0d6efd&color=fff`" class="shadow-sm" width="35" height="35">
              <span class="small text-muted">ដោយ៖ <strong class="text-dark">{{ article.author }}</strong></span>
            </div>
            <button @click="handleLike" class="btn btn-sm shadow-sm" :class="article.isLiked ? 'btn-danger' : 'btn-light'">
              <i class="bi" :class="article.isLiked ? 'bi-heart-fill' : 'bi-heart'"></i> 
              {{ article.likes || 0 }} ចូលចិត្ត
            </button>
          </div>

          <div class="article-body mb-5 text-dark fs-5 lh-lg px-2" v-html="article.content"></div>

          <div class="p-4 bg-white shadow mb-5">
            <h4 class="fw-bold mb-4 shadow-bottom pb-2">មតិយោបល់ ({{ article.comments?.length || 0 }})</h4>
            
            <div class="mb-5">
              <textarea v-model="newCommentText" class="form-control bg-light p-3 shadow-inner" rows="3" placeholder="សរសេរមតិរបស់អ្នក..."></textarea>
              <div class="d-flex justify-content-end mt-2">
                <button @click="submitComment" class="btn btn-primary px-4 shadow" :disabled="!newCommentText.trim()">
                  <i class="bi bi-send-fill me-2"></i>បញ្ជូនមតិ
                </button>
              </div>
            </div>

            <div v-if="article.comments?.length > 0">
              <div v-for="(c, idx) in article.comments" :key="idx" class="d-flex gap-3 mb-4 p-3 bg-white shadow-sm">
                <img :src="c.userAvatar" class="shadow-sm" style="width: 45px; height: 45px; object-fit: cover; flex-shrink: 0;">
                
                <div class="w-100">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="fw-bold text-primary">{{ c.userName }}</span>
                    <div class="d-flex align-items-center gap-2">
                      <span class="text-muted" style="font-size: 0.75rem;">{{ c.time }}</span>
                      
                      <div class="dropdown">
                        <button class="btn btn-link text-dark p-0 border-0" type="button" data-bs-toggle="dropdown">
                          <i class="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow border-0 p-0">
                          <li v-if="isMyComment(c)">
                            <button class="dropdown-item py-2 text-danger small" @click="deleteComment(idx)">
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
          <div class="card p-4 shadow-sm bg-white" style="position: sticky; top: 20px;">
            <h5 class="fw-bold mb-4 border-start border-primary border-4 ps-2" style="border-left: 4px solid #0d6efd !important;">ព័ត៌មានផ្សេងៗ</h5>
            <div v-for="pop in recentNews" :key="pop.id" class="d-flex mb-3 gap-3 cursor-pointer news-sidebar-item" @click="goToNews(pop.id)">
              <img :src="pop.image" class="shadow-sm" style="width: 120px; height: 80px; object-fit: cover; flex-shrink: 0;">
              <h6 class="small fw-bold line-clamp-2 m-0 lh-base text-dark">{{ pop.title }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container py-5 text-center">
      <h3 class="mb-4">រកមិនឃើញអត្ថបទព័ត៌មាននេះទេ</h3>
      <router-link to="/" class="btn btn-primary shadow px-5">ត្រឡប់ទៅទំព័រដើម</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const article = ref(null);
const recentNews = ref([]);
const newCommentText = ref('');
const allNewsData = ref([]);

// Sync back to local storage
const saveAll = () => {
  localStorage.setItem('app_news_data', JSON.stringify(allNewsData.value));
};

const loadData = () => {
  const saved = localStorage.getItem('app_news_data');
  if (saved) {
    allNewsData.value = JSON.parse(saved);
    const found = allNewsData.value.find(item => item.id == route.params.id);
    article.value = found;
    recentNews.value = allNewsData.value.filter(item => item.id != route.params.id).slice(0, 6);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleLike = () => {
  if (!article.value.isLiked) {
    article.value.likes = (article.value.likes || 0) + 1;
    article.value.isLiked = true;
  } else {
    if (article.value.likes > 0) article.value.likes -= 1;
    article.value.isLiked = false;
  }
  saveAll();
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

  if (!article.value.comments) article.value.comments = [];
  article.value.comments.unshift(newComment);
  newCommentText.value = ''; 
  saveAll();
};

const deleteComment = (index) => {
  if (confirm('តើអ្នកពិតជាចង់លុបមតិយោបល់នេះមែនទេ?')) {
    article.value.comments.splice(index, 1);
    saveAll();
  }
};

const isMyComment = (comment) => {
  const sessionData = localStorage.getItem('np_news_user');
  if (!sessionData) return false;
  const currentUser = JSON.parse(sessionData);
  return comment.userEmail === currentUser.email;
};

const goToNews = (id) => {
  router.push(`/news/${id}`);
};

const getKhmerCategory = (en) => {
  const map = { 'National': 'ជាតិ', 'Society': 'សង្គម' };
  return map[en] || en;
};

onMounted(loadData);
watch(() => route.params.id, loadData);
</script>

<style scoped>
/* RESET: NO BORDERS, NO ROUNDED CORNERS */
* { border-radius: 0 !important; border: none !important; }

.font-khmer { font-family: 'Khmer OS Battambang', sans-serif; }
.cursor-pointer { cursor: pointer; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* SHADOW STYLING */
.shadow-sm { box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important; }
.shadow { box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; }
.shadow-inner { box-shadow: inset 0 2px 4px rgba(0,0,0,0.06) !important; }
.shadow-bottom { box-shadow: 0 1px 0 rgba(0,0,0,0.05); }

.news-sidebar-item:hover { background-color: #f8f9fa; transition: 0.2s; }
.bg-light-subtle { background-color: #f2f4f7 !important; }
.bg-white { background-color: #ffffff !important; }

/* Fixed dropdown appearance for no-border style */
.dropdown-menu { border: 1px solid #eee !important; box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important; }
</style>