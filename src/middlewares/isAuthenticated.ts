import { pinia } from '@/stores';
import { useAppStore } from '@/stores/appStore';
import type { NavigationGuardWithThis } from 'vue-router';

const appStore = useAppStore(pinia);

export const isAuthenticated: NavigationGuardWithThis<unknown> = (to, from, next) => {
  if (appStore.getToken) {
    return next({ name: 'app' });
  }

  return next();
};
