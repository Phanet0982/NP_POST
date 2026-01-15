<template>
  <div class="min-h-screen bg-[#f8fafc] font-khmer pb-12">
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div class="max-w-[1600px] mx-auto px-6 h-18 flex items-center justify-between py-3">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3 cursor-pointer group" @click="router.push('/')">
            <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
              <i class="bi bi-layers-half text-xl"></i>
            </div>
            <div>
              <h1 class="text-sm font-black text-slate-800 tracking-tight uppercase leading-none">ព័ត៌មានថ្មីៗ</h1>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ផ្ទាំងគ្រប់គ្រង</span>
            </div>
          </div>
        </div>
        
        <div class="flex items-center gap-5">
          <div class="text-right hidden sm:block border-r border-slate-200 pr-5">
            <p class="text-[10px] font-black text-indigo-600 uppercase mb-0 tracking-tighter">គណនីដែលមានសិទ្ធិ</p>
            <p class="text-sm font-bold text-slate-700 mb-0">{{ user?.name || 'អ្នកគ្រប់គ្រង' }}</p>
          </div>
          <button @click="handleLogout" 
            class="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm">
            <span class="text-xs font-black uppercase tracking-wider hidden md:block">ចាកចេញ</span>
            <i class="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-[1600px] mx-auto p-6 lg:p-8">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-10">
        <div v-for="stat in stats" :key="stat.label" 
             class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div class="relative z-10">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{{ stat.label }}</p>
            <div class="flex items-end justify-between">
              <span class="text-3xl font-black text-slate-800 tracking-tighter">{{ stat.count }}</span>
              <div :class="stat.textColor" class="bg-slate-50 p-2 rounded-lg">
                <i class="bi bi-bar-chart-fill"></i>
              </div>
            </div>
          </div>
          <div :class="stat.bgColor" class="absolute bottom-0 left-0 h-1 w-full opacity-40"></div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div class="xl:col-span-4">
          <div class="bg-white p-6 lg:p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-28">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-xs font-black text-slate-800 uppercase tracking-[2px] flex items-center gap-2">
                <span class="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></span>
                តែងនិពន្ធអត្ថបទ
              </h2>
            </div>
            
            <div class="space-y-5">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-500 uppercase px-1">ចំណងជើងអត្ថបទ</label>
                <textarea v-model="form.title" rows="3" placeholder="តើមានព័ត៌មានអ្វីខ្លះថ្ងៃនេះ?" 
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-sm leading-relaxed"></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-500 uppercase px-1">ប្រភេទ</label>
                  <select v-model="form.category" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white font-bold text-xs appearance-none cursor-pointer">
                    <option v-for="cat in categoriesKhmer" :key="cat.en" :value="cat.en">{{ cat.kh }}</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-500 uppercase px-1">ស្លាកសញ្ញា (Badge)</label>
                  <input v-model="form.badge" type="text" placeholder="ឧទាហរណ៍៖ ក្តៅៗ" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white font-bold text-xs uppercase">
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-500 uppercase px-1">រូបភាពតំណាង</label>
                <div v-if="!form.image" class="group">
                  <label class="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-white hover:border-indigo-400 transition-all group">
                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                        <i class="bi bi-cloud-arrow-up text-indigo-500 text-xl"></i>
                    </div>
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">បញ្ចូលរូបភាព (JPG, PNG, WEBP)</p>
                    <input type="file" class="hidden" accept="image/*" @change="handleImageUpload" />
                  </label>
                </div>
                <div v-else class="relative rounded-2xl overflow-hidden h-40 border-2 border-slate-100 group">
                  <img :src="form.image" class="w-full h-full object-cover" />
                  <div @click="form.image = ''" class="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                    <span class="bg-white text-slate-900 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter">បោះបង់ និងប្តូររូបភាព</span>
                  </div>
                </div>
              </div>

              <button @click="publishNews" class="w-full py-4 bg-slate-900 hover:bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-slate-200 transition-all transform active:scale-[0.97] text-[10px] uppercase tracking-[3px] mt-4">
                បង្ហោះចូលក្នុងប្រព័ន្ធ
              </button>
            </div>
          </div>
        </div>

        <div class="xl:col-span-8">
          <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
              <div>
                <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest">បញ្ជីអត្ថបទដែលបានបង្ហោះ</h3>
                <p class="text-[10px] font-bold text-slate-400 mt-1">គ្រប់គ្រង និងតាមដានមាតិកាដែលបានចេញផ្សាយ</p>
              </div>
              <div class="relative w-full sm:w-72">
                <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input v-model="searchQuery" type="text" placeholder="ស្វែងរកអត្ថបទ..." 
                       class="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:bg-white focus:border-indigo-400 focus:ring-0 outline-none transition-all">
              </div>
            </div>

            <div class="divide-y divide-slate-100">
              <div v-if="filteredNews.length === 0" class="py-32 text-center">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="bi bi-inbox text-slate-300 text-2xl"></i>
                </div>
                <p class="font-bold text-xs uppercase tracking-widest text-slate-400">មិនមានទិន្នន័យត្រូវបានរកឃើញឡើយ</p>
              </div>
              
              <div v-for="item in filteredNews" :key="item.id" 
                   class="flex items-center gap-6 px-8 py-5 hover:bg-slate-50/80 transition-all group">
                <div class="relative flex-shrink-0">
                    <img :src="item.image" class="w-16 h-16 rounded-xl object-cover border border-slate-100 shadow-sm" />
                    <span class="absolute -top-2 -left-2 px-1.5 py-0.5 bg-indigo-600 text-white text-[7px] font-black rounded uppercase">{{ item.badge }}</span>
                </div>
                
                <div class="flex-grow min-w-0">
                  <div class="flex items-center gap-3 mb-1.5">
                    <span class="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 text-[9px] font-black uppercase tracking-tighter">{{ getKhmerCategory(item.category) }}</span>
                    <span class="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <i class="bi bi-calendar4-event"></i> {{ item.date }}
                    </span>
                  </div>
                  <h4 class="text-[15px] font-bold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">{{ item.title }}</h4>
                </div>
                
                <div class="flex items-center gap-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                  <button @click.stop="deleteNews(item.id)" 
                    class="w-10 h-10 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center">
                    <i class="bi bi-trash3 text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const storageKey = 'app_news_data';
const user = ref(null);
const searchQuery = ref('');

const categoriesKhmer = [
  { en: 'Home', kh: 'ទំព័រដើម' },
  { en: 'Popular', kh: 'ពេញនិយម' },
  { en: 'Sports', kh: 'កីឡា' },
  { en: 'Tech', kh: 'បច្ចេកវិទ្យា' },
  { en: 'Entertainment', kh: 'កម្សាន្ត' },
  { en: 'Society', kh: 'សង្គម' }
];

const getKhmerCategory = (enName) => {
  return categoriesKhmer.find(c => c.en === enName)?.kh || enName;
};

onMounted(() => {
  const sessionUser = localStorage.getItem('np_news_user');
  const isAdmin = localStorage.getItem('admin_status') === 'true';
  if (!isAdmin || !sessionUser) {
    router.push('/'); 
  } else {
    user.value = JSON.parse(sessionUser);
  }
});

const publishedNews = ref(JSON.parse(localStorage.getItem(storageKey) || '[]'));

const form = reactive({
  category: 'Home',
  badge: '',
  title: '',
  image: ''
});

const stats = computed(() => [
  { label: 'អត្ថបទសរុប', count: publishedNews.value.length, textColor: 'text-indigo-600', bgColor: 'bg-indigo-600' },
  { label: 'ពេញនិយម', count: publishedNews.value.filter(n => n.category === 'Popular').length, textColor: 'text-rose-500', bgColor: 'bg-rose-500' },
  { label: 'កម្សាន្ត', count: publishedNews.value.filter(n => n.category === 'Entertainment').length, textColor: 'text-pink-500', bgColor: 'bg-pink-500' },
  { label: 'កីឡា', count: publishedNews.value.filter(n => n.category === 'Sports').length, textColor: 'text-emerald-500', bgColor: 'bg-emerald-500' },
  { label: 'បច្ចេកវិទ្យា', count: publishedNews.value.filter(n => n.category === 'Tech').length, textColor: 'text-violet-500', bgColor: 'bg-violet-500' },
  { label: 'សង្គម', count: publishedNews.value.filter(n => n.category === 'Society').length, textColor: 'text-amber-500', bgColor: 'bg-amber-500' },
]);

const filteredNews = computed(() => {
  if (!searchQuery.value) return publishedNews.value;
  const q = searchQuery.value.toLowerCase();
  return publishedNews.value.filter(n => 
    n.title.toLowerCase().includes(q) ||
    n.category.toLowerCase().includes(q)
  );
});

watch(publishedNews, (val) => {
  localStorage.setItem(storageKey, JSON.stringify(val));
}, { deep: true });

// មុខងារបង្រួមរូបភាព (Image Compression) ដើម្បីឱ្យប្រើបានគ្រប់ប្រភេទរូបភាព និងមិនលើសទំហំ LocalStorage
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 800; // កំណត់ទំហំទទឹងអតិបរមា 800px
      const scaleSize = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // បម្លែងទៅជា WebP ឬ JPEG ដើម្បីបន្ថយទំហំឯកសារ
      form.image = canvas.toDataURL('image/jpeg', 0.7); // គុណភាព 70%
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

const publishNews = () => {
  if (!form.title || !form.image) return alert("សូមបំពេញចំណងជើង និងជ្រើសរើសរូបភាព!");
  
  try {
    const newArticle = {
      id: Date.now(),
      category: form.category,
      badge: form.badge.toUpperCase() || 'ព័ត៌មាន',
      title: form.title,
      date: new Date().toLocaleDateString('km-KH', { day: 'numeric', month: 'long', year: 'numeric' }),
      image: form.image
    };

    publishedNews.value.unshift(newArticle);
    form.title = ''; form.image = ''; form.badge = '';
  } catch (e) {
    alert("បញ្ហា៖ មិនអាចរក្សាទុកបានឡើយ (ប្រហែលជាទំហំរូបភាពធំពេក)។ សូមព្យាយាមជាមួយរូបភាពផ្សេង!");
  }
};

const deleteNews = (id) => {
  const index = publishedNews.value.findIndex(item => item.id === id);
  if (index !== -1) {
    if (confirm("តើអ្នកពិតជាចង់លុបអត្ថបទនេះជាអចិន្ត្រៃយ៍មែនទេ?")) {
      publishedNews.value.splice(index, 1);
    }
  }
};

const handleLogout = () => {
  localStorage.removeItem('admin_status');
  localStorage.removeItem('np_news_user');
  router.push('/');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;700;900&display=swap');
.font-khmer { font-family: 'Khmer OS Battambang', sans-serif; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
</style>