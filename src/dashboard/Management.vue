<template>
  <div class="min-h-screen bg-slate-50 font-khmer flex flex-col lg:flex-row text-slate-700">
    
    <header class="lg:hidden bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between sticky top-0 z-50">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <i class="bi bi-newspaper text-white"></i>
        </div>
        <h1 class="text-lg font-bold text-slate-900">NP News</h1>
      </div>
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2 text-slate-600 hover:bg-gray-100 rounded-lg">
        <i :class="mobileMenuOpen ? 'bi bi-x-lg' : 'bi bi-list'" class="text-2xl"></i>
      </button>
    </header>

    <aside :class="[mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']" 
      class="fixed inset-y-0 left-0 w-64 bg-white flex flex-col border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out lg:sticky lg:h-screen lg:z-40">
      
      <div class="p-6">
        <div class="hidden lg:flex mb-8 items-center gap-2 px-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
            <i class="bi bi-newspaper text-white"></i>
          </div>
          <h1 class="text-lg font-bold tracking-tight text-slate-900">NP News</h1>
        </div>

        <nav class="space-y-1">
          <p class="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Menu</p>
          <button v-for="nav in tableTabs" :key="nav.id"
            @click="activeTableTab = nav.id; mobileMenuOpen = false"
            :class="activeTableTab === nav.id ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-gray-50'"
            class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group">
            <div class="flex items-center gap-3">
              <i :class="getIconForCategory(nav.id)" class="text-base"></i>
              <span class="text-sm font-medium">{{ nav.name }}</span>
            </div>
            <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white border border-gray-100 shadow-sm opacity-80">
              {{ getCategoryCount(nav.id) }}
            </span>
          </button>
        </nav>
      </div>

      <div class="mt-auto p-4 border-t border-gray-100 bg-gray-50/50">
        <div class="flex items-center gap-3 p-2 mb-3">
          <img src="https://ui-avatars.com/api/?name=Admin&background=0066FF&color=fff" class="w-10 h-10 rounded-xl border-2 border-white shadow-sm">
          <div class="overflow-hidden">
            <p class="text-sm font-bold text-slate-900 truncate">Administrator</p>
            <div class="flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <p class="text-[11px] text-slate-500 font-medium">Online</p>
            </div>
          </div>
        </div>
        <button @click="handleLogout" class="w-full py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 border border-transparent hover:border-red-100">
          <i class="bi bi-box-arrow-right"></i> ចាកចេញ
        </button>
      </div>
    </aside>

    <div v-if="mobileMenuOpen" @click="mobileMenuOpen = false" class="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"></div>

    <div class="flex-1 flex flex-col min-w-0">
      <header class="hidden lg:flex bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 h-16 items-center justify-between sticky top-0 z-30">
        <h4 class="font-bold text-slate-800 flex items-center gap-2">
          Dashboard <i class="bi bi-chevron-right text-[10px] text-gray-400"></i> <span class="text-blue-600">Analytics & Content</span>
        </h4>

        <div class="relative group">
          <i class="bi bi-search absolute left-3 top-8 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
          <input v-model="searchQuery" type="text" placeholder="ស្វែងរកអត្ថបទ..." 
            class="w-80 pl-10 pr-4 py-2 bg-gray-50 border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none border">
        </div>
      </header>

      <main class="p-4 lg:p-8 space-y-8 max-w-[1600px] mx-auto w-full">
        
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <div v-for="tab in tableTabs" :key="tab.id" @click="activeTableTab = tab.id"
              :class="activeTableTab === tab.id ? 'ring-2 ring-blue-500 bg-white shadow-xl shadow-blue-900/5 translate-y-[-4px]' : 'bg-white border-gray-100 hover:border-blue-200'"
              class="p-4 rounded-2xl border cursor-pointer transition-all duration-300 group">
            <div class="flex items-center justify-between mb-3">
              <div :class="activeTableTab === tab.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'" 
                  class="w-10 h-10 rounded-xl flex items-center justify-center transition-colors">
                <i :class="getIconForCategory(tab.id)" class="text-lg"></i>
              </div>
              <span class="text-xl font-black text-slate-800">{{ getCategoryCount(tab.id) }}</span>
            </div>
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{{ tab.name }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          <div class="xl:col-span-1">
            <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <i class="bi bi-plus-circle-fill text-xl"></i>
                </div>
                <h3 class="font-bold text-slate-800">បញ្ចូលព័ត៌មានថ្មី</h3>
              </div>
              
              <div class="space-y-5">
                <div>
                  <label class="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">ចំណងជើង</label>
                  <input v-model="form.title" type="text" class="w-full px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="ចំណងជើងអត្ថបទ">
                </div>

                <div>
                  <label class="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">ខ្លឹមសារ</label>
                  <textarea v-model="form.content" rows="4" class="w-full px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none" placeholder="សរសេរខ្លឹមសារ..."></textarea>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">ប្រភេទ</label>
                    <select v-model="form.category" class="w-full px-3 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:bg-white outline-none appearance-none">
                      <option v-for="cat in categoriesKhmer" :key="cat.en" :value="cat.en">{{ cat.kh }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">អ្នកនិពន្ធ</label>
                    <input v-model="form.author" class="w-full px-3 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:bg-white outline-none" placeholder="ឈ្មោះ...">
                  </div>
                </div>

                <div @click="$refs.fileInput.click()" class="border-2 border-dashed border-slate-200 rounded-2xl h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50/50 hover:border-blue-300 transition-all relative overflow-hidden group">
                  <img v-if="form.image" :src="form.image" class="absolute inset-0 w-full h-full object-cover">
                  <div v-else class="text-center p-4">
                    <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <i class="bi bi-cloud-arrow-up text-2xl text-slate-400"></i>
                    </div>
                    <p class="text-xs font-bold text-slate-500">បញ្ចូលរូបភាពក្រប</p>
                    <p class="text-[10px] text-slate-400 mt-1">JPG, PNG format (Max 2MB)</p>
                  </div>
                  <input type="file" ref="fileInput" class="hidden" @change="handleImageUpload">
                </div>

                <button @click="publishNews" class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-[0.98]">
                  <i class="bi bi-check2-circle text-lg"></i> រក្សាទុកអត្ថបទ
                </button>
              </div>
            </div>
          </div>

          <div class="xl:col-span-2 space-y-8">
            
            <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm max-w-4xl mx-auto">
              <div class="flex justify-between items-center mb-8">
                <div>
                  <h3 class="font-bold text-slate-800 text-lg">និន្នាការនៃការចុះអត្ថបទ</h3>
                  <p class="text-xs text-slate-400">ទិន្នន័យសរុបក្នុងរយៈពេល ៧ ថ្ងៃចុងក្រោយ</p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
                  <span class="text-[10px] font-bold text-blue-600 tracking-widest uppercase">Live Status</span>
                </div>
              </div>

              <div class="h-64 relative w-full group">
                <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div class="text-[10px] text-slate-300 w-full border-t border-gray-50 flex justify-end pr-2 pt-1">សកម្មខ្លាំង</div>
                  <div class="text-[10px] text-slate-300 w-full border-t border-gray-50 flex justify-end pr-2 pt-1">មធ្យម</div>
                  <div class="text-[10px] text-slate-300 w-full border-t border-gray-50 flex justify-end pr-2 pt-1">ទាប</div>
                  <div class="w-full border-t border-slate-200"></div>
                </div>

                <svg class="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="newsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#2563eb" stop-opacity="0.3" />
                      <stop offset="100%" stop-color="#2563eb" stop-opacity="0" />
                    </linearGradient>
                  </defs>

                  <path :d="chartPath.areaPath" fill="url(#newsGradient)" class="transition-all duration-700 ease-in-out" />
                  
                  <path :d="chartPath.linePath" fill="none" stroke="#2563eb" stroke-width="3" stroke-linejoin="round" class="transition-all duration-700 ease-in-out" />

                  <circle v-for="(p, i) in chartPath.points" :key="i" 
                          :cx="p.x" :cy="p.y" r="5" 
                          fill="white" stroke="#2563eb" stroke-width="3" 
                          class="transition-all duration-700" />
                </svg>

                <div class="flex justify-between mt-4 px-1 text-[9px] font-bold text-slate-400">
                  <span v-for="label in chartLabels" :key="label">{{ label }}</span>
                </div>
              </div>

              <div class="flex flex-wrap justify-center gap-6 mt-12">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-sm bg-blue-600"></span>
                  <span class="text-[11px] font-bold text-slate-600 uppercase tracking-tight">ចំនួនអត្ថបទដែលបានចុះផ្សាយ</span>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div class="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-slate-800">បញ្ជីអត្ថបទដែលបានបញ្ចេញ</h3>
                  <p class="text-[11px] text-slate-400 font-medium">បង្ហាញចំនួន {{ filteredTableData.length }} អត្ថបទ</p>
                </div>
                <div class="flex gap-2">
                  <button class="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"><i class="bi bi-filter"></i></button>
                  <button class="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"><i class="bi bi-download"></i></button>
                </div>
              </div>
              
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-slate-50/50 text-slate-400 text-[10px] uppercase border-b border-gray-50">
                    <tr>
                      <th class="px-6 py-4 text-left font-bold tracking-wider">ព័ត៌មាន</th>
                      <th class="px-4 py-4 text-center font-bold tracking-wider">អ្នកនិពន្ធ</th>
                      <th class="px-6 py-4 text-right font-bold tracking-wider">សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-50">
                    <tr v-for="item in filteredTableData" :key="item.id" class="hover:bg-blue-50/20 transition-colors group">
                      <td class="px-6 py-4">
                        <div class="flex items-center gap-4">
                          <div class="relative flex-shrink-0">
                            <img :src="item.image" class="w-14 h-14 rounded-xl object-cover border border-gray-100 shadow-sm">
                            <span class="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></span>
                          </div>
                          <div class="min-w-0">
                            <p class="text-sm font-bold text-slate-700 truncate group-hover:text-blue-600 transition-colors">{{ item.title }}</p>
                            <div class="flex items-center gap-3 mt-1.5">
                              <span class="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md capitalize">{{ getKhmerCategory(item.category) }}</span>
                              <span class="text-[10px] text-slate-400 flex items-center gap-1"><i class="bi bi-calendar3"></i> {{ item.date }}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-4 text-center">
                        <div class="flex flex-col items-center">
                          <span class="text-xs font-bold text-slate-600">{{ item.author || 'Admin' }}</span>
                          <span class="text-[9px] text-slate-400 uppercase tracking-tighter">Editor</span>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-right">
                        <div class="flex items-center justify-end gap-2">
                          <button class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><i class="bi bi-pencil-square"></i></button>
                          <button @click="deleteNews(item.id)" class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><i class="bi bi-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="filteredTableData.length === 0">
                      <td colspan="3" class="px-6 py-12 text-center text-slate-400 text-sm">មិនទាន់មានអត្ថបទនៅឡើយទេ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const searchQuery = ref('');
const activeTableTab = ref('All');
const mobileMenuOpen = ref(false);
const storageKey = 'app_news_data';
const publishedNews = ref(JSON.parse(localStorage.getItem(storageKey) || '[]'));

const tableTabs = [
  { id: 'All', name: 'ទាំងអស់' },
  { id: 'Popular', name: 'ពេញនិយម' },
  { id: 'Entertainment', name: 'កម្សាន្ត' },
  { id: 'Sports', name: 'កីឡា' },
  { id: 'Tech', name: 'បច្ចេកវិទ្យា' },
  { id: 'Society', name: 'សង្គម' }
];

const categoriesKhmer = [
  { en: 'Popular', kh: 'ពេញនិយម' },
  { en: 'Sports', kh: 'កីឡា' }, 
  { en: 'Tech', kh: 'បច្ចេកវិទ្យា' },
  { en: 'Entertainment', kh: 'កម្សាន្ត' }, 
  { en: 'Society', kh: 'សង្គម' }
];

const form = reactive({ category: 'Popular', badge: 'HOT', title: '', content: '', author: '', image: '' });

// --- CHART LOGIC ---
const chartLabels = computed(() => {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString('km-KH', { day: 'numeric', month: 'short' });
  });
});

const chartPath = computed(() => {
  const counts = chartLabels.value.map(label => {
    // Check if article date matches label (e.g., "17 មករា")
    return publishedNews.value.filter(n => n.date.includes(label.split(' ')[0])).length;
  });

  const max = Math.max(...counts, 4); // Scale based on data, minimum height for 4 articles
  const width = 1000;
  const height = 140; // Max vertical span in SVG coordinates

  const points = counts.map((count, i) => ({
    x: i * (width / (counts.length - 1)),
    y: 180 - (count / max * height)
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L1000,200 L0,200 Z`;

  return { linePath, areaPath, points };
});
// --------------------

const getCategoryCount = (id) => id === 'All' ? publishedNews.value.length : publishedNews.value.filter(i => i.category === id).length;
const getKhmerCategory = (en) => categoriesKhmer.find(c => c.en === en)?.kh || en;
const getIconForCategory = (id) => {
  const icons = { 'All': 'bi-grid-fill', 'Popular': 'bi-lightning-charge-fill', 'Entertainment': 'bi-controller', 'Sports': 'bi-trophy-fill', 'Tech': 'bi-cpu-fill', 'Society': 'bi-people-fill' };
  return icons[id] || 'bi-bookmark-fill';
};

const filteredTableData = computed(() => {
  let list = publishedNews.value;
  if (activeTableTab.value !== 'All') list = list.filter(item => item.category === activeTableTab.value);
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(item => item.title.toLowerCase().includes(q) || item.author?.toLowerCase().includes(q));
  }
  return list;
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    form.image = e.target.result;
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'បានបញ្ចូលរូបភាព', showConfirmButton: false, timer: 1500 });
  };
  reader.readAsDataURL(file);
};

const publishNews = () => {
  if (!form.title || !form.image || !form.content) {
    return Swal.fire({ icon: 'warning', title: 'ព័ត៌មានមិនគ្រប់គ្រាន់', text: 'សូមបំពេញចំណងជើង ខ្លឹមសារ និងរូបភាព!', confirmButtonColor: '#2563eb' });
  }
  const newArticle = { 
    id: Date.now(), 
    category: form.category, 
    badge: form.badge || 'INFO', 
    title: form.title, 
    content: form.content, 
    author: form.author || 'Admin', 
    date: new Date().toLocaleDateString('km-KH', { day: 'numeric', month: 'short', year: 'numeric' }), 
    image: form.image 
  };
  publishedNews.value.unshift(newArticle);
  localStorage.setItem(storageKey, JSON.stringify(publishedNews.value));
  Swal.fire({ icon: 'success', title: 'ជោគជ័យ', text: 'អត្ថបទរបស់អ្នកត្រូវបានរក្សាទុក', timer: 2000, showConfirmButton: false });
  form.title = ''; form.content = ''; form.image = ''; form.author = '';
};

const deleteNews = (id) => {
  Swal.fire({ title: 'តើអ្នកប្រាកដទេ?', text: "អ្នកនឹងមិនអាចត្រឡប់វិញបានទេ!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#64748b', confirmButtonText: 'បាទ លុបវា!', cancelButtonText: 'បោះបង់'
  }).then((result) => {
    if (result.isConfirmed) {
      publishedNews.value = publishedNews.value.filter(i => i.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(publishedNews.value));
      Swal.fire('បានលុប!', 'អត្ថបទត្រូវបានលុបចេញពីប្រព័ន្ធ។', 'success');
    }
  });
};

const handleLogout = () => {
  Swal.fire({ title: 'ចាកចេញ?', text: "តើអ្នកចង់ចាកចេញពីប្រព័ន្ធមែនទេ?", icon: 'question', showCancelButton: true, confirmButtonColor: '#2563eb', confirmButtonText: 'ចាកចេញ', cancelButtonText: 'បោះបង់'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('admin_status');
      router.push('/');
    }
  });
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css');
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;600;700&display=swap');

.font-khmer { font-family:'Khmer OS Battambang', sans-serif; }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
main > div { animation: fadeIn 0.4s ease-out forwards; }
</style>