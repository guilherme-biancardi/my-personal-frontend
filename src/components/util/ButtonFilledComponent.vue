<template>
  <button v-if="visible" :type="type" :="attributes" :class="{ hover }" :style="style">
    <p v-if="text">{{ text }}</p>
    <IconComponent v-if="icon" :="icon"></IconComponent>
  </button>
</template>

<script setup lang="ts">
import type { Button } from '@/ts/button';
import IconComponent from './IconComponent.vue';
import { useColors } from '@/ts/colors';

const colors = useColors();

const props = withDefaults(defineProps<Button>(), {
  type: 'button',
  visible: true
});
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 4px;
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

button:disabled {
  background-color: v-bind('colors.grayLightness');
  color: v-bind('colors.grayDarkness');
  cursor: no-drop;
}

button p {
  font-weight: 600;
}
</style>
