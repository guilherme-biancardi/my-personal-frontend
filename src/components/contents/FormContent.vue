<template>
  <form :style="{ gap: `${gap}px` }">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
interface FormContent {
  gap?: number;
}

withDefaults(defineProps<FormContent>(), {
  gap: 24
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px 24px;
  max-width: 700px;
}
</style>
