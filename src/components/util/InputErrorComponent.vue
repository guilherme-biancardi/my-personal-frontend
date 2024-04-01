<template>
  <ul class="input-error">
    <li v-for="(error, index) in errors" :key="index">
      <IconComponent :path="mdiCancel" :size="16"></IconComponent>
      <p>{{ error }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { mdiCancel } from '@mdi/js';
import IconComponent from './IconComponent.vue';
import colors from "@/assets/colors.module.css"

interface InputError {
  errors: string[];
}

defineProps<InputError>();
</script>

<style scoped>
.input-error {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.input-error li {
  display: flex;
  align-items: center;
  column-gap: 4px;
  font-size: 0.9em;
  font-style: italic;
  font-weight: 600;
  transition: all 0.2s ease;
  color: v-bind('colors.error');
}
</style>
