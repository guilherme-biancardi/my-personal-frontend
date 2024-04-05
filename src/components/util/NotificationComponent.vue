<template>
  <div class="notification">
    <IconComponent :path="notificationIcon"></IconComponent>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import type { AppNotification } from '@/stores/appStore';
import IconComponent from './IconComponent.vue';
import { mdiAlert, mdiCancel, mdiCheck } from '@mdi/js';
import { computed, useCssModule } from 'vue';
import { useColors } from '@/ts/colors';

const css = useCssModule() as Record<AppNotification['type'], string>;
const colors = useColors();

const ICONS: Record<AppNotification['type'], string> = {
  success: mdiCheck,
  error: mdiCancel,
  warning: mdiAlert
} as const;

const props = defineProps<AppNotification>();

const notificationIcon = computed(() => ICONS[props.type]);
const notificationColor = computed(() => css[props.type]);
</script>

<style module>
:export {
  success: #2ecc71;
  error: #ff4757;
  warning: #f1c40f;
}
</style>

<style scoped>
.notification {
  background-color: v-bind('colors.lightOpacity');
  border: 1px solid v-bind('colors.lightDarkness');
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06);
  border-radius: 6px 0 0 6px;
  padding: 10px 16px;
  padding-right: 32px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  color: v-bind(notificationColor);
  backdrop-filter: blur(3px);
}

.notification p {
  font-size: 1em;
  font-weight: 700;
}
</style>
