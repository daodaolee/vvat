<template>
  <a-layout style="min-height: 100vh" class="layout-container">
    <a-layout-sider
      v-model:collapsed="state.collapsed"
      collapsible
      @collapse="collapseHandle"
    >
      <div class="logo">
        <img :src="state.logosrc" />
      </div>
      <a-menu
        theme="dark"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        v-model:openKeys="state.openKeys"
        @click="menuClickHandle"
      >
        <template v-for="menu in menus" :key="menu.key">
          <a-menu-item v-if="!menu.children" :key="menu.key" :title="menu.path">
            <component :is="menu.icon"></component>
            <span>{{ menu.title }}</span>
          </a-menu-item>
          <a-sub-menu v-else :key="menu.key">
            <template #title>
              <span>
                <component :is="menu.icon"></component>
                <span>{{ menu.title }}</span>
              </span>
            </template>
            <a-menu-item
              :title="submenu.path"
              v-for="submenu in menu.children"
              :key="submenu.key"
              >{{ submenu.title }}</a-menu-item
            >
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <div style="flex: 1 1 0%"></div>
        <div class="h100 antd-header-right">
          <!-- 消息 -->
          <a-dropdown
            :trigger="['click']"
            class="notice-dropdown"
            v-model:visible="state.noticeVisible"
          >
            <a-badge dot :offset="[0, 16]">
              <BellOutlined
                style="
                  font-size: 16px;
                  color: rgba(0, 0, 0, 0.85);
                  line-height: 48px;
                "
            /></a-badge>

            <template #overlay>
              <Notice />
            </template>
          </a-dropdown>
          <!-- avatar -->
          <a-dropdown>
            <span class="avatar">
              <img :src="state.logoMini" />
              <span>{{ state.username }}</span>
            </span>

            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">
                    <UserOutlined
                      :style="state.avatarIconStyle"
                    />个人中心&emsp;&emsp;
                  </a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">
                    <SettingOutlined
                      :style="state.avatarIconStyle"
                    />个人设置&emsp;&emsp;
                  </a>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                  <a href="javascript:;" @click="logoutHandle">
                    <LogoutOutlined
                      :style="state.avatarIconStyle"
                    />退出登录&emsp;&emsp;
                  </a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0" v-if="route.meta.isBreadcrumb">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item v-for="(item, index) in boardcrumb" :key="index">
            {{ item }}
          </a-breadcrumb-item>
        </a-breadcrumb>

        <div class="main-content">
          <router-view />
        </div>
      </a-layout-content>
      <!-- <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  PieChartOutlined,
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons-vue";
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  reactive,
  createVNode,
  watch,
} from "vue";
import Notice from "@/components/pub/Notice.vue";
import logo from "@/assets/imgs/logo.png";
import logoMini from "@/assets/imgs/logo-mini.png";
import { useStore } from "vuex";
import { Modal } from "ant-design-vue";
import { useRouter, useRoute, routerKey } from "vue-router";
import { test } from "@/server/index.ts";
import { itemProps } from "ant-design-vue/lib/vc-menu";
interface eleClass extends EventTarget {
  className: string;
}
export default defineComponent({
  name: "guide",
  components: {
    PieChartOutlined,
    UserOutlined,
    BellOutlined,
    SettingOutlined,
    LogoutOutlined,
    UnorderedListOutlined,
    Notice,
  },
  setup: () => {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let menus = ref<any>([]);
    let routeName = route.name || "",
      boardcrumb;
    if (typeof routeName == "string") {
      boardcrumb = routeName.split("/");
    }

    // 收缩菜单
    const collapseHandle = (collapse: boolean) => {
      state.logosrc = collapse ? logoMini : logo;
    };
    // 点击菜单
    const menuClickHandle = (item: object, key: string, keyPath: string) => {
      console.log(item, state.openKeys);
      state.selectedKeys.splice(1, item.item.title);
      router.push({
        path: item.item.title,
      });
    };

    // 左侧菜单栏
    menus = [
      {
        key: "1",
        title: "工作台",
        icon: "PieChartOutlined",
        path: "dashboard",
      },
      {
        key: "2",
        title: "列表页",
        icon: "UnorderedListOutlined",
        path: "list",
      },
      {
        key: "3",
        title: "个人页",
        icon: "user-outlined",
        children: [
          {
            key: "3-1",
            title: "个人主页",
            path: "profile",
          },
          {
            key: "3-2",
            title: "个人设置",
            path: "setting",
          },
        ],
      },
    ];
    //退出
    const logoutHandle = () => {
      Modal.confirm({
        title: "提示",
        content: "确定要退出么？",
        okText: "确定",
        cancelText: "取消",
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
          store.dispatch("clearUserInfo");
          router.push({
            path: "/login",
          });
        },
      });
    };

    const deepFind = (data, path) => {
      // let result = "";
      data.map(item => {
        if (item.path == path) {
          // result = item;
          return item;
        }
        if (item.children&&item.children.length) {
          deepFind(item.children, path);
        }
      });
      // console.log(result);
      // return result;
    };
    onMounted(async () => {
      console.log(route, state.selectedKeys);
      // route.path.split("/")
      // 模拟接口数据
      // const data = await test();
      // console.log(data);
      const result = deepFind(menus, route.path.split("/")[1]);
      console.log(result)
      // state.selectedKeys = resu;
      const selectedKeys = state.selectedKeys;
    });

    let state = reactive({
      logoMini,
      // logo地址
      logosrc: ref<string>(logo),
      // 是否收缩
      collapsed: ref<boolean>(false),
      // 选中菜单的key
      selectedKeys: ref<string[]>([menus[0].key]),
      // 当前展开的submenu菜单项key数组
      openKeys: ref<string[]>([]),
      // 用户信息
      username: store.getters.userInfo.username,
      // 消息当前高亮
      activeKey: ref<string>("1"),
      avatarIconStyle: {
        fontSize: "12px",
        margin: "0 4px 0 2px",
      },
      noticeVisible: false,
    });

    return {
      state,
      menus,
      boardcrumb,
      logoutHandle,
      collapseHandle,
      menuClickHandle,
      route,
    };
  },
});
</script>
<style lang="scss" scoped>
.layout-container {
  .logo {
    // height: 32px;
    margin: 10px;
    // background: rgba(255,255,255,.3);
    text-align: center;
    img {
      height: 37px;
    }
  }
  .ant-layout-header {
    position: relative;
    @include flex;
    @include flex-secondary-axis-center;
    padding: 0 16px;
    background: #fff;
    padding: 0 16px;
    height: 48px;
    color: rgba(0, 0, 0, 0.85);
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    .antd-header-right {
      @include flex;
      float: right;
      line-height: 48px;
      margin-left: auto;
      overflow: hidden;
      .avatar {
        margin: 0 24px;
        @include flex;
        @include flex-secondary-axis-center;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 8px;
        }
      }
      .ant-dropdown-trigger {
        cursor: pointer;
      }
    }
  }
}
//   #components-layout-demo-side .logo {
//   height: 32px;
//   margin: 16px;
//   background: rgba(255, 255, 255, 0.3);
// }

// .site-layout .site-layout-background {
//   background: #fff;
// }
// [data-theme='dark'] .site-layout .site-layout-background {
//   background: #141414;
// }
</style>
