import { useAppStore } from '@/stores/appStore';
import type { RequestFactory } from '..';
import { pinia } from '@/stores';

const appStore = useAppStore(pinia);

export const getUser: RequestFactory = () => () => appStore.useApi.get('/user/me');
