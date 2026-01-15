<template>
  <div class="container py-4 font-khmer">
    
    <div v-if="!selectedNews">
      <div v-if="filteredNews.length > 0" class="row g-4">
        <div v-for="item in filteredNews" :key="item.id" class="col-md-6 col-lg-4">
          <div @click="viewDetail(item)" class="card h-100 border-0 shadow-sm sports-card overflow-hidden cursor-pointer">
            <div class="position-relative overflow-hidden">
              <img :src="item.image" class="card-img-top sports-img" :alt="item.title">
              <div class="position-absolute bottom-0 start-0 p-3 w-100 bg-gradient-dark">
                 <span class="badge bg-primary rounded-pill px-3">{{ item.badge || 'កីឡា' }}</span>
              </div>
            </div>
            <div class="card-body p-4">
              <p class="text-primary small fw-bold mb-2"><i class="bi bi-calendar3 me-2"></i>{{ item.date }}</p>
              <h5 class="card-title fw-bold text-dark mb-3 line-clamp-2 lh-base">{{ item.title }}</h5>
              <div class="d-flex align-items-center text-muted small mt-auto">
                 <span class="me-3"><i class="bi bi-hand-thumbs-up me-1"></i> ចូលចិត្ត</span>
                 <span><i class="bi bi-share me-1"></i> ចែករំលែក</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-5 bg-white rounded-4 shadow-sm border border-dashed">
        <div class="py-5">
          <i class="bi bi-dribbble text-muted opacity-25" style="font-size: 5rem;"></i>
          <h4 class="text-muted mt-3">មិនទាន់មានព័ត៌មានកីឡានៅឡើយទេ</h4>
          <p class="text-muted small">សូមបន្ថែមព័ត៌មានក្នុង Dashboard ដោយជ្រើសរើសប្រភេទ "Sports"</p>
        </div>
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
          ប្រភេទ៖ <span class="fw-bold text-primary text-uppercase">ព័ត៌មានកីឡា</span> • {{ selectedNews.date }}
        </div>

        <img :src="selectedNews.image" class="img-fluid rounded-4 mb-3 shadow-sm w-100" style="max-height: 450px; object-fit: cover;">
        
        <div class="article-body fs-5 lh-lg mb-5 text-dark">
          <div v-if="selectedNews.content" v-html="selectedNews.content"></div>
          <p v-else>ខ្លឹមសារលម្អិតនៃព្រឹត្តិការណ៍កីឡានេះ កំពុងត្រូវបានរៀបចំជូន។</p>
        </div>

        <hr>
        <h4 class="fw-bold mb-4 mt-5">ព័ត៌មានកីឡាពាក់ព័ន្ធ</h4>
        <div class="row g-3">
          <div v-for="related in getRelated()" :key="'rel-'+related.id" class="col-md-4">
            <div @click="viewDetail(related)" class="cursor-pointer">
              <img :src="related.image" class="img-fluid rounded-3 mb-2 sports-img-hover shadow-sm" style="height: 120px; width: 100%; object-fit: cover;">
              <h6 class="fw-bold small line-clamp-2 text-dark">{{ related.title }}</h6>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="sticky-top" style="top: 20px;">
          <h5 class="fw-bold pb-2 mb-4 border-bottom border-primary">ព័ត៌មានកីឡាថ្មីៗ</h5>
          <div v-for="pop in filteredNews.slice(0, 5)" :key="'side-'+pop.id" class="d-flex mb-4 gap-3 cursor-pointer" @click="viewDetail(pop)">
            <img :src="pop.image" class="rounded shadow-sm" style="width: 100px; height: 70px; object-fit: cover; flex-shrink: 0;">
            <div>
              <h6 class="mb-1 fw-bold small line-clamp-2" style="line-height: 1.4;">{{ pop.title }}</h6>
              <span class="text-primary small" style="font-size: 0.75rem;">{{ pop.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const filteredNews = ref([]);
const selectedNews = ref(null);

const viewDetail = (item) => {
  selectedNews.value = item;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const getRelated = () => {
  return filteredNews.value
    .filter(item => item.id !== selectedNews.value?.id)
    .slice(0, 3);
};

onMounted(() => {
  const data = localStorage.getItem('app_news_data');
  if (data) {
    const allNews = JSON.parse(data);
    filteredNews.value = allNews.filter(n => n.category === 'Sports');
  }
});
</script>

<style scoped>
.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }
.cursor-pointer { cursor: pointer; }

.sports-card {
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent !important;
}

.sports-card:hover {
  transform: translateY(-5px);
  border-bottom: 3px solid #0d6efd !important;
}

.sports-img {
  height: 220px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.sports-card:hover .sports-img {
  transform: scale(1.1);
}

.sports-img-hover:hover {
  opacity: 0.8;
  transform: scale(1.02);
  transition: 0.3s;
}

.bg-gradient-dark {
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sticky-top { z-index: 10; }
</style>