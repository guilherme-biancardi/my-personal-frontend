<template>
  <div class="notification">
    <IconComponent :path="notificationIcon"></IconComponent>
    <p>{{ message }}</p>

    <button class="notification-close" @click="close">
      <IconComponent :path="mdiWindowClose" :size="18"></IconComponent>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAppStore, type AppNotification } from '@/stores/appStore';
import IconComponent from './IconComponent.vue';
import { mdiAlert, mdiCancel, mdiCheck, mdiWindowClose } from '@mdi/js';
import { computed, useCssModule } from 'vue';
import { useColors } from '@/ts/colors';

const css = useCssModule() as Record<AppNotification['type'], string>;
const colors = useColors();
const appStore = useAppStore();

interface NotificationComponent extends AppNotification {
  index: number;
}

const ICONS: Record<AppNotification['type'], string> = {
  success: mdiCheck,
  error: mdiCancel,
  warning: mdiAlert
} as const;

const props = defineProps<NotificationComponent>();
const emit = defineEmits<{
  (event: 'onClose'): void;
}>();

const notificationIcon = computed(() => ICONS[props.type]);
const notificationColor = computed(() => css[props.type]);

const close = () => {
  appStore.removeNotificationByIndex(props.index);
  emit('onClose');
};
</script>

<style module>
[theme='light'] {
  --warning: #f6a728;
}

[theme='dark'] {
  --warning: #f1c40f;
}

:export {
  success: #2ecc71;
  error: #ff4757;
  warning: var(--warning);
}
</style>

<style scoped>
[theme='dark'] .notification {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.17);
}

.notification {
  background-color: v-bind('colors.lightOpacity');
  border: 1px solid v-bind('colors.lightDarkness');
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.07);
  border-radius: 4px 0 0 4px;
  padding: 10px 16px;
  padding-right: 60px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  color: v-bind(notificationColor);
  backdrop-filter: blur(3px);
  border-left: 4px solid v-bind(notificationColor);
}

.notification p {
  font-size: 1em;
  font-weight: 700;
}

.notification-close {
  display: grid;
  place-items: center;
  position: absolute;
  right: 8px;
  color: v-bind('colors.grayDark');
}
</style>
