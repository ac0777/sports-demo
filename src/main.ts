import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "whatwg-fetch";
import "./assets/global.css";

createApp(App).use(router).mount("#app");
