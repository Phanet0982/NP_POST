<template>
  <div class="container py-4 font-khmer">
    
    <div v-if="!selectedNews">
      <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h2 class="fw-black text-dark mb-0">ព័ត៌មានពេញនិយម</h2>
        <span class="badge bg-danger px-3">Trending Now</span>
      </div>

      <div v-if="filteredNews.length > 0" class="row g-4">
        <div v-for="item in filteredNews" :key="item.id" class="col-12 col-md-6 col-lg-4">
          <div @click="viewDetail(item)" class="card h-100 border-0 shadow-sm hover-up rounded-4 overflow-hidden">
            <div class="position-relative">
              <img :src="item.image" class="card-img-top clickable-img" style="height: 220px; object-fit: cover;">
              <div class="position-absolute top-0 end-0 p-2">
                <span class="badge bg-danger rounded-pill">{{ item.badge || 'Popular' }}</span>
              </div>
            </div>
            <div class="card-body p-4">
              <h5 class="card-title fw-bold text-dark mb-3 line-clamp-2">{{ item.title }}</h5>
              <p class="text-muted small mb-0"><i class="bi bi-calendar3 me-2"></i>{{ item.date }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-5">
        <i class="bi bi-folder2-open display-1 text-muted opacity-25"></i>
        <p class="mt-3 text-muted">មិនមានព័ត៌មានក្នុងផ្នែកនេះឡើយ</p>
      </div>
    </div>

    <div v-else class="row g-5">
      <div class="col-lg-8">
        <nav aria-label="breadcrumb">
          <button @click="selectedNews = null" class="btn btn-link text-primary p-0 mb-4 d-inline-flex align-items-center text-decoration-none fw-bold">
            <i class="bi bi-arrow-left me-2"></i> ត្រឡប់ក្រោយ
          </button>
        </nav>

        <h4 class="fw-bold text-dark mb-3 lh-base">{{ selectedNews.title }}</h4>
        
        <div class="mb-4 border-bottom pb-3 text-muted small">
          By <span class="fw-bold text-dark text-uppercase">Editorial Team</span> • {{ selectedNews.date }}
        </div>

        <img :src="selectedNews.image" class="img-fluid rounded-4 mb-3 shadow-sm w-100" style="max-height: 450px; object-fit: cover;">
        <p class="text-muted fst-italic mb-4  ">រូបភាពតំណាង៖ {{ selectedNews.title }}</p>

        <div class="article-body fs-5 lh-lg mb-5 text-dark">
          <p v-if="selectedNews.content" v-html="selectedNews.content"></p>
          <p v-else>
            អត្ថបទពេញលេញសម្រាប់ព័ត៌មាននេះ កំពុងត្រូវបានបញ្ចូលទៅក្នុងប្រព័ន្ធ។ សូមអញ្ជើញមកពិនិត្យមើលឡើងវិញនៅពេលក្រោយ។
          </p>
        </div>

        <hr>

        <h4 class="fw-bold mb-4 mt-5">ព័ត៌មានទាក់ទង</h4>
        <div class="row g-3">
          <div v-for="related in getRelated()" :key="'rel-'+related.id" class="col-md-4">
            <div @click="viewDetail(related)" class="cursor-pointer group">
              <img :src="related.image" class="img-fluid rounded-3 mb-2 clickable-img shadow-sm" style="height: 120px; width: 100%; object-fit: cover;">
              <h6 class="fw-bold small line-clamp-2 group-hover-text-primary text-dark">{{ related.title }}</h6>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="sticky-top" style="top: 20px;">
          <h5 class="fw-bold pb-2 mb-4 ">ពេញនិយមបំផុត</h5>
          <div v-for="pop in filteredNews.slice(0, 6)" :key="'pop-'+pop.id" class="d-flex mb-4 gap-3 cursor-pointer align-items-start" @click="viewDetail(pop)">
            <img :src="pop.image" class="rounded clickable-img shadow-sm" style="width: 100px; height: 70px; object-fit: cover; flex-shrink: 0;">
            <div>
              <h6 class="mb-1 fw-bold small line-clamp-2" style="line-height: 1.4;">{{ pop.title }}</h6>
              <span class="text-danger fw-bold" style="font-size: 0.7rem;">{{ pop.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const filteredNews = ref([]); // Stores the list of popular news
const selectedNews = ref(null); // Stores the currently viewed article

// Logic to switch to Detail View
const viewDetail = (item) => {
  selectedNews.value = item;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Logic for related news (filters out current item)
const getRelated = () => {
  return filteredNews.value.filter(item => item.id !== selectedNews.value?.id).slice(0, 3);
};

onMounted(() => {
  const data = localStorage.getItem('app_news_data');
  if (data) {
    const allNews = JSON.parse(data);
    // Filter to only show news tagged as "Popular"
    filteredNews.value = allNews.filter(n => n.category === 'Popular');
  }
});
</script>

<style scoped>
.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }
.cursor-pointer { cursor: pointer; }

/* Same Hover Effects as Home.vue */
.clickable-img { 
  cursor: pointer; 
  transition: all 0.3s ease; 
}
.clickable-img:hover { 
  opacity: 0.9; 
  transform: scale(1.03);
}

.line-clamp-2 { 
  display: -webkit-box; 
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical; 
  overflow: hidden; 
}

.hover-up { 
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
  cursor: pointer; 
}
.hover-up:hover { 
  transform: translateY(-8px); 
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

.sticky-top { z-index: 10; }

.fw-black { font-weight: 900; }
</style>