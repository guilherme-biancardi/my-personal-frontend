<template>
  <div class="input-content" v-show="!attributes?.hidden">
    <label :for="name" v-if="label">{{ label }}</label>
    <input
      :type="type"
      :="attributes"
      v-model="value"
      v-maska:[maskOptions]
      :data-maska="mask"
      :data-maska-tokens="maskTokens"
      :id="name"
    />

    <FormValidationComponent
      v-if="validations && validations.length"
      :text="value as string"
      :validations="validations"
      style="margin-top: 8px"
    ></FormValidationComponent>
  </div>
</template>

<script setup lang="ts">
import { vMaska } from 'maska';
import FormValidationComponent from './FormValidationComponent.vue';
import type { Input } from '@/ts/input';
import colors from '@/assets/colors.module.css';

defineProps<Input>();
const value = defineModel<Input['value']>({ required: true });
</script>

<style scoped>
.input-content {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.input-content input {
  background-color: v-bind('colors.lightLightness');
  border: 1px solid v-bind('colors.lightDark');
  border-radius: 8px;
  padding: 12px;
  font-size: 1em;
  transition: all 0.2s ease;
}

.input-content input:focus-within {
  border-color: v-bind('colors.primary');
}

.input-content label {
  font-weight: 600;
}
</style>
