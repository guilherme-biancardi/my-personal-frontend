<template>
  <SvgIcon type="mdi" :path="path" :size="size"></SvgIcon>
</template>

<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';

export interface Icon {
  path: string;
  size?: number;
}

withDefaults(defineProps<Icon>(), {
  size: 24
});
</script>

<style scoped></style>
