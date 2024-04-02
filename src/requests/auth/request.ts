import { useAppStore } from '@/stores/appStore';
import type { RequestFactory } from '..';
import type { LoginRequest, ResetPasswordRequest } from './types';
import { pinia } from '@/stores';

const appStore = useAppStore(pinia);

export const authenticate: RequestFactory<LoginRequest> = (params) => () =>
  appStore.useApi.post('/auth/login', params);

export const resetPassword: RequestFactory<ResetPasswordRequest> = (params) => () =>
  appStore.useApi.post('/auth/reset-password', params);

export const logout: RequestFactory = () => () => appStore.useApi.post('/auth/logout');