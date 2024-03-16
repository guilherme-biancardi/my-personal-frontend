<template>
  <main>
    <RouterView name="root"></RouterView>
  </main>
</template>

<script setup lang="ts">
import '@/assets/main.css';
</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}
</style>
