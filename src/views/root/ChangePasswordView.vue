<template>
  <RootContent> ijdubhiodn </RootContent>
</template>

<script setup lang="ts">
import RootContent from '@/components/contents/RootContent.vue';
import { useAppStore } from '@/stores/appStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const appStore = useAppStore();

router.beforeEach((to, from, next) => {
  if (appStore.getChangePasswordRequired) {
    return next({ name: 'changePassword', replace: true});
  }

  return next();
});
</script>

<style scoped></style>
