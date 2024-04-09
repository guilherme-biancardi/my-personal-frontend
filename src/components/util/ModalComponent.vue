<template>
  <Transition name="fade">
    <div class="modal-backdrop" v-if="active">
      <div class="modal-content">
        <header>
          <h1>{{ title }}</h1>
          <button @click="emit('close')">
            <IconComponent :path="mdiWindowClose" :size="32"></IconComponent>
          </button>
        </header>
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useColors } from '@/ts/colors';
import { computed } from 'vue';
import IconComponent from './IconComponent.vue';
import { mdiWindowClose } from '@mdi/js'

const colors = useColors();

interface Modal {
  title: string;
  maxWidth?: number;
  active: boolean;
}

const props = withDefaults(defineProps<Modal>(), {
  maxWidth: 600
});

const width = computed(() => `${props.maxWidth}px`);
const emit = defineEmits<{ (event: 'close'): void }>();
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  display: grid;
  place-items: center;
  inset: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 1;
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: clamp(0px, 100%, v-bind('width'));
  height: max-content;
  background-color: v-bind('colors.light');
  border: 1px solid v-bind('colors.lightDarkness');
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  padding: 20px 28px;
  border-radius: 8px;
  row-gap: 16px;
}

.modal-content header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-content header > h1 {
  font-size: 1.4em;
  font-weight: 900;
  color: v-bind('colors.primary');
}
</style>
