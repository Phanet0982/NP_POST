<template>
  <header class="top-nav border-bottom bg-white sticky-top shadow-sm font-khmer">
    <div class="ticker-bar bg-primary text-white py-1 d-none d-md-block">
      <div class="container-fluid px-4 d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center flex-grow-1 overflow-hidden">
          <span class="badge bg-danger me-3 anim-pulse">HOT NEWS</span>
          <div class="ticker-content">
            <div class="ticker-track">
              <span class="me-5">🔔 ស្វាគមន៍មកកាន់ NP News៖ ព័ត៌មានពិត រហ័ស និងទុកចិត្តបាន</span>
              <span class="me-5">📈 សេដ្ឋកិច្ច៖ ទីផ្សារភាគហ៊ុនកើនឡើងខ្ពស់បំផុតក្នុងឆ្នាំ ២០២៦</span>
              <span class="me-5">🌍 បរិស្ថាន៖ កិច្ចព្រមព្រៀងប្រវត្តិសាស្ត្រស្តីពីការប្រែប្រួលអាកាសធាតុត្រូវបានចុះហត្ថលេខា</span>
            </div>
          </div>
        </div>
        <div class="date-display ms-3 small fw-bold text-nowrap opacity-90">
          <i class="bi bi-calendar3 me-1"></i> {{ currentDate }}
        </div>
      </div>
    </div>

    <div class="header-main px-4 d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center flex-1">
        <button class="btn btn-light btn-sm me-3 d-lg-none" @click="$emit('toggle-menu')">
          <i class="bi bi-list fs-4"></i>
        </button>
        
        <div class="search-wrapper d-none d-lg-block">
          <div class="input-group input-group-sm search-box">
            <span class="input-group-text bg-light border-0"><i class="bi bi-search text-primary"></i></span>
            <input 
              v-model="searchQuery" 
              @input="handleSearch"
              @focus="isFocused = true"
              type="text" 
              class="form-control bg-light border-0 shadow-none" 
              placeholder="ស្វែងរកអត្ថបទព័ត៌មាន..."
            >
          </div>
          <div v-if="searchQuery && isFocused" class="search-results-dropdown shadow-lg">
            <div class="dropdown-header-custom">
              <span>លទ្ធផលស្វែងរក</span>
              <span class="badge bg-primary-subtle text-primary">{{ searchResults.length }}</span>
            </div>
            <div v-if="searchResults.length > 0">
              <div v-for="item in searchResults" :key="item.id" @click="goToArticle(item)" class="search-result-item">
                <div v-if="item.media && item.media.startsWith('data:video')" class="media-thumbnail bg-dark d-flex align-items-center justify-content-center text-white">
                  <i class="bi bi-play-circle-fill fs-5"></i>
                </div>
                <img v-else :src="item.media || 'https://placehold.co/100x100?text=No+Img'" class="result-img" alt="News">
                <div class="result-info">
                  <div class="result-title text-truncate">{{ item.title }}</div>
                  <small class="text-primary fw-bold">{{ item.category }} • {{ item.date }}</small>
                </div>
                <i class="bi bi-chevron-right ms-auto text-muted small"></i>
              </div>
            </div>
            <div v-else class="p-4 text-center">
              <p class="text-muted small mb-0">មិនឃើញមានទិន្នន័យសម្រាប់ "{{ searchQuery }}"</p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center d-lg-none flex-grow-1">
        <div class="d-flex align-items-center justify-content-center cursor-pointer" @click="router.push('/')">
          <img src="https://png.pngtree.com/png-vector/20220714/ourmid/pngtree-np-icon-vector-illustration-design-letter-monogram-alphabet-vector-png-image_37915324.png" 
               alt="Logo" class="brand-logo me-2" />
          <div class="text-start d-sm-block" style="line-height: 1.1;">
            <h1 class="h5 fw-black mb-0 text-dark">NP <span class="text-primary">News</span></h1>
            <small class="text-muted fw-light" style="font-size: 0.7rem;">News Information</small>
          </div>
        </div>
      </div>

      <div class="header-right d-flex align-items-center justify-content-end flex-1 gap-2">
        <button class="btn btn-light btn-sm d-lg-none rounded-circle" @click="showMobileSearch = !showMobileSearch">
          <i class="bi bi-search"></i>
        </button>

        <template v-if="!user">
          <button @click="openAuthModal('login')" class="btn btn-link text-dark text-decoration-none fw-bold small d-none d-md-inline-block">ចូលប្រើ</button>
          <button @click="openAuthModal('register')" class="btn btn-primary btn-sm rounded-pill px-4 shadow-sm fw-bold">ចុះឈ្មោះ</button>
        </template>

        <template v-else>
          <div class="d-flex align-items-center gap-2">
            <div class="text-end d-none d-md-block">
              <div class="fw-bold small" style="line-height: 1">{{ user.name }}</div>
              <span v-if="user.role === 'admin'" class="badge bg-danger-subtle text-danger border border-danger-subtle mt-1" style="font-size: 0.6rem;">ADMIN PANEL</span>
              <small v-else class="text-muted​​​​ text-primary" style="font-size: 0.7rem;">{{ user.email }}</small>
            </div>
            <div class="dropdown">
              <img :src="user.avatar" 
                   @click.stop="toggleDropdown"
                   class="rounded-circle border border-2 border-primary p-0.5 cursor-pointer profile-img shadow-sm" 
                   alt="Profile">
              <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 p-2" :class="{ show: showDropdown }">
                <li v-if="user.role === 'admin'">
                  <router-link to="/management" class="dropdown-item rounded-2 text-primary fw-bold">
                    <i class="bi bi-speedometer2"></i>
                    <span>គ្រប់គ្រងអត្ថបទ</span>
                  </router-link>
                </li>
                <li>
                  <a class="dropdown-item rounded-2 cursor-pointer" @click="openProfileModal">
                    <i class="bi bi-person"></i>
                    <span>គណនីរបស់ខ្ញុំ</span>
                  </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <button class="dropdown-item rounded-2 text-danger" @click="handleLogout">
                    <i class="bi bi-box-arrow-right"></i>
                    <span>ចាកចេញ</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div v-if="showMobileSearch" class="p-2 d-lg-none bg-white border-bottom animate-slide-down">
        <div class="search-wrapper w-100">
          <div class="input-group input-group-sm search-box border">
            <span class="input-group-text bg-light border-0"><i class="bi bi-search text-primary"></i></span>
            <input 
              v-model="searchQuery" 
              @input="handleSearch"
              type="text" 
              class="form-control bg-light border-0 shadow-none" 
              placeholder="ស្វែងរកអត្ថបទព័ត៌មាន..."
            >
            <button class="btn btn-light btn-sm border-0" @click="showMobileSearch = false"><i class="bi bi-x"></i></button>
          </div>
          
          <div v-if="searchQuery" class="mt-2 border rounded shadow-sm bg-white overflow-hidden">
            <div v-if="searchResults.length > 0">
              <div v-for="item in searchResults" :key="item.id" @click="goToArticle(item)" class="search-result-item">
                <img :src="item.media || 'https://placehold.co/100x100?text=No+Img'" class="result-img" alt="News">
                <div class="result-info">
                  <div class="result-title text-truncate">{{ item.title }}</div>
                  <small class="text-primary fw-bold">{{ item.category }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>

    <div v-if="showModal" class="modal-overlay d-flex align-items-center justify-content-center" @click.self="showModal = false">
      <div class="modal-content-custom bg-white p-4 rounded-4 shadow-2xl border-0">
         <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold mb-0 text-primary">{{ authMode === 'login' ? 'ចូលប្រើប្រាស់' : 'បង្កើតគណនី' }}</h3>
          <button class="btn-close" @click="showModal = false"></button>
        </div>
        <form @submit.prevent="handleAuthSubmit">
          <div v-if="authMode === 'register'" class="mb-3">
            <label class="form-label small fw-bold text-muted">ឈ្មោះពេញ</label>
            <input v-model="authForm.name" type="text" class="form-control form-control-lg fs-6 border-light-subtle bg-light" placeholder="បញ្ចូលឈ្មោះ" required>
          </div>
          <div class="mb-3">
            <label class="form-label small fw-bold text-muted">អុីមែល</label>
            <input v-model="authForm.email" type="email" class="form-control form-control-lg fs-6 border-light-subtle bg-light" placeholder="admin@np.com" required>
          </div>
          <div class="mb-4">
            <label class="form-label small fw-bold text-muted">លេខសម្ងាត់</label>
            <input v-model="authForm.password" type="password" class="form-control form-control-lg fs-6 border-light-subtle bg-light" placeholder="••••••••" required>
          </div>
          <button type="submit" class="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow">
            {{ authMode === 'login' ? 'ចូលក្នុងប្រព័ន្ធ' : 'ចុះឈ្មោះឥឡូវនេះ' }}
          </button>
        </form>
        <div class="text-center mt-4">
          <p class="small text-muted mb-0">
            {{ authMode === 'login' ? "មិនទាន់មានគណនី?" : "មានគណនីរួចហើយ?" }}
            <button @click="authMode = authMode === 'login' ? 'register' : 'login'" class="btn btn-link btn-sm fw-bold text-decoration-none">
              {{ authMode === 'login' ? "បង្កើតគណនីថ្មី" : "ត្រឡប់ទៅការចូលប្រើ" }}
            </button>
          </p>
        </div>
      </div>
    </div>

    <div v-if="showProfileModal" class="modal-overlay d-flex align-items-center justify-content-center" @click.self="showProfileModal = false">
      <div class="modal-content-profile bg-white rounded-4 shadow-2xl border-0 overflow-hidden font-khmer">
        
        <div class="bg-primary p-4 text-white d-flex align-items-center gap-3 position-relative">
            <div class="position-relative">
                <img :src="editProfileForm.avatar" class="rounded-circle border border-3 border-white profile-avatar-lg" style="object-fit: cover;">
                <div class="camera-icon-overlay" @click="triggerFileInput">
                    <i class="bi bi-camera-fill"></i>
                </div>
                <input type="file" ref="fileInput" class="d-none" accept="image/*" @change="handleAvatarUpload">
            </div>
            <div>
                <h5 class="fw-bold mb-1">{{ editProfileForm.name || 'User Name' }}</h5>
                <span class="badge bg-white text-primary rounded-pill px-3">{{ user?.role === 'admin' ? 'អ្នកគ្រប់គ្រង' : 'សមាជិក' }}</span>
            </div>
             <button class="btn-close btn-close-white position-absolute top-0 end-0 m-3" @click="showProfileModal = false"></button>
        </div>

        <div class="p-4">
             <form @submit.prevent="saveProfileChanges">
                <div class="mb-3">
                    <label class="form-label fw-bold text-secondary small">ឈ្មោះអ្នកប្រើប្រាស់</label>
                    <input v-model="editProfileForm.name" type="text" class="form-control form-control-lg fs-6" required>
                </div>
                
                <div class="mb-3">
                    <label class="form-label fw-bold text-secondary small">អាសយដ្ឋានអ៊ីមែល</label>
                    <input v-model="editProfileForm.email" type="email" class="form-control form-control-lg fs-6" required>
                </div>

                <hr class="border-secondary-subtle my-4 opacity-10">
                <p class="text-center text-muted small mb-3">ប្តូរលេខសម្ងាត់ (ទុកទំនេរប្រសិនបើមិនប្តូរ)</p>

                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-bold text-secondary small">លេខសម្ងាត់ថ្មី</label>
                        <div class="position-relative">
                             <input v-model="editProfileForm.newPassword" :type="showPass ? 'text' : 'password'" class="form-control form-control-lg fs-6" placeholder="••••••••">
                             <i class="bi position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer text-muted" 
                                :class="showPass ? 'bi-eye-slash' : 'bi-eye'" @click="showPass = !showPass"></i>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-bold text-secondary small">បញ្ជាក់លេខសម្ងាត់</label>
                        <div class="position-relative">
                            <input v-model="editProfileForm.confirmPassword" :type="showPass ? 'text' : 'password'" class="form-control form-control-lg fs-6" placeholder="••••••••">
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary w-100 mt-4 py-2 fw-bold">
                    <i class="bi bi-check-circle-fill me-2"></i> រក្សាទុកការផ្លាស់ប្តូរ
                </button>
             </form>
        </div>
      </div>
    </div>

  </header>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import localforage from 'localforage'; 

localforage.config({ name: 'NP_News_App', storeName: 'articles' });

const router = useRouter();
const currentDate = new Date().toLocaleDateString('km-KH', { day: 'numeric', month: 'long', year: 'numeric' });

// State
const user = ref(null);
const showDropdown = ref(false);
const showModal = ref(false);
const showMobileSearch = ref(false);
const showProfileModal = ref(false); // New Profile Modal state
const authMode = ref('login');
const authForm = reactive({ name: '', email: '', password: '' });

// Profile Edit State
const editProfileForm = reactive({
    name: '',
    email: '',
    role: '',
    avatar: '',
    originalEmail: '', // To track if email changed
    newPassword: '',
    confirmPassword: ''
});
const showPass = ref(false);
const fileInput = ref(null);

const MASTER_EMAIL = 'phanet@gmail.com';
const MASTER_PASS = 'admin12345';

const searchQuery = ref('');
const searchResults = ref([]);
const isFocused = ref(false);

onMounted(() => {
  // Load User
  const savedUser = localStorage.getItem('np_news_user');
  if (savedUser) {
    const parsed = JSON.parse(savedUser);
    if (parsed.email === 'guest@test.com') {
       localStorage.removeItem('np_news_user');
       user.value = null;
    } else {
       user.value = parsed;
    }
  } else {
    user.value = null;
  }
  window.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => window.removeEventListener('click', handleGlobalClick));

// --- Search Logic ---
const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }
  try {
    const allNews = await localforage.getItem('news_list') || [];
    const query = searchQuery.value.toLowerCase();
    searchResults.value = allNews.filter(item => 
      item.title.toLowerCase().includes(query) || 
      (item.category && item.category.toLowerCase().includes(query))
    ).slice(0, 5);
  } catch (error) {
    console.error("Error searching news:", error);
    searchResults.value = [];
  }
};

const goToArticle = async (item) => {
  const targetId = item.id;
  searchQuery.value = '';
  isFocused.value = false;
  showMobileSearch.value = false;
  searchResults.value = [];
  await nextTick();
  router.push(`/news/${targetId}`);
};

// --- Auth Modal Logic ---
const openAuthModal = (mode) => {
  authMode.value = mode;
  showModal.value = true;
};

const handleAuthSubmit = () => {
  // Master Admin Login
  if (authForm.email === MASTER_EMAIL && authForm.password === MASTER_PASS) {
    const adminUser = {
      name: 'NP Administrator',
      email: MASTER_EMAIL,
      role: 'admin',
      avatar: `https://ui-avatars.com/api/?name=Admin&background=0D6EFD&color=fff&bold=true`
    };
    loginUser(adminUser, true);
    router.push('/management');
    return;
  }

  if (authMode.value === 'login') {
    const storedUser = localStorage.getItem(`user_${authForm.email}`);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.password === authForm.password) {
        const sessionUser = {
          name: parsedUser.name || 'User',
          email: parsedUser.email,
          role: parsedUser.email.includes('admin') ? 'admin' : 'user',
          avatar: parsedUser.avatar || `https://ui-avatars.com/api/?name=${parsedUser.name}&background=6c757d&color=fff`
        };
        loginUser(sessionUser, sessionUser.role === 'admin');
        return;
      }
    }
    alert('អុីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវ!');
  } else {
    if(authForm.email === 'guest@test.com') {
        alert('Email នេះមិនអាចប្រើបានទេ!');
        return;
    }
    // Register
    const newUser = {
        name: authForm.name,
        email: authForm.email,
        password: authForm.password,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${authForm.name}&background=6c757d&color=fff`
    };
    localStorage.setItem(`user_${authForm.email}`, JSON.stringify(newUser));
    alert('ចុះឈ្មោះជោគជ័យ! សូមចូលប្រើប្រាស់។');
    authMode.value = 'login';
  }
};

const loginUser = (userData, isAdmin) => {
  user.value = userData;
  localStorage.setItem('np_news_user', JSON.stringify(userData));
  if (isAdmin) localStorage.setItem('admin_status', 'true');
  showModal.value = false;
};

const handleLogout = () => {
  user.value = null;
  localStorage.removeItem('np_news_user');
  localStorage.removeItem('admin_status');
  showDropdown.value = false;
  router.push('/');
};

// --- Profile Modal Logic (NEW) ---
const openProfileModal = () => {
    // Populate form with current user data
    editProfileForm.name = user.value.name;
    editProfileForm.email = user.value.email;
    editProfileForm.originalEmail = user.value.email;
    editProfileForm.role = user.value.role;
    editProfileForm.avatar = user.value.avatar;
    editProfileForm.newPassword = '';
    editProfileForm.confirmPassword = '';
    
    showDropdown.value = false;
    showProfileModal.value = true;
};

const triggerFileInput = () => {
    fileInput.value.click();
};

const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            editProfileForm.avatar = e.target.result; // Base64 string
        };
        reader.readAsDataURL(file);
    }
};

const saveProfileChanges = () => {
    // 1. Validate Password if entered
    if (editProfileForm.newPassword || editProfileForm.confirmPassword) {
        if (editProfileForm.newPassword !== editProfileForm.confirmPassword) {
            alert('លេខសម្ងាត់ទាំងពីរមិនដូចគ្នាទេ!');
            return;
        }
    }

    // 2. Get current stored data
    const storageKey = `user_${editProfileForm.originalEmail}`;
    const storedData = JSON.parse(localStorage.getItem(storageKey) || '{}');

    // 3. Update Data Object
    const updatedUser = {
        ...storedData,
        name: editProfileForm.name,
        email: editProfileForm.email,
        avatar: editProfileForm.avatar,
        // Only update password if new one is provided
        password: editProfileForm.newPassword ? editProfileForm.newPassword : storedData.password
    };

    // 4. Handle Email Change (Move data to new key)
    if (editProfileForm.email !== editProfileForm.originalEmail) {
        // Remove old key
        localStorage.removeItem(storageKey);
        // Set new key
        localStorage.setItem(`user_${editProfileForm.email}`, JSON.stringify(updatedUser));
    } else {
        // Update existing key
        localStorage.setItem(storageKey, JSON.stringify(updatedUser));
    }

    // 5. Update Session User (np_news_user)
    const sessionUser = {
        name: updatedUser.name,
        email: updatedUser.email,
        role: user.value.role, // role persists
        avatar: updatedUser.avatar
    };
    user.value = sessionUser;
    localStorage.setItem('np_news_user', JSON.stringify(sessionUser));

    // 6. Close Modal
    alert('រក្សាទុកការផ្លាស់ប្តូរជោគជ័យ!');
    showProfileModal.value = false;
};

// --- General Utils ---
const toggleDropdown = () => (showDropdown.value = !showDropdown.value);
const handleGlobalClick = (e) => {
  if (!e.target.closest('.profile-img')) showDropdown.value = false;
  if (!e.target.closest('.search-wrapper')) isFocused.value = false;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;700;900&display=swap');

.font-khmer { font-family: 'Khmer OS Battambang', sans-serif; }
.header-main { height: 75px; }
.brand-logo { height: 50px; width: 50px; object-fit: contain; transition: transform 0.3s; }
.brand-logo:hover { transform: scale(1.1); }
.profile-img { width: 40px; height: 40px; object-fit: cover; }
.cursor-pointer { cursor: pointer; }

/* Modal Styles */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15, 23, 42, 0.6); z-index: 3000; backdrop-filter: blur(8px);
}
.modal-content-custom { width: 90%; max-width: 420px; animation: modalIn 0.3s ease-out; }
.modal-content-profile { width: 90%; max-width: 500px; animation: modalIn 0.3s ease-out; }

@keyframes modalIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Profile Modal Specifics */
.profile-avatar-lg { width: 80px; height: 80px; }
.camera-icon-overlay {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #fff;
    color: #0d6efd;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: transform 0.2s;
}
.camera-icon-overlay:hover { transform: scale(1.1); }

/* Ticker Animation */
.ticker-content { white-space: nowrap; overflow: hidden; width: 100%; }
.ticker-track {
  display: inline-block;
  animation: ticker-scroll 35s linear infinite;
  font-size: 0.85rem;
}
@keyframes ticker-scroll {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
.anim-pulse { animation: pulse 2s infinite; }
@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
}

/* Dropdown & Search Styles */
.dropdown-menu {
  min-width: 220px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.05) !important;
  padding: 8px !important;
  right: 0;
}
.dropdown-menu.show { display: block; }
.dropdown-item {
  padding: 10px 15px;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  transition: all 0.2s;
}
.dropdown-item i { font-size: 1.2rem; width: 25px; margin-right: 12px; }
.dropdown-item:hover { background-color: #f8f9fa; color: #0d6efd; }

.search-wrapper { position: relative; width: 320px; z-index: 1050; }
.search-box {
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}
.search-box:focus-within { border-color: #0d6efd; background: white; }

.search-results-dropdown {
  position: absolute; top: 110%; left: 0; right: 0;
  background: white; border-radius: 12px;
  overflow: hidden; border: 1px solid #edf2f7;
  animation: slideIn 0.2s ease-out;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown-header-custom {
  padding: 10px 15px; background: #f8fafc;
  font-size: 0.75rem; font-weight: 700; color: #64748b;
  display: flex; justify-content: space-between;
  border-bottom: 1px solid #f1f5f9;
}

.search-result-item {
  display: flex; align-items: center; padding: 12px 15px;
  cursor: pointer; transition: background 0.2s;
  border-bottom: 1px solid #f8fafc;
}
.search-result-item:hover { background: #f0f7ff; }

.result-img, .media-thumbnail {
  width: 44px; height: 44px;
  object-fit: cover; border-radius: 8px;
  margin-right: 12px; flex-shrink: 0;
}

.result-title { font-size: 0.85rem; font-weight: 600; color: #1e293b; line-height: 1.4; }
.text-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.animate-slide-down {
  animation: slideIn 0.2s ease-out;
}
</style>