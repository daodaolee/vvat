<template>
  <!-- <router-view v-slot="{ Component }">
   <component :is="Component" />
  </router-view>  -->
  <router-view />
</template>

<script lang="ts">

import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
})
</script>

<style>
.w100{
  width: 100%;
}
.h100{
  height: 100%;
}
</style>