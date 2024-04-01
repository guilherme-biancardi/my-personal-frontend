import { useAppStore } from '@/stores/appStore';
import type { RequestFactory } from '..';
import { pinia } from '@/stores';
import type { ChangePasswordRequest } from './types';

const appStore = useAppStore(pinia);

export const getUser: RequestFactory = () => () => appStore.useApi.get('/user/me');

export const forgotPassword: RequestFactory<{ email: string }> = (params) => () =>
  appStore.useApi.post('/user/forgot-password', params);

export const resendActivationLink: RequestFactory<{ email: string }> = (params) => () =>
  appStore.useApi.post('/user/send-activation-link', params);

export const changePassword: RequestFactory<ChangePasswordRequest> = (params) => () =>
  appStore.useApi.patch('/user/change-password', params);
