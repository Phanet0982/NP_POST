<template>
  <div class="app-layout">
    <NavbarPage 
      :menu-items="categories" 
      :active-cat="activeCat" 
      :is-open="isMobileMenuOpen"
      @select="handleCategorySelect"
      @toggle="toggleMenu"
    />

    <main class="main-content d-flex flex-column">
      
      <HeaderPage 
        :current-date="currentDate" 
        @toggle-menu="toggleMenu"
      />

      <div class="view-container container-fluid p-4 flex-grow-1">
        <div class="d-flex align-items-center justify-content-between mb-4">
          <div class="d-flex align-items-center border-start border-primary border-4 ps-3">
            <h3 class="fw-bold m-0 text-dark">
               {{ activeCat === 'Home' ? 'ទំព័រដើម' : activeCat }}
            </h3>
          </div>
          <div class="breadcrumb small text-muted d-none d-md-block">
            NP News <i class="bi bi-chevron-right mx-1"></i> {{ activeCat }}
          </div>
        </div>

        <router-view v-slot="{ Component }">
          <transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>

      <FooterPage 
        :menu-items="categories" 
        @select-category="handleCategorySelect" 
      />
    </main>

    <div v-if="isMobileMenuOpen" class="sidebar-overlay" @click="toggleMenu"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// Component Imports
import NavbarPage from './components/NavbarPage.vue';
import FooterPage from './components/FooterPage.vue';
import HeaderPage from './components/HeaderPage.vue'; // New Import

const router = useRouter();
const route = useRoute();

const categories = ["ពេញនិយម", "កីឡា", "បច្ចេកវិទ្យា", "កម្សាន្ត", "សង្គម"];
const isMobileMenuOpen = ref(false);
const currentDate = ref('');

const activeCat = computed(() => {
  return route.meta.label || 'Home';
});

const handleCategorySelect = (categoryName) => {
  const routeMap = {
    'Home': 'Home',
    'ពេញនិយម': 'Popular',
    'កីឡា': 'Sports',
    'បច្ចេកវិទ្យា': 'Tech',
    'កម្សាន្ត': 'Entertainment',
    'សង្គម': 'Society'
  };

  const targetRoute = routeMap[categoryName];
  if (targetRoute) {
    router.push({ name: targetRoute });
  } else {
    router.push({ name: 'Home' }); 
  }
  isMobileMenuOpen.value = false;
};

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const updateDateTime = () => {
  const now = new Date();
  currentDate.value = now.toLocaleDateString('km-KH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

let timer;
onMounted(() => {
  updateDateTime();
  timer = setInterval(updateDateTime, 60000); 
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style>
/* Global Layout Styles Kept Here */
.app-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Khmer OS Battambang', Arial, sans-serif;
}

.main-content {
  flex: 1;
  margin-left: 300px; 
  width: calc(100% - 300px); 
  transition: all 0.3s ease;
  min-height: 100vh; 
}

@media (max-width: 991.98px) {
  .main-content {
    margin-left: 0;
    width: 100%;
  }
  .sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: 1040;
  }
}

/* Page Transitions Kept Here */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>