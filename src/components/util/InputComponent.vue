<template>
  <div class="input-content" v-show="!attributes?.hidden">
    <label :for="name" v-if="label">{{ label }}</label>
    <div>
      <input
        :type="typeRef"
        :="attributes"
        v-model="value"
        v-maska:[maskOptions]
        :data-maska="mask"
        :data-maska-tokens="maskTokens"
        :id="name"
        :class="{ 'input-invalid': !meta.valid && meta.validated }"
      />

      <IconComponent
        v-if="isPassword"
        :path="passwordVisible ? mdiEyeOff : mdiEye"
        :size="22"
        @click="togglePassword()"
        class="show-password"
      ></IconComponent>
    </div>

    <InputErrorComponent :errors="errors"></InputErrorComponent>
  </div>
</template>

<script setup lang="ts">
import { vMaska } from 'maska';
import type { Input } from '@/ts/input';
import { useField } from 'vee-validate';
import { computed, shallowRef, toRef, watch } from 'vue';
import InputErrorComponent from './InputErrorComponent.vue';
import IconComponent from './IconComponent.vue';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import { useToggle } from '@vueuse/core';
import { useColors } from '@/ts/colors';

const colors = useColors();

const props = defineProps<Input>();
const name = toRef(() => props.name);

const typeRef = shallowRef<Input['type']>(props.type);
const isPassword = computed(() => props.type === 'password');

const passwordVisible = shallowRef<boolean>(false);
const togglePassword = useToggle(passwordVisible);

if (isPassword.value) {
  watch(passwordVisible, (visible) => (typeRef.value = visible ? 'text' : 'password'));
}

const { value, errors, meta } = useField(name, undefined, {
  initialValue: props.value
});
</script>

<style scoped>
.input-content {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.input-content div {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.show-password {
  user-select: none;
  cursor: pointer;
  position: absolute;
  right: 12px;
  display: grid;
  place-items: center;
  color: v-bind('colors.primary');
}

.input-content input {
  width: 100%;
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
  font-weight: 700;
}

.input-invalid {
  border-color: v-bind('colors.error') !important;
}
</style>
