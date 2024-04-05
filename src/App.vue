<template>
  <main>
    <NotificationsContent></NotificationsContent>
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
import { useTheme } from './ts/theme';
import NotificationsContent from './components/contents/NotificationsContent.vue';
import { useColors } from './ts/colors';

const colors = useColors();

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

.teste {
  position: absolute;
  right: 0;
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
