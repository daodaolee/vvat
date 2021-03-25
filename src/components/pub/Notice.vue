<template>
  <div class="layout-notice">
    <a-tabs
      v-model:activeKey="state.activeKey"
      size="small"
      class="h100"
      @change="changeTabs"
    >
      <a-tab-pane key="1" tab="通知 (0)">
        <div class="w100 h100 notice-panel" forceRender>
          <NoticeEmpty v-model:msg="state.emptyMsg"></NoticeEmpty>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="消息 (0)">
        <div class="w100 h100 notice-panel" forceRender>
          <NoticeEmpty v-model:msg="state.emptyMsg"></NoticeEmpty>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="待办 (4)" forceRender>
        <div class="w100 h100 notice-panel">
          <a-list
            item-layout="horizontal"
            :data-source="state.todoList"
            v-if="state.todoList.length"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta :description="item.descr">
                  <template #title>
                    <div class="notice-item-title">
                      <span>{{ item.title }}</span>
                      <a-tag :color="item.color">{{ item.statusName }}</a-tag>
                    </div>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
          <NoticeEmpty v-else v-model:msg="state.emptyMsg"></NoticeEmpty>
        </div>
      </a-tab-pane>
    </a-tabs>

    <a-spin class="spin-center" :spinning="state.spinLoading" />
  </div>
</template>
<script lang="ts">
import NoticeEmpty from "@/components/pub/NoticeEmpty.vue";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
export default defineComponent({
  name: "notice",
  components: {
    NoticeEmpty,
  },
  setup: () => {
    let state = reactive({
      activeKey: ref<any>("1"),
      emptyMsg: ref<any>(""),
      spinLoading: ref<boolean>(false),
      todoList: ref<any>([]),
    });
    // 没有消息显示
    state.emptyMsg = computed(() => {
      return state.activeKey === "1"
        ? "通知"
        : state.activeKey == "2"
        ? "消息"
        : "待办";
    });
    const changeTabs = () => {
      console.log(123);
      state.spinLoading = true;
      setTimeout(() => {
        state.spinLoading = false;
      }, 500);
    };
    onMounted(() => {
      state.todoList = [
        {
          title: "任务名称",
          descr: "任务需要在 2017-01-12 20:00 前启动",
          statusName: "未开始",
        },
        {
          title: "紧急变更",
          descr: "冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务",
          color: "red",
          statusName: "马上到期",
        },
        {
          title: "信息安全考试",
          descr: "指派竹尔于 2017-01-09 前完成更新并发布",
          color: "orange",
          statusName: "已进行 2 天",
        },
        {
          title: "版本发布",
          descr: "版本发布时间：2020-12-12",
          color: "blue",
          statusName: "进行中",
        },
      ];
      state.activeKey = "3"
    });
    return {
      state,
      changeTabs,
    };
  },
});
</script>
<style lang="scss" scoped>
.spin-center {
  @include spin-center;
}
</style>
