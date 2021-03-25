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
  Tabs,
  Spin,
  List,
  Tag,
  Badge
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
    .use(Spin)
    .use(List)
    .use(Tag)
    .use(Badge)

  app.config.globalProperties.$message = message;
  app.config.globalProperties.$modal = Modal;
}
