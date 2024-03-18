import { useAppStore } from '@/stores/appStore';
import type { RequestFactory } from '..';
import type { LoginRequest } from './types';
import { pinia } from '@/stores';

const appStore = useAppStore(pinia);

export const authenticate: RequestFactory<LoginRequest> = (params) => () =>
  appStore.useApi.post('/auth/login', params);
