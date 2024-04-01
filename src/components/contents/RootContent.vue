<template>
  <section class="root-content" :class="{ full: fullContent }">
    <article>
      <slot></slot>
    </article>

    <WavesSvg
      v-if="!fullContent"
      :styles="{
        position: 'absolute',
        bottom: 0
      }"
    ></WavesSvg>
  </section>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import WavesSvg from '../svg/WavesSvg.vue';
import colors from '@/assets/colors.module.css';

interface RootContent {
  gap?: number;
  width?: number;
}

const props = withDefaults(defineProps<RootContent>(), {
  gap: 12,
  width: 500
});

const fullContent = useMediaQuery(`(max-width: ${props.width}px)`);
</script>

<style scoped>
.root-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.root-content > article {
  width: clamp(0px, 100%, v-bind('`${props.width}px`'));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 20px;
  gap: v-bind('`${props.gap}px`');
  background-color: v-bind('colors.light');
  border: 1px solid v-bind('colors.grayLight');
  border-radius: 8px;
  z-index: 1;
}

.full > article {
  border-radius: 0;
  height: 100vh;
}
</style>
