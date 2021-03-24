import {
  Button,
  message,
  Modal,
  Form,
  Input,
  InputNumber,
  Layout,
  Menu,
  Breadcrumb,
  Dropdown,
  Tabs
} from "ant-design-vue";

export function loadAntdvComponents(app: any): void {
  app
    .use(Button)
    .use(Form)
    .use(Input)
    .use(InputNumber)
    .use(Layout)
    .use(Menu)
    .use(Breadcrumb)
    .use(Dropdown)
    .use(Tabs)

  app.config.globalProperties.$message = message;
  app.config.globalProperties.$modal = Modal;
}
