<template>
  <div class="app-right">
    <div class="user-text">
      <h1>{{ user?.name }}</h1>
      <p>{{ user?.email }}</p>
    </div>
    <PhotoComponent></PhotoComponent>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { computed } from 'vue';
import PhotoComponent from '../util/PhotoComponent.vue';

const appStore = useAppStore();
const user = computed(() => appStore.getUser);
</script>

<style scoped>
.app-right {
  display: flex;
  align-items: center;
  column-gap: 16px;
  position: absolute;
  top: 12px;
  right: 16px;
}

.user-text {
  line-height: 18px;
  text-align: right;
}

.user-text h1 {
  font-size: 1em;
  font-weight: 900;
}

.user-text p {
  font-size: 0.85em;
  font-weight: 600;
}
</style>
