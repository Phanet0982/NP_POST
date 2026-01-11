import { createRouter, createWebHashHistory } from "vue-router";

// Import View Pages
import Home from "../views/Home.vue";
import Popular from "../views/Popular.vue";
import Sports from "../views/Sports.vue";
import Tech from "../views/Technology.vue";
import Entertainment from "../views/Entertainment.vue";
import Society from "../views/Society.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { label: "Home" }, // English key for internal logic
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

export default router;
