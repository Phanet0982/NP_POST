import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 1. Import third-party icons/fonts first
import "bootstrap-icons/font/bootstrap-icons.css";

// 2. Import Bootstrap (if you still need it)
import "bootstrap/dist/css/bootstrap.min.css";

// 3. Import Tailwind/Custom CSS LAST so it can override Bootstrap
import "./style.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
