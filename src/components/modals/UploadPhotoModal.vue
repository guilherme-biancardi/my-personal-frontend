<template>
  <div class="upload-modal-content">
    <VuePictureCropper
      :boxStyle="{
        width: '100%',
        height: '100%',
        maxHeight: '512px',
        margin: 'auto',
        borderRadius: '8px',
        overflow: 'hidden'
      }"
      :img="image"
      :options="{
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 1,
        cropBoxResizable: false
      }"
      :presetMode="{
        mode: 'fixedSize',
        width: 256,
        height: 256
      }"
    >
    </VuePictureCropper>

    <div class="buttons-list">
      <ButtonFilledComponent
        text="Cancelar"
        :style="{
          backgroundColor: colors.grayMedium
        }"
        @click="emit('closeModal')"
      ></ButtonFilledComponent>

      <ButtonFilledComponent text="Salvar Foto" @click="savePhoto"></ButtonFilledComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import VuePictureCropper, { cropper } from 'vue-picture-cropper';
import ButtonFilledComponent from '../util/ButtonFilledComponent.vue';
import { useRequest } from '@/ts/request';
import type { GetUserResponse } from '@/requests/user/types';
import { uploadPhoto } from '@/requests/user/request';
import { useAppStore } from '@/stores/appStore';
import { useColors } from '@/ts/colors';

const appStore = useAppStore();
const colors = useColors();

interface UploadPhotoModal {
  image: string;
}

defineProps<UploadPhotoModal>();
const emit = defineEmits<{ (event: 'closeModal'): void }>();

const savePhoto = async () => {
  if (cropper) {
    const image = await cropper.getFile();

    if (image) {
      const { response, error } = await useRequest<GetUserResponse>(uploadPhoto({ image }));

      if (response.value) {
        const { data, message } = response.value;

        appStore.setUser(data);
        appStore.notify(message || '');
      }

      if (error.value) {
        appStore.notify(error.value.data.message, 'error');
      }

      emit('closeModal');
    }
  }
};
</script>

<style scoped>
.upload-modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  width: 100%;
  height: 100%;
}

.buttons-list {
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 12px;
}
</style>
