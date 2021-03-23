import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: 'guide',
    component: () => import("./pages/Guide.vue")
  },
  {
    path: "/guide",
    name: 'guide',
    component: () => import("./pages/Guide.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/Login.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;