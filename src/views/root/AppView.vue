<template>
  <section>
    <MenuBar></MenuBar>
    <article class="app-content">
      <AppRight></AppRight>
      <RouterView name="app"></RouterView>
    </article>
  </section>
</template>

<script setup lang="ts">
import AppRight from '@/components/app/AppRight.vue';
import MenuBar from '@/components/app/MenuBar.vue';
import { getUser } from '@/requests/user/request';
import type { GetUserResponse } from '@/requests/user/types';
import { useAppStore } from '@/stores/appStore';
import { useRequest } from '@/ts/request';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const router = useRouter();

const { response, error } = await useRequest<GetUserResponse>(getUser(null));

if (response.value) {
  appStore.setUser(response.value.data);
}

if (error.value) {
  if (error.value.data.error === 'passwordChangeRequired') {
    router.replace({ name: 'changePassword' });
    appStore.setChangePasswordRequired(true);
  } else {
    appStore.$reset();
    router.replace({ name: 'login' });
  }
}
</script>

<style scoped>
section {
  --menu-bar-width: 68px;

  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: var(--menu-bar-width) calc(100vw - var(--menu-bar-width));
  grid-template-rows: 100vh;
}

.app-content {
  position: relative;
  width: 100%;
  height: 100%;
  padding: clamp(16px, 2vw, 80px);
}
</style>
