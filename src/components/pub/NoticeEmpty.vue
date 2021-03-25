<template>
  <img src="@/assets/imgs/noticeEmpty.svg" alt="" />
  <p>您已查看所有{{ msg }}</p>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props:{
    msg: String
  },
});
</script>
<style lang="scss" scoped>
img {
  display: inline-block;
  height: 76px;
  margin-bottom: 16px;
}
p {
  color: rgba(0, 0, 0, 0.45);
}
</style>
