<template>
  <button v-if="visible" :type="type" :="attributes" :class="{ hover }" :style="style">
    <p>{{ text }}</p>
    <IconComponent v-if="icon" :="icon"></IconComponent>
  </button>
</template>

<script setup lang="ts">
import type { Button } from '@/ts/button';
import IconComponent from './IconComponent.vue';
import colors from '@/assets/colors.module.css';

const props = withDefaults(defineProps<Button>(), {
  type: 'button',
  visible: true
});
</script>

<style scoped>
button {
  width: 100%;
  background-color: v-bind('colors.primary');
  color: #fff;
  font-size: 1.1em;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

button:hover:not(.hover) {
  filter: brightness(110%);
}

.hover:hover {
  background-color: v-bind('props.hover?.backgroundColor');
  color: v-bind('props.hover?.color');
}

button p {
  font-weight: 500;
}
</style>
