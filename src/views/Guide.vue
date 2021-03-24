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
      >
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <file-outlined />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <div style="flex: 1 1 0%"></div>
        <div class="h100 antd-header-right">
          <!-- 消息 -->
          <a-dropdown :trigger="['click']" class="notice-dropdown">
            <BellOutlined
              style="
                font-size: 16px;
                color: rgba(0, 0, 0, 0.85);
                line-height: 48px;
              "
            />
            <template #overlay>
              <!-- <div class="notice-container" @click.prevent>
                <a-tabs v-model:activeKey="state.activeKey" size="small">
                  <a-tab-pane key="1" tab="通知（4）">Tab 1</a-tab-pane>
                  <a-tab-pane key="2" tab="消息（3）">Tab 2</a-tab-pane>
                  <a-tab-pane key="3" tab="代办（6）">Tab 3</a-tab-pane>
                </a-tabs>
              </div> -->
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
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          Bill is a cat.
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  reactive,
  createVNode,
} from "vue";
import Notice from "@/components/pub/Notice.vue";
import logo from "@/assets/imgs/logo.png";
import logoMini from "@/assets/imgs/logo-mini.png";
import { useStore } from "vuex";
import { message, Modal } from "ant-design-vue";
import { useRouter } from "vue-router";
interface eleClass extends EventTarget {
  className: string;
}
export default defineComponent({
  name: "guide",
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    BellOutlined,
    SettingOutlined,
    LogoutOutlined,
    Notice,
  },
  setup: () => {
    const store = useStore();
    const router = useRouter();
    // let logosrc = ref<string>(logo),
    //   collapsed = ref<boolean>(false),
    //   selectedKeys = ref<string[]>(["1"]);

    // 收缩菜单
    const collapseHandle = (collapse: boolean) => {
      state.logosrc = collapse ? logoMini : logo;
    };
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
    onMounted(() => {
      // document.body.addEventListener("click", function (e) {
      //   // console.log(e.target.className)
      //   e.stopPropagation();
      //   if (e && e.target && e.target.className) {
      //     if (e.target.className == "layout-notice ant-dropdown-content") {
      //       e.target.parentNode.style.display = "block";
      //     }
      //   }
      // });
    });
    let state = reactive({
      logoMini,
      // logo地址
      logosrc: ref<string>(logo),
      // 是否收缩
      collapsed: ref<boolean>(false),
      // 选中菜单的key
      selectedKeys: ref<string[]>(["1"]),
      // 用户信息
      username: store.getters.userInfo.username,
      // 消息当前高亮
      activeKey: ref<string>("1"),
      avatarIconStyle: {
        fontSize: "12px",
        margin: "0 4px 0 2px",
      },
    });

    return {
      state,
      logoutHandle,
      collapseHandle,
      // logosrc,
      // collapsed,
      // selectedKeys,
      // collapseHandle,
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
