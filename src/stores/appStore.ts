import type { User } from '@/requests/user/types';
import { useStorage } from '@vueuse/core';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, shallowReactive, watch } from 'vue';

interface State {
  api: AxiosInstance;
  user: User | null;
  changePasswordRequired: boolean;
}

interface Storage {
  token: string | null;
}

export const useAppStore = defineStore('app', () => {
  const storage = useStorage('app', {
    token: null
  } as Storage);

  const state = shallowReactive<State>({
    api: axios.create({
      baseURL: import.meta.env.VITE_API_URL
    }),
    user: null,
    changePasswordRequired: false
  });

  const useApi = computed(() => state.api);
  const getToken = computed(() => storage.value.token);
  const getUser = computed(() => state.user);
  const getChangePasswordRequired = computed(() => state.changePasswordRequired);

  const setToken = (token: string | null) => (storage.value.token = token);
  const setUser = (user: User | null) => (state.user = user);
  const setChangePasswordRequired = (required: boolean) =>
    (state.changePasswordRequired = required);

  watch(
    getToken,
    (token) => {
      state.api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    },
    { immediate: true }
  );

  function $reset() {
    setToken(null);
    setUser(null);
  }

  return {
    useApi,
    getToken,
    getUser,
    getChangePasswordRequired,
    setToken,
    setUser,
    setChangePasswordRequired,
    $reset
  };
});
