<template>
  <div>
    <p v-if="isFetch">{{ appStore.getUser }}</p>
  </div>
</template>

<script setup lang="ts">
import { getUser } from '@/requests/user/request';
import type { GetUserResponse } from '@/requests/user/types';
import { useAppStore } from '@/stores/appStore';
import { useRequest } from '@/ts/request';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const router = useRouter();

const { isFetch, response, error } = await useRequest<GetUserResponse>(getUser(null));

if (response.value) {
  appStore.setUser(response.value.data);
}

if (error.value) {
  appStore.$reset();
  router.replace({ name: 'login' });
}
</script>

<style scoped></style>
