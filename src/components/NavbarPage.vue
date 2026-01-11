<template>
  <aside :class="['sidebar shadow-sm', { 'sidebar-open': isOpen }]">
    <div class="sidebar-header border-bottom px-4 py-3 bg-white d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <img
          src="https://png.pngtree.com/png-vector/20220714/ourmid/pngtree-np-icon-vector-illustration-design-letter-monogram-alphabet-vector-png-image_37915324.png"
          alt="Logo"
          class="main-logo me-3"
        />
        <div>
          <h1 class="h3 fw-bold mb-0 text-dark brand-title">
            NP <span class="text-primary">News</span>
          </h1>
          <small class="text-muted fw-light brand-subtitle">News Information</small>
        </div>
      </div>

      <button class="btn btn-light btn-sm border d-lg-none" @click="$emit('toggle')">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <nav class="sidebar-nav py-4">
      <div class="menu-section px-3">
        <small class="section-title text-muted mb-3 d-block px-3 text-uppercase fw-bold">
          មឺនុយមេ (MAIN MENU)
        </small>

        <a href="#" :class="['nav-item', { active: activeCat === 'Home' }]" @click.prevent="select('Home')">
          <div class="nav-icon-box"><i class="bi bi-house-door-fill"></i></div>
          <span class="nav-text">ទំព័រដើម</span>
        </a>

        <a v-for="item in menuItems" 
           :key="item" 
           href="#" 
           :class="['nav-item', { active: activeCat === item }]" 
           @click.prevent="select(item)">
          <div class="nav-icon-box">
            <i :class="['bi', getIcon(item)]"></i>
          </div>
          <span class="nav-text">{{ item }}</span>
        </a>
      </div>

      <div class="menu-section mt-auto px-3 pt-5">
        <small class="section-title text-muted mb-3 d-block px-3 text-uppercase fw-bold">
          តាមដានពួកយើង (FOLLOW US)
        </small>
        <div class="d-flex justify-content-between px-2">
          <a href="#" class="social-btn fb"><i class="bi bi-facebook"></i></a>
          <a href="#" class="social-btn ig"><i class="bi bi-instagram"></i></a>
          <a href="#" class="social-btn yt"><i class="bi bi-youtube"></i></a>
          <a href="#" class="social-btn tg"><i class="bi bi-telegram"></i></a>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
const props = defineProps(["menuItems", "activeCat", "isOpen"]);
const emit = defineEmits(["select", "toggle"]);

const select = (cat) => emit("select", cat);

/**
 * Assigns a specific icon based on the text of the menu item.
 * If the name doesn't match, it falls back to a default grid icon.
 */
const getIcon = (name) => {
  const iconMap = {
    'ព័ត៌មានជាតិ': 'bi-newspaper',
    'ព័ត៌មានអន្តរជាតិ': 'bi-globe',
    'កីឡា': 'bi-trophy-fill',
    'បច្ចេកវិទ្យា': 'bi-cpu-fill',
    'សេដ្ឋកិច្ច': 'bi-graph-up-arrow',
    'កម្សាន្ត': 'bi-music-note-beamed',
    'សុខភាព': 'bi-heart-pulse-fill',
    'អប់រំ': 'bi-book-half',
    'សង្គម': 'bi-people-fill'
  };
  
  // Return the specific icon or a default if not found
  return iconMap[name] || 'bi-grid-fill';
};
</script>

<style scoped>
/* Sidebar Main */
.sidebar {
  width: 300px;
  background: #fff;
  position: fixed;
  height: 100vh;
  z-index: 1050;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f1f1f1;
}

/* Header & Logo */
.main-logo {
  height: 60px;
  width: auto;
  object-fit: contain;
}

.brand-title {
  letter-spacing: -0.5px;
  line-height: 1;
}

.brand-subtitle {
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

/* Navigation Links */
.nav-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: #555;
  text-decoration: none;
  border-radius: 12px;
  margin-bottom: 6px;
  transition: all 0.2s ease;
}

.nav-icon-box {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 10px;
  margin-right: 12px;
  font-size: 1.15rem;
  transition: 0.2s;
}

.nav-text {
  font-weight: 500;
  font-family: 'Kantumruy Pro', sans-serif;
}

/* Interaction States */
.nav-item:hover {
  background: #f0f4ff;
  color: #0d6efd;
  transform: translateX(5px);
}

.nav-item.active {
  background: #0d6efd;
  color: #fff !important;
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.2);
}

.nav-item.active .nav-icon-box {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

/* Section Headings */
.section-title {
  font-size: 0.7rem;
  letter-spacing: 1px;
}

/* Social Icon Styles */
.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.social-btn:hover {
  transform: translateY(-3px);
  filter: brightness(1.1);
}

.fb { background: #1877f2; }
.ig { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
.yt { background: #ff0000; }
.tg { background: #0088cc; }

/* Responsive View */
@media (max-width: 991.98px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar-open {
    transform: translateX(0);
  }
}
</style>