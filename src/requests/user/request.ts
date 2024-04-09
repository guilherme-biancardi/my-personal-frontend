import { useAppStore } from '@/stores/appStore';
import { useFormDataHeader, type RequestFactory } from '..';
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

export const uploadPhoto: RequestFactory<{ image: Blob }> = (params) => {
  const formData = new FormData();
  formData.append('image', params.image);

  return () =>
    appStore.useApi.post('/user/upload-photo', formData, { headers: useFormDataHeader() });
};
