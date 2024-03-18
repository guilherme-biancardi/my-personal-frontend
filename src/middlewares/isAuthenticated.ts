import { pinia } from '@/stores';
import { useAppStore } from '@/stores/appStore';
import type { NavigationGuardWithThis } from 'vue-router';

const appStore = useAppStore(pinia);

export const isAuthenticated: NavigationGuardWithThis<unknown> = (to, from, next) => {
  if (appStore.getToken && !to.fullPath.match('app')) {
    return next({ name: 'app' });
  }

  if (!appStore.getToken && !to.fullPath.match('login')) {
    return next({ name: 'login', replace: true});
  }

  return next();
};
