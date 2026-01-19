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
          <p class="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">ប្រភេទព័ត៌មាន</p>
          <button v-for="nav in tableTabs" :key="nav.id"
            @click="activeTableTab = nav.id; mobileMenuOpen = false"
            :class="activeTableTab === nav.id ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-gray-50'"
            class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group">
            <div class="flex items-center gap-3">
              <i :class="getIconForCategory(nav.id)" class="text-base"></i>
              <span class="text-sm font-medium">{{ nav.name }}</span>
            </div>
            <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white border border-gray-100 shadow-sm">
              {{ getCategoryCount(nav.id) }}
            </span>
          </button>
        </nav>
      </div>

      <div class="mt-auto p-4 border-t border-gray-100 bg-gray-50/50">
        <button @click="handleLogout" class="w-full py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
          <i class="bi bi-box-arrow-right"></i> ចាកចេញ
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0">
      
      <header class="bg-white border-b border-gray-100 h-20 sticky top-0 z-30 hidden lg:flex items-center justify-between px-8">
        <div class="flex items-center gap-4">
          <div>
            <h2 class="text-sm font-bold text-slate-800">ផ្ទាំងគ្រប់គ្រងទិន្នន័យ</h2>
            <div class="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
              <span>ទំព័រដើម</span>
              <i class="bi bi-chevron-right text-[8px]"></i>
              <span class="text-blue-600 font-bold">{{ activeTableTab === 'All' ? 'អត្ថបទទាំងអស់' : getKhmerCategory(activeTableTab) }}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <div class="hidden xl:flex flex-col items-end border-r pr-6 border-gray-100">
            <span class="text-xs font-bold text-slate-700">{{ currentTime }}</span>
            <span class="text-[10px] text-slate-400">កាលបរិច្ឆេទថ្ងៃនេះ</span>
          </div>

          <button class="relative p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
            <i class="bi bi-bell text-xl"></i>
            <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>

          <div class="flex items-center gap-4 pl-6 border-l border-gray-100 relative profile-trigger">
            <div class="text-right hidden sm:block">
              <p class="text-[13px] font-black text-slate-800 leading-tight mb-0.5">Admin User</p>
              <div class="flex items-center justify-end gap-1.5">
                <span class="flex h-2 w-2 relative">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                </span>
                <p class="text-[10px] text-green-600 font-black uppercase tracking-widest">អនឡាញ</p>
              </div>
            </div>

            <button @click="userMenuOpen = !userMenuOpen" 
              class="group relative w-12 h-12 rounded-2xl bg-white p-1 shadow-sm border border-slate-100 transition-all hover:shadow-md hover:border-blue-200">
              <div class="w-full h-full rounded-[12px] bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 overflow-hidden">
                <i class="bi bi-person-fill text-2xl transition-transform group-hover:scale-110"></i>
              </div>
            </button>

            <transition name="fade-slide">
              <div v-if="userMenuOpen" class="absolute top-full right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                <div class="px-4 py-3 border-b border-gray-50 mb-1">
                  <p class="text-[10px] font-bold text-slate-400 mb-1">គណនីគ្រប់គ្រង</p>
                  <p class="text-xs font-bold text-slate-700 truncate">admin@gmail.com</p>
                </div>
                <button class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left font-medium">
                  <i class="bi bi-person-circle text-base"></i> ព័ត៌មានផ្ទាល់ខ្លួន
                </button>
                <button class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left font-medium">
                  <i class="bi bi-gear text-base"></i> ការកំណត់
                </button>
                <div class="h-px bg-gray-50 my-1"></div>
                <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left font-bold">
                  <i class="bi bi-box-arrow-right text-base"></i> ចាកចេញពីប្រព័ន្ធ
                </button>
              </div>
            </transition>
          </div>
        </div>
      </header>

      <main class="p-4 lg:p-8 space-y-8 max-w-[1600px] mx-auto w-full">
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <div v-for="tab in tableTabs" :key="tab.id" @click="activeTableTab = tab.id"
              :class="activeTableTab === tab.id ? 'ring-2 ring-blue-500 bg-white shadow-lg' : 'bg-white border-gray-100 hover:border-blue-200'"
              class="p-4 rounded-2xl border cursor-pointer transition-all duration-300">
            <div class="flex items-center justify-between mb-2">
              <div :class="activeTableTab === tab.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'" class="w-9 h-9 rounded-lg flex items-center justify-center">
                <i :class="getIconForCategory(tab.id)"></i>
              </div>
              <span class="text-lg font-black">{{ getCategoryCount(tab.id) }}</span>
            </div>
            <p class="text-[10px] font-bold text-slate-400">{{ tab.name }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div class="xl:col-span-4">
            <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-28">
              <div class="flex items-center gap-3 mb-6">
                <div :class="isEditing ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'" class="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors">
                  <i :class="isEditing ? 'bi bi-pencil-square' : 'bi bi-plus-lg'" class="text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-slate-800 text-lg">{{ isEditing ? 'កែប្រែអត្ថបទ' : 'អត្ថបទថ្មី' }}</h3>
                  <p class="text-xs text-slate-400">{{ isEditing ? 'កំពុងកែប្រែទិន្នន័យចាស់' : 'បញ្ចូលព័ត៌មានទៅក្នុងប្រព័ន្ធ' }}</p>
                </div>
              </div>
              
              <div class="space-y-4">
                <div @click="$refs.fileInput.click()" class="relative aspect-video rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden bg-slate-50 cursor-pointer hover:border-blue-400 transition-all group">
                  <img v-if="form.image" :src="form.image" class="w-full h-full object-cover">
                  <div v-else class="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                    <i class="bi bi-image text-3xl mb-2"></i>
                    <span class="text-xs font-bold">ជ្រើសរើសរូបភាពក្រប</span>
                  </div>
                  <input type="file" ref="fileInput" class="hidden" @change="handleImageUpload" accept="image/*">
                </div>

                <input v-model="form.title" type="text" placeholder="ចំណងជើង..." class="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold">
                <textarea v-model="form.content" rows="4" placeholder="ខ្លឹមសារអត្ថបទ..." class="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all resize-none text-sm"></textarea>

                <div class="grid grid-cols-2 gap-3">
                  <select v-model="form.category" class="px-3 py-3 bg-slate-50 rounded-xl text-sm outline-none border border-transparent focus:border-blue-500">
                    <option v-for="cat in categoriesKhmer" :key="cat.en" :value="cat.en">{{ cat.kh }}</option>
                  </select>
                  <input v-model="form.author" type="text" placeholder="អ្នកនិពន្ធ..." class="px-3 py-3 bg-slate-50 rounded-xl text-sm outline-none border border-transparent focus:border-blue-500 font-bold">
                </div>

                <div class="flex gap-2 pt-2">
                  <button v-if="isEditing" @click="resetForm" class="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-all">បោះបង់</button>
                  <button @click="publishNews" :class="isEditing ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'" class="flex-[2] py-3 text-white rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2">
                    {{ isEditing ? 'ធ្វើបច្ចុប្បន្នភាព' : 'រក្សាទុក' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="xl:col-span-8">
            <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div class="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 class="font-bold text-slate-800 text-lg">បញ្ជីអត្ថបទ</h3>
                  <p class="text-xs text-slate-400">គ្រប់គ្រង និងកែប្រែព័ត៌មានរបស់អ្នក</p>
                </div>
                <div class="relative">
                  <i class="bi bi-search absolute left-4 top-8 -translate-y-1/2 text-slate-400"></i>
                  <input v-model="searchQuery" type="text" placeholder="ស្វែងរកតាមចំណងជើង..." 
                    class="w-full md:w-80 pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none">
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead class="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 border-b border-gray-50">
                    <tr>
                      <th class="px-6 py-4">អត្ថបទ</th>
                      <th class="px-6 py-4 text-center">អ្នកនិពន្ធ</th>
                      <th class="px-6 py-4 text-right">សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-50">
                    <tr v-for="item in filteredTableData" :key="item.id" class="hover:bg-blue-50/10 transition-colors group">
                      <td class="px-6 py-5">
                        <div class="flex items-center gap-4">
                          <div class="w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                            <img :src="item.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                          </div>
                          <div class="min-w-0">
                            <p class="text-sm font-bold text-slate-700 truncate group-hover:text-blue-600 transition-colors mb-1">{{ item.title }}</p>
                            <div class="flex items-center gap-2">
                              <span class="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-500">{{ getKhmerCategory(item.category) }}</span>
                              <span class="text-[10px] text-slate-300">•</span>
                              <span class="text-[10px] text-slate-400">{{ item.date }}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-5 text-center">
                        <span class="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">{{ item.author || 'Admin' }}</span>
                      </td>
                      <td class="px-6 py-5 text-right">
                        <div class="flex items-center justify-end gap-1">
                          <button @click="startEdit(item)" class="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"><i class="bi bi-pencil-square"></i></button>
                          <button @click="deleteNews(item.id)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><i class="bi bi-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="filteredTableData.length === 0">
                      <td colspan="3" class="px-6 py-20 text-center">
                        <div class="flex flex-col items-center opacity-30">
                          <i class="bi bi-inbox text-5xl mb-2"></i>
                          <p class="text-sm">មិនមានទិន្នន័យស្វែងរកឡើយ</p>
                        </div>
                      </td>
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
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const searchQuery = ref('');
const activeTableTab = ref('All');
const mobileMenuOpen = ref(false);
const userMenuOpen = ref(false);
const currentTime = ref('');
const storageKey = 'app_news_data';
const publishedNews = ref(JSON.parse(localStorage.getItem(storageKey) || '[]'));

// Form States
const isEditing = ref(false);
const editingId = ref(null);
const form = reactive({ category: 'Popular', title: '', content: '', author: '', image: '' });

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

// --- Live Clock Logic ---
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('km-KH', { 
    hour: '2-digit', 
    minute: '2-digit' 
  }) + ' | ' + now.toLocaleDateString('km-KH', {
    day: 'numeric',
    month: 'long'
  });
};

let clockTimer;
onMounted(() => {
  updateTime();
  clockTimer = setInterval(updateTime, 1000);
  
  // Close user menu when clicking outside
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-trigger')) {
      userMenuOpen.value = false;
    }
  });
});

onUnmounted(() => {
  clearInterval(clockTimer);
  window.removeEventListener('click', null);
});

// --- Core Actions ---
const resetForm = () => {
  isEditing.value = false;
  editingId.value = null;
  form.title = ''; form.content = ''; form.image = ''; form.author = '';
  form.category = 'Popular';
};

const startEdit = (item) => {
  isEditing.value = true;
  editingId.value = item.id;
  Object.assign(form, { ...item });
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => form.image = event.target.result;
    reader.readAsDataURL(file);
  }
};

const publishNews = () => {
  if (!form.title || !form.image || !form.content) {
    return Swal.fire({ icon: 'warning', title: 'បំពេញឱ្យគ្រប់', text: 'សូមបញ្ចូល ចំណងជើង រូបភាព និងខ្លឹមសារ', confirmButtonColor: '#2563eb' });
  }

  if (isEditing.value) {
    const idx = publishedNews.value.findIndex(n => n.id === editingId.value);
    if (idx !== -1) {
      publishedNews.value[idx] = { ...publishedNews.value[idx], ...form };
      Swal.fire({ icon: 'success', title: 'បានធ្វើបច្ចុប្បន្នភាព', timer: 1000, showConfirmButton: false });
    }
  } else {
    const newItem = {
      ...form,
      id: Date.now(),
      date: new Date().toLocaleDateString('km-KH', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    publishedNews.value.unshift(newItem);
    Swal.fire({ icon: 'success', title: 'បានរក្សាទុក', timer: 1000, showConfirmButton: false });
  }

  localStorage.setItem(storageKey, JSON.stringify(publishedNews.value));
  resetForm();
};

const deleteNews = (id) => {
  Swal.fire({ 
    title: 'លុបអត្ថបទ?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', confirmButtonText: 'បាទ លុបចេញ' 
  }).then(res => {
    if (res.isConfirmed) {
      publishedNews.value = publishedNews.value.filter(n => n.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(publishedNews.value));
      if (editingId.value === id) resetForm();
    }
  });
};

// --- Computed Helpers ---
const getCategoryCount = (id) => id === 'All' ? publishedNews.value.length : publishedNews.value.filter(i => i.category === id).length;
const getKhmerCategory = (en) => categoriesKhmer.find(c => c.en === en)?.kh || en;
const getIconForCategory = (id) => {
  const icons = { 'All': 'bi-grid-fill', 'Popular': 'bi-lightning-charge', 'Entertainment': 'bi-controller', 'Sports': 'bi-trophy', 'Tech': 'bi-cpu', 'Society': 'bi-people' };
  return icons[id] || 'bi-bookmark';
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

const handleLogout = () => router.push('/');
</script>

<style scoped>
/* Global Font Imports - Include Battambang from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css');

/* Main Font Family */
.font-khmer { 
    font-family: 'Battambang', 'Khmer OS Battambang', sans-serif; 
}

/* SweetAlert2 Specific Overrides to ensure Font Consistency */
div:where(.swal2-container) div:where(.swal2-popup) {
    font-family: 'Battambang', 'Khmer OS Battambang', sans-serif !important;
}
div:where(.swal2-container) .swal2-title {
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: #1e293b !important;
}
div:where(.swal2-container) .swal2-html-container {
    font-size: 0.95rem !important;
    color: #64748b !important;
}

/* Custom Scrollbar */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

/* Transitions */
.dropdown-enter-active, .dropdown-leave-active { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-8px) scale(0.95); }
</style>