<template>
  <TransitionGroup name="slide-x" tag="ul" class="notifications-content">
    <li v-for="(notification, index) in getNotifications" :key="index">
      <NotificationComponent
        :="notification"
        :index="index"
        @on-close="reset"
      ></NotificationComponent>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import NotificationComponent from '../util/NotificationComponent.vue';
import { useInterval } from '@vueuse/core';
import { computed, watch } from 'vue';

const BASE_TIME = 3000 as const;
const { getNotifications, removeNotification } = useAppStore();

const { resume, pause, isActive, reset } = useInterval(BASE_TIME, {
  controls: true,
  callback: removeNotification,
  immediate: false
});

watch(
  computed(() => getNotifications),
  (notifications) => {
    if (!isActive.value) {
      resume();
    }

    if (!notifications.length) {
      pause();
    }
  },
  { deep: true }
);
</script>

<style scoped>
.notifications-content {
  position: fixed;
  top: 16px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 6px;
  z-index: 999;
}
</style>
