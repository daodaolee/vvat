import { createApp } from 'vue'
import { useStore } from 'vuex';
import App from './App.vue'
import router from "./router";
import store from './store';

import { Button, message, Modal, Form, Input, InputNumber } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

const app = createApp(App);
app.use(router);
app.use(store);

/* Automatically register components under Button, such as Button.Group */
app.use(Button);
app.use(Form);
app.use(Input);
app.use(InputNumber);
// app.use(Button);

app.config.globalProperties.$message = message;
app.config.globalProperties.$confirm = Modal.confirm;

app.mount("#app");



router.beforeEach((to: any, from: any, next: any) => {
  if (to.name === "login") {
    next();
    return;
  } else {
    if (store.state.user.status == 0) {
      next({
        path: "/login"
      })
    } else {
      next()
    }
  }
})
