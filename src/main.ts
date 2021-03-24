import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { loadAntdvComponents } from "@/plugins";
import "ant-design-vue/dist/antd.less";

const app = createApp(App);
app.use(router);
app.use(store);

// 加载 antdv Plugins
loadAntdvComponents(app);

app.mount("#app");

router.beforeEach((to: any, from: any, next: any) => {
  if (to.name === "login") {
    next();
    return;
  } else {
    const local = localStorage.getItem("userInfo");
    if (local && local !== "{}") {
      next();
    } else {
      next({
        path: "/login",
      });
    }
  }
});