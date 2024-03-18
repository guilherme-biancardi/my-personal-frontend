<template>
  <ul class="form-validation">
    <li
      v-for="(validation, index) in formValidation"
      :key="index"
      :class="{ valid: validation.valid }"
    >
      <IconComponent :path="validation.valid ? mdiCheck : mdiCancel" :size="16"></IconComponent>
      <p>{{ validation.label }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import IconComponent from './IconComponent.vue';
import { mdiCancel, mdiCheck } from '@mdi/js';
import { watchDebounced } from '@vueuse/core';
import type { FormValidation } from '@/ts/input';

const props = defineProps<{ validations: FormValidation[]; text: string }>();

const formValidation = ref<FormValidation[]>(
  props.validations.map((validation) => ({ ...validation, valid: false }))
);

watchDebounced(
  computed(() => props.text),
  () => {
    formValidation.value.forEach(
      (validation) => (validation.valid = validation.setValidation(props.text))
    );
  },
  { debounce: 500 }
);

watchDebounced(
  computed(() => props.validations),
  (validations) => (formValidation.value = validations),
  { deep: true, debounce: 500 }
);
</script>

<style scoped>
.form-validation {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.form-validation li {
  display: flex;
  align-items: center;
  column-gap: 4px;
  font-size: 0.85em;
  font-style: italic;
  font-weight: 500;
  transition: all 0.2s ease;
}

.form-validation li:not(.valid) {
  color: #ff3838;
}

.valid {
  color: #27ae60;
}
</style>
