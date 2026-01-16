<template>
  <div class="min-h-screen bg-gray-100 font-khmer flex flex-col lg:flex-row">
    
    <aside class="hidden lg:flex w-72 bg-slate-900 flex-col text-white sticky top-0 h-screen">
      <div class="p-6">
        <div class="mb-10 px-2">
          <div class="flex items-center gap-3 cursor-pointer group" @click="router.push('/')">
            <div class="relative">
              <img src="https://png.pngtree.com/png-vector/20220714/ourmid/pngtree-np-icon-vector-illustration-design-letter-monogram-alphabet-vector-png-image_37915324.png" 
                   alt="Logo" 
                   class="w-11 h-11 rounded-xl object-contain bg-white p-1 shadow-lg group-hover:scale-105 transition-transform" />
              <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
            </div>
            <div class="flex flex-col">
              <h1 class="text-xl font-black tracking-tight leading-none text-white">
                NP <span class="text-blue-500">News</span>
              </h1>
              <span class="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1 leading-none">Digital Media</span>
            </div>
          </div>
        </div>

        <nav class="space-y-1">
          <button v-for="nav in tableTabs" :key="nav.id"
            @click="activeTableTab = nav.id"
            :class="activeTableTab === nav.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-800 text-slate-400'"
            class="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group">
            <div class="flex items-center gap-3">
              <i :class="getIconForCategory(nav.id)" class="text-lg"></i>
              <span class="text-sm font-medium">{{ nav.name }}</span>
            </div>
            <span :class="activeTableTab === nav.id ? 'bg-blue-500' : 'bg-slate-800'" 
                  class="text-[10px] px-2 py-0.5 rounded text-slate-100">
              {{ getCategoryCount(nav.id) }}
            </span>
          </button>
        </nav>
      </div>

      <div class="mt-auto p-6 border-t border-slate-800 bg-slate-950/50">
        <div class="flex items-center gap-3 mb-4">
          <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" class="w-10 h-10 rounded-xl border border-slate-700">
          <div class="overflow-hidden">
            <p class="text-sm font-bold truncate">Administrator</p>
            <p class="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">Online</p>
          </div>
        </div>
        <button @click="handleLogout" class="w-full py-2.5 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white rounded-lg text-xs font-bold transition-all uppercase tracking-widest">
          Logout
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0 overflow-x-hidden">
      
      <header class="lg:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <div class="flex items-center gap-2">
          <img src="https://png.pngtree.com/png-vector/20220714/ourmid/pngtree-np-icon-vector-illustration-design-letter-monogram-alphabet-vector-png-image_37915324.png" class="w-8 h-8 rounded bg-white p-0.5">
          <span class="font-bold text-sm">NP News Admin</span>
        </div>
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-2xl">
          <i class="bi" :class="mobileMenuOpen ? 'bi-x' : 'bi-list'"></i>
        </button>
      </header>

      <header class="hidden lg:flex bg-white border-b border-gray-200 px-8 h-20 items-center justify-between sticky top-0 z-40">
        <div class="flex flex-col">
          <h2 class="font-bold text-gray-800 text-lg leading-none mb-1">ប្រព័ន្ធគ្រប់គ្រងព័ត៌មាន</h2>
          <div class="flex items-center gap-2">
            
            <p class="text-[10px] text-blue-600 font-bold uppercase tracking-wider">{{ activeTableTab }}</p>
          </div>
        </div>

        <div class="relative group">
          <i class="bi bi-search absolute left-4 top-8 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"></i>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="ស្វែងរកអត្ថបទ..." 
            class="w-80 pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
          >
        </div>
      </header>

      <main class="p-4 lg:p-8 space-y-6">
        
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-4">
          <div v-for="tab in tableTabs" :key="tab.id" 
               @click="activeTableTab = tab.id"
               class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-500 hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center group">
            <div :class="activeTableTab === tab.id ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'" 
                 class="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-3 transition-all">
              <i :class="getIconForCategory(tab.id)"></i>
            </div>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 leading-none">{{ tab.name }}</p>
            <p class="text-xl font-black text-slate-800">{{ getCategoryCount(tab.id) }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div class="xl:col-span-1">
            <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-28">
              <h3 class="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <i class="bi bi-plus-circle-fill text-blue-600"></i> បញ្ចូលព័ត៌មានថ្មី
              </h3>
              <div class="space-y-5">
                <div class="space-y-1">
                   <label class="text-[10px] font-bold text-gray-400 uppercase ml-1">ចំណងជើង</label>
                   <textarea v-model="form.title" rows="3" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none"></textarea>
                </div>
                
                <div class="grid grid-cols-2 gap-3">
                  <div class="space-y-1">
                    <label class="text-[10px] font-bold text-gray-400 uppercase ml-1">ប្រភេទ</label>
                    <select v-model="form.category" class="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold">
                      <option v-for="cat in categoriesKhmer" :key="cat.en" :value="cat.en">{{ cat.kh }}</option>
                    </select>
                  </div>
                  <div class="space-y-1">
                    <label class="text-[10px] font-bold text-gray-400 uppercase ml-1">ស្លាក</label>
                    <input v-model="form.badge" placeholder="ឧ. HOT" class="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold uppercase">
                  </div>
                </div>

                <div @click="$refs.fileInput.click()" class="h-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-blue-400 transition-all">
                  <img v-if="form.image" :src="form.image" class="w-full h-full object-cover">
                  <template v-else>
                    <i class="bi bi-image text-gray-300 text-2xl group-hover:text-blue-500 transition-colors"></i>
                    <p class="text-[9px] font-bold text-gray-400 uppercase mt-1">Upload Photo</p>
                  </template>
                  <input type="file" ref="fileInput" class="hidden" @change="handleImageUpload">
                </div>

                <button @click="publishNews" class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-100">
                  រក្សាទុកអត្ថបទ
                </button>
              </div>
            </div>
          </div>

          <div class="xl:col-span-2">
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead class="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold border-b border-gray-100">
                    <tr>
                      <th class="px-6 py-4">អត្ថបទ</th>
                      <th class="px-4 py-4 text-center">ប្រភេទ</th>
                      <th class="px-6 py-4 text-right">សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="item in filteredTableData" :key="item.id" class="hover:bg-slate-50/50 transition-colors">
                      <td class="px-6 py-4">
                        <div class="flex items-center gap-4">
                          <img :src="item.image" class="w-14 h-14 rounded-xl object-cover shadow-sm bg-gray-100 flex-shrink-0">
                          <div class="min-w-0">
                            <p class="text-sm font-bold text-slate-700 truncate mb-1">{{ item.title }}</p>
                            <p class="text-[10px] text-gray-400 font-medium">
                               <i class="bi bi-calendar3 mr-1"></i> {{ item.date }} 
                               <span class="mx-2 text-gray-200">|</span> 
                               <span class="text-blue-600 font-black uppercase">{{ item.badge }}</span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-4 text-center">
                        <span class="text-[10px] font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
                          {{ getKhmerCategory(item.category) }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-right">
                        <button @click="deleteNews(item.id)" class="w-9 h-9 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-all">
                          <i class="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="filteredTableData.length === 0" class="py-24 text-center">
                   <div class="text-gray-200 text-5xl mb-3"><i class="bi bi-inbox"></i></div>
                   <p class="text-gray-400 text-sm font-medium tracking-wide">មិនទាន់មានទិន្នន័យនៅឡើយទេ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div v-if="mobileMenuOpen" @click="mobileMenuOpen = false" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"></div>
    <div :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'" class="fixed left-0 top-0 h-full w-72 bg-slate-900 z-[70] transition-transform duration-300 lg:hidden p-6 text-white">
       <div class="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
          <img src="https://png.pngtree.com/png-vector/20220714/ourmid/pngtree-np-icon-vector-illustration-design-letter-monogram-alphabet-vector-png-image_37915324.png" class="w-8 h-8 rounded bg-white p-0.5">
          <span class="font-bold">NP News Admin</span>
       </div>
       <nav class="space-y-4">
          <button v-for="nav in tableTabs" :key="nav.id" 
            @click="activeTableTab = nav.id; mobileMenuOpen = false" 
            class="flex items-center justify-between w-full p-2 text-sm font-medium rounded-lg"
            :class="activeTableTab === nav.id ? 'text-blue-400' : 'text-slate-400'">
            <div class="flex items-center gap-3">
              <i :class="getIconForCategory(nav.id)"></i> {{ nav.name }}
            </div>
            <span class="text-[10px]">{{ getCategoryCount(nav.id) }}</span>
          </button>
       </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');
const activeTableTab = ref('All');
const mobileMenuOpen = ref(false);
const storageKey = 'app_news_data';
const publishedNews = ref(JSON.parse(localStorage.getItem(storageKey) || '[]'));

// Removed Home Category
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

const form = reactive({ category: 'Popular', badge: '', title: '', image: '' });

const getCategoryCount = (id) => id === 'All' ? publishedNews.value.length : publishedNews.value.filter(i => i.category === id).length;
const getKhmerCategory = (en) => categoriesKhmer.find(c => c.en === en)?.kh || en;
const getIconForCategory = (id) => {
  const icons = { 'All': 'bi-stack', 'Popular': 'bi-lightning-charge-fill', 'Entertainment': 'bi-camera-reels-fill', 'Sports': 'bi-trophy-fill', 'Tech': 'bi-cpu-fill', 'Society': 'bi-people-fill' };
  return icons[id] || 'bi-bookmark-fill';
};

const filteredTableData = computed(() => {
  let list = publishedNews.value;
  if (activeTableTab.value !== 'All') list = list.filter(item => item.category === activeTableTab.value);
  if (searchQuery.value) list = list.filter(item => item.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
  return list;
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = (img.height * 600) / img.width;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      form.image = canvas.toDataURL('image/jpeg', 0.6);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

const publishNews = () => {
  if (!form.title || !form.image) return alert("សូមបំពេញទិន្នន័យ");
  const newArticle = { id: Date.now(), category: form.category, badge: form.badge || 'INFO', title: form.title, date: new Date().toLocaleDateString('km-KH'), image: form.image };
  publishedNews.value.unshift(newArticle);
  localStorage.setItem(storageKey, JSON.stringify(publishedNews.value));
  form.title = ''; form.image = '';
};

const deleteNews = (id) => {
  if (confirm("តើអ្នកប្រាកដជាចង់លុបអត្ថបទនេះ?")) {
    publishedNews.value = publishedNews.value.filter(i => i.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(publishedNews.value));
  }
};

const handleLogout = () => {
  localStorage.removeItem('admin_status');
  router.push('/');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;700&display=swap');
.font-khmer { font-family: 'Khmer OS Battambang', sans-serif; }
</style>