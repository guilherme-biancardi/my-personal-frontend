<template>
  <main>
    <Suspense>
      <RouterView name="root"></RouterView>
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
</style>
