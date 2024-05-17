import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

import { VueQueryPlugin } from "@tanstack/vue-query";

createApp(App).use(VueQueryPlugin).mount("#app");
