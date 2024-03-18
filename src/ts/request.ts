import type { AxiosError, AxiosResponse } from 'axios';
import { computed, shallowRef } from 'vue';

interface BaseError {
  message: string;
}

export const useRequest = async <Res = null, Err = BaseError>(
  request: () => Promise<AxiosResponse>
) => {
  const fetchRef = shallowRef<boolean>(false);
  const errorRef = shallowRef<AxiosError<Err>['response']>();
  const responseRef = shallowRef<Res>();

  const isFetch = computed(() => fetchRef.value);
  const error = computed(() => errorRef.value);
  const response = computed(() => responseRef.value);

  try {
    const { data } = await request();
    responseRef.value = data;
  } catch (err) {
    const error = err as AxiosError<Err>;
    errorRef.value = error.response;
  } finally {
    fetchRef.value = true;
  }

  return {
    isFetch,
    error,
    response
  };
};