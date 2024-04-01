import { pinia } from '@/stores';
import { useAppStore } from '@/stores/appStore';
import type { NavigationGuardWithThis } from 'vue-router';

const appStore = useAppStore(pinia);

export const isNotAuthenticated: NavigationGuardWithThis<unknown> = (to, from, next) => {
  if (!appStore.getToken) {
    return next({ name: 'login' });
  }

  return next();
};
