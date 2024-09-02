import { createRouter, createWebHistory } from "vue-router";
import { currencyMiddleware } from "@/middleware/currencyMiddleware"

import Home from "@/pages/Home.vue";
import Convert from "@/pages/Convert.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/convert",
    name: "convert",
    component: Convert,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  currencyMiddleware(to, from, next);
});

export default router;
