import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // {
    // path: "/",
    // redirect: "/guide",
    // name: 'guide',
    // component: () => import("./pages/Guide.vue")
  // },
  {
    path: "/",
    name: "guide",
    component: () => import("./views/Guide.vue"),
    children: [
      {
        path: "/dashboard",
        name: "工作台",
        component: () => import("./views/Dashboard.vue"),
        meta:{
          isBreadcrumb: true
        }
      },
      {
        path: "/list",
        name: "列表页",
        component: () => import("./views/List.vue"),
        meta:{
          isBreadcrumb: true
        }
      },
      {
        path: "/profile",
        name: "个人主页",
        component: () => import("./views/Profile.vue"),
      },
      {
        path: "/setting",
        name: "个人设置",
        component: () => import("./views/Setting.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
