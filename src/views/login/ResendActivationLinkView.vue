<template>
  <div class="resend-link-content">
    <Transition name="fade" mode="out-in">
      <div class="resend-text" v-if="isSend">
        <span>
          <h1>{{ isSend.message }}</h1>
          <IconComponent :path="mdiCheckBold" :size="36"></IconComponent>
        </span>
      </div>
      <div class="resend-text" v-else>
        <span>
          <h1>Reenviar Link de Ativação</h1>
          <IconComponent :path="mdiAccountCheckOutline" :size="40"></IconComponent>
        </span>

        <p>Informe seu endereço de e-mail</p>
      </div>
    </Transition>

    <Transition name="fade">
      <ResendActivationLinkForm
        @send="(send) => (isSend = send)"
        v-if="!isSend"
      ></ResendActivationLinkForm>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import IconComponent from '@/components/util/IconComponent.vue';
import { mdiAccountCheckOutline, mdiCheckBold } from '@mdi/js';
import { shallowRef } from 'vue';
import type { SendView } from '..';
import ResendActivationLinkForm from '@/components/forms/ResendActivationLinkForm.vue';
import { useColors } from '@/ts/colors';

const colors = useColors();
const isSend = shallowRef<SendView | null>(null);
</script>

<style scoped>
.resend-link-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  row-gap: 20px;
}

.resend-text,
.resend-text span {
  display: flex;
  align-items: center;
}

.resend-text {
  gap: 2px;
  flex-direction: column;
}

.resend-text span {
  color: v-bind('colors.primary');
  gap: 8px;
}

.resend-text h1 {
  font-size: 1.8em;
  font-weight: 800;
}

.resend-text p {
  font-weight: 600;
}
</style>
