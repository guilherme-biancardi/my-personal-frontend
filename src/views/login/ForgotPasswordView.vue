<template>
  <div class="forgot-password-content">
    <Transition name="fade" mode="out-in">
      <div class="forgot-text" v-if="isSend">
        <span>
          <h1>{{ isSend.message }}</h1>
          <IconComponent :path="mdiCheckBold" :size="36"></IconComponent>
        </span>
      </div>
      <div class="forgot-text" v-else>
        <span>
          <h1>Esqueceu a senha?</h1>
          <IconComponent :path="mdiFormTextboxPassword" :size="32"></IconComponent>
        </span>

        <p>Não se preocupe, informe seu endereço de e-mail para redefinir sua senha</p>
      </div>
    </Transition>

    <Transition name="fade">
      <ForgotPasswordForm @send="(send) => (isSend = send)" v-if="!isSend"></ForgotPasswordForm>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import IconComponent from '@/components/util/IconComponent.vue';
import { mdiCheckBold, mdiFormTextboxPassword } from '@mdi/js';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm.vue';
import { shallowRef } from 'vue';
import type { SendView } from '..';
import { useColors } from '@/ts/colors';

const colors = useColors();

const isSend = shallowRef<SendView | null>(null);
</script>

<style scoped>
.forgot-password-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  row-gap: 20px;
}

.forgot-text,
.forgot-text span {
  display: flex;
  align-items: center;
}

.forgot-text {
  gap: 2px;
  flex-direction: column;
}

.forgot-text span {
  color: v-bind('colors.primary');
  gap: 8px;
}

.forgot-text h1 {
  font-size: 1.8em;
  font-weight: 800;
}

.forgot-text p {
  font-weight: 600;
}
</style>
