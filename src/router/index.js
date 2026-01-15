import { createRouter, createWebHashHistory } from "vue-router";

// Import View Pages
import Home from "../views/Home.vue";
import Popular from "../views/Popular.vue";
import Sports from "../views/Sports.vue";
import Tech from "../views/Technology.vue";
import Entertainment from "../views/Entertainment.vue";
import Society from "../views/Society.vue";
import Management from "../dashboard/Management.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { label: "Home" },
  },
  {
    path: "/popular",
    name: "Popular",
    component: Popular,
    meta: { label: "ពេញនិយម" },
  },
  {
    path: "/sports",
    name: "Sports",
    component: Sports,
    meta: { label: "កីឡា" },
  },
  {
    path: "/technology",
    name: "Tech",
    component: Tech,
    meta: { label: "បច្ចេកវិទ្យា" },
  },
  {
    path: "/entertainment",
    name: "Entertainment",
    component: Entertainment,
    meta: { label: "កម្សាន្ត" },
  },
  {
    path: "/society",
    name: "Society",
    component: Society,
    meta: { label: "សង្គម" },
  },
  {
    path: "/management",
    name: "Management",
    component: Management,
    // Add meta requiresAuth to protect this route
    meta: { label: "Admin Dashboard", requiresAuth: true }, 
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

// --- GLOBAL SECURITY GUARD ---
router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem('admin_status') === 'true';
  const isLoggedIn = localStorage.getItem('np_news_user') !== null;

  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    if (isLoggedIn && isAdmin) {
      next(); // User is Admin, allow access
    } else {
      alert("សូមចូលប្រើប្រាស់ជា Admin ជាមុនសិន!");
      next('/'); // Kick back to home page
    }
  } else {
    next(); // Public route, always allow
  }
});

export default router;