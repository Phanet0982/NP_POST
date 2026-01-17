import { createRouter, createWebHashHistory } from "vue-router";

// Import View Pages
import Home from "../views/Home.vue";
import Popular from "../views/Popular.vue";
import Sports from "../views/Sports.vue";
import Tech from "../views/Technology.vue";
import Entertainment from "../views/Entertainment.vue";
import Society from "../views/Society.vue";
import Management from "../dashboard/Management.vue";
// Ensure you have created this file in your views folder
import NewsDetail from "../views/NewsDetail.vue";

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
  // --- ADDED THIS DYNAMIC ROUTE FOR SEARCH NAVIGATION ---
  {
    path: "/news/:id",
    name: "NewsDetail",
    component: NewsDetail,
    meta: { label: "ព័ត៌មានលម្អិត" },
  },
  {
    path: "/management",
    name: "Management",
    component: Management,
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
      // Force scroll to top when clicking from search
      return { top: 0, behavior: "smooth" };
    }
  },
});

// --- GLOBAL SECURITY GUARD ---
router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem("admin_status") === "true";
  const isLoggedIn = localStorage.getItem("np_news_user") !== null;

  if (to.meta.requiresAuth) {
    if (isLoggedIn && isAdmin) {
      next();
    } else {
      alert("សូមចូលប្រើប្រាស់ជា Admin ជាមុនសិន!");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
