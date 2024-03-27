<template>
  <RootContent :gap="20">
    <div class="reset-password-text">
      <span>
        <h1>{{ send ? 'Senha alterada com sucesso!' : 'Redefinir Senha' }}</h1>
        <IconComponent :path="send ? mdiLockCheckOutline : mdiLockReset" :size="36"></IconComponent>
      </span>
      <p>
        {{
          send ? 'Você já pode fechar esta janela' : 'Defina uma nova senha para acessar sua conta'
        }}
      </p>
    </div>
    <ResetPasswordForm v-if="!send" @set-send="(isSend) => (send = isSend)"></ResetPasswordForm>
  </RootContent>
</template>

<script setup lang="ts">
import RootContent from '@/components/contents/RootContent.vue';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm.vue';
import IconComponent from '@/components/util/IconComponent.vue';
import { mdiLockCheckOutline, mdiLockReset } from '@mdi/js';
import colors from '@/assets/colors.module.css';
import { shallowRef } from 'vue';

const send = shallowRef<boolean>(false);
</script>

<style scoped>
.reset-password-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reset-password-text > span {
  display: flex;
  align-items: center;
  column-gap: 8px;
  color: v-bind('colors.primary');
}

.reset-password-text > span h1 {
  font-size: 1.7em;
}

.reset-password-text > p {
  font-weight: 500;
}
</style>
