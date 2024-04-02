<template>
  <div class="app-right">
    <div class="user-text">
      <h1>{{ user?.name }}</h1>
      <p>{{ user?.email }}</p>
    </div>
    <div class="photo"></div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { computed } from 'vue';
import colors from '@/assets/colors.module.css';

const appStore = useAppStore();
const user = computed(() => appStore.getUser);
</script>

<style scoped>
.app-right {
  display: flex;
  column-gap: 16px;
  position: absolute;
  top: 12px;
  right: 16px;
}

.user-text {
  text-align: right;
}

.user-text h1 {
  font-size: 1.1em;
}

.user-text p {
  font-size: 0.9em;
}

.photo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: v-bind('colors.grayLight');
}
</style>
