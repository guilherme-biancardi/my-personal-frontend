<template>
  <RootContent :gap="20">
    <div class="change-password-text">
      <span>
        <h1>Alterar Senha</h1>
        <IconComponent :path="mdiLockPlusOutline" :size="32"></IconComponent>
      </span>
      <p>Defina uma nova senha para acessar sua conta</p>
    </div>
    <ChangePasswordForm></ChangePasswordForm>
  </RootContent>
</template>

<script setup lang="ts">
import RootContent from '@/components/contents/RootContent.vue';
import ChangePasswordForm from '@/components/forms/ChangePasswordForm.vue';
import IconComponent from '@/components/util/IconComponent.vue';
import { useAppStore } from '@/stores/appStore';
import { mdiLockPlusOutline } from '@mdi/js';
import { useRouter } from 'vue-router';
import colors from '@/assets/colors.module.css';

const router = useRouter();
const appStore = useAppStore();

router.beforeEach((to, from, next) => {
  if (appStore.getChangePasswordRequired) {
    return next({ name: 'changePassword', replace: true });
  }

  return next();
});
</script>

<style scoped>
.change-password-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.change-password-text > span {
  display: flex;
  align-items: center;
  column-gap: 4px;
  color: v-bind('colors.primary');
}

.change-password-text > span h1 {
  font-size: 1.7em;
}

.change-password-text > p {
  font-weight: 500;
}
</style>
