<template>
  <RouterLink to="/" :style="styles">
    <h1>MyPersonal</h1>
  </RouterLink>
</template>

<script setup lang="ts">
import colors from '@/assets/colors.module.css'
import type { StyleValue } from 'vue';

interface LogoComponent {
    styles?: StyleValue
}

defineProps<LogoComponent>()
</script>

<style scoped>
h1 {
  font-style: italic;
  font-weight: 900;
  font-size: 1.8em;
  color: v-bind('colors.primary');
}
</style>
