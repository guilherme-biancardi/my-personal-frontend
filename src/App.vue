<template>
  <main>
    <Suspense>
      <RouterView name="root" v-slot="{ Component }">
        <Transition name="fade-view" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import '@/assets/main.css';
import colors from '@/assets/colors.module.css';
import { useTheme } from './ts/theme';

useTheme();
</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: v-bind('colors.lightLightness');
}

.fade-view-enter-active,
.fade-view-leave-active {
  transition: all 150ms ease;
}

.fade-view-enter-from,
.fade-view-leave-to {
  opacity: 0;
}
</style>
