<template>
  <div class="portal-wrapper bg-white">
    <main class="container-fluid p-3">
      <div class="row g-2">
        <div class="col-lg-8">
          <div @click="openDetail(heroNews)" class="card-hero main-height position-relative overflow-hidden cursor-pointer rounded-3">
            <img :src="heroNews.image" class="img-full" :alt="heroNews.title">
            <div class="overlay-grad">
              <span class="category-tag bg-primary">{{ heroNews.category }}</span>
              <h1 class="text-white fw-bold khmer-title mt-2">{{ heroNews.title }}</h1>
              <div class="text-white-50 small mt-2">
                <i class="bi bi-clock me-1"></i> {{ heroNews.date }}
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex flex-column gap-2">
          <div v-for="news in sideNews" :key="news.id" 
               @click="openDetail(news)" 
               class="card-hero side-height position-relative overflow-hidden cursor-pointer rounded-3">
            <img :src="news.image" class="img-full" :alt="news.title">
            <div class="overlay-grad p-3">
              <p class="text-white fw-bold khmer-sub mb-0">{{ news.title }}</p>
              <div class="text-white-50 smaller mt-1">{{ news.date }}</div>
            </div>
          </div>

          <div class="social-grid border rounded-3 p-2">
            <div class="row g-0 h-100">
              <div class="col-6 border-bottom border-end p-2 d-flex align-items-center"><i class="bi bi-facebook text-primary fs-4 me-2"></i><strong>8,490</strong><span class="ms-1 smaller text-muted">Fans</span></div>
              <div class="col-6 border-bottom p-2 d-flex align-items-center ps-3"><i class="bi bi-instagram text-danger fs-4 me-2"></i><strong>4,450</strong><span class="ms-1 smaller text-muted">Fans</span></div>
              <div class="col-6 border-end p-2 d-flex align-items-center"><i class="bi bi-youtube text-danger fs-4 me-2"></i><strong>10,430</strong><span class="ms-1 smaller text-muted">Fans</span></div>
              <div class="col-6 p-2 d-flex align-items-center ps-3"><i class="bi bi-telegram text-info fs-4 me-2"></i><strong>2,658</strong><span class="ms-1 smaller text-muted">Fans</span></div>
            </div>
          </div>
        </div>
      </div>

      <h3 class="section-title mt-5 mb-4">ព្រឹត្តិការណ៍ថ្មីៗ</h3>
      <div class="row g-4">
        <div v-for="post in bottomNews" :key="post.id" class="col-md-4">
          <div @click="openDetail(post)" class="cursor-pointer post-card">
            <img :src="post.image" class="img-fluid rounded-3 mb-2 main-thumb" :alt="post.title">
            <h5 class="khmer-bold">{{ post.title }}</h5>
            <p class="smaller text-muted">កាលបរិច្ឆេទ៖ {{ post.date }}</p>
            <p class="khmer-reg smaller text-secondary line-clamp-3">{{ post.content }}</p>
          </div>
        </div>
      </div>
    </main>

    <Transition name="fade">
      <div v-if="selectedNews" class="modal-overlay" @click.self="closeDetail">
        <div class="modal-content-custom shadow-lg">
          <button class="btn-close-custom" @click="closeDetail">
            <i class="bi bi-x-lg"></i>
          </button>
          
          <img :src="selectedNews.image" class="detail-img" :alt="selectedNews.title">
          
          <div class="p-4 p-md-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="badge bg-primary px-3 py-2">{{ selectedNews.category }}</span>
              <div class="text-muted small"><i class="bi bi-calendar3 me-2"></i>{{ selectedNews.date }}</div>
            </div>
            
            <h2 class="khmer-bold-large mb-4">{{ selectedNews.title }}</h2>
            
            <div class="detail-body khmer-reg text-dark">
              <p>{{ selectedNews.content }}</p>
              <p>ភ្នំពេញ៖ តាមការបញ្ជាក់បន្ថែមពីមន្ត្រីជំនាញ កិច្ចការងារនេះនឹងបន្តរហូតដល់សម្រេចបានតាមផែនការមេដែលបានគ្រោងទុក។ នេះគឺជាសមិទ្ធផលថ្មីមួយទៀតដែលបង្ហាញពីការយកចិត្តទុកដាក់ខ្ពស់លើបរិស្ថាន និងសោភ័ណភាពទីក្រុង។</p>
            </div>

            <div class="mt-5 pt-4 border-top d-flex gap-2">
              <button class="btn btn-outline-primary btn-sm"><i class="bi bi-share me-2"></i>ចែករំលែក</button>
              <button class="btn btn-light btn-sm" @click="closeDetail">បិទ</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedNews = ref(null);

const heroNews = {
  id: 1,
  category: 'ជីវិតនិងសង្គម',
  title: 'រដ្ឋមន្ត្រីក្រសួងរៀបចំដែនដីចូលរួមដាំផ្កាជើងគោ លម្អសងខាងផ្លូវជាតិលេខ៧នៅកំពង់ចាម',
  date: '28.12.2025',
  image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
  content: 'ឯកឧត្តមរដ្ឋមន្ត្រីក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់ បានដឹកនាំប្រតិភូអមដំណើរ និងមន្ត្រីរាជការមូលដ្ឋាន ចុះដាំដើមផ្កាជើងគោជាច្រើនដើមនៅតាមបណ្តោយផ្លូវជាតិលេខ៧។ សកម្មភាពនេះមិនត្រឹមតែជួយដល់បរិស្ថានប៉ុណ្ណោះទេ ប៉ុន្តែថែមទាំងទាក់ទាញភ្ញៀវទេសចរដែលធ្វើដំណើរឆ្លងកាត់តំបន់នេះផងដែរ។'
};

const sideNews = ref([
  {
    id: 2,
    category: 'អន្តរជាតិ',
    title: 'ទេសចរ វៀតណាមដែលទៅលេងនៅប្រទេសថៃ ធ្លាក់ចុះ ៣៣ ភាគរយ',
    date: '28.12.2025',
    image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1964&auto=format&fit=crop',
    content: 'យោងតាមរបាយការណ៍ទេសចរណ៍អាស៊ាន ចំនួនភ្ញៀវទេសចរពីប្រទេសវៀតណាមទៅកាន់ប្រទេសថៃមានការថយចុះគួរឱ្យកត់សម្គាល់នៅក្នុងត្រីមាសទី៤នេះ ដោយសារតែការប្រែប្រួលនៃតម្លៃរូបិយប័ណ្ណ។'
  },
  {
    id: 3,
    category: 'សន្តិសុខសង្គម',
    title: 'ការរៀបចំសណ្តាប់ធ្នាប់ថ្មីក្នុងទីក្រុងភ្នំពេញ ទទួលបានការគាំទ្រច្រើន',
    date: '27.12.2025',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=2070&auto=format&fit=crop',
    content: 'រដ្ឋបាលរាជធានីភ្នំពេញបានដាក់ចេញនូវវិធានការណ៍តឹងរ៉ឹង ដើម្បីរៀបចំសណ្តាប់ធ្នាប់សាធារណៈ ជាពិសេសការប្រើប្រាស់ចិញ្ចើមផ្លូវសម្រាប់ថ្មើរជើង។'
  }
]);

const bottomNews = ref([
  {
    id: 4,
    category: 'បច្ចេកវិទ្យា',
    title: 'Huawei nova 14 Series និង HUAWEI WATCH Ultimate2 បង្ហាញខ្លួនផ្លូវការ',
    date: '26.12.2025',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
    content: 'ក្រុមហ៊ុនបច្ចេកវិទ្យាយក្ស Huawei បានដាក់សម្ពោធផលិតផលថ្មីៗរបស់ខ្លួន ដែលមានបច្ចេកវិទ្យាទំនើបចុងក្រោយ និងរូបរាងកាន់តែប្រណីតជាងមុន។'
  },
  {
    id: 5,
    category: 'អប់រំ',
    title: 'ការសិក្សាតាមបែបឌីជីថល៖ ឱកាស និងបញ្ហាប្រឈមសម្រាប់សិស្សកម្ពុជា',
    date: '25.12.2025',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop',
    content: 'ក្នុងយុគសម័យបច្ចេកវិទ្យា ការរៀនសូត្រមិនត្រឹមតែនៅក្នុងថ្នាក់រៀននោះទេ ឌីជីថលបានក្លាយជាស្ពានចម្លងចំណេះដឹងយ៉ាងសំខាន់។'
  },
  {
    id: 6,
    category: 'កីឡា',
    title: 'ការប្រកួតកីឡាថ្នាក់ជាតិលើកទី៤ ត្រៀមនឹងចាប់ផ្តើមឆាប់ៗនេះ',
    date: '24.12.2025',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop',
    content: 'ក្រសួងអប់រំ យុវជន និងកីឡា បានត្រៀមលក្ខណៈរួចរាល់សម្រាប់ការប្រកួតកីឡាថ្នាក់ជាតិ ដែលនឹងមានអត្តពលិកចូលរួមរាប់ពាន់នាក់។'
  }
]);

const openDetail = (news) => {
  selectedNews.value = news;
  document.body.style.overflow = 'hidden';
};

const closeDetail = () => {
  selectedNews.value = null;
  document.body.style.overflow = 'auto';
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;700&display=swap');

.portal-wrapper {
  font-family: 'Kantumruy Pro', sans-serif;
  color: #333;
}

.cursor-pointer { cursor: pointer; }

/* Image Effects */
.img-full {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.card-hero:hover .img-full { transform: scale(1.05); }

.main-thumb {
  height: 200px;
  width: 100%;
  object-fit: cover;
  transition: opacity 0.3s;
}
.post-card:hover .main-thumb { opacity: 0.85; }

/* Gradients */
.overlay-grad {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 30px;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
}

/* Precise Heights */
.main-height { height: 500px; }
.side-height { height: 195px; }

/* News Styles */
.khmer-title { font-size: 1.7rem; line-height: 1.4; }
.khmer-sub { font-size: 1rem; line-height: 1.4; }
.khmer-bold { font-weight: 700; font-size: 1.1rem; margin-top: 10px; }
.khmer-bold-large { font-weight: 700; font-size: 1.8rem; line-height: 1.4; }
.khmer-reg { font-weight: 400; }

.section-title {
  border-left: 5px solid #0d6efd;
  padding-left: 15px;
  font-weight: 700;
}

.category-tag {
  padding: 4px 10px;
  font-size: 0.75rem;
  border-radius: 4px;
}

.social-grid { background: #fafafa; }
.line-clamp-3 {
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}

/* Modal Styling */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex; justify-content: center; align-items: flex-start;
  z-index: 2000;
  padding: 20px;
  overflow-y: auto;
}

.modal-content-custom {
  background: white;
  width: 100%;
  max-width: 850px;
  margin: 20px auto;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  animation: modalIn 0.4s ease;
}

.detail-img {
  width: 100%;
  max-height: 450px;
  object-fit: cover;
}

.btn-close-custom {
  position: absolute; top: 20px; right: 20px;
  background: white; color: black; border: none;
  width: 40px; height: 40px; border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  display: flex; align-items: center; justify-content: center;
  z-index: 100; transition: 0.3s;
}
.btn-close-custom:hover { transform: rotate(90deg); background: #f0f0f0; }

.detail-body {
  font-size: 1.15rem;
  line-height: 1.9;
  color: #444;
}

/* Transitions */
@keyframes modalIn {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Responsive adjustments */
@media (max-width: 992px) {
  .main-height { height: 400px; }
  .khmer-title { font-size: 1.3rem; }
  .modal-content-custom { margin: 0; height: 100%; border-radius: 0; }
}
</style>