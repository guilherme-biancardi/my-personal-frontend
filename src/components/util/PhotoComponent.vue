<template>
  <div class="use-photo-content" v-if="photo">
    <img :src="photo" alt="foto do usuário" class="photo" />

    <button @click="open()" class="btn-upload">
      <IconComponent :path="mdiImageEdit" :size="26"></IconComponent>
    </button>

    <ModalComponent
      title="Nova foto de perfil"
      @close="closeModal"
      :active="active"
    >
      <UploadPhotoModal :image="image" @closeModal="closeModal"></UploadPhotoModal>
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { computed, ref } from 'vue';
import IconComponent from './IconComponent.vue';
import { mdiImageEdit } from '@mdi/js';

import ModalComponent from './ModalComponent.vue';
import { useModal } from '@/ts/modal';
import UploadPhotoModal from '../modals/UploadPhotoModal.vue';
import { useColors } from '@/ts/colors';
import { useFileDialog } from '@vueuse/core';

const { closeModal, active, showModal } = useModal();

const { open, onChange } = useFileDialog({
  accept: 'image/*',
  multiple: false
});

const appStore = useAppStore();
const photo = computed(() => appStore.getUser?.photo);
const colors = useColors();

const image = ref<string>('');

onChange((files) => {
  if (files) {
    const [file] = files;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      image.value = reader.result as string;
      showModal();
    };
  }
});
</script>

<style scoped>
.use-photo-content {
  position: relative;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
}

.photo {
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background-color: v-bind('colors.grayLight');
}

.btn-upload {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  backdrop-filter: brightness(40%);
  color: #fff;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-upload:hover {
  opacity: 1;
}
</style>
