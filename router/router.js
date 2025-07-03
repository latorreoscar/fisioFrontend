import { createRouter, createWebHistory } from "vue-router";
import home from "../layouts/home.vue";
import privatePage from "../layouts/privatePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/private",
    name: "private",
    component: privatePage,
  },
];

export default defineNuxtPlugin((nuxtApp) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  nuxtApp.vueApp.use(router);

  return {
    provide: {
      router,
    },
  };
});
