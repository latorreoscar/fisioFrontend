import { createRouter, createWebHistory } from "vue-router";
import home from "../pages/home.vue";
import privatePage from "../pages/privatePage.vue";
import landingPage from "../pages/landingPage.vue";

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
  {
    path: "/landing",
    name: "landing",
    component: landingPage,
  }
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
