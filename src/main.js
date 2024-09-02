import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import clickOutside from "@/directives/clickOutside"

import "@/assets/css/main.css"

const pinia = createPinia();

const app = createApp(App);

app.directive("click-outside", clickOutside);

app.use(router).use(pinia).mount("#app");
