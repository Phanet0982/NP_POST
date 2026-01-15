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
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light border-0"><i class="bi bi-search"></i></span>
            <input type="text" class="form-control bg-light border-0" placeholder="ស្វែងរកព័ត៌មាន...">
          </div>
        </div>
      </div>

      <div class="text-center d-lg-none flex-grow-1">
        <div class="d-flex align-items-center justify-content-center cursor-pointer" @click="router.push('/')">
          <img src="https://png.pngtree.com/png-vector/20220714/ourmid/pngtree-np-icon-vector-illustration-design-letter-monogram-alphabet-vector-png-image_37915324.png" 
               alt="Logo" class="brand-logo me-2" />
          <div class="text-start d-sm-block" style="line-height: 1.1;">
            <h1 class="h5 fw-black mb-0 text-dark">NP <span class="text-primary">News</span></h1>
            <small class="text-muted fw-light" style="font-size: 0.7rem;">DIGITAL MEDIA</small>
          </div>
        </div>
      </div>

      <div class="header-right d-flex align-items-center justify-content-end flex-1 gap-2">
        <template v-if="!user">
          <button @click="openAuthModal('login')" class="btn btn-link text-dark text-decoration-none fw-bold small d-none d-md-inline-block">ចូលប្រើ</button>
          <button @click="openAuthModal('register')" class="btn btn-primary btn-sm rounded-pill px-4 shadow-sm fw-bold">ចុះឈ្មោះ</button>
        </template>

        <template v-else>
          <div class="d-flex align-items-center gap-2">
            <div class="text-end d-none d-md-block">
              <div class="fw-bold small" style="line-height: 1">{{ user.name }}</div>
              <span v-if="user.role === 'admin'" class="badge bg-danger-subtle text-danger border border-danger-subtle mt-1" style="font-size: 0.6rem;">ADMIN PANEL</span>
              <small v-else class="text-muted" style="font-size: 0.7rem;">{{ user.email }}</small>
            </div>
            <div class="dropdown">
              <img :src="user.avatar" 
                   @click.stop="toggleDropdown"
                   class="rounded-circle border border-2 border-primary p-0.5 cursor-pointer profile-img shadow-sm" 
                   alt="Profile">
              <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 p-2" :class="{ show: showDropdown }">
                <li><div class="dropdown-header text-dark fw-bold d-md-none border-bottom mb-1">{{ user.name }}</div></li>
                <li v-if="user.role === 'admin'">
                   <router-link to="/management" class="dropdown-item rounded-2 text-primary fw-bold mb-1">
                    <i class="bi bi-speedometer2 me-2"></i>គ្រប់គ្រងអត្ថបទ
                   </router-link>
                </li>
                <li><a class="dropdown-item rounded-2" href="#"><i class="bi bi-person me-2"></i>គណនីរបស់ខ្ញុំ</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><button class="dropdown-item rounded-2 text-danger" @click="handleLogout"><i class="bi bi-box-arrow-right me-2"></i>ចាកចេញ</button></li>
              </ul>
            </div>
          </div>
        </template>
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
  </header>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentDate = new Date().toLocaleDateString('km-KH', { day: 'numeric', month: 'long', year: 'numeric' });
const user = ref(null);
const showDropdown = ref(false);
const showModal = ref(false);
const authMode = ref('login');
const authForm = reactive({ name: '', email: '', password: '' });

// MASTER CREDENTIALS
const MASTER_EMAIL = 'admin@gmail.com';
const MASTER_PASS = 'admin12345';

onMounted(() => {
  const savedUser = localStorage.getItem('np_news_user');
  if (savedUser) user.value = JSON.parse(savedUser);
  window.addEventListener('click', () => (showDropdown.value = false));
});

const openAuthModal = (mode) => {
  authMode.value = mode;
  showModal.value = true;
};

const handleAuthSubmit = () => {
  // 1. Check Master Admin First
  if (authForm.email === MASTER_EMAIL && authForm.password === MASTER_PASS) {
    const adminUser = {
      name: 'NP Administrator',
      email: MASTER_EMAIL,
      role: 'admin',
      avatar: `https://ui-avatars.com/api/?name=Admin&background=0D6EFD&color=fff&bold=true`
    };
    user.value = adminUser;
    localStorage.setItem('np_news_user', JSON.stringify(adminUser));
    localStorage.setItem('admin_status', 'true');
    showModal.value = false;
    router.push('/management');
    return;
  }

  // 2. Regular Auth Logic
  if (authMode.value === 'login') {
    const storedUser = localStorage.getItem(`user_${authForm.email}`);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.password === authForm.password) {
        const sessionUser = {
          name: parsedUser.name || 'User',
          email: parsedUser.email,
          role: parsedUser.email.includes('admin') ? 'admin' : 'user',
          avatar: `https://ui-avatars.com/api/?name=${parsedUser.name}&background=6c757d&color=fff`
        };
        user.value = sessionUser;
        localStorage.setItem('np_news_user', JSON.stringify(sessionUser));
        if (sessionUser.role === 'admin') localStorage.setItem('admin_status', 'true');
        showModal.value = false;
        return;
      }
    }
    alert('អុីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវ!');
  } else {
    // Registration logic
    const userData = { ...authForm };
    localStorage.setItem(`user_${authForm.email}`, JSON.stringify(userData));
    alert('ចុះឈ្មោះជោគជ័យ! សូមចូលប្រើប្រាស់។');
    authMode.value = 'login';
  }
};

const handleLogout = () => {
  user.value = null;
  localStorage.removeItem('np_news_user');
  localStorage.removeItem('admin_status');
  showDropdown.value = false;
  router.push('/');
};

const toggleDropdown = () => (showDropdown.value = !showDropdown.value);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;700;900&display=swap');

.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }
.header-main { height: 75px; }
.brand-logo { height: 50px; width: 50px; object-fit: contain; transition: transform 0.3s; }
.brand-logo:hover { transform: scale(1.1); }
.profile-img { width: 40px; height: 40px; object-fit: cover; }
.cursor-pointer { cursor: pointer; }

/* Modal Styles with Fixed Semicolon Error */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15, 23, 42, 0.6); z-index: 3000; backdrop-filter: blur(8px);
}
.modal-content-custom { width: 90%; max-width: 420px; animation: modalIn 0.3s ease-out; }

@keyframes modalIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

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

.dropdown-menu { display: none; }
.dropdown-menu.show { display: block; }
</style>