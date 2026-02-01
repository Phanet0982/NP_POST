<template>
  <div class="min-h-screen bg-slate-50 font-khmer flex flex-col lg:flex-row text-slate-700">
    
    <Transition name="modal-pop">
      <div v-if="modalState.show" class="modal-overlay" @click.self="closeModalOutside">
        <div class="modal-content-box shadow-2xl text-center">
          
          <div v-if="modalState.type === 'success'" class="icon-wrapper success mb-4">
             <div class="icon-circle">
                <i class="bi bi-check-lg"></i>
             </div>
          </div>

          <div v-else-if="modalState.type === 'warning'" class="icon-wrapper warning mb-4">
             <div class="icon-circle">
                <i class="bi bi-exclamation-lg"></i>
             </div>
          </div>

          <div v-else-if="modalState.type === 'confirm'" class="icon-wrapper danger mb-4">
             <div class="icon-circle">
                <i class="bi bi-trash3-fill"></i>
             </div>
          </div>

          <h2 class="text-xl font-bold text-slate-800 mb-2">{{ modalState.title }}</h2>
          <p class="text-sm text-slate-500 mb-6 px-4">{{ modalState.message }}</p>

          <div v-if="modalState.type === 'confirm'" class="flex gap-3 justify-center">
            <button @click="closeModal" class="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">
              បោះបង់
            </button>
            <button @click="executeConfirm" class="px-6 py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 shadow-lg shadow-red-200 transition-all">
              យល់ព្រមលុប
            </button>
          </div>

          <button v-else @click="closeModal" class="px-8 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors">
            បិទ
          </button>
        </div>
      </div>
    </Transition>
    <header class="lg:hidden bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between sticky top-0 z-40">
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
      class="fixed inset-y-0 left-0 w-64 bg-white flex flex-col border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out lg:sticky lg:h-screen lg:z-30">
      
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
                <div :class="isEditing ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'" class="w-12 h-12 rounded-2xl flex items-center justify-center">
                  <i :class="isEditing ? 'bi bi-pencil-square' : 'bi bi-plus-lg'" class="text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-slate-800">{{ isEditing ? 'កែប្រែអត្ថបទ' : 'អត្ថបទថ្មី' }}</h3>
                  <p class="text-[10px] text-slate-400">បំពេញព័ត៌មានខាងក្រោម</p>
                </div>
              </div>
              
              <div class="space-y-4">
                <div @click="$refs.fileInput.click()" class="relative aspect-video rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden bg-slate-50 cursor-pointer hover:border-blue-400 transition-all group flex items-center justify-center">
                  <template v-if="form.media">
                    <img v-if="form.mediaType === 'image'" :src="form.media" class="w-full h-full object-cover">
                    <video v-else :src="form.media" class="w-full h-full object-cover" autoplay muted loop></video>
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <i class="bi bi-camera text-white text-2xl"></i>
                    </div>
                  </template>
                  <div v-else class="flex flex-col items-center text-slate-400">
                    <i class="bi bi-cloud-arrow-up text-3xl mb-1"></i>
                    <span class="text-[10px] font-bold">រូបភាព ឬ វីដេអូ</span>
                  </div>
                  <input type="file" ref="fileInput" class="hidden" @change="handleMediaUpload" accept="image/*,video/*">
                </div>

                <input v-model="form.title" type="text" placeholder="ចំណងជើង..." class="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all font-bold text-sm">
                <textarea v-model="form.content" rows="4" placeholder="ខ្លឹមសារអត្ថបទ..." class="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none text-sm"></textarea>

                <div class="grid grid-cols-2 gap-3">
                  <select v-model="form.category" class="px-3 py-3 bg-slate-50 rounded-xl text-[12px] outline-none border-none">
                    <option v-for="cat in categoriesKhmer" :key="cat.en" :value="cat.en">{{ cat.kh }}</option>
                  </select>
                  <input v-model="form.author" type="text" placeholder="អ្នកនិពន្ធ..." class="px-3 py-3 bg-slate-50 rounded-xl text-sm outline-none font-bold border-none">
                </div>

                <div class="flex gap-2">
                  <button v-if="isEditing" @click="resetForm" class="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm">បោះបង់</button>
                  <button @click="publishNews" :class="isEditing ? 'bg-amber-500' : 'bg-blue-600'" class="flex-[2] py-3 text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-opacity">
                    {{ isEditing ? 'ធ្វើបច្ចុប្បន្នភាព' : 'រក្សាទុក' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="xl:col-span-8">
            <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div class="p-6 border-b border-gray-50 flex items-center justify-between">
                <h3 class="font-bold text-slate-800">បញ្ជីអត្ថបទ</h3>
                <div class="relative">
                  <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                  <input v-model="searchQuery" type="text" placeholder="ស្វែងរក..." class="pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-sm outline-none w-64 focus:ring-2 focus:ring-blue-100 transition-all border-none">
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead class="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400">
                    <tr>
                      <th class="px-6 py-4">អត្ថបទ</th>
                      <th class="px-6 py-4 text-center">ប្រភេទ</th>
                      <th class="px-6 py-4 text-right">សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-50">
                    <tr v-for="item in filteredTableData" :key="item.id" class="hover:bg-slate-50/50 transition-colors group">
                      <td class="px-6 py-4">
                        <div class="flex items-center gap-4">
                          <div class="w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-100">
                            <img v-if="item.mediaType === 'image'" :src="item.media" class="w-full h-full object-cover">
                            <video v-else :src="item.media" class="w-full h-full object-cover" muted></video>
                          </div>
                          <div class="min-w-0">
                            <p class="text-sm font-bold text-slate-700 truncate group-hover:text-blue-600 transition-colors">{{ item.title }}</p>
                            <p class="text-[10px] text-slate-400">{{ item.date }} | {{ item.author || 'Admin' }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <span class="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-lg">{{ getKhmerCategory(item.category) }}</span>
                      </td>
                      <td class="px-6 py-4 text-right">
                        <div class="flex items-center justify-end gap-1">
                          <button @click="startEdit(item)" class="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-all"><i class="bi bi-pencil-square"></i></button>
                          <button @click="askDelete(item.id)" class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><i class="bi bi-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="filteredTableData.length === 0">
                      <td colspan="3" class="px-6 py-20 text-center text-slate-300">
                        <i class="bi bi-inbox text-5xl"></i>
                        <p class="text-sm mt-2">មិនមានទិន្នន័យឡើយ</p>
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
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import localforage from 'localforage';

// Database Config
localforage.config({ name: 'NP_News_App', storeName: 'articles' });

const router = useRouter();
const searchQuery = ref('');
const activeTableTab = ref('All');
const mobileMenuOpen = ref(false);
const currentTime = ref('');
const publishedNews = ref([]);

// --- MODAL STATE ---
const modalState = ref({
  show: false,
  type: 'success', // success, warning, confirm
  title: '',
  message: '',
  confirmCallback: null
});

const isEditing = ref(false);
const editingId = ref(null);
const form = reactive({ category: 'Popular', title: '', content: '', author: '', media: '', mediaType: 'image' });

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

// --- Initialization ---
onMounted(async () => {
  const savedData = await localforage.getItem('news_list');
  if (savedData) publishedNews.value = savedData;
  updateTime();
  setInterval(updateTime, 1000);
});

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('km-KH', { hour: '2-digit', minute: '2-digit' }) + ' | ' + now.toLocaleDateString('km-KH', { day: 'numeric', month: 'long' });
};

// --- Custom Alert Helper ---
const showToast = (title, message, type = 'success') => {
  modalState.value = { show: true, type, title, message, confirmCallback: null };
  if (type !== 'confirm') {
    setTimeout(() => { modalState.value.show = false; }, 2500);
  }
};

const showConfirmModal = (title, message, callback) => {
  modalState.value = { show: true, type: 'confirm', title, message, confirmCallback: callback };
};

const closeModal = () => {
  modalState.value.show = false;
};

const closeModalOutside = () => {
  if (modalState.value.type !== 'confirm') {
    closeModal();
  }
};

const executeConfirm = () => {
  if (modalState.value.confirmCallback) {
    modalState.value.confirmCallback();
  }
  closeModal();
};

// --- Actions ---
const handleMediaUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 100 * 1024 * 1024) {
      showToast('កំហុស', 'ទំហំឯកសារធំពេក (លើសពី 100MB)', 'warning');
      return;
    }
    form.mediaType = file.type.startsWith('video') ? 'video' : 'image';
    const reader = new FileReader();
    reader.onload = (event) => form.media = event.target.result;
    reader.readAsDataURL(file);
  }
};

const publishNews = async () => {
  if (!form.title || !form.media) {
    showToast('មិនទាន់ពេញលេញ', 'សូមបំពេញចំណងជើង និងរូបភាព/វីដេអូ', 'warning');
    return;
  }

  if (isEditing.value) {
    const idx = publishedNews.value.findIndex(n => n.id === editingId.value);
    publishedNews.value[idx] = { ...publishedNews.value[idx], ...form };
  } else {
    publishedNews.value.unshift({
      ...form,
      id: Date.now(),
      date: new Date().toLocaleDateString('km-KH', { day: 'numeric', month: 'short' }),
      likes: 0,
      comments: []
    });
  }

  await localforage.setItem('news_list', JSON.parse(JSON.stringify(publishedNews.value)));
  
  showToast('ជោគជ័យ', 'ទិន្នន័យត្រូវបានរក្សាទុក', 'success');
  resetForm();
};

const askDelete = (id) => {
  showConfirmModal(
    'បញ្ជាក់ការលុប?', 
    'តើអ្នកពិតជាចង់លុបអត្ថបទនេះមែនទេ? ទិន្នន័យមិនអាចយកមកវិញបានឡើយ។', 
    () => deleteNews(id)
  );
};

const deleteNews = async (id) => {
  publishedNews.value = publishedNews.value.filter(n => n.id !== id);
  await localforage.setItem('news_list', JSON.parse(JSON.stringify(publishedNews.value)));
  if (editingId.value === id) resetForm();
  
  // Wait a small bit for the modal to close first, then show success
  setTimeout(() => {
    showToast('បានលុប', 'ទិន្នន័យត្រូវបានលុបជោគជ័យ', 'success');
  }, 300);
};

const startEdit = (item) => {
  isEditing.value = true;
  editingId.value = item.id;
  Object.assign(form, item);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const resetForm = () => {
  isEditing.value = false;
  editingId.value = null;
  Object.assign(form, { title: '', content: '', author: '', media: '', mediaType: 'image', category: 'Popular' });
};

const handleLogout = () => router.push('/');

// --- Helpers ---
const getCategoryCount = (id) => id === 'All' ? publishedNews.value.length : publishedNews.value.filter(i => i.category === id).length;
const getKhmerCategory = (en) => categoriesKhmer.find(c => c.en === en)?.kh || en;
const getIconForCategory = (id) => {
  const icons = { 'All': 'bi-grid-fill', 'Popular': 'bi-lightning-charge', 'Entertainment': 'bi-controller', 'Sports': 'bi-trophy', 'Tech': 'bi-cpu', 'Society': 'bi-people' };
  return icons[id] || 'bi-bookmark';
};

const filteredTableData = computed(() => {
  let list = publishedNews.value;
  if (activeTableTab.value !== 'All') list = list.filter(item => item.category === activeTableTab.value);
  if (searchQuery.value) list = list.filter(item => item.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
  return list;
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700;900&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css');

.font-khmer { font-family: 'Battambang', sans-serif; }

/* Custom Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }

/* --- CUSTOM MODAL STYLES (Identical to NewsDetail) --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  backdrop-filter: blur(2px);
}

.modal-content-box {
  background: white;
  padding: 40px;
  width: 90%;
  max-width: 400px;
  border-radius: 20px !important; 
  position: relative;
}

/* Icon Animation & Style */
.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

/* Success Theme */
.icon-wrapper.success .icon-circle {
  background-color: #dcfce7; /* Light Green */
  border: 4px solid #f0fdf4; /* Lighter ring */
}
.icon-wrapper.success i {
  font-size: 3rem;
  color: #22c55e;
}

/* Warning Theme */
.icon-wrapper.warning .icon-circle {
  background-color: #fef9c3;
  border: 4px solid #fefce8;
}
.icon-wrapper.warning i {
  font-size: 3rem;
  color: #eab308;
}

/* Danger/Delete Theme */
.icon-wrapper.danger .icon-circle {
  background-color: #fee2e2;
  border: 4px solid #fef2f2;
}
.icon-wrapper.danger i {
  font-size: 3rem;
  color: #ef4444;
}

/* Pop Animation */
.modal-pop-enter-active,
.modal-pop-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-pop-enter-from,
.modal-pop-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.modal-pop-enter-to,
.modal-pop-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>